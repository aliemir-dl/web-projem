import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminConfig } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config } = useQuery<AdminConfig>({
    queryKey: ["admin", "config"],
    queryFn: async () => {
      const res = await fetch("/api/admin/config", {
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
      return res.json();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<AdminConfig>) => {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": localStorage.getItem("admin_token") || ""
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "config"] });
      toast({ title: "Başarılı", description: "Ayarlar güncellendi." });
    }
  });

  if (!config) return <div>Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Ayarlar</h2>

      <Card>
        <CardHeader>
          <CardTitle>Genel Ayarlar</CardTitle>
          <CardDescription>
            Site genel yapılandırma ayarları.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="maintenance" className="flex flex-col space-y-1">
              <span>Bakım Modu</span>
              <span className="font-normal text-muted-foreground">
                Siteyi bakım moduna alırsanız, ziyaretçiler erişemez.
              </span>
            </Label>
            <Switch
              id="maintenance"
              checked={config.maintenanceMode}
              onCheckedChange={(checked) => updateMutation.mutate({ maintenanceMode: checked })}
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Başlığı</Label>
            <div className="flex gap-2">
              <Input
                id="siteTitle"
                defaultValue={config.siteTitle}
                onBlur={(e) => updateMutation.mutate({ siteTitle: e.target.value })}
              />
              <Button onClick={() => {
                  const el = document.getElementById("siteTitle") as HTMLInputElement;
                  updateMutation.mutate({ siteTitle: el.value });
              }}>Kaydet</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
