import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, FolderKanban, Calendar, MessageSquare, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const location = useLocation();

  const links = [
    { href: "/admin/dashboard", label: "Panel", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/projects", label: "Projeler", icon: FolderKanban },
    { href: "/admin/events", label: "Etkinlikler", icon: Calendar },
    { href: "/admin/messages", label: "Mesajlar", icon: MessageSquare },
    { href: "/admin/users", label: "Kullanıcılar", icon: Users },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white border-r fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Admin Paneli</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-slate-800 text-slate-300"
              )}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
            <span className="text-sm">v1.0.0</span>
        </div>
      </div>
    </div>
  );
}
