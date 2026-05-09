import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import IconPicker from "./IconPicker";
import RichTextEditor from "./RichTextEditor";
import ImageField from "./ImageField";
import RepeaterField from "./RepeaterField";
import type { SectionSchema, FieldDef } from "@/lib/site-content-schema";

interface Props {
  schema: SectionSchema;
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

function FieldRenderer({ def, value, onChange }: { def: FieldDef; value: any; onChange: (v: any) => void }) {
  const v = value ?? "";
  switch (def.type) {
    case "icon": return <IconPicker value={v} onChange={onChange} />;
    case "richtext": return <RichTextEditor value={v} onChange={onChange} placeholder={def.placeholder} />;
    case "textarea": return <Textarea value={v} onChange={(e) => onChange(e.target.value)} placeholder={def.placeholder} rows={3} />;
    case "image": return <ImageField value={v} onChange={onChange} />;
    default: return <Input value={v} onChange={(e) => onChange(e.target.value)} placeholder={def.placeholder} />;
  }
}

export default function SectionForm({ schema, data, onChange }: Props) {
  const set = (key: string, val: any) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-5">
      {schema.fields.map((field) => {
        if ((field as any).type === "repeater") {
          const r = field as any;
          return (
            <RepeaterField key={r.key} def={r} value={data[r.key] || []} onChange={(v) => set(r.key, v)} />
          );
        }
        const f = field as FieldDef;
        return (
          <div key={f.key}>
            <Label className="text-sm font-semibold text-foreground">{f.label}</Label>
            {f.help && <p className="text-xs text-muted-foreground mb-1">{f.help}</p>}
            <FieldRenderer def={f} value={data[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        );
      })}
    </div>
  );
}