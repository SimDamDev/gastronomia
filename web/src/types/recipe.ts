export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  steps: string[];
  totalMinutes: number; // 1..300
  difficulty: Difficulty;
  imageUrl?: string | null;
  ownerId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface RecipeCreateInput {
  title?: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
  totalMinutes?: number;
  difficulty?: Difficulty;
  imageUrl?: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

