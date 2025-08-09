import { validateRecipe } from './validateRecipe';

describe('validateRecipe', () => {
  it('retourne valide pour une recette correcte', () => {
    const res = validateRecipe({
      title: 'Pâtes carbonara',
      ingredients: ['pâtes', 'œufs', 'lardons'],
      steps: ['Cuire les pâtes', 'Mélanger avec la sauce'],
      totalMinutes: 25,
      difficulty: 'easy',
      imageUrl: 'https://example.com/img.jpg',
    });
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('valide les règles de base et renvoie des messages clairs', () => {
    const res = validateRecipe({
      title: 'a',
      ingredients: [],
      steps: [],
      totalMinutes: 0,
      difficulty: 'invalid' as any,
      imageUrl: 'not-an-url',
    });

    expect(res.isValid).toBe(false);
    expect(res.errors).toEqual([
      'Le titre doit contenir au moins 3 caractères',
      'Au moins un ingrédient est requis',
      'Au moins une étape est requise',
      'La durée totale doit être comprise entre 1 et 300 minutes',
      'La difficulté doit être easy, medium ou hard',
      "L'URL de l'image est invalide",
    ]);
  });
});

