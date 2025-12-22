/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */
  message: string;
}

/** Admin API types */
export interface AdminStatusResponse {
  status: "ok" | "maintenance" | "error";
  uptime: number; // seconds
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
