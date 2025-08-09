import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@gastronomia.dev' },
    update: {},
    create: {
      email: 'demo@gastronomia.dev',
      password: passwordHash,
    },
  });

  const r1 = await prisma.recipe.create({
    data: {
      title: 'Pâtes Carbonara',
      description: 'Recette classique italienne',
      totalMinutes: 25,
      difficulty: 'easy',
      ownerId: user.id,
      ingredients: {
        create: [
          { content: 'pâtes', order: 1 },
          { content: 'œufs', order: 2 },
          { content: 'lardons', order: 3 },
          { content: 'parmesan', order: 4 },
        ],
      },
      steps: {
        create: [
          { content: 'Cuire les pâtes', order: 1 },
          { content: 'Préparer la sauce', order: 2 },
          { content: 'Mélanger et servir', order: 3 },
        ],
      },
    },
  });

  const r2 = await prisma.recipe.create({
    data: {
      title: 'Poulet rôti',
      description: 'Simple et savoureux',
      totalMinutes: 90,
      difficulty: 'medium',
      ownerId: user.id,
      ingredients: {
        create: [
          { content: 'poulet', order: 1 },
          { content: 'beurre', order: 2 },
          { content: 'herbes', order: 3 },
          { content: 'sel', order: 4 },
          { content: 'poivre', order: 5 },
        ],
      },
      steps: {
        create: [
          { content: 'Assaisonner', order: 1 },
          { content: 'Enfourner', order: 2 },
          { content: 'Arroser et servir', order: 3 },
        ],
      },
    },
  });

  console.log('Seed OK', { r1: r1.id, r2: r2.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
