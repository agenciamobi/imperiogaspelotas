# Otimização para Tráfego Pago + Painel de Integrações

## Objetivo

1. Permitir que o usuário gerencie códigos de rastreamento (Google Ads, GA4, GTM, Meta Pixel, Site Verification) sem editar código.
2. Aumentar drasticamente o desempenho do site em campanhas pagas (LCP, eventos enhanced, conversões server-side compatíveis).
3. Corrigir inconsistências entre o painel admin e o front-end.

---

## Inconsistências Encontradas

1. **IDs de rastreamento hardcoded como `AW-XXXXXXXXXX`** em `index.html` (linhas 419–425, 453) e `src/lib/tracking.ts` (linhas 11–13). Sem o ID real, **nenhuma conversão é registrada no Google Ads** — campanhas vão otimizar às cegas.
2. **`<noscript>` do pixel está em `<head>`** (linha 452 do `index.html`) — viola o HTML5 e infla o head. Já está no `<body>` na verdade (linha 451), mas o comentário e estrutura precisam ser revisados (na verdade está fora do head, ok — confirmar).
3. **Telefones hardcoded em vez de `WHATSAPP_NUMBER`/`PHONE_DISPLAY`**:
   - `src/components/MobileBar.tsx:21` → `tel:+5553991162002`
   - `src/components/ConversionHero.tsx:92` → `tel:+5553991162002`
   - `src/pages/BairroPage.tsx:97` e `PageTemplate.tsx:102` → mesmo padrão
   - Se o número mudar nas constants, esses pontos não atualizam.
4. **`google-site-verification` com placeholder** `COLE_SEU_CODIGO_AQUI` (linha 428) — ocupa lugar e pode atrapalhar verificação real.
5. **`msvalidate.01` (Bing) com `content=""`** (linha 13) — tag inútil.
6. **Sem `Header.tsx` na rota `/lp/:slug`** ✅ (correto, é landing dedicada). Mas o **título da aba** muda só quando carrega o page; se a fetch falhar, o título permanece o do `index.html` (genérico). Aceitável.
7. **`AdminLanding.tsx` `handleDuplicate` não copia métricas** (correto), mas a comparação A/B mostra páginas inativas misturadas — útil filtrar por `is_active`.
8. **Sem favicon/`apple-touch-icon`** declarado no `index.html` — Quality Score do Google Ads valoriza experiência completa.
9. **`tracking.ts` dispara `trackGoogleAdsConversion` mesmo sem ID configurado** — gera erros silenciosos. Precisa checar se ID começa com `AW-` válido.
10. **LandingPromo dispara `gtag` E grava em `lp_events`** — duplicidade aceitável (analytics próprio + Google), mas precisa garantir que o `gtag.js` carregue ANTES do clique para não perder eventos no first-paint.

---

## Mudanças

### 1. Tabela `site_integrations` (singleton de configuração)

Migração SQL nova:

```sql
CREATE TABLE public.site_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_ads_id text,                  -- ex: AW-1234567890
  google_ads_conv_label_whatsapp text, -- ex: AbC-De_f12
  google_ads_conv_label_phone text,
  ga4_measurement_id text,             -- ex: G-XXXXXXXXXX
  gtm_id text,                         -- ex: GTM-XXXXXXX
  meta_pixel_id text,                  -- ex: 1234567890
  google_site_verification text,
  bing_site_verification text,
  custom_head_html text,               -- escape hatch
  custom_body_html text,               -- escape hatch
  enabled boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_integrations ENABLE ROW LEVEL SECURITY;

-- Leitura pública (necessário para o site carregar pixels para visitantes anônimos)
CREATE POLICY "Public read integrations" ON public.site_integrations
  FOR SELECT TO public USING (true);

-- Apenas autenticados gravam
CREATE POLICY "Auth insert integrations" ON public.site_integrations
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update integrations" ON public.site_integrations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER set_integrations_updated_at
  BEFORE UPDATE ON public.site_integrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed: linha única para edição
INSERT INTO public.site_integrations (enabled) VALUES (true);
```

Trigger para também adicionar `updated_at` automático em `landing_pages` (estava faltando segundo memória anterior — verificar e adicionar se ausente).

### 2. Componente `<TrackingScripts />` (carregamento dinâmico)

**Novo arquivo**: `src/components/TrackingScripts.tsx`

- Hook que busca `site_integrations` (cache via React Query, `staleTime: 5min`).
- Injeta dinamicamente no `<head>` via `useEffect` + `document.createElement('script')`:
  - `gtag.js` se `google_ads_id` válido (`/^AW-\d+$/`).
  - GA4 (`G-...`) se preenchido — pode coexistir com Google Ads no mesmo `gtag.js`.
  - GTM container se `gtm_id`.
  - Meta Pixel (fbq) se `meta_pixel_id`.
- Adiciona `<meta name="google-site-verification">` e `<meta name="msvalidate.01">` quando configurados.
- Injeta `custom_head_html` (cuidado: só admin pode definir — é confiável).
- Renderiza `<noscript>` fallback de Meta Pixel no body.

Inserir `<TrackingScripts />` no topo de `<App />` (acima de `<BrowserRouter>`).

### 3. Refatorar `src/lib/tracking.ts`

