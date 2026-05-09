import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, RotateCcw, ExternalLink, Code2, Eye } from "lucide-react";
import { SITE_CONTENT_DEFAULTS } from "@/lib/site-content-defaults";
import { invalidateSiteContent } from "@/hooks/useSiteContent";
import { SECTION_SCHEMAS, getSection } from "@/lib/site-content-schema";
import SectionForm from "@/components/admin/SectionForm";

export default function AdminSiteContent() {
  const [section, setSection] = useState<string>("hero");
  const [allData, setAllData] = useState<Record<string, any>>({});
  const [current, setCurrent] = useState<Record<string, any>>({});
  const [jsonText, setJsonText] = useState("");
  const [jsonMode, setJsonMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const schema = useMemo(() => getSection(section)!, [section]);

  const fetchAll = async () => {
    const { data: rows } = await supabase.from("site_content").select("section, data");
    const map: Record<string, any> = {};
    (rows || []).forEach((r: any) => { map[r.section] = r.data; });
    setAllData(map);
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    const cur = { ...(SITE_CONTENT_DEFAULTS[section] || {}), ...(allData[section] || {}) };
    setCurrent(cur);
    setJsonText(JSON.stringify(cur, null, 2));
  }, [section, allData]);

  const handleSave = async () => {
    let payload: any = current;
    if (jsonMode) {
      try { payload = JSON.parse(jsonText); }
      catch (e: any) { toast.error("JSON inválido: " + e.message); return; }
    }
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ section, data: payload }, { onConflict: "section" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Conteúdo salvo!");
    invalidateSiteContent();
    fetchAll();
  };

  const handleReset = () => {
    if (!window.confirm("Restaurar valores padrão desta seção? É preciso Salvar para aplicar.")) return;
    const def = SITE_CONTENT_DEFAULTS[section] || {};
    setCurrent(def);
    setJsonText(JSON.stringify(def, null, 2));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
      <aside className="lg:w-64 bg-card border-r border-border p-3 space-y-1 lg:sticky lg:top-14 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-2">Seções</p>
        {SECTION_SCHEMAS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              section === s.key ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-foreground">{schema.label}</h2>
                <p className="text-sm text-muted-foreground mt-1">{schema.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
                  <Eye className="w-4 h-4 mr-1" /> Pré-visualizar
                </Button>
                <Button variant={jsonMode ? "default" : "outline"} size="sm" onClick={() => setJsonMode(!jsonMode)}>
                  <Code2 className="w-4 h-4 mr-1" /> {jsonMode ? "Modo visual" : "JSON"}
                </Button>
              </div>
            </div>

            <div className="p-6">
              {jsonMode ? (
                <Textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="font-mono text-xs min-h-[500px]"
                  spellCheck={false}
                />
              ) : (
                <SectionForm schema={schema} data={current} onChange={setCurrent} />
              )}
            </div>
          </div>

          <div className="sticky bottom-0 mt-4 bg-card border border-border rounded-xl shadow-lg px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> Restaurar padrão
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white">
              <Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}