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
});
