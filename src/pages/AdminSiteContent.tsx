import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save, RotateCcw, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SITE_CONTENT_DEFAULTS } from "@/lib/site-content-defaults";
import { invalidateSiteContent } from "@/hooks/useSiteContent";

const SECTIONS: { key: string; label: string; help: string }[] = [
  { key: "global", label: "Global (telefones, horário)", help: "Dados globais reutilizados em todo o site." },
  { key: "hero", label: "Hero (1ª dobra)", help: "Título, subtítulo, benefícios e CTAs do topo." },
  { key: "social_proof", label: "Prova Social", help: "Estatísticas, selos e depoimentos." },
  { key: "products", label: "Produtos (texto)", help: "Título e descrição da seção de produtos." },
  { key: "differentials", label: "Vantagens", help: "Cartões de diferenciais. Ícones: Lucide names." },
  { key: "how_it_works", label: "Como Funciona", help: "Passos do fluxo de pedido." },
  { key: "faq", label: "FAQ", help: "Perguntas frequentes (q/a)." },
  { key: "contact", label: "Contato (CTA final)", help: "Bloco de chamada final." },
  { key: "footer", label: "Footer", help: "Tagline e copyright." },
];

const ICON_HINT = "Ícones disponíveis: Zap, Shield, Clock, Clock3, CheckCircle2, BadgeCheck, Star, HandCoins, ShieldCheck, RefreshCcw, PackageCheck, MessageCircle, MapPin, ShoppingCart, Truck, Phone";

export default function AdminSiteContent() {
  const [section, setSection] = useState<string>("hero");
  const [data, setData] = useState<Record<string, any>>({});
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const fetchAll = async () => {
    const { data: rows } = await supabase.from("site_content").select("section, data");
    const map: Record<string, any> = {};
    (rows || []).forEach((r: any) => { map[r.section] = r.data; });
    setData(map);
  };

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => {
    const cur = data[section] ?? SITE_CONTENT_DEFAULTS[section] ?? {};
    setText(JSON.stringify(cur, null, 2));
  }, [section, data]);

  const handleSave = async () => {
    let parsed: any;
    try { parsed = JSON.parse(text); }
    catch (e: any) { toast.error("JSON inválido: " + e.message); return; }
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ section, data: parsed }, { onConflict: "section" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Conteúdo salvo!");
    invalidateSiteContent();
    fetchAll();
  };

  const handleReset = () => {
    if (!window.confirm("Restaurar valores padrão desta seção? Você ainda precisa Salvar para aplicar.")) return;
    setText(JSON.stringify(SITE_CONTENT_DEFAULTS[section] || {}, null, 2));
  };

  const sectionInfo = useMemo(() => SECTIONS.find((s) => s.key === section)!, [section]);

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> Admin — Conteúdo do Site</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")} className="text-foreground">
            <ExternalLink className="w-4 h-4 mr-1" /> Pré-visualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/landing")} className="text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-72 bg-card border-r border-border p-4 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Seções</p>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                section === s.key ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 max-w-4xl mx-auto space-y-4">
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h2 className="font-bold text-lg text-foreground">{sectionInfo.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">{sectionInfo.help}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">{ICON_HINT}</p>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="font-mono text-sm min-h-[500px]"
              spellCheck={false}
            />

            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white">
                <Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" /> Restaurar padrão
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}