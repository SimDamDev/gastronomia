import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecipesPage from './page';

declare global {
  // eslint-disable-next-line no-var
  var fetch: jest.Mock;
}

describe('Recipes page (search/filter)', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({ ok: true, json: async () => [] })) as unknown as jest.Mock;
  });

  it('déclenche un fetch avec q quand on saisit un titre', async () => {
    render(<RecipesPage />);
    const input = screen.getByLabelText(/recherche par titre/i);
    fireEvent.change(input, { target: { value: 'pate' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const urls = global.fetch.mock.calls.map((c: any[]) => c[0] as string);
    expect(urls.some((u: string) => u.includes('/api/recipes?q=pate'))).toBe(true);
  });

  it('déclenche un fetch avec maxTime et difficulty', async () => {
    render(<RecipesPage />);
    const time = screen.getByLabelText(/durée maximale/i);
    const diff = screen.getByLabelText(/difficulté/i);

    fireEvent.change(time, { target: { value: '30' } });
    fireEvent.change(diff, { target: { value: 'easy' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const urls = global.fetch.mock.calls.map((c: any[]) => c[0] as string);
    const hasParams = urls.some((u: string) => u.includes('/api/recipes?') && u.includes('maxTime=30') && u.includes('difficulty=easy'));
    expect(hasParams).toBe(true);
  });

  it('affiche un état de chargement puis les résultats', async () => {
    let resolveJson: any;
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ ok: true, json: async () => [{ id: 'r1', title: 'Salade', totalMinutes: 5, difficulty: 'easy' }] }), 10);
      });
    });

    render(<RecipesPage />);
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Salade/i)).toBeInTheDocument();
    });
  });

  it('affiche un message d’erreur si le fetch échoue', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    render(<RecipesPage />);
    await waitFor(() => {
      expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument();
    });
  });
});
