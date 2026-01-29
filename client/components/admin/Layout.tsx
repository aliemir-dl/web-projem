import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "./Sidebar";
import { AdminHeader } from "./Header";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
