## Objetivo

Refinar o painel `/admin` para ter:
1. **Sidebar persistente** (estilo WordPress) com navegação organizada entre todas as áreas
2. **Editor de Conteúdo do Site** com formulários campo-a-campo (não JSON cru) e **rich text** onde fizer sentido
3. **Layout unificado** em todas as telas admin

---

## Parte 1 — Layout Admin (Sidebar + Shell)

Criar um layout único reutilizado por todas as páginas `/admin/*`.

**Novos arquivos:**
- `src/components/admin/AdminLayout.tsx` — Shell com `SidebarProvider`, header fino com `SidebarTrigger`, breadcrumb e botão "Sair"
- `src/components/admin/AdminSidebar.tsx` — `Sidebar collapsible="icon"` shadcn

**Estrutura da navegação (agrupada como WP):**

```text
Dashboard          → /admin           (visão geral, atalhos, métricas resumo)
─────────────────
CONTEÚDO
  Páginas (LPs)    → /admin/landing
  Conteúdo do Site → /admin/site-content
─────────────────
MARKETING
  SEO & Meta Tags  → /admin/seo
  Rastreamento     → /admin/tracking
─────────────────
USUÁRIOS
  Administradores  → /admin/users
─────────────────
[Sair]
```

A página atual `/admin/integrations` será dividida em duas rotas (`/admin/seo` e `/admin/tracking`) reusando o mesmo componente com props (ou seções separadas), porque hoje mistura ambos. Adicionar também rota `/admin` (Dashboard) com cards de atalho.

Atualizar `App.tsx` para envolver as rotas admin no `AdminLayout` (via rota pai com `<Outlet />`).

---

## Parte 2 — Editor de Conteúdo (estilo WordPress)

Substituir o `<Textarea>` JSON em `AdminSiteContent.tsx` por **formulários estruturados** por seção, com tipo de campo correto:

**Tipos de campo:**
- `text` → `<Input>` (títulos curtos, labels, badges)
- `textarea` → `<Textarea>` (subtítulos curtos)
- `richtext` → editor rich text com toolbar (negrito, itálico, link, lista, headings) para campos longos: subtítulos descritivos, respostas de FAQ, descrição de produtos
- `select-icon` → dropdown de ícones Lucide com preview (Zap, Shield, Clock, etc.)
- `image` → input URL + botão upload para `landing-images` bucket + preview
- `repeater` → lista de cards (benefícios, badges, depoimentos, items, steps, FAQ items, stats) com adicionar/remover/reordenar (drag handle simples com setas ↑↓)

**Schema de cada seção** (definido em `src/lib/site-content-schema.ts`):
```text
hero: { badge:text, title_pre:text, title_highlight:text, title_post:text,
        subtitle:richtext, benefits:repeater(icon,text),
        cta_whatsapp_label:text, cta_phone_label:text,
        trust_badges:repeater(icon,text),
        delivery_badge_top:text, delivery_badge_bottom:text }
faq:   { title:text, subtitle:textarea,
        items:repeater(q:text, a:richtext) }
... (idem para todas as 9 seções, baseado em SITE_CONTENT_DEFAULTS)
```

**Novos componentes:**
- `src/components/admin/RichTextEditor.tsx` — usa **TipTap** (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`) com toolbar básica. Salva HTML.
- `src/components/admin/IconPicker.tsx` — popover com grid pesquisável dos ícones de `icon-map.tsx`
- `src/components/admin/ImageField.tsx` — input + upload Supabase Storage + preview
- `src/components/admin/RepeaterField.tsx` — array editor genérico
- `src/components/admin/SectionForm.tsx` — renderiza um schema → formulário

**UX (estilo WP Gutenberg/Classic):**
- Coluna esquerda: lista de seções (já existe)
- Coluna principal: card branco com header da seção, formulário, e barra inferior fixa "Salvar" / "Restaurar padrão" / link "Pré-visualizar"
- Toggle no canto superior direito: **"Modo avançado (JSON)"** mantém acesso ao editor JSON antigo como fallback para usuários técnicos

**Renderização no site:** componentes que hoje renderizam strings simples passarão a renderizar HTML via `dangerouslySetInnerHTML` apenas nos campos marcados `richtext` no schema (FAQ answers, subtitles longos, descrições). Strings simples continuam como texto puro.

---

## Detalhes técnicos

- **Dependência nova:** `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-placeholder`
- Backwards-compat: `useSiteContent` segue retornando o mesmo objeto JSONB; rich text vira string HTML no mesmo lugar onde antes era texto. Defaults atualizados para incluir HTML básico onde necessário (ex.: `<p>...</p>`).
- `AdminGuard` continua envolvendo cada rota; `AdminLayout` fica dentro dele.
- Sem mudanças de banco de dados — `site_content.data` continua JSONB livre.
- Mobile: sidebar colapsa para offcanvas com trigger no header.

---

## Arquivos a criar
- `src/components/admin/AdminLayout.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/RichTextEditor.tsx`
- `src/components/admin/IconPicker.tsx`
- `src/components/admin/ImageField.tsx`
- `src/components/admin/RepeaterField.tsx`
- `src/components/admin/SectionForm.tsx`
- `src/lib/site-content-schema.ts`
- `src/pages/AdminDashboard.tsx`
- `src/pages/AdminSeo.tsx` (extrai metade SEO de AdminIntegrations)
- `src/pages/AdminTracking.tsx` (extrai metade tracking)

## Arquivos a modificar
- `src/App.tsx` — rotas aninhadas com AdminLayout
- `src/pages/AdminSiteContent.tsx` — usa SectionForm + toggle JSON
- `src/pages/AdminLanding.tsx` — remove top bar de navegação (sidebar assume)
- `src/pages/AdminUsers.tsx` — remove top bar
- `src/pages/AdminIntegrations.tsx` — depreca em favor das duas novas (ou mantém como redirect)
- `src/components/FAQ.tsx`, `src/components/ConversionHero.tsx` etc. — renderizar HTML em campos rich text via `dangerouslySetInnerHTML`
- `src/lib/site-content-defaults.ts` — marcar campos rich text com HTML
