

# Métricas de Conversão no Admin + Correção de Inconsistências

## Visão Geral
Adicionar tabela de eventos de clique no banco, registrar cada conversão (WhatsApp/telefone) por landing page, e exibir dashboard de métricas no admin. Também corrigir inconsistências encontradas.

## Inconsistências Encontradas

1. **Segurança: qualquer pessoa pode criar conta admin** — O `AdminLogin.tsx` permite "Criar conta" livremente. Qualquer visitante pode se cadastrar e acessar o painel admin.
2. **`<title>` no JSX não funciona** — Em `LandingPromo.tsx` linha 104, `<title>` dentro de JSX não altera o título da aba. Precisa usar `document.title` ou `react-helmet`.
3. **`updated_at` trigger ausente** — A função `update_updated_at_column` existe mas não há trigger vinculado à tabela `landing_pages`.
4. **Delete sem confirmação** — O admin não tem botão de deletar páginas (o `Trash2` é importado mas nunca usado).

## Mudanças

### 1. Tabela `lp_events` (migração)
```sql
CREATE TABLE public.lp_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id uuid REFERENCES public.landing_pages(id) ON DELETE CASCADE,
  event_type text NOT NULL, -- 'whatsapp_click', 'phone_click'
  source text, -- 'hero', 'offer', 'final_cta'
  utm_source text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);
-- RLS: anyone can insert (anonymous tracking), only authenticated can read
ALTER TABLE public.lp_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert events" ON public.lp_events FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated can read events" ON public.lp_events FOR SELECT TO authenticated USING (true);
```

### 2. Trigger `updated_at` na `landing_pages`
```sql
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.landing_pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### 3. `LandingPromo.tsx` — Registrar eventos no banco
- Nos handlers `handleWhatsApp` e `handlePhone`, inserir registro na tabela `lp_events` com `landing_page_id`, `event_type` e UTMs do sessionStorage
- Corrigir `<title>` para usar `useEffect` com `document.title`

### 4. `AdminLanding.tsx` — Dashboard de métricas
- Ao selecionar uma página, buscar contagem de eventos agrupados por `event_type` dos últimos 7/30 dias
- Exibir cards no topo do editor: "Cliques WhatsApp", "Cliques Telefone", "Total Conversões"
- Exibir mini-tabela comparativa de todas as páginas com cliques totais para fácil comparação A/B

### 5. Remover cadastro público no `AdminLogin.tsx`
- Remover toggle "Criar conta" — login apenas para contas já existentes
- Manter apenas o formulário de login

### 6. Botão de deletar páginas no `AdminLanding.tsx`
- Adicionar botão com ícone `Trash2` com confirmação (`window.confirm`)

## Arquivos

| Arquivo | Ação |
|---|---|
| Migração SQL | Criar `lp_events`, trigger `updated_at` |
| `src/pages/LandingPromo.tsx` | Inserir eventos + corrigir `document.title` |
| `src/pages/AdminLanding.tsx` | Dashboard métricas + botão deletar |
| `src/pages/AdminLogin.tsx` | Remover signup público |

