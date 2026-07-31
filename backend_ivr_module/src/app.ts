import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import ivrRoutes from "./routes/ivr.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GENERATED_AUDIO_DIR = path.resolve(__dirname, "../../AI/generated_audio");

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
// Twilio's voice callbacks post form-encoded bodies, not JSON.
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/audio", express.static(GENERATED_AUDIO_DIR));

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "echoresilience-backend",
  });
});

app.use("/api/ivr", ivrRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
