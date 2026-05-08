# Plano: Gestão de Admins + CMS da Homepage

## Parte 1 — Criação de Usuários Admin

Hoje só dá pra logar com usuários criados manualmente. Vou implementar criação **de dentro do painel** com nome, e-mail e senha.

### Backend
- **Tabela `profiles`** (id uuid PK = auth.users.id, full_name text, email text, created_at)
  - RLS: `authenticated` lê todos; usuário só atualiza o próprio.
- **Tabela `user_roles`** + enum `app_role ('admin')` + função `has_role()` (padrão seguro Lovable, separada do profile).
- **Trigger `on_auth_user_created`** → cria profile automaticamente com `full_name` vindo de `raw_user_meta_data`.
- **Edge Function `admin-create-user`** (verify_jwt = true):
  - Verifica via `has_role(auth.uid(), 'admin')` se o solicitante é admin.
  - Usa `SUPABASE_SERVICE_ROLE_KEY` + `supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name } })`.
  - Insere role `admin` em `user_roles`.
- **Migração de bootstrap**: marca o(s) usuário(s) atualmente existentes em `auth.users` como `admin` em `user_roles` para não perderem acesso.

### Frontend
- Nova página `/admin/users` (protegida por `AdminGuard` + checagem `has_role`):
  - Lista admins (nome, e-mail, criado em).
  - Formulário "Novo admin" (nome, e-mail, senha com validação Zod ≥ 8 chars).
  - Botão "Remover admin" (chama edge function `admin-delete-user`).
- Botão de acesso no topo do `AdminLanding` ao lado de "Integrações".
- `AdminGuard` passa a checar também role `admin` (não basta estar logado).

---

## Parte 2 — CMS completo da Homepage

Hoje toda copy da home (`ConversionHero`, `SocialProof`, `ProductsGas`, `Differentials`, `HowItWorks`, `FAQ`, `Contact`, `Footer`) está hardcoded. Vou centralizar em uma única tabela editável.

### Backend — tabela `site_content`
Estrutura simples e flexível: 1 linha por **seção**, conteúdo em JSONB.

```
id uuid pk
section text unique  -- 'hero' | 'social_proof' | 'products' | 'differentials'
                      -- | 'how_it_works' | 'faq' | 'contact' | 'footer' | 'global'
data   jsonb         -- estrutura específica da seção
updated_at timestamptz
```

RLS: `public` lê (site é público), `authenticated` faz CRUD.

**Seed inicial**: a migração popula cada seção com o conteúdo atual hardcoded — assim o site não muda visualmente até o admin editar algo.

Exemplos de schema por seção:
- `hero`: `{ badge, title_pre, title_highlight, title_post, subtitle, benefits:[{icon,text}], cta_whatsapp_label, cta_phone_label, trust_badges:[{icon,text}] }`
- `social_proof`: `{ stats:[{value,label}], testimonials:[{name,text,rating}] }`
- `products`: `{ section_title, section_subtitle, items:[{name,description,badge,image_key,price?}] }`
- `differentials`: `{ title, items:[{icon,title,description}] }`
- `how_it_works`: `{ title, steps:[{number,title,description}] }`
- `faq`: `{ title, items:[{question,answer}] }`
- `contact`: `{ title, address, hours, phone_label }`
- `footer`: `{ tagline, columns:[{title,links:[{label,href}]}], copyright }`
- `global`: `{ whatsapp_number, whatsapp_default_message, phone_display }` (substitui parte do `constants.ts`)

### Frontend
- **Hook `useSiteContent(section)`**: busca via React Query, faz cache, expõe `data` tipado + fallback para o conteúdo atual hardcoded (evita tela em branco se algo falhar).
- **Refatorar componentes da home** (`ConversionHero`, `SocialProof`, `ProductsGas`, `Differentials`, `HowItWorks`, `FAQ`, `Contact`, `Footer`) para consumir o hook em vez de constantes locais.
- **Estilos, animações, ícones e imagens** continuam em código (não vira CMS de design — só copy/dados estruturados).
- Imagens de produto: campo `image_key` referencia assets já existentes (ex.: `botijao-p13`, `liquinho-p2`) via um mapa central `src/lib/asset-map.ts`. Para imagens novas, admin pode usar URL absoluta (bucket `landing-images` já existe).

### Painel Admin — `/admin/site-content`
- Sidebar com as 9 seções.
- Editor por seção com formulário tipado (campos texto, textarea, listas dinâmicas com add/remove para benefits/testimonials/FAQ/etc.).
- Botão "Pré-visualizar" abre `/` em nova aba.
- Botão "Restaurar padrão" volta ao seed original (guardado como JSON em `src/lib/site-content-defaults.ts`).
- Validação Zod por seção antes de salvar.

---

## Estrutura de arquivos

Novos:
```
supabase/migrations/<ts>_users_and_cms.sql
supabase/functions/admin-create-user/index.ts
supabase/functions/admin-delete-user/index.ts
src/pages/AdminUsers.tsx
src/pages/AdminSiteContent.tsx
src/hooks/useSiteContent.ts
src/lib/site-content-defaults.ts
src/lib/asset-map.ts
src/components/admin/SectionEditorHero.tsx
src/components/admin/SectionEditorList.tsx  (genérico p/ FAQ, testimonials, etc.)
```

Editados:
- `src/App.tsx` (rotas novas)
- `src/components/AdminGuard.tsx` (checa role admin)
- `src/pages/AdminLanding.tsx` (botões "Usuários" e "Conteúdo")
- Todos os componentes da home listados acima (consomem hook)

---

## Considerações técnicas

- **Segurança**: roles em tabela separada (`user_roles`) + `has_role()` SECURITY DEFINER, conforme padrão obrigatório. Edge functions validam `has_role` antes de qualquer admin action.
- **Sem signup público**: nenhuma rota de sign-up no frontend. Único caminho para criar admin é via `/admin/users` por outro admin já autenticado.
- **Bootstrap**: o(s) usuário(s) já existentes em `auth.users` recebem role `admin` na migração para não ficarem trancados fora.
- **Fallback de conteúdo**: se o fetch do `site_content` falhar, componentes renderizam os defaults — site nunca quebra.
- **SEO/JSON-LD**: continua funcionando (consome os mesmos dados via hook).