- Remover constantes hardcoded `GOOGLE_ADS_ID`, `CONVERSION_LABEL_*`.
- Criar singleton em memória (`window.__imperio_integrations`) populado pelo `<TrackingScripts />`.
- `trackGoogleAdsConversion` lê do singleton e só dispara se houver ID válido.
- Adicionar `trackMetaPixelEvent(eventName, params)` para disparar `fbq('track', ...)` em paralelo.
- Adicionar evento padronizado **`generate_lead`** (recomendado pelo Google Ads para Smart Bidding) em todos os CTAs.
- Adicionar `gclid` e `wbraid`/`gbraid` à captura UTM (já tem gclid — adicionar os outros).

### 4. Limpar `index.html`

- Remover blocos hardcoded de `gtag.js` (linhas 417–425), `google-site-verification` placeholder (428), `msvalidate.01` vazio (13), `<noscript>` AW-XXX (452–454).
- Adicionar `<link rel="icon">` e `<link rel="apple-touch-icon">` (usando `/og-image.png` ou placeholder).
- Adicionar `<link rel="preconnect">` para `https://www.googletagmanager.com` e `https://connect.facebook.net` (latência menor quando scripts forem injetados).

### 5. Performance / Quality Score

- **Preload da fonte** crítica (Plus Jakarta Sans 700) com `<link rel="preload" as="font" crossorigin>`.
- **`fetchpriority="high"`** na `hero_image_url` do `LandingPromo` quando existir.
- **Lazy-load** das seções abaixo da dobra (testimonials) já existe via `whileInView` — manter.
- Adicionar `loading="eager"` + `decoding="async"` na imagem do hero.
- **Meta tag `theme-color`** dinâmica refletindo `bg_color` da landing → melhora LCP visual no mobile Chrome.

### 6. Nova página admin: `/admin/integrations`

**Novo arquivo**: `src/pages/AdminIntegrations.tsx` (protegido por `<AdminGuard>`).

Seções do formulário:

| Seção | Campos |
|---|---|
| Google Ads | ID (AW-...), Label conversão WhatsApp, Label conversão Telefone |
| Google Analytics 4 | Measurement ID (G-...) |
| Google Tag Manager | Container ID (GTM-...) |
| Meta (Facebook) Pixel | Pixel ID |
| Verificação de domínio | Google site verification, Bing site verification |
| Avançado | `custom_head_html` (textarea), `custom_body_html` (textarea), Switch "Ativar todos os pixels" |

- Botão "Salvar" → `update` na linha singleton.
- Botão "Testar" → abre `https://tagassistant.google.com/` em nova aba e copia URL atual.
- Validação cliente: regex para cada formato (`AW-\d+`, `G-[A-Z0-9]+`, `GTM-[A-Z0-9]+`).
- Indicador "Configurado" / "Não configurado" por bloco.

Adicionar link "Integrações" no top bar do `AdminLanding.tsx`.

### 7. Rota e proteção

`src/App.tsx`:
```tsx
<Route path="/admin/integrations" element={<AdminGuard><AdminIntegrations /></AdminGuard>} />
```

E inserir `<TrackingScripts />` antes do `<BrowserRouter>`:
```tsx
<TooltipProvider>
  <Toaster />
  <Sonner />
  <TrackingScripts />
  <BrowserRouter>...
```

### 8. Corrigir inconsistências de telefone

Substituir nos 4 arquivos abaixo o literal `tel:+5553991162002` por `` `tel:+55${WHATSAPP_NUMBER}` `` importado de `@/lib/constants`:
- `src/components/MobileBar.tsx`
- `src/components/ConversionHero.tsx`
- `src/pages/BairroPage.tsx`
- `src/pages/PageTemplate.tsx`

### 9. Filtro "apenas ativas" na tabela A/B

`AdminLanding.tsx`: adicionar toggle "Mostrar inativas" na seção de comparação A/B (default: oculto).

---

## Arquivos

| Arquivo | Ação |
|---|---|
| Migração SQL nova | Criar `site_integrations` + RLS + trigger + seed; adicionar trigger `updated_at` em `landing_pages` se faltar |
| `src/components/TrackingScripts.tsx` | **Novo** — injeta gtag/GTM/Pixel dinamicamente |
| `src/pages/AdminIntegrations.tsx` | **Novo** — formulário de gestão |
| `src/lib/tracking.ts` | Remover hardcode; ler do singleton; adicionar `trackMetaPixelEvent`, `generate_lead` |
| `src/App.tsx` | Adicionar rota `/admin/integrations` + `<TrackingScripts />` |
| `index.html` | Remover blocos hardcoded; adicionar favicon, preconnects, preload de fonte |
| `src/pages/AdminLanding.tsx` | Link "Integrações" no top bar; toggle "mostrar inativas" |
| `src/pages/LandingPromo.tsx` | `fetchpriority="high"` + `loading="eager"` no hero img; `theme-color` dinâmico |
| `src/components/MobileBar.tsx`, `ConversionHero.tsx`, `pages/BairroPage.tsx`, `pages/PageTemplate.tsx` | Trocar telefone hardcoded por constante |

---

## Como ativar (após implementar)

1. Acessar `/admin/integrations`.
2. Colar o ID do Google Ads (`AW-...`) e os labels de conversão.
3. (Opcional) GA4, GTM, Meta Pixel, site verification.
4. Salvar — todos os pixels passam a carregar automaticamente em todo o site, sem precisar mexer em código nem republicar.
