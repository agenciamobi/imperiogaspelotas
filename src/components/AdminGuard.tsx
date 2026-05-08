import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async (uid: string | undefined) => {
      if (!uid) { setIsAdmin(false); return; }
      const { data } = await supabase.from("user_roles").select("id").eq("user_id", uid).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/admin/login");
      else setTimeout(() => checkRole(session.user.id), 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/admin/login");
      else checkRole(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!session) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-6">
        <div className="text-center space-y-3">
          <p className="text-foreground font-semibold">Acesso restrito a administradores.</p>
          <button onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }} className="text-sm underline text-muted-foreground">Sair</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
