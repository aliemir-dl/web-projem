import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function EventsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const { data: events } = useQuery<Event[]>({
    queryKey: ["admin", "events"],
    queryFn: async () => {
      const res = await fetch("/api/admin/events", {
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Event>) => {
      const res = await fetch("/api/admin/events", {
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
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      setIsOpen(false);
      toast({ title: "Başarılı", description: "Etkinlik oluşturuldu." });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Event>) => {
      const res = await fetch(`/api/admin/events/${editingEvent!.id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      setIsOpen(false);
      setEditingEvent(null);
      toast({ title: "Başarılı", description: "Etkinlik güncellendi." });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      toast({ title: "Başarılı", description: "Etkinlik silindi." });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
    };

    if (editingEvent) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Etkinlik Yönetimi</h2>
        <Button onClick={() => { setEditingEvent(null); setIsOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Etkinlik
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Konum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(event.id)}>
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
            <DialogTitle>{editingEvent ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input id="title" name="title" defaultValue={editingEvent?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Tarih</Label>
              <Input id="date" name="date" type="datetime-local" defaultValue={editingEvent?.date ? new Date(editingEvent.date).toISOString().slice(0, 16) : ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Konum</Label>
              <Input id="location" name="location" defaultValue={editingEvent?.location} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea id="description" name="description" defaultValue={editingEvent?.description} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>İptal</Button>
              <Button type="submit">{editingEvent ? "Güncelle" : "Oluştur"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
