import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

interface IntegrationsRow {
  id: string;
  google_ads_id: string | null;
  google_ads_conv_label_whatsapp: string | null;
  google_ads_conv_label_phone: string | null;
  ga4_measurement_id: string | null;
  gtm_id: string | null;
  meta_pixel_id: string | null;
  google_site_verification: string | null;
  bing_site_verification: string | null;
  custom_head_html: string | null;
  custom_body_html: string | null;
  enabled: boolean;
  seo_default_title: string | null;
  seo_default_description: string | null;
  seo_default_keywords: string | null;
  seo_og_image_url: string | null;
  seo_canonical_base: string | null;
  seo_robots: string | null;
}

const PATTERNS = {
  ads: /^AW-\d+$/,
  ga4: /^G-[A-Z0-9]+$/,
  gtm: /^GTM-[A-Z0-9]+$/,
  pixel: /^\d{6,}$/,
};

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${ok ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
      {ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {label}
    </span>
  );
}

interface AdminIntegrationsProps { only?: "seo" | "tracking" | "all"; }

export default function AdminIntegrations({ only = "all" }: AdminIntegrationsProps) {
  const [row, setRow] = useState<IntegrationsRow | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_integrations")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(async ({ data }) => {
        if (data) {
          setRow(data as IntegrationsRow);
        } else {
          const { data: created } = await supabase
            .from("site_integrations")
            .insert({ enabled: true })
            .select()
            .single();
          if (created) setRow(created as IntegrationsRow);
        }
      });
  }, []);

  const update = <K extends keyof IntegrationsRow>(key: K, value: IntegrationsRow[K]) => {
    if (!row) return;
    setRow({ ...row, [key]: value });
  };

  const handleSave = async () => {
    if (!row) return;
    setSaving(true);
    const { id, ...updateData } = row;
    const { error } = await supabase.from("site_integrations").update(updateData).eq("id", id);
    if (error) {
      toast.error("Erro ao salvar: " + error.message);
    } else {
      toast.success("Integrações salvas! Recarregue o site para aplicar.");
    }
    setSaving(false);
  };

  if (!row) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  const isValid = (val: string | null, pattern: RegExp) => !!val && pattern.test(val);

  const showSeo = only === "all" || only === "seo";
  const showTracking = only === "all" || only === "tracking";

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {showTracking && (
        <div className="bg-card rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <Label className="text-base font-bold">Pixels ativos</Label>
            <p className="text-sm text-muted-foreground">Desligue para parar todo o rastreamento sem apagar os IDs.</p>
          </div>
          <Switch checked={row.enabled} onCheckedChange={(v) => update("enabled", v)} />
        </div>
        )}

        {showSeo && (<>
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <h2 className="font-bold text-foreground text-lg">SEO & Meta Tags</h2>
            <p className="text-sm text-muted-foreground">
              Sobrescreve as meta tags padrão do site. Páginas internas (produtos/bairros) mantêm seus próprios títulos.
            </p>
          </div>
          <div>
            <Label>Título padrão (≤ 60 caracteres)</Label>
            <Input
              value={row.seo_default_title || ""}
              onChange={(e) => update("seo_default_title", e.target.value || null)}
              maxLength={70}
              placeholder="Império Gás e Água – Disk Gás Pelotas RS"
            />
            <p className="text-xs text-muted-foreground mt-1">{(row.seo_default_title || "").length}/60</p>
          </div>
          <div>
            <Label>Descrição padrão (≤ 160 caracteres)</Label>
            <Textarea
              rows={3}
              value={row.seo_default_description || ""}
              onChange={(e) => update("seo_default_description", e.target.value || null)}
              maxLength={200}
              placeholder="Disk gás e água em Pelotas RS. Entrega em até 30 minutos. Peça pelo WhatsApp!"
            />
            <p className="text-xs text-muted-foreground mt-1">{(row.seo_default_description || "").length}/160</p>
          </div>
          <div>
            <Label>Palavras-chave (separadas por vírgula)</Label>
            <Textarea
              rows={2}
              value={row.seo_default_keywords || ""}
              onChange={(e) => update("seo_default_keywords", e.target.value || null)}
              placeholder="disk gás Pelotas, gás de cozinha, água mineral, botijão P13"
            />
          </div>
          <div>
            <Label>URL da imagem de compartilhamento (Open Graph)</Label>
            <Input
              value={row.seo_og_image_url || ""}
              onChange={(e) => update("seo_og_image_url", e.target.value.trim() || null)}
              placeholder="https://imperiogas.com.br/og-image.png (1200x630)"
            />
            <p className="text-xs text-muted-foreground mt-1">Recomendado: 1200×630px, PNG ou JPG ≤ 2MB.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>URL canônica base</Label>
              <Input
                value={row.seo_canonical_base || ""}
                onChange={(e) => update("seo_canonical_base", e.target.value.trim() || null)}
                placeholder="https://imperiogas.com.br"
              />
            </div>
            <div>
              <Label>Diretiva robots</Label>
              <Input
                value={row.seo_robots || ""}
                onChange={(e) => update("seo_robots", e.target.value || null)}
                placeholder="index, follow, max-image-preview:large"
              />
            </div>
          </div>
        </div>
        </>)}

        {showTracking && (<>
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">Google Ads</h2>
            <StatusBadge ok={isValid(row.google_ads_id, PATTERNS.ads)} label={isValid(row.google_ads_id, PATTERNS.ads) ? "Configurado" : "Não configurado"} />
          </div>
          <div>
            <Label>ID de conversão (formato AW-1234567890)</Label>
            <Input
              value={row.google_ads_id || ""}
              onChange={(e) => update("google_ads_id", e.target.value.trim() || null)}
              placeholder="AW-1234567890"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Label conversão WhatsApp</Label>
              <Input
                value={row.google_ads_conv_label_whatsapp || ""}
                onChange={(e) => update("google_ads_conv_label_whatsapp", e.target.value.trim() || null)}
                placeholder="AbCdEf-1234"
              />
            </div>
            <div>
              <Label>Label conversão Telefone</Label>
              <Input
                value={row.google_ads_conv_label_phone || ""}
                onChange={(e) => update("google_ads_conv_label_phone", e.target.value.trim() || null)}
                placeholder="XyZ-9876"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Encontre os labels em Google Ads → Ferramentas → Conversões → clique em uma ação → "Tag setup" → Use existing tag → bloco `send_to`.
          </p>
        </div>

        {/* GA4 */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">Google Analytics 4</h2>
            <StatusBadge ok={isValid(row.ga4_measurement_id, PATTERNS.ga4)} label={isValid(row.ga4_measurement_id, PATTERNS.ga4) ? "Configurado" : "Não configurado"} />
          </div>
          <div>
            <Label>Measurement ID (formato G-XXXXXXXXXX)</Label>
            <Input
              value={row.ga4_measurement_id || ""}
              onChange={(e) => update("ga4_measurement_id", e.target.value.trim() || null)}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </div>

        {/* GTM */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">Google Tag Manager</h2>
            <StatusBadge ok={isValid(row.gtm_id, PATTERNS.gtm)} label={isValid(row.gtm_id, PATTERNS.gtm) ? "Configurado" : "Não configurado"} />
          </div>
          <div>
            <Label>Container ID (formato GTM-XXXXXXX)</Label>
            <Input
              value={row.gtm_id || ""}
              onChange={(e) => update("gtm_id", e.target.value.trim() || null)}
              placeholder="GTM-XXXXXXX"
            />
          </div>
        </div>

        {/* Meta Pixel */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">Meta (Facebook) Pixel</h2>
            <StatusBadge ok={isValid(row.meta_pixel_id, PATTERNS.pixel)} label={isValid(row.meta_pixel_id, PATTERNS.pixel) ? "Configurado" : "Não configurado"} />
          </div>
          <div>
            <Label>Pixel ID (apenas números)</Label>
            <Input
              value={row.meta_pixel_id || ""}
              onChange={(e) => update("meta_pixel_id", e.target.value.trim() || null)}
              placeholder="1234567890123456"
            />
          </div>
        </div>

        {/* Verificação */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-foreground text-lg">Verificação de domínio</h2>
          <div>
            <Label>Google Search Console (token de verificação)</Label>
            <Input
              value={row.google_site_verification || ""}
              onChange={(e) => update("google_site_verification", e.target.value.trim() || null)}
              placeholder="abc123XYZ..."
            />
          </div>
          <div>
            <Label>Bing Webmaster (token msvalidate.01)</Label>
            <Input
              value={row.bing_site_verification || ""}
              onChange={(e) => update("bing_site_verification", e.target.value.trim() || null)}
              placeholder="ABCDEF1234..."
            />
          </div>
        </div>

        {/* Avançado */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-foreground text-lg">Avançado — HTML personalizado</h2>
          <p className="text-sm text-muted-foreground">
            Cole tags `&lt;script&gt;`, `&lt;meta&gt;` ou outras integrações que serão injetadas no site.
          </p>
          <div>
            <Label>HTML extra para `&lt;head&gt;`</Label>
            <Textarea
              rows={5}
              value={row.custom_head_html || ""}
              onChange={(e) => update("custom_head_html", e.target.value || null)}
              placeholder="<!-- Hotjar, Clarity, etc -->"
              className="font-mono text-xs"
            />
          </div>
          <div>
            <Label>HTML extra para `&lt;body&gt;`</Label>
            <Textarea
              rows={5}
              value={row.custom_body_html || ""}
              onChange={(e) => update("custom_body_html", e.target.value || null)}
              placeholder="<!-- chat widgets, etc -->"
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* Test links */}
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="font-bold text-foreground text-lg">Ferramentas de teste</h2>
          <div className="flex flex-wrap gap-2">
            <a href="https://tagassistant.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary underline">
              <ExternalLink className="w-3 h-3" /> Google Tag Assistant
            </a>
            <a href="https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary underline">
              <ExternalLink className="w-3 h-3" /> Meta Pixel Helper
            </a>
          </div>
        </div>
        </>)}

        <div className="text-center pb-12">
          <Button onClick={handleSave} disabled={saving} className="bg-cta hover:bg-cta-hover text-white px-12 py-6 text-lg">
            <Save className="w-5 h-5 mr-2" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
}