import { RecipeCreateInput, ValidationResult } from '@/types/recipe';

export function validateRecipe(input: RecipeCreateInput): ValidationResult {
  const errors: string[] = [];

  const title = input.title?.trim() ?? '';
  if (title.length < 3) {
    errors.push('Le titre doit contenir au moins 3 caractères');
  }

  const ingredients = input.ingredients ?? [];
  if (!Array.isArray(ingredients) || ingredients.length < 1) {
    errors.push('Au moins un ingrédient est requis');
  }

  const steps = input.steps ?? [];
  if (!Array.isArray(steps) || steps.length < 1) {
    errors.push('Au moins une étape est requise');
  }

  const minutes = input.totalMinutes ?? 0;
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 300) {
    errors.push('La durée totale doit être comprise entre 1 et 300 minutes');
  }

  const difficulty = input.difficulty;
  if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
    errors.push('La difficulté doit être easy, medium ou hard');
  }

  const imageUrl = input.imageUrl ?? null;
  if (imageUrl && typeof imageUrl === 'string') {
    try {
      // eslint-disable-next-line no-new
      new URL(imageUrl);
    } catch {
      errors.push("L'URL de l'image est invalide");
    }
  }

  return { isValid: errors.length === 0, errors };
}

