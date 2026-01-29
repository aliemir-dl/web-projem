import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AdminHeader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    queryClient.clear();
    navigate("/admin/login");
  };

  return (
    <header className="h-16 bg-background border-b px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="text-sm text-muted-foreground">
        Hoşgeldiniz, Admin
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={18} />
          </div>
          <span>Admin User</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Çıkış Yap">
          <LogOut size={20} />
        </Button>
      </div>
    </header>
  );
}
