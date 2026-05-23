import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUtmBreakdown, type Period } from "@/hooks/useAnalytics";

function fmtMs(ms: number) {
  if (!ms) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function UtmBreakdownTable({ period }: { period: Period }) {
  const { data, isLoading } = useUtmBreakdown(period);
  const rows = data || [];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-foreground">Tráfego por campanha (UTM)</h3>
          <p className="text-xs text-muted-foreground">
            Breakdown por origem, mídia e campanha — top 50 do período
          </p>
        </div>
        <Badge variant="secondary">{rows.length} combinações</Badge>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Mídia</TableHead>
              <TableHead>Campanha</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Únicos</TableHead>
              <TableHead className="text-right">Sessões</TableHead>
              <TableHead className="text-right">Bounce</TableHead>
              <TableHead className="text-right">Tempo médio</TableHead>
              <TableHead className="text-right">% do total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  Sem UTMs no período
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r, i) => (
                <TableRow key={`${r.utm_source}|${r.utm_medium}|${r.utm_campaign}|${i}`}>
                  <TableCell className="text-xs font-medium">{r.utm_source}</TableCell>
                  <TableCell className="text-xs">{r.utm_medium}</TableCell>
                  <TableCell className="text-xs">{r.utm_campaign}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.pageviews}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.unique_visitors}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.unique_sessions}</TableCell>
                  <TableCell className="text-right tabular-nums">{Number(r.bounce_rate)}%</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtMs(Number(r.avg_duration_ms))}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">
                    {Number(r.share_pct)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}