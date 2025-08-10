import { NextResponse } from 'next/server';
import { validateRecipeWithZod } from '@/domain/recipeSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createRecipe, listRecipes } from '@/services/recipeService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? '';
    const maxTime = parseInt(searchParams.get('maxTime') ?? '', 10);
    const difficulty = searchParams.get('difficulty') ?? undefined;

    const recipes = await listRecipes({ q, maxTime, difficulty });
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('GET /api/recipes failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const validation = validateRecipeWithZod(body);
    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const result = await createRecipe((session.user as any).id, body);
    if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: result.status });
    return NextResponse.json(result.recipe, { status: 201 });
  } catch (error) {
    console.error('POST /api/recipes failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

