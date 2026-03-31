import { useQuery } from "@tanstack/react-query";
import { AdminStats } from "@shared/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, FolderKanban, Calendar, MessageSquare, Activity } from "lucide-react";

export default function Dashboard() {
  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard-stats", {
        headers: {
            "x-admin-token": localStorage.getItem("admin_token") || ""
        }
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    }
  });

  if (!stats) return <div>Yükleniyor...</div>;

  const chartData = [
    { name: "Yazılar", count: stats.totalPosts },
    { name: "Projeler", count: stats.totalProjects },
    { name: "Etkinlikler", count: stats.totalEvents },
    { name: "Mesajlar", count: stats.unreadMessages },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Panel</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yazı</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Projeler</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Etkinlikler</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Okunmamış Mesaj</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Genel Bakış</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sistem Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Activity className="h-8 w-8 text-green-500" />
              <div>
                <div className="font-medium">Sistem Çalışıyor</div>
                <div className="text-sm text-muted-foreground">Tüm servisler aktif.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
