import { prisma } from '@/lib/prisma';
import { RecipeForm } from '@/components/RecipeForm';
import { notFound } from 'next/navigation';
import type { Difficulty } from '@/types/recipe';

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    include: {
      ingredients: { orderBy: { order: 'asc' } },
      steps: { orderBy: { order: 'asc' } },
    },
  });

  if (!recipe) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Éditer la recette</h1>
      <RecipeForm
        mode="edit"
        initial={{
          id: recipe.id,
          title: recipe.title,
          description: recipe.description ?? undefined,
          totalMinutes: recipe.totalMinutes,
          difficulty: recipe.difficulty as Difficulty,
          ingredients: recipe.ingredients.map((i) => i.content),
          steps: recipe.steps.map((s) => s.content),
          imageUrl: recipe.imageUrl ?? undefined,
        }}
      />
    </main>
  );
}
