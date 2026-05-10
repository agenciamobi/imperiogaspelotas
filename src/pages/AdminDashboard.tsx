import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Users as UsersIcon, MousePointerClick, Clock, Gauge } from "lucide-react";
import StatCard from "@/components/admin/analytics/StatCard";
import TrafficChart from "@/components/admin/analytics/TrafficChart";
import TopPagesTable from "@/components/admin/analytics/TopPagesTable";
import { useTrafficSummary, useAllPagespeed, type Period } from "@/hooks/useAnalytics";

const PERIODS: { v: Period; label: string }[] = [
  { v: "today", label: "Hoje" },
  { v: "yesterday", label: "Ontem" },
  { v: "7d", label: "7 dias" },
  { v: "30d", label: "30 dias" },
];

function fmtMs(ms: number) {
  if (!ms) return "0s";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms/1000).toFixed(1)}s`;
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("7d");
  const { data: summary, isLoading } = useTrafficSummary(period);
  const { data: psi } = useAllPagespeed();

  const avgSeo = (() => {
    const arr = (psi || []).map((p: any) => p.seo).filter((n: any) => n != null);
    if (!arr.length) return null;
    return Math.round(arr.reduce((a: number, b: number) => a + b, 0) / arr.length);
  })();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-muted-foreground text-sm">Tráfego do site e performance SEO</p>
        </div>
        <div className="flex gap-1 bg-card p-1 rounded-md border border-border">
          {PERIODS.map(p => (
            <Button key={p.v} size="sm" variant={period === p.v ? "default" : "ghost"} onClick={() => setPeriod(p.v)}>
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Pageviews" value={isLoading ? "—" : summary?.pageviews ?? 0} icon={<Eye className="w-4 h-4 text-muted-foreground" />} />
        <StatCard label="Visitantes únicos" value={isLoading ? "—" : summary?.unique_visitors ?? 0} icon={<UsersIcon className="w-4 h-4 text-muted-foreground" />} />
        <StatCard label="Sessões" value={isLoading ? "—" : summary?.unique_sessions ?? 0} icon={<MousePointerClick className="w-4 h-4 text-muted-foreground" />} />
        <StatCard label="Bounce rate" value={isLoading ? "—" : `${summary?.bounce_rate ?? 0}%`} icon={<MousePointerClick className="w-4 h-4 text-muted-foreground" />} />
        <StatCard label="Tempo médio" value={isLoading ? "—" : fmtMs(Number(summary?.avg_duration_ms ?? 0))} icon={<Clock className="w-4 h-4 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><TrafficChart period={period} /></div>
        <StatCard
          label="SEO médio (PSI)"
          value={avgSeo != null ? avgSeo : "—"}
          hint={avgSeo != null ? (avgSeo >= 90 ? "Excelente" : avgSeo >= 50 ? "Pode melhorar" : "Crítico") : "Rode PSI nas páginas"}
          icon={<Gauge className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      <TopPagesTable period={period} />
    </div>
  );
}