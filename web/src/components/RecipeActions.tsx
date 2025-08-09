"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function RecipeActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm('Supprimer cette recette ?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Suppression impossible');
      router.push('/recipes');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Link href={`/recipes/${id}/edit`} className="px-3 py-2 rounded border">Éditer</Link>
      <button className="px-3 py-2 rounded border text-red-700" onClick={handleDelete} disabled={loading}>
        {loading ? 'Suppression…' : 'Supprimer'}
      </button>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
