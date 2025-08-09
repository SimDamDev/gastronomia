import { render, screen, waitFor } from '@testing-library/react';
import { RecipeList } from './RecipeList';

declare global {
  // eslint-disable-next-line no-var
  var fetch: jest.Mock;
}

const mockRecipes = [
  {
    id: 'r1',
    title: 'Pâtes Carbonara',
    description: 'Recette classique italienne',
    totalMinutes: 25,
    difficulty: 'easy',
  },
  {
    id: 'r2',
    title: 'Poulet rôti',
    description: 'Simple et savoureux',
    totalMinutes: 90,
    difficulty: 'medium',
  },
];

describe('RecipeList', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => mockRecipes,
    })) as unknown as jest.Mock;
  });

  it('affiche les recettes retournées par l’API', async () => {
    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByText(/Pâtes Carbonara/i)).toBeInTheDocument();
      expect(screen.getByText(/Poulet rôti/i)).toBeInTheDocument();
    });

    const cards = screen.getAllByRole('heading', { level: 2 });
    expect(cards).toHaveLength(2);
  });
});
