import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(2, "Nome obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(8, "Senha deve ter ≥ 8 caracteres").max(128),
});

interface AdminUser {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [meId, setMeId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "admin");
    const ids = (roles || []).map((r: any) => r.user_id);
    if (ids.length === 0) { setUsers([]); return; }
    const { data } = await supabase.from("profiles").select("id, full_name, email, created_at").in("id", ids).order("created_at", { ascending: false });
    setUsers((data as AdminUser[]) || []);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMeId(data.user?.id || null));
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { data, error } = await supabase.functions.invoke("admin-create-user", { body: parsed.data });
    setSaving(false);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error || error?.message || "Erro");
      return;
    }
    toast.success("Admin criado!");
    setForm({ full_name: "", email: "", password: "" });
    fetchUsers();
  };

  const handleDelete = async (u: AdminUser) => {
    if (!window.confirm(`Remover admin ${u.email}?`)) return;
    const { data, error } = await supabase.functions.invoke("admin-delete-user", { body: { user_id: u.id } });
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error || error?.message || "Erro");
      return;
    }
    toast.success("Removido");
    fetchUsers();
  };

  return (
    <div>
      <div className="container max-w-3xl mx-auto p-6 space-y-6">
        <form onSubmit={handleCreate} className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-lg">Novo administrador</h2>
          <div>
            <Label>Nome completo</Label>
            <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="João Silva" />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@empresa.com" />
          </div>
          <div>
            <Label>Senha (mín. 8 caracteres)</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </div>
          <Button type="submit" disabled={saving} className="bg-cta hover:bg-cta-hover text-white">
            <Plus className="w-4 h-4 mr-1" /> {saving ? "Criando..." : "Criar admin"}
          </Button>
        </form>

        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-lg mb-4">Administradores atuais ({users.length})</h2>
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
                <div>
                  <p className="font-semibold text-foreground">{u.full_name || "(sem nome)"}</p>
                  <p className="text-sm text-muted-foreground">{u.email} {u.id === meId && <span className="text-xs ml-1 bg-accent px-2 py-0.5 rounded">você</span>}</p>
                </div>
                <Button variant="outline" size="sm" disabled={u.id === meId} onClick={() => handleDelete(u)} className="text-destructive border-destructive/30 hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}