import { render, screen } from '@testing-library/react';
import RecipeDetailPage, { generateMetadata } from './page';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    recipe: {
      findUnique: jest.fn(async () => ({
        id: 'r1',
        title: 'Tarte aux pommes',
        description: 'Délicieuse',
        totalMinutes: 45,
        difficulty: 'medium',
        ownerId: 'u1',
        ingredients: [],
        steps: [],
      })),
    },
  },
}));

jest.mock('next-auth', () => ({ getServerSession: jest.fn(async () => ({ user: { id: 'u1' } })) }));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

describe('RecipeDetail page', () => {
  it('rend le titre et génère des métadonnées', async () => {
    const meta = await generateMetadata({ params: { id: 'r1' } } as any);
    expect(meta.title).toMatch(/Tarte aux pommes/);

    const ui = await RecipeDetailPage({ params: { id: 'r1' } } as any);
    render(ui as any);
    expect(screen.getByRole('heading', { level: 1, name: /tarte aux pommes/i })).toBeInTheDocument();
  });
});
