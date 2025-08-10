import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { updateRecipe, deleteRecipe } from '@/services/recipeService';
import { validateRecipeWithZod } from '@/domain/recipeSchema';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // GET reste géré directement via Prisma côté page détail
  return NextResponse.json({ error: 'Not implemented in this handler' }, { status: 501 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const validation = validateRecipeWithZod(body);
  if (!validation.isValid) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }
  const result = await updateRecipe((session.user as any).id, params.id, body);
  if (!result.ok) return NextResponse.json({ error: 'Error', errors: (result as any).errors }, { status: result.status });
  return NextResponse.json(result.recipe);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const result = await deleteRecipe((session.user as any).id, params.id);
  if (!result.ok) return NextResponse.json({ error: 'Error' }, { status: result.status });
  return NextResponse.json({ ok: true });
}

