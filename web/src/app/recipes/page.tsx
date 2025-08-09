"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { RecipeCard } from '@/components/RecipeCard';

interface RecipeDto {
  id: string;
  title: string;
  description?: string | null;
  totalMinutes: number;
  difficulty: string;
}

export default function RecipesPage() {
  const [q, setQ] = useState('');
  const [maxTime, setMaxTime] = useState<number | ''>('');
  const [difficulty, setDifficulty] = useState('');
  const [recipes, setRecipes] = useState<RecipeDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (typeof maxTime === 'number' && maxTime > 0) params.set('maxTime', String(maxTime));
    if (difficulty) params.set('difficulty', difficulty);
    const s = params.toString();
    return s ? `?${s}` : '';
  }, [q, maxTime, difficulty]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/recipes${queryString}`);
        if (!res.ok) throw new Error('Erreur de chargement');
        const data = (await res.json()) as RecipeDto[];
        if (!cancelled) setRecipes(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [queryString]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Recettes</h1>

      <form
        className="grid gap-3 md:grid-cols-4 mb-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Recherche de recettes"
      >
        <input
          type="text"
          placeholder="Rechercher par titre…"
          className="border rounded px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Recherche par titre"
        />
        <input
          type="number"
          min={1}
          max={300}
          placeholder="Durée max (min)"
          className="border rounded px-3 py-2"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value ? Number(e.target.value) : '')}
          aria-label="Durée maximale"
        />
        <select
          className="border rounded px-3 py-2"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          aria-label="Difficulté"
        >
          <option value="">Toutes difficultés</option>
          <option value="easy">Facile</option>
          <option value="medium">Moyenne</option>
          <option value="hard">Difficile</option>
        </select>
        <button type="button" className="border rounded px-3 py-2" onClick={() => { setQ(''); setMaxTime(''); setDifficulty(''); }}>
          Réinitialiser
        </button>
      </form>

      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard key={r.id} id={r.id} title={r.title} totalMinutes={r.totalMinutes} difficulty={r.difficulty} description={r.description} />
          ))}
          {recipes.length === 0 && (
            <p>Aucune recette trouvée.</p>
          )}
        </div>
      )}
    </main>
  );
}
