import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { RecipeActions } from '@/components/RecipeActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import type { Metadata } from 'next';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const recipe = await prisma.recipe.findUnique({ where: { id: params.id } });
  if (!recipe) return { title: 'Recette introuvable' };
  return {
    title: `${recipe.title} • Gastronomia`,
    description: recipe.description ?? `${recipe.title} – ${recipe.totalMinutes} minutes`,
    openGraph: {
      title: recipe.title,
      description: recipe.description ?? undefined,
    },
    twitter: {
      card: 'summary',
      title: recipe.title,
      description: recipe.description ?? undefined,
    },
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const [recipe, session] = await Promise.all([
    prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        ingredients: { orderBy: { order: 'asc' } },
        steps: { orderBy: { order: 'asc' } },
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!recipe) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Recette introuvable</h1>
        <Link href="/" className="text-blue-600 underline">Retour à l’accueil</Link>
      </main>
    );
  }

  const canEdit = !!session?.user && (session.user as any).id === recipe.ownerId;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-blue-600 underline">← Retour</Link>
        {canEdit && <RecipeActions id={recipe.id} />}
      </div>
      <h1 className="text-3xl font-bold mt-2 mb-2">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">{recipe.totalMinutes} min • {recipe.difficulty}</p>
      {recipe.description ? <p className="mb-6">{recipe.description}</p> : null}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingrédients</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>{ing.content}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Étapes</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.steps.map((st) => (
            <li key={st.id}>{st.content}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
