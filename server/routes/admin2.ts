import { Router, RequestHandler } from "express";
import { AdminConfig, AdminStatusResponse, AdminUsersResponse, AdminUser, BlogPost, Project, Event, ContactMessage, AdminStats } from "@shared/api";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Simple in-memory storage (demo only)
let config: AdminConfig = { maintenanceMode: false, siteTitle: "Fusion Starter" };
let users: AdminUser[] = [
  { id: uuidv4(), name: "Admin User", email: "admin@example.com", role: "admin" },
];

let blogPosts: BlogPost[] = [
  { id: uuidv4(), title: "İlk Blog Yazısı", content: "Bu bir örnek yazıdır.", date: new Date().toISOString(), status: "published" }
];

let projects: Project[] = [
  { id: uuidv4(), title: "Örnek Proje", description: "Bu bir örnek projedir.", imageUrl: "https://placehold.co/600x400", status: "active" }
];

let events: Event[] = [
  { id: uuidv4(), title: "Örnek Etkinlik", date: new Date().toISOString(), location: "İstanbul", description: "Bu bir örnek etkinliktir." }
];

let messages: ContactMessage[] = [
  { id: uuidv4(), name: "Ahmet Yılmaz", email: "ahmet@example.com", message: "Merhaba, bilgi almak istiyorum.", date: new Date().toISOString(), read: false }
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

// Blog Routes
router.get("/blog", requireAdminToken, (_req, res) => {
  res.json(blogPosts);
});

router.post("/blog", requireAdminToken, (req, res) => {
  const body = req.body as Partial<BlogPost>;
  if (!body.title || !body.content) return res.status(400).json({ message: "title and content required" });
  const newPost: BlogPost = {
    id: uuidv4(),
    title: body.title,
    content: body.content,
    date: body.date || new Date().toISOString(),
    status: body.status || "draft",
    imageUrl: body.imageUrl
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/blog/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  const body = req.body as Partial<BlogPost>;
  const index = blogPosts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "not found" });
  blogPosts[index] = { ...blogPosts[index], ...body };
  res.json(blogPosts[index]);
});

router.delete("/blog/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  blogPosts = blogPosts.filter(p => p.id !== id);
  res.status(204).end();
});

// Project Routes
router.get("/projects", requireAdminToken, (_req, res) => {
  res.json(projects);
});

router.post("/projects", requireAdminToken, (req, res) => {
  const body = req.body as Partial<Project>;
  if (!body.title) return res.status(400).json({ message: "title required" });
  const newProject: Project = {
    id: uuidv4(),
    title: body.title,
    description: body.description || "",
    imageUrl: body.imageUrl || "",
    link: body.link,
    status: body.status || "active"
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

router.put("/projects/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  const body = req.body as Partial<Project>;
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "not found" });
  projects[index] = { ...projects[index], ...body };
  res.json(projects[index]);
});

router.delete("/projects/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  projects = projects.filter(p => p.id !== id);
  res.status(204).end();
});

// Event Routes
router.get("/events", requireAdminToken, (_req, res) => {
  res.json(events);
});

router.post("/events", requireAdminToken, (req, res) => {
  const body = req.body as Partial<Event>;
  if (!body.title || !body.date) return res.status(400).json({ message: "title and date required" });
  const newEvent: Event = {
    id: uuidv4(),
    title: body.title,
    date: body.date,
    location: body.location || "",
    description: body.description || ""
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

router.put("/events/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  const body = req.body as Partial<Event>;
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ message: "not found" });
  events[index] = { ...events[index], ...body };
  res.json(events[index]);
});

router.delete("/events/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  events = events.filter(e => e.id !== id);
  res.status(204).end();
});

// Message Routes
router.get("/messages", requireAdminToken, (_req, res) => {
  res.json(messages);
});

router.delete("/messages/:id", requireAdminToken, (req, res) => {
  const id = req.params.id;
  messages = messages.filter(m => m.id !== id);
  res.status(204).end();
});

// Dashboard Stats
router.get("/dashboard-stats", requireAdminToken, (_req, res) => {
  const stats: AdminStats = {
    totalPosts: blogPosts.length,
    totalProjects: projects.length,
    totalEvents: events.length,
    unreadMessages: messages.filter(m => !m.read).length,
    systemStatus: config.maintenanceMode ? "maintenance" : "ok"
  };
  res.json(stats);
});

export const adminRouter = router;
export default router;
