import React from 'react';
import Link from 'next/link';

export interface RecipeCardProps {
  id?: string;
  title: string;
  totalMinutes: number;
  difficulty: string;
  description?: string | null;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, totalMinutes, difficulty, description }) => {
  const content = (
    <article className="border rounded p-4 sm:p-5 shadow-sm bg-white hover:shadow transition">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-2">{totalMinutes} min • {difficulty}</p>
      {description ? <p className="text-sm text-gray-800 line-clamp-3 sm:line-clamp-4">{description}</p> : null}
    </article>
  );

  return id ? <Link href={`/recipes/${id}`}>{content}</Link> : content;
};
