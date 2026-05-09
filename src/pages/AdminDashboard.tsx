import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileText, Files, Search, BarChart3, Users } from "lucide-react";

const cards = [
  { title: "Conteúdo do Site", desc: "Edite hero, FAQ, depoimentos e demais seções da home.", url: "/admin/site-content", icon: FileText },
  { title: "Landing Pages", desc: "Gerencie LPs de campanhas pagas e variações A/B.", url: "/admin/landing", icon: Files },
  { title: "SEO & Meta Tags", desc: "Título, descrição, Open Graph e canônicas.", url: "/admin/seo", icon: Search },
  { title: "Rastreamento", desc: "Google Ads, GA4, GTM, Meta Pixel e HTML extra.", url: "/admin/tracking", icon: BarChart3 },
  { title: "Administradores", desc: "Crie e remova usuários com acesso ao painel.", url: "/admin/users", icon: Users },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Bem-vindo ao painel</h2>
        <p className="text-muted-foreground text-sm">Escolha uma área para gerenciar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.url} to={c.url}>
            <Card className="p-5 hover:shadow-md hover:border-primary/40 transition-all h-full">
              <c.icon className="w-7 h-7 text-primary mb-3" />
              <h3 className="font-bold text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}