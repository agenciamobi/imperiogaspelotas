

# Preparar Site para Tráfego Pago no Google Ads

## Objetivo
Tornar o site pronto para receber tráfego pago do Google Ads com rastreamento de conversões, parâmetros UTM, eventos de conversão e otimizações de Quality Score.

## Mudanças

### 1. Google Ads Global Site Tag (gtag.js)
**Arquivo: `index.html`**
- Adicionar script `gtag.js` com placeholder para Google Ads ID (`AW-XXXXXXXXXX`)
- Configurar `gtag('config', 'AW-XXXXXXXXXX')` pronto para ativar
- Adicionar evento de conversão padrão `conversion` para cliques no WhatsApp e telefone

### 2. Utilitário de Tracking de Conversões
**Arquivo: `src/lib/tracking.ts` (novo)**
- Função `trackConversion(eventName, params)` que dispara `gtag('event', ...)` se disponivel
- Função `getUtmParams()` que extrai UTM da URL e persiste no `sessionStorage`
- Função `appendUtmToWhatsApp(link)` que inclui UTMs na mensagem do WhatsApp para o vendedor saber a origem
- Eventos pré-definidos: `whatsapp_click`, `phone_click`, `cta_hero_click`, `product_click`

### 3. Captura e Persistência de UTMs
**Arquivo: `src/App.tsx`**
- Ao montar, capturar `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` e `gclid` da URL
- Salvar no `sessionStorage` para uso posterior em links e tracking

### 4. Eventos de Conversão em Todos os CTAs
**Arquivos: `ConversionHero.tsx`, `Contact.tsx`, `PriceCards.tsx`, `MobileBar.tsx`, `WhatsAppFloat.tsx`, `BairroPage.tsx`, `PageTemplate.tsx`**
- Adicionar `onClick` nos botões de WhatsApp e Telefone chamando `trackConversion`
- Incluir UTMs persistidos na mensagem WhatsApp (ex: "Origem: Google Ads | Campanha: gas-pelotas")
- Cada CTA dispara evento distinto para segmentar conversões no Google Ads

### 5. Landing Page Otimizada para Quality Score
**Arquivo: `index.html`**
- Meta tag `google-site-verification` (placeholder)
- Garantir que `<title>` e `<meta description>` contém as keywords de campanha
- Adicionar `noscript` fallback para tracking

### 6. Página de Confirmação / Thank You (opcional mas recomendada)
**Arquivo: `src/components/ConversionConfirmation.tsx` (novo)**
- Modal/toast que aparece ao clicar no CTA confirmando a ação (ex: "Você será redirecionado ao WhatsApp")
- Dispara evento `gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/XXXXX' })` nesse momento

### 7. Rastreamento de Ligações Telefônicas
- Adicionar `tel:` links com formatação E.164 (`+5553991162002`)
- Configurar evento de conversão para cliques em telefone
- Google Ads pode usar isso para Website Call Conversions

## Arquivos Modificados/Criados

| Arquivo | Acao |
|---|---|
| `index.html` | gtag.js + google-site-verification |
| `src/lib/tracking.ts` | Utilitario de tracking e UTM (novo) |
| `src/App.tsx` | Captura UTMs ao montar |
| `src/lib/constants.ts` | Google Ads ID placeholder |
| `src/components/ConversionHero.tsx` | onClick tracking |
| `src/components/Contact.tsx` | onClick tracking |
| `src/components/PriceCards.tsx` | onClick tracking |
| `src/components/MobileBar.tsx` | onClick tracking |
| `src/components/WhatsAppFloat.tsx` | onClick tracking |
| `src/pages/BairroPage.tsx` | onClick tracking |
| `src/pages/PageTemplate.tsx` | onClick tracking |

## Como Ativar
Apos implementar, o usuario so precisa:
1. Substituir `AW-XXXXXXXXXX` pelo ID real do Google Ads
2. Configurar as acoes de conversao no painel do Google Ads
3. Os eventos ja estarao disparando automaticamente

