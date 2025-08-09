"use client";

import React, { useEffect, useState } from 'react';
import { RecipeCard } from './RecipeCard';

interface RecipeDto {
  id: string;
  title: string;
  description?: string | null;
  totalMinutes: number;
  difficulty: string;
}

export const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/recipes', { cache: 'no-store' });
        if (!res.ok) throw new Error('Erreur de chargement');
        const data = await res.json();
        setRecipes(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Chargement…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((r) => (
        <RecipeCard key={r.id} id={r.id} title={r.title} totalMinutes={r.totalMinutes} difficulty={r.difficulty} description={r.description} />)
      )}
    </div>
  );
};
