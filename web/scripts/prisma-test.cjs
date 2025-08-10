const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient({ log: ['error'] });
  try {
    await prisma.$connect();
    const r = await prisma.$queryRawUnsafe('SELECT 1');
    console.log('OK', r);
  } catch (e) {
    console.error('ERR', e && (e.code || e.name || e.message));
    console.error(e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();



