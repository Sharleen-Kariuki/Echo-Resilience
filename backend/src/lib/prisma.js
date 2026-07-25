import { PrismaClient } from '../../../database/generated/client/index.js';

// Singleton pattern — one connection pool shared across all requests
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export default prisma;
