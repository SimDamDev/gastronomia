"use client";

import { useRouter } from 'next/navigation';
import { RecipeForm } from '@/components/RecipeForm';

export default function NewRecipePage() {
  const router = useRouter();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nouvelle recette</h1>
      <RecipeForm mode="create" onSuccess={(id) => router.push(`/recipes/${id}`)} />
    </main>
  );
}
