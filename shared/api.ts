/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/** Admin API types */
export interface AdminStatusResponse {
  status: "ok" | "maintenance" | "error";
  uptime: number; // seconds
  version?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
}

export interface AdminConfig {
  maintenanceMode: boolean;
  siteTitle?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "published" | "draft";
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  status: "active" | "completed" | "archived";
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AdminStats {
  totalPosts: number;
  totalProjects: number;
  totalEvents: number;
  unreadMessages: number;
  systemStatus: "ok" | "maintenance";
}
