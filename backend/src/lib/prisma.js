import prisma from '../../../database/src/client.js';

// Singleton pattern — one connection pool shared across all requests
export default prisma;
