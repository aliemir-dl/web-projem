import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { adminRouter } from "./routes/admin2";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Admin API (token-protected). Provide ADMIN_TOKEN in env or default to "dev-token".
  app.use("/api/admin", adminRouter);

  return app;
}
