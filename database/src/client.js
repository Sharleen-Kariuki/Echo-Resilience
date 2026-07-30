import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from the parent or current directory
dotenv.config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
export { prisma };
