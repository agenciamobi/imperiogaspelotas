import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

const TITLES: Record<string, string> = {
  "/admin": "Analytics",
  "/admin/site-content": "Conteúdo do Site",
  "/admin/landing": "Landing Pages",
  "/admin/seo": "SEO & Meta Tags",
  "/admin/tracking": "Rastreamento & Pixels",
  "/admin/users": "Administradores",
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const title =
    TITLES[pathname] ||
    Object.entries(TITLES).find(([k]) => k !== "/admin" && pathname.startsWith(k))?.[1] ||
    "Admin";

  return (
    <AdminGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-muted">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center gap-3 border-b border-border bg-card px-4 sticky top-0 z-30">
              <SidebarTrigger />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">Painel</span>
                <h1 className="text-sm font-bold text-foreground">{title}</h1>
              </div>
            </header>
            <main className="flex-1 overflow-x-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminGuard>
  );
}