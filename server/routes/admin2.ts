import { Router, RequestHandler } from "express";
import { AdminConfig, AdminStatusResponse, AdminUsersResponse, AdminUser } from "@shared/api";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Simple in-memory storage (demo only)
let config: AdminConfig = { maintenanceMode: false, siteTitle: "Fusion Starter" };
let users: AdminUser[] = [
  { id: uuidv4(), name: "Admin User", email: "admin@example.com", role: "admin" },
];

const requireAdminToken: RequestHandler = (req, res, next) => {
  const token = req.header("x-admin-token") || (req.header("authorization") || "").replace("Bearer ", "");
  const expected = process.env.ADMIN_TOKEN || "dev-token";
  if (!token || token !== expected) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

router.get(
  "/status",
  requireAdminToken,
  (req, res) => {
    const response: AdminStatusResponse = {
      status: config.maintenanceMode ? "maintenance" : "ok",
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || undefined,
    };
    res.json(response);
  }
);

router.get("/config", requireAdminToken, (_req, res) => {
  res.json(config);
});

router.post("/config", requireAdminToken, (req, res) => {
  const body = req.body as Partial<AdminConfig>;
  config = { ...config, ...body };
  res.json(config);
});

router.get("/users", requireAdminToken, (_req, res) => {
  const resp: AdminUsersResponse = { users };
  res.json(resp);
});

router.post("/users", requireAdminToken, (req, res) => {
  const body = req.body as Partial<AdminUser>;
  if (!body.name || !body.email) return res.status(400).json({ message: "name and email required" });
  const newUser: AdminUser = { id: uuidv4(), name: body.name, email: body.email, role: body.role || "editor" };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.delete("/users/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  if (users.length === before) return res.status(404).json({ message: "not found" });
  res.status(204).end();
});

export const adminRouter = router;
export default router;
