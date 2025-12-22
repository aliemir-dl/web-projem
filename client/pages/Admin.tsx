import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminStatusResponse, AdminUsersResponse, AdminUser } from "@shared/api";

const apiFetch = async (path: string, opts: RequestInit = {}) => {
  const token = localStorage.getItem("admin_token") || "";
  const headers = { ...(opts.headers || {}), "x-admin-token": token, "content-type": "application/json" };
  const res = await fetch(path, { ...opts, headers });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null;
  return res.json();
};

export default function AdminPage() {
  const qc = useQueryClient();
  const [tokenInput, setTokenInput] = useState( localStorage.getItem("admin_token") || "" );

  const { data: status } = useQuery<AdminStatusResponse>(["admin","status"], () => apiFetch("/api/admin/status"), { enabled: !!localStorage.getItem("admin_token") });
  const { data: usersResp } = useQuery<AdminUsersResponse>(["admin","users"], () => apiFetch("/api/admin/users"), { enabled: !!localStorage.getItem("admin_token") });

  const saveToken = () => {
    localStorage.setItem("admin_token", tokenInput);
    qc.invalidateQueries();
  };

  const logout = () => { localStorage.removeItem("admin_token"); setTokenInput(""); qc.clear(); };

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const createUser = async () => {
    await apiFetch("/api/admin/users", { method: "POST", body: JSON.stringify({ name: newUserName, email: newUserEmail }) });
    setNewUserName(""); setNewUserEmail(""); qc.invalidateQueries(["admin","users"]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Admin Paneli</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Giriş</CardTitle>
            </CardHeader>
            <CardContent>
              <input className="w-full p-2 border rounded mb-2" placeholder="Admin token" value={tokenInput} onChange={(e)=>setTokenInput(e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={saveToken}>Giriş Yap</Button>
                <Button variant="outline" onClick={logout}>Çıkış</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Durum: {status?.status ?? "-"}</div>
              <div>Uptime: {status ? `${status.uptime}s` : "-"}</div>
              <div>Versiyon: {status?.version ?? "-"}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ayarlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Bakım modu ve site ayarları burada gösterilir.</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Yönetimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <input className="w-full p-2 border rounded mb-2" placeholder="İsim" value={newUserName} onChange={(e)=>setNewUserName(e.target.value)} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={newUserEmail} onChange={(e)=>setNewUserEmail(e.target.value)} />
                <Button onClick={createUser}>Yeni Kullanıcı Ekle</Button>
              </div>

              <div>
                {(usersResp?.users || []).map((u: AdminUser) => (
                  <div key={u.id} className="flex items-center justify-between p-2 border-b">
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-sm text-muted-foreground">{u.email}</div>
                    </div>
                    <div>
                      <Button variant="destructive" onClick={async ()=>{ await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE', headers: { 'x-admin-token': localStorage.getItem('admin_token')||'' } }); qc.invalidateQueries(["admin","users"]); }}>Sil</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site İçeriği</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Bu panel üzerinden sayfa içerikleri, blog, etkinlikler ve projeler gibi öğeler yönetilebilir (demo).</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}