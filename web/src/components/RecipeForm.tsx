"use client";

import React, { useMemo, useState } from 'react';
import { validateRecipe } from '@/domain/validateRecipe';
import type { Difficulty, RecipeCreateInput } from '@/types/recipe';

export interface RecipeFormProps {
  mode: 'create' | 'edit';
  initial?: {
    title?: string;
    description?: string;
    totalMinutes?: number;
    difficulty?: Difficulty;
    ingredients?: string[];
    steps?: string[];
    imageUrl?: string;
    id?: string;
  };
  onSuccess?: (id: string) => void;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ mode, initial, onSuccess }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [totalMinutes, setTotalMinutes] = useState<number | ''>(initial?.totalMinutes ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 'easy');
  const [ingredientsText, setIngredientsText] = useState((initial?.ingredients ?? []).join('\n'));
  const [stepsText, setStepsText] = useState((initial?.steps ?? []).join('\n'));
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const payload: RecipeCreateInput = useMemo(() => ({
    title,
    description: description || undefined,
    totalMinutes: typeof totalMinutes === 'number' ? totalMinutes : Number(totalMinutes || 0),
    difficulty,
    ingredients: ingredientsText.split('\n').map((s) => s.trim()).filter(Boolean),
    steps: stepsText.split('\n').map((s) => s.trim()).filter(Boolean),
    imageUrl: imageUrl || undefined,
  }), [title, description, totalMinutes, difficulty, ingredientsText, stepsText, imageUrl]);

  const clientErrors = useMemo(() => validateRecipe(payload).errors, [payload]);

  const handleSubmit = async () => {
    const validation = validateRecipe(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors([]);
    setSubmitting(true);
    try {
      const res = await fetch(mode === 'create' ? '/api/recipes' : `/api/recipes/${initial?.id}`, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Erreur lors de la soumission');
      const data = await res.json();
      onSuccess?.(data.id ?? initial?.id ?? '');
    } catch (e) {
      setErrors(['Une erreur est survenue']);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4 max-w-2xl" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div>
        <label className="block text-sm font-medium" htmlFor="title">Titre</label>
        <input id="title" aria-label="Titre" className="border rounded px-3 py-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="total">Durée totale (min)</label>
        <input id="total" aria-label="Durée totale" type="number" min={1} max={300} className="border rounded px-3 py-2 w-full" value={totalMinutes} onChange={(e) => setTotalMinutes(e.target.value ? Number(e.target.value) : '')} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="difficulty">Difficulté</label>
        <select id="difficulty" aria-label="Difficulté" className="border rounded px-3 py-2 w-full" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
          <option value="easy">Facile</option>
          <option value="medium">Moyenne</option>
          <option value="hard">Difficile</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="ingredients">Ingrédients</label>
        <textarea id="ingredients" aria-label="Ingrédients" className="border rounded px-3 py-2 w-full h-28" value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="steps">Étapes</label>
        <textarea id="steps" aria-label="Étapes" className="border rounded px-3 py-2 w-full h-28" value={stepsText} onChange={(e) => setStepsText(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="desc">Description</label>
        <textarea id="desc" className="border rounded px-3 py-2 w-full h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="img">Image URL</label>
        <input id="img" className="border rounded px-3 py-2 w-full" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>

      {errors.length > 0 && (
        <ul className="text-red-700 bg-red-50 border border-red-200 p-3 rounded text-sm">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-60" disabled={submitting}>
        {mode === 'create' ? 'Créer' : 'Enregistrer'}
      </button>

      {clientErrors.length > 0 && (
        <p className="text-xs text-gray-500">Validation en cours: {clientErrors.length} problème(s)</p>
      )}
    </form>
  );
};
