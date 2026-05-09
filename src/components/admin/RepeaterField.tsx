import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import IconPicker from "./IconPicker";
import RichTextEditor from "./RichTextEditor";
import ImageField from "./ImageField";
import type { FieldDef, RepeaterDef } from "@/lib/site-content-schema";

interface Props {
  def: RepeaterDef;
  value: any[];
  onChange: (val: any[]) => void;
}

function FieldInput({ def, value, onChange }: { def: FieldDef; value: any; onChange: (v: any) => void }) {
  const v = value ?? "";
  switch (def.type) {
    case "icon":
      return <IconPicker value={v} onChange={onChange} />;
    case "richtext":
      return <RichTextEditor value={v} onChange={onChange} placeholder={def.placeholder} />;
    case "textarea":
      return <Textarea value={v} onChange={(e) => onChange(e.target.value)} placeholder={def.placeholder} rows={3} />;
    case "image":
      return <ImageField value={v} onChange={onChange} />;
    case "url":
    case "text":
    default:
      return <Input value={v} onChange={(e) => onChange(e.target.value)} placeholder={def.placeholder} />;
  }
}

export default function RepeaterField({ def, value, onChange }: Props) {
  const items = Array.isArray(value) ? value : [];

  const update = (idx: number, key: string, v: any) => {
    const next = items.slice();
    next[idx] = { ...next[idx], [key]: v };
    onChange(next);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  const add = () => {
    const blank: any = {};
    def.fields.forEach((f) => (blank[f.key] = ""));
    onChange([...items, blank]);
  };

  const remove = (idx: number) => {
    if (!window.confirm("Remover este item?")) return;
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{def.label}</Label>
        <Button type="button" size="sm" variant="outline" onClick={add}>
          <Plus className="w-4 h-4 mr-1" /> Adicionar {def.itemLabel}
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground italic">Nenhum item. Clique em "Adicionar" acima.</p>
      )}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-border rounded-lg bg-muted/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">{def.itemLabel} {idx + 1}</span>
              <div className="flex items-center gap-1">
                <Button type="button" size="sm" variant="ghost" onClick={() => move(idx, -1)} disabled={idx === 0} className="h-7 w-7 p-0">
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="h-7 w-7 p-0">
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => remove(idx)} className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {def.fields.map((f) => (
              <div key={f.key}>
                <Label className="text-xs">{f.label}</Label>
                <FieldInput def={f} value={item[f.key]} onChange={(v) => update(idx, f.key, v)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}