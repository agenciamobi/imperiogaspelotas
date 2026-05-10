## Dashboard de Analytics — Visualizações, Visitas e SEO

Vou implementar um sistema próprio de analytics (1st-party) integrado ao painel admin, somado à integração com a Google PageSpeed Insights API.

---

### 1. Banco de dados (novas tabelas)

**`page_views`** — uma linha por pageview anônimo
- `path` (text), `referrer` (text), `user_agent` (text), `country` (text, opcional)
- `visitor_id` (text) — id anônimo persistido em `localStorage` (UUID gerado client-side)
- `session_id` (text) — id de sessão (expira em 30min de inatividade)
- `duration_ms` (int, atualizado no `beforeunload`)
- `is_bounce` (bool, calculado: 1 pageview por sessão)
- `utm_source/medium/campaign` (text)
- `created_at` (timestamptz)
- RLS: INSERT público (anon), SELECT só admin

**`pagespeed_cache`** — cache dos resultados PSI
- `url` (text), `strategy` (text: mobile|desktop)
- `performance`, `seo`, `accessibility`, `best_practices` (int)
- `lcp_ms`, `inp_ms`, `cls` (numeric)
- `raw` (jsonb), `fetched_at` (timestamptz)
- Unique (url, strategy)
- RLS: SELECT/UPSERT só admin

Índices em `page_views(created_at)`, `(path)`, `(visitor_id)`, `(session_id)`.

---

### 2. Tracking client-side (`src/lib/analytics.ts` + hook em App)

- Hook `usePageviewTracking()` colocado dentro do `<BrowserRouter>` (escuta `useLocation`).
- Em cada mudança de rota:
  1. **Verifica se o usuário é admin** via `supabase.auth.getSession()` + checagem em `user_roles` (cacheada em memória por sessão). Se admin → não envia.
  2. Não rastreia rotas `/admin/*` nem `/admin/login`.
  3. Insere row em `page_views` (via supabase client, RLS permite anon INSERT).
  4. Atualiza `duration_ms` via `navigator.sendBeacon` no `visibilitychange`/`beforeunload`.
- `visitor_id` em `localStorage` (`imperio_vid`), `session_id` em `sessionStorage` com timeout.
- Bounce: marca `is_bounce=true` no insert; quando 2º pageview da sessão chegar, edge function (ou simples flag) considera não-bounce no agregado.

---

### 3. Edge function `pagespeed-insights`

`supabase/functions/pagespeed-insights/index.ts`:
- Input: `{ url, strategy: "mobile"|"desktop" }`
- Verifica auth admin (JWT + `has_role`).
- Lê `pagespeed_cache` — se `fetched_at` < N horas (default 6h, configurável), retorna cache.
- Senão chama `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=...&strategy=...&category=performance&category=seo&category=accessibility&category=best-practices` (com `key=PAGESPEED_API_KEY` se houver).
- Extrai scores e Core Web Vitals (LCP, INP, CLS) e faz upsert no cache.
- Retorna o registro normalizado.

Uso de **API key opcional**: PSI funciona sem key (cota baixa). Vou pedir a `PAGESPEED_API_KEY` como secret opcional — se não fornecida, segue sem.

---

### 4. Página `AdminDashboard` (refatorada)

Substitui o dashboard atual (cards de atalho movem para sidebar/menu próprio "Atalhos").

**Layout:**

```text
┌─ Cards de resumo (4) ────────────────────────────────┐
│  Visitas hoje | Visitantes únicos 7d | Bounce rate   │
│  Tempo médio | Score SEO médio (PSI)                 │
├─ Gráfico de linha (Recharts) ────────────────────────┤
│  Visitas últimos 7d / 30d (toggle)                   │
├─ Tabela: Páginas mais visitadas ─────────────────────┤
│  Path | Pageviews | Únicos | Avg Time | PSI Score    │
│       | (badge cor 🔴🟡🟢) | botão "Atualizar PSI"   │
└──────────────────────────────────────────────────────┘
```

- **Filtros de período**: Hoje / Ontem / 7d / 30d.
- **Cards** mostram delta vs período anterior.
- **Gráfico**: `recharts` (já no projeto via shadcn/chart) — linha de pageviews + linha de visitantes únicos.
- **Tabela**: top 20 páginas; coluna PSI score com badge colorido (`< 50` vermelho, `50–89` âmbar, `≥ 90` verde) + toggle mobile/desktop por linha; botão refresh roda a edge function.

**Hooks/queries:**
- `useTrafficStats(period)` — `supabase.rpc` ou queries agregadas em SQL.
- `useTopPages(period)` — top paths com counts.
- `usePageSpeed(url, strategy)` — invoca edge function, com `react-query` e `staleTime` longo.

**SQL helpers** (criados na migração como funções `security definer` restritas a admin):
- `analytics_summary(from_ts, to_ts)` → totais
- `analytics_timeseries(from_ts, to_ts, bucket)` → linhas por dia
- `analytics_top_pages(from_ts, to_ts, limit)` → top paths

---

### 5. Exclusão de admin

Camadas:
1. **Client**: hook checa role antes de enviar — admins logados nunca disparam pageview.
2. **Defesa em profundidade**: filtro nas queries do dashboard ignora rows com `user_agent` contendo header customizado `x-admin` (não confiável, só client). A camada principal é a (1).
3. Bots filtrados por regex de UA (`bot|crawler|spider|preview`) no insert client-side.

---

### 6. Detalhes técnicos

- **Dependências**: já temos `recharts` e `date-fns`. Nenhuma nova lib.
- **Realtime**: opcional — ativar publication em `page_views` para atualizar dashboard ao vivo (toggle de auto-refresh a cada 30s via `react-query` `refetchInterval` cobre o caso sem realtime).
- **Performance**: insert é fire-and-forget; falha silenciosa.
- **Privacidade**: nenhum PII, IP não armazenado (Supabase loga IP separadamente; não copiamos para nossa tabela).

---

### 7. Refinos extras no painel admin

Aproveitando a passagem:
- Item "Analytics" no `AdminSidebar` (já existe Dashboard, vira "Visão geral" + "Analytics"; ou Dashboard absorve tudo). Decisão: o Dashboard atual vira **Analytics**, e os atalhos antigos vão para a sidebar.
- Adiciona breadcrumb melhor no header com período selecionado.
- Botão "Rodar análise PSI agora" para a homepage e cada LP.

---

### Arquivos

**Criar:**
- `supabase/migrations/<ts>_analytics.sql` (tabelas, RLS, RPCs)
- `supabase/functions/pagespeed-insights/index.ts`
- `src/lib/analytics.ts` (tracker client)
- `src/hooks/usePageviewTracking.ts`
- `src/hooks/useAnalytics.ts` (queries dashboard)
- `src/hooks/usePageSpeed.ts`
- `src/components/admin/analytics/StatCard.tsx`
- `src/components/admin/analytics/TrafficChart.tsx`
- `src/components/admin/analytics/TopPagesTable.tsx`
- `src/components/admin/analytics/PsiScoreBadge.tsx`

**Modificar:**
- `src/App.tsx` — adicionar `<PageviewTracker/>` e refatorar dashboard
- `src/pages/AdminDashboard.tsx` — substituir conteúdo
- `src/components/admin/AdminSidebar.tsx` — possíveis novos itens
- `src/integrations/supabase/types.ts` — auto

---

### Pergunta antes de implementar

Vou pedir a chave PSI como secret opcional (`PAGESPEED_API_KEY`). Sem ela, a edge function ainda funciona mas com cota menor da Google. Se preferir, posso seguir sem pedir e você adiciona depois. Confirme se quer que eu solicite a chave já no fluxo.