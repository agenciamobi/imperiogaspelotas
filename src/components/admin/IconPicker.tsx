import { useState } from "react";
import { ICONS, Icon } from "@/lib/icon-map";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface Props {
  value?: string;
  onChange: (name: string) => void;
}

export default function IconPicker({ value, onChange }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const names = Object.keys(ICONS).filter((n) => n.toLowerCase().includes(q.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <Icon name={value} className="w-4 h-4" />
            <span className="text-sm">{value || "Selecione um ícone"}</span>
          </span>
          <ChevronDown className="w-4 h-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ícone..." className="mb-2 h-8" />
        <div className="grid grid-cols-6 gap-1 max-h-56 overflow-y-auto">
          {names.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => { onChange(n); setOpen(false); }}
              title={n}
              className={`flex items-center justify-center h-9 w-9 rounded hover:bg-accent ${value === n ? "bg-primary text-primary-foreground" : ""}`}
            >
              <Icon name={n} className="w-4 h-4" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}