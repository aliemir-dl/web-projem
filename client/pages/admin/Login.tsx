import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem("admin_token", token);
      toast({
        title: "Giriş Başarılı",
        description: "Admin paneline yönlendiriliyorsunuz.",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen geçerli bir token giriniz.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Girişi</CardTitle>
          <CardDescription>
            Yönetim paneline erişmek için güvenlik kodunu giriniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Güvenlik Kodu</Label>
              <Input
                id="token"
                type="password"
                placeholder="Token giriniz"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
