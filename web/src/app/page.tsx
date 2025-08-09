import Link from 'next/link';
import { RecipeList } from '@/components/RecipeList';

export default function Home() {
  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gastronomia</h1>
        <Link href="/recipes" className="text-blue-600 underline">Toutes les recettes</Link>
      </div>
      <RecipeList />
    </main>
  );
}
