import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProjectsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const res = await fetch("/api/admin/projects", {
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const res = await fetch("/api/admin/projects", {
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
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      setIsOpen(false);
      toast({ title: "Başarılı", description: "Proje oluşturuldu." });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const res = await fetch(`/api/admin/projects/${editingProject!.id}`, {
        method: "PUT",
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
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      setIsOpen(false);
      setEditingProject(null);
      toast({ title: "Başarılı", description: "Proje güncellendi." });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast({ title: "Başarılı", description: "Proje silindi." });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: formData.get("status") as "active" | "completed" | "archived",
    };

    if (editingProject) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Proje Yönetimi</h2>
        <Button onClick={() => { setEditingProject(null); setIsOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Proje
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input id="title" name="title" defaultValue={editingProject?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea id="description" name="description" defaultValue={editingProject?.description} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Görsel URL</Label>
              <Input id="imageUrl" name="imageUrl" defaultValue={editingProject?.imageUrl} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select name="status" defaultValue={editingProject?.status || "active"}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="archived">Arşivlendi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>İptal</Button>
              <Button type="submit">{editingProject ? "Güncelle" : "Oluştur"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
