import { prisma } from '@/lib/prisma';
import { validateRecipe } from '@/domain/validateRecipe';
import type { RecipeCreateInput } from '@/types/recipe';

export async function listRecipes(filters: { q?: string; maxTime?: number; difficulty?: string }) {
  const { q, maxTime, difficulty } = filters;
  const titleFilter = q ? ({ title: { contains: q, mode: 'insensitive' as any } } as any) : {};
  return prisma.recipe.findMany({
    where: {
      AND: [
        titleFilter,
        Number.isFinite(maxTime as number) ? { totalMinutes: { lte: maxTime as number } } : {},
        difficulty ? ({ difficulty } as any) : {},
      ],
    },
    include: {
      ingredients: { orderBy: { order: 'asc' } },
      steps: { orderBy: { order: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function createRecipe(ownerId: string, input: RecipeCreateInput) {
  const v = validateRecipe(input);
  if (!v.isValid) {
    return { ok: false as const, status: 400, errors: v.errors };
  }
  const ingredients = (input.ingredients ?? []).map((content: string, idx: number) => ({ content, order: idx + 1 }));
  const steps = (input.steps ?? []).map((content: string, idx: number) => ({ content, order: idx + 1 }));
  const recipe = await prisma.recipe.create({
    data: {
      title: input.title!,
      description: input.description ?? null,
      totalMinutes: input.totalMinutes!,
      difficulty: input.difficulty!,
      imageUrl: input.imageUrl ?? null,
      ownerId,
      ingredients: { create: ingredients },
      steps: { create: steps },
    },
    include: {
      ingredients: { orderBy: { order: 'asc' } },
      steps: { orderBy: { order: 'asc' } },
    },
  });
  return { ok: true as const, status: 201, recipe };
}

export async function updateRecipe(ownerId: string, id: string, input: RecipeCreateInput) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return { ok: false as const, status: 404 };
  if (recipe.ownerId !== ownerId) return { ok: false as const, status: 403 };
  const v = validateRecipe({ ...input, title: input.title ?? '' });
  if (!v.isValid) return { ok: false as const, status: 400, errors: v.errors };
  await prisma.recipeIngredient.deleteMany({ where: { recipeId: id } });
  await prisma.recipeStep.deleteMany({ where: { recipeId: id } });
  const ingredients = (input.ingredients ?? []).map((content: string, idx: number) => ({ content, order: idx + 1 }));
  const steps = (input.steps ?? []).map((content: string, idx: number) => ({ content, order: idx + 1 }));
  const updated = await prisma.recipe.update({
    where: { id },
    data: {
      title: input.title!,
      description: input.description ?? null,
      totalMinutes: input.totalMinutes!,
      difficulty: input.difficulty!,
      imageUrl: input.imageUrl ?? null,
      ingredients: { create: ingredients },
      steps: { create: steps },
    },
    include: {
      ingredients: { orderBy: { order: 'asc' } },
      steps: { orderBy: { order: 'asc' } },
    },
  });
  return { ok: true as const, status: 200, recipe: updated };
}

export async function deleteRecipe(ownerId: string, id: string) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return { ok: false as const, status: 404 };
  if (recipe.ownerId !== ownerId) return { ok: false as const, status: 403 };
  await prisma.recipe.delete({ where: { id } });
  return { ok: true as const, status: 200 };
}
