"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@gastronomia.dev');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form
        className="grid gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/',
          });
          if (res?.error) setError('Identifiants invalides');
          else if (res?.ok) window.location.assign(res.url ?? '/');
        }}
      >
        <input type="email" className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="border rounded px-3 py-2" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="px-3 py-2 border rounded">Se connecter</button>
      </form>
    </main>
  );
}
