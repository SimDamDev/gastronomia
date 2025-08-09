import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecipeForm } from './RecipeForm';

declare global {
  // eslint-disable-next-line no-var
  var fetch: jest.Mock;
}

describe('RecipeForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('affiche des erreurs lorsque le formulaire est invalide', async () => {
    render(<RecipeForm mode="create" onSuccess={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /créer/i }));

    await waitFor(() => {
      expect(screen.getByText(/Le titre doit contenir au moins 3 caractères/i)).toBeInTheDocument();
      expect(screen.getByText(/Au moins un ingrédient est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/Au moins une étape est requise/i)).toBeInTheDocument();
      expect(screen.getByText(/La durée totale doit être comprise entre 1 et 300 minutes/i)).toBeInTheDocument();
    });
  });

  it('désactive le bouton pendant la soumission et appelle l’API en succès', async () => {
    const onSuccess = jest.fn();
    global.fetch.mockResolvedValueOnce({ ok: true, status: 201, json: async () => ({ id: 'new-id' }) });

    render(<RecipeForm mode="create" onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/titre/i), { target: { value: 'Tarte aux pommes' } });
    fireEvent.change(screen.getByLabelText(/durée totale/i), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText(/difficulté/i), { target: { value: 'medium' } });
    fireEvent.change(screen.getByLabelText(/ingrédients/i), { target: { value: 'pommes\nsucre\npâte' } });
    fireEvent.change(screen.getByLabelText(/étapes/i), { target: { value: 'couper\ncuire' } });

    const button = screen.getByRole('button', { name: /créer/i });
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/recipes', expect.objectContaining({ method: 'POST' }));
      expect(onSuccess).toHaveBeenCalledWith('new-id');
    });
  });
});
