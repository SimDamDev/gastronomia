"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-semibold">Gastronomia</Link>
        <div className="flex items-center gap-4">
          <Link href="/recipes">Recettes</Link>
          {session?.user && <Link href="/recipes/new">Créer</Link>}
          {session?.user ? (
            <>
              <span className="text-sm text-gray-600">{session.user.email}</span>
              <button className="px-3 py-1 border rounded ml-2" onClick={() => signOut({ callbackUrl: '/' })}>Se déconnecter</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-1 border rounded">Se connecter</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
