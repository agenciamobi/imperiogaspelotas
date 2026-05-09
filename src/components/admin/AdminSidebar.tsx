import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Files, Search, BarChart3, Users, LogOut, ExternalLink, Flame,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const groups = [
  {
    label: "Visão geral",
    items: [{ title: "Dashboard", url: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Conteúdo",
    items: [
      { title: "Conteúdo do Site", url: "/admin/site-content", icon: FileText },
      { title: "Landing Pages", url: "/admin/landing", icon: Files },
    ],
  },
  {
    label: "Marketing",
    items: [
      { title: "SEO & Meta Tags", url: "/admin/seo", icon: Search },
      { title: "Rastreamento", url: "/admin/tracking", icon: BarChart3 },
    ],
  },
  {
    label: "Acesso",
    items: [{ title: "Administradores", url: "/admin/users", icon: Users }],
  },
];

export default function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (url: string) =>
    url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0">
            <Flame className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-bold">Império Gás</p>
              <p className="text-xs text-muted-foreground">Painel admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            {!collapsed && <SidebarGroupLabel>{g.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <NavLink to={item.url} end={item.url === "/admin"}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ver site">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Ver site</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Sair">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}