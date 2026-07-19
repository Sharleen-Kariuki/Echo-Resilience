import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  nlpServiceUrl: process.env.NLP_SERVICE_URL,
  internalServiceKey: process.env.INTERNAL_SERVICE_KEY,
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is required");
}
