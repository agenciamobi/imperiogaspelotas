import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useTimeseries, type Period } from "@/hooks/useAnalytics";

export default function TrafficChart({ period }: { period: Period }) {
  const { data, isLoading } = useTimeseries(period);
  const rows = (data || []).map((d: any) => ({
    day: new Date(d.day).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    pageviews: Number(d.pageviews),
    visitors: Number(d.unique_visitors),
  }));
  return (
    <Card className="p-4">
      <div className="mb-3">
        <h3 className="font-bold text-foreground">Evolução de visitas</h3>
        <p className="text-xs text-muted-foreground">Pageviews e visitantes únicos no período</p>
      </div>
      <div className="h-72">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">Carregando...</div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pageviews" name="Pageviews" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="visitors" name="Visitantes únicos" stroke="hsl(var(--cta))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}