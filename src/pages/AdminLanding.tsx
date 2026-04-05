import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Save, Trash2, ExternalLink, Upload } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type LandingPage = Tables<"landing_pages">;

export default function AdminLanding() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [selected, setSelected] = useState<LandingPage | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchPages = async () => {
    const { data } = await supabase.from("landing_pages").select("*").order("created_at", { ascending: false });
    if (data) {
      setPages(data);
      if (!selected && data.length > 0) setSelected(data[0]);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const { id, created_at, updated_at, ...updateData } = selected;
    const { error } = await supabase.from("landing_pages").update(updateData).eq("id", id);
    if (error) {
      toast.error("Erro ao salvar: " + error.message);
    } else {
      toast.success("Landing page salva com sucesso!");
      fetchPages();
    }
    setSaving(false);
  };

  const handleCreate = async () => {
    const slug = `promo-${Date.now()}`;
    const { data, error } = await supabase.from("landing_pages").insert({ slug }).select().single();
    if (error) {
      toast.error("Erro ao criar: " + error.message);
    } else if (data) {
      toast.success("Nova landing page criada!");
      setPages((prev) => [data, ...prev]);
      setSelected(data);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${selected.slug}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("landing-images").upload(path, file);
    if (error) {
      toast.error("Erro no upload: " + error.message);
      setUploading(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("landing-images").getPublicUrl(path);
    setSelected({ ...selected, hero_image_url: publicUrl.publicUrl });
    setUploading(false);
    toast.success("Imagem enviada!");
  };

  const updateField = (field: keyof LandingPage, value: string | boolean | null) => {
    if (!selected) return;
    setSelected({ ...selected, [field]: value } as LandingPage);
  };

  if (!selected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Nenhuma landing page encontrada</p>
          <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" /> Criar Landing Page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin — Landing Pages</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCreate} className="text-foreground">
            <Plus className="w-4 h-4 mr-1" /> Nova
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white">
            <Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Page list */}
        <div className="lg:w-64 bg-card border-r border-border p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Páginas</p>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selected.id === p.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <span className="font-medium">/{p.slug}</span>
              <span className={`ml-2 text-xs ${p.is_active ? "text-green-500" : "text-red-400"}`}>
                {p.is_active ? "ativa" : "inativa"}
              </span>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 p-6 max-w-4xl mx-auto space-y-8">
          {/* Status & Slug */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">Configurações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Slug (URL)</Label>
                <div className="flex gap-2 items-center">
                  <Input value={selected.slug} onChange={(e) => updateField("slug", e.target.value)} />
                  <a href={`/lp/${selected.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Label>Ativa</Label>
                <Switch checked={selected.is_active ?? true} onCheckedChange={(v) => updateField("is_active", v)} />
              </div>
            </div>
            <div>
              <Label>Cor de fundo (hex)</Label>
              <div className="flex gap-2 items-center">
                <Input value={selected.bg_color || ""} onChange={(e) => updateField("bg_color", e.target.value)} />
                <div className="w-10 h-10 rounded border" style={{ backgroundColor: selected.bg_color || "#1a5c38" }} />
              </div>
            </div>
          </div>

          {/* Hero */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">Hero</h2>
            <div>
              <Label>Badge</Label>
              <Input value={selected.hero_badge || ""} onChange={(e) => updateField("hero_badge", e.target.value)} />
            </div>
            <div>
              <Label>Título</Label>
              <Input value={selected.hero_title} onChange={(e) => updateField("hero_title", e.target.value)} />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea value={selected.hero_subtitle} onChange={(e) => updateField("hero_subtitle", e.target.value)} />
            </div>
            <div>
              <Label>Imagem de fundo</Label>
              <div className="flex gap-2 items-center">
                <Input value={selected.hero_image_url || ""} onChange={(e) => updateField("hero_image_url", e.target.value)} placeholder="URL da imagem ou faça upload" />
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                    <Upload className="w-4 h-4" /> {uploading ? "..." : "Upload"}
                  </div>
                </label>
              </div>
              {selected.hero_image_url && (
                <img src={selected.hero_image_url} alt="Preview" className="mt-2 h-24 rounded object-cover" />
              )}
            </div>
          </div>

          {/* Oferta */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">Oferta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título da oferta</Label>
                <Input value={selected.offer_title || ""} onChange={(e) => updateField("offer_title", e.target.value)} />
              </div>
              <div>
                <Label>Preço</Label>
                <Input value={selected.offer_price || ""} onChange={(e) => updateField("offer_price", e.target.value)} />
              </div>
              <div>
                <Label>Preço original (riscado)</Label>
                <Input value={selected.offer_original_price || ""} onChange={(e) => updateField("offer_original_price", e.target.value)} />
              </div>
              <div>
                <Label>Válido até (data/hora)</Label>
                <Input type="datetime-local" value={selected.offer_valid_until?.slice(0, 16) || ""} onChange={(e) => updateField("offer_valid_until", e.target.value ? new Date(e.target.value).toISOString() : null)} />
              </div>
            </div>
            <div>
              <Label>Descrição da oferta</Label>
              <Textarea value={selected.offer_description || ""} onChange={(e) => updateField("offer_description", e.target.value)} />
            </div>
            <div>
              <Label>Texto do botão CTA</Label>
              <Input value={selected.offer_cta_text || ""} onChange={(e) => updateField("offer_cta_text", e.target.value)} />
            </div>
            <div>
              <Label>Texto CTA telefone</Label>
              <Input value={selected.phone_cta_text || ""} onChange={(e) => updateField("phone_cta_text", e.target.value)} />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">WhatsApp</h2>
            <div>
              <Label>Mensagem pré-preenchida</Label>
              <Textarea value={selected.whatsapp_message || ""} onChange={(e) => updateField("whatsapp_message", e.target.value)} />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">SEO</h2>
            <div>
              <Label>Meta Title</Label>
              <Input value={selected.meta_title || ""} onChange={(e) => updateField("meta_title", e.target.value)} />
            </div>
            <div>
              <Label>Meta Description</Label>
              <Textarea value={selected.meta_description || ""} onChange={(e) => updateField("meta_description", e.target.value)} />
            </div>
          </div>

          {/* Testimonials (JSON) */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">Depoimentos (JSON)</h2>
            <Textarea
              rows={6}
              value={JSON.stringify(selected.testimonials, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setSelected({ ...selected, testimonials: parsed });
                } catch {
                  // invalid JSON, keep typing
                }
              }}
            />
            <p className="text-xs text-muted-foreground">{'Formato: [{"name": "Nome", "text": "Depoimento", "rating": 5}]'}</p>
          </div>

          {/* Trust Items (JSON) */}
          <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-foreground text-lg">Itens de Confiança (JSON)</h2>
            <Textarea
              rows={6}
              value={JSON.stringify(selected.trust_items, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setSelected({ ...selected, trust_items: parsed });
                } catch {
                  // invalid JSON
                }
              }}
            />
            <p className="text-xs text-muted-foreground">Ícones: truck, shield, clock, star</p>
          </div>

          {/* Save */}
          <div className="text-center pb-12">
            <Button onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white px-12 py-6 text-lg">
              <Save className="w-5 h-5 mr-2" /> {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
