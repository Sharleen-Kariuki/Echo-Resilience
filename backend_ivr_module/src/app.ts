import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import ivrRoutes from "./routes/ivr.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "echoresilience-backend",
  });
});

app.use("/api/ivr", ivrRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
