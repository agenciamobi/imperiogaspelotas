import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export default function StatCard({ label, value, hint, icon }: {
  label: string; value: ReactNode; hint?: string; icon?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold mt-2 text-foreground">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </Card>
  );
}