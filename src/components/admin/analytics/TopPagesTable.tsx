import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Smartphone, Monitor } from "lucide-react";
import { useTopPages, useAllPagespeed, runPagespeed, type Period } from "@/hooks/useAnalytics";
import PsiScoreBadge from "./PsiScoreBadge";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function fmtMs(ms: number) {
  if (!ms) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms/1000).toFixed(1)}s`;
}

export default function TopPagesTable({ period }: { period: Period }) {
  const { data: top, isLoading } = useTopPages(period);
  const { data: psi } = useAllPagespeed();
  const [strategy, setStrategy] = useState<"mobile"|"desktop">("mobile");
  const [running, setRunning] = useState<string | null>(null);
  const qc = useQueryClient();

  const origin = window.location.origin;
  const psiByUrl = new Map<string, any>();
  (psi || []).forEach((p: any) => psiByUrl.set(`${p.url}|${p.strategy}`, p));

  async function refresh(path: string) {
    const url = `${origin}${path}`;
    const key = `${url}|${strategy}`;
    setRunning(key);
    try {
      await runPagespeed(url, strategy, true);
      await qc.invalidateQueries({ queryKey: ["pagespeed-all"] });
      toast.success("PageSpeed atualizado");
    } catch (e: any) {
      toast.error("Falha PSI", { description: e.message });
    } finally { setRunning(null); }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-foreground">Páginas mais visitadas</h3>
          <p className="text-xs text-muted-foreground">Top 20 com PageSpeed Insights ({strategy})</p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant={strategy === "mobile" ? "default" : "outline"} onClick={() => setStrategy("mobile")}>
            <Smartphone className="w-4 h-4 mr-1" /> Mobile
          </Button>
          <Button size="sm" variant={strategy === "desktop" ? "default" : "outline"} onClick={() => setStrategy("desktop")}>
            <Monitor className="w-4 h-4 mr-1" /> Desktop
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Página</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Únicos</TableHead>
              <TableHead className="text-right">Tempo médio</TableHead>
              <TableHead className="text-center">Perf.</TableHead>
              <TableHead className="text-center">SEO</TableHead>
              <TableHead className="text-center">A11y</TableHead>
              <TableHead className="text-center">BP</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Carregando...</TableCell></TableRow>
            ) : (top || []).length === 0 ? (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Sem dados ainda</TableCell></TableRow>
            ) : (top || []).map((row: any) => {
              const url = `${origin}${row.path}`;
              const p = psiByUrl.get(`${url}|${strategy}`);
              const key = `${url}|${strategy}`;
              return (
                <TableRow key={row.path}>
                  <TableCell className="font-mono text-xs max-w-xs truncate">{row.path}</TableCell>
                  <TableCell className="text-right">{row.pageviews}</TableCell>
                  <TableCell className="text-right">{row.unique_visitors}</TableCell>
                  <TableCell className="text-right">{fmtMs(Number(row.avg_duration_ms))}</TableCell>
                  <TableCell className="text-center"><PsiScoreBadge score={p?.performance} /></TableCell>
                  <TableCell className="text-center"><PsiScoreBadge score={p?.seo} /></TableCell>
                  <TableCell className="text-center"><PsiScoreBadge score={p?.accessibility} /></TableCell>
                  <TableCell className="text-center"><PsiScoreBadge score={p?.best_practices} /></TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" disabled={running === key} onClick={() => refresh(row.path)}>
                      <RefreshCw className={`w-4 h-4 ${running === key ? "animate-spin" : ""}`} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}