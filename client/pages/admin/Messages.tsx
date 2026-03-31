import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages } = useQuery<ContactMessage[]>({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": localStorage.getItem("admin_token") || "" }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      toast({ title: "Başarılı", description: "Mesaj silindi." });
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Gelen Mesajlar</h2>

      <div className="grid gap-4">
        {messages?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <Mail className="mx-auto h-12 w-12 opacity-50 mb-4" />
                <p>Henüz hiç mesaj yok.</p>
            </div>
        )}
        {messages?.map((msg) => (
          <Card key={msg.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {msg.name} <span className="text-muted-foreground font-normal">&lt;{msg.email}&gt;</span>
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(msg.date).toLocaleString()}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(msg.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm mt-2">{msg.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
