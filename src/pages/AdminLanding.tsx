import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Save, Trash2, ExternalLink, Upload, LogOut, Copy, BarChart3, MessageCircle, Phone, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type LandingPage = Tables<"landing_pages">;

interface PageMetrics {
  whatsapp_clicks: number;
  phone_clicks: number;
  total: number;
}

export default function AdminLanding() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [selected, setSelected] = useState<LandingPage | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [metrics, setMetrics] = useState<PageMetrics | null>(null);
  const [allMetrics, setAllMetrics] = useState<Record<string, PageMetrics>>({});
  const [metricsDays, setMetricsDays] = useState(30);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDuplicate = async () => {
    if (!selected) return;
    const { id, created_at, updated_at, slug, ...rest } = selected;
    const newSlug = `${slug}-v${Date.now().toString(36)}`;
    const { data, error } = await supabase.from("landing_pages").insert({ ...rest, slug: newSlug }).select().single();
    if (error) {
      toast.error("Erro ao duplicar: " + error.message);
    } else if (data) {
      toast.success(`Variação criada: /lp/${newSlug}`);
      setPages((prev) => [data, ...prev]);
      setSelected(data);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm(`Deletar a página /${selected.slug}? Esta ação não pode ser desfeita.`)) return;
    const { error } = await supabase.from("landing_pages").delete().eq("id", selected.id);
    if (error) {
      toast.error("Erro ao deletar: " + error.message);
    } else {
      toast.success("Página deletada!");
      const remaining = pages.filter((p) => p.id !== selected.id);
      setPages(remaining);
      setSelected(remaining[0] || null);
    }
  };

  const fetchPages = async () => {
    const { data } = await supabase.from("landing_pages").select("*").order("created_at", { ascending: false });
    if (data) {
      setPages(data);
      if (!selected && data.length > 0) setSelected(data[0]);
    }
  };

  const fetchMetrics = async (pageId: string, days: number) => {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const { data } = await supabase
      .from("lp_events")
      .select("event_type")
      .eq("landing_page_id", pageId)
      .gte("created_at", since);

    if (data) {
      const wa = data.filter((e) => e.event_type === "whatsapp_click").length;
      const ph = data.filter((e) => e.event_type === "phone_click").length;
      setMetrics({ whatsapp_clicks: wa, phone_clicks: ph, total: wa + ph });
    }
  };

  const fetchAllMetrics = async (days: number) => {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const { data } = await supabase
      .from("lp_events")
      .select("landing_page_id, event_type")
      .gte("created_at", since);

    if (data) {
      const map: Record<string, PageMetrics> = {};
      data.forEach((e) => {
        const id = e.landing_page_id;
        if (!map[id]) map[id] = { whatsapp_clicks: 0, phone_clicks: 0, total: 0 };
        if (e.event_type === "whatsapp_click") map[id].whatsapp_clicks++;
        else if (e.event_type === "phone_click") map[id].phone_clicks++;
        map[id].total++;
      });
      setAllMetrics(map);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selected) fetchMetrics(selected.id, metricsDays);
  }, [selected?.id, metricsDays]);

  useEffect(() => {
    if (showMetrics) fetchAllMetrics(metricsDays);
  }, [showMetrics, metricsDays]);

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
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-lg font-bold">Admin — Landing Pages</h1>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/integrations")} className="text-foreground">
            <Settings className="w-4 h-4 mr-1" /> Integrações
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowMetrics(!showMetrics)} className="text-foreground">
            <BarChart3 className="w-4 h-4 mr-1" /> {showMetrics ? "Editor" : "Métricas A/B"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCreate} className="text-foreground">
            <Plus className="w-4 h-4 mr-1" /> Nova
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicate} className="text-foreground" disabled={!selected}>
            <Copy className="w-4 h-4 mr-1" /> Duplicar (A/B)
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive border-destructive/30 hover:bg-destructive/10">
            <Trash2 className="w-4 h-4 mr-1" /> Deletar
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white">
            <Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-foreground">
            <LogOut className="w-4 h-4 mr-1" /> Sair
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
              {allMetrics[p.id] && (
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {allMetrics[p.id].total} cliques
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 max-w-4xl mx-auto space-y-8">
          {/* Metrics Cards */}
          {metrics && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 shadow-sm text-center">
                <MessageCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-2xl font-extrabold text-foreground">{metrics.whatsapp_clicks}</p>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm text-center">
                <Phone className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-extrabold text-foreground">{metrics.phone_clicks}</p>
                <p className="text-xs text-muted-foreground">Telefone</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm text-center">
                <BarChart3 className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-2xl font-extrabold text-foreground">{metrics.total}</p>
                <p className="text-xs text-muted-foreground">Total Conversões</p>
              </div>
            </div>
          )}

          {/* Period filter */}
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Período:</span>
            {[7, 30, 90].map((d) => (
              <Button
                key={d}
                variant={metricsDays === d ? "default" : "outline"}
                size="sm"
                onClick={() => setMetricsDays(d)}
              >
                {d}d
              </Button>
            ))}
          </div>

          {/* A/B Comparison Table */}
          {showMetrics && (
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-bold text-foreground text-lg">Comparação A/B — Últimos {metricsDays} dias</h2>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Switch checked={showInactive} onCheckedChange={setShowInactive} />
                  Mostrar inativas
                </label>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Página</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">WhatsApp</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Telefone</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Total</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.filter((p) => showInactive || p.is_active).map((p) => {
                      const m = allMetrics[p.id] || { whatsapp_clicks: 0, phone_clicks: 0, total: 0 };
                      return (
                        <tr key={p.id} className={`border-b border-border/50 ${selected.id === p.id ? "bg-accent" : ""}`}>
                          <td className="py-2 font-medium text-foreground">/{p.slug}</td>
                          <td className="py-2 text-center text-foreground">{m.whatsapp_clicks}</td>
                          <td className="py-2 text-center text-foreground">{m.phone_clicks}</td>
                          <td className="py-2 text-center font-bold text-foreground">{m.total}</td>
                          <td className="py-2 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {p.is_active ? "ativa" : "inativa"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Editor sections (same as before) */}
          {!showMetrics && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
