require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient({ log: ['error'] });
  try {
    const r = await prisma.('SELECT 1');
    console.log('OK', r);
  } catch (e) {
    console.error('ERR', e && (e.code || e.name || e.message));
    console.error(String(e));
  } finally {
    await prisma.();
  }
})();