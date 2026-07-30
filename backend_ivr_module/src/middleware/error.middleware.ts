import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
    ...(env.nodeEnv === "development" ? { error: error.message } : {}),
  });
}
