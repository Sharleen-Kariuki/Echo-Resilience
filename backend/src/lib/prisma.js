import { PrismaClient } from '@prisma/client';

// Singleton pattern — one connection pool shared across all requests
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export default prisma;
