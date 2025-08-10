import { z } from 'zod';
import type { ValidationResult } from '@/types/recipe';

export const recipeCreateSchema = z.object({
  title: z
    .string({ required_error: 'Le titre doit contenir au moins 3 caractères' })
    .trim()
    .min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().optional(),
  ingredients: z
    .array(z.string().min(1))
    .min(1, 'Au moins un ingrédient est requis'),
  steps: z
    .array(z.string().min(1))
    .min(1, 'Au moins une étape est requise'),
  totalMinutes: z
    .number({ required_error: 'La durée totale doit être comprise entre 1 et 300 minutes' })
    .min(1, 'La durée totale doit être comprise entre 1 et 300 minutes')
    .max(300, 'La durée totale doit être comprise entre 1 et 300 minutes'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'], {
      invalid_type_error: 'La difficulté doit être easy, medium ou hard',
      required_error: 'La difficulté doit être easy, medium ou hard',
    }),
  imageUrl: z
    .string()
    .url("L'URL de l'image est invalide")
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export function validateRecipeWithZod(input: unknown): ValidationResult {
  const parsed = recipeCreateSchema.safeParse(input);
  if (parsed.success) return { isValid: true, errors: [] };
  const errors = parsed.error.issues.map((i) => i.message);
  return { isValid: false, errors };
}


