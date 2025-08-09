import '../styles/globals.css';
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Gastronomia',
  description: 'Site de recettes gastronomiques',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
