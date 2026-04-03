

# Correção de Cores, Links Funcionais e Páginas Dedicadas SEO

## Problemas Identificados

1. **Botões no BairroPage hero**: o botão "Pedir pelo WhatsApp" usa `bg-cta text-primary-foreground` (laranja com texto branco — OK), mas o botão de telefone usa `text-primary-foreground` sem fundo visível no hero verde, ficando invisível
2. **Menu no header nas páginas internas**: os nav links apontam para âncoras (`#gas`, `#faq`, etc.) que só existem na home — nas páginas de bairro não funcionam
3. **Footer "Navegação" e "Produtos"**: links apontam para âncoras simples sem páginas dedicadas

## Mudanças

### 1. BairroPage.tsx — Cores dos botões no hero
- Botão WhatsApp: `bg-cta hover:bg-cta-hover text-white` (garantir texto branco explícito)
- Botão Telefone: `bg-white/15 border-2 border-white/40 text-white hover:bg-white/20` (visível sobre fundo verde)
- Botão "Pedir Agora" nos cards de produto: manter `bg-cta text-white`

### 2. Header.tsx — Links funcionais em páginas internas
- Detectar se estamos na home (`useLocation`) 
- Se na home: manter `href="#gas"` etc.
- Se em página interna: mudar para `href="/#gas"`, `href="/#faq"` etc. (volta à home + scroll)
- Manter cores corretas: transparente = texto branco, scrolled = texto escuro

### 3. Páginas dedicadas para itens do Footer

Criar 9 páginas dedicadas com SEO completo:

**Navegação:**
- `/disk-gas-pelotas` — Disk Gás Pelotas
- `/entrega-rapida-gas` — Entrega Rápida de Gás
- `/agua-mineral-pelotas` — Água Mineral Pelotas
- `/perguntas-frequentes` — Perguntas Frequentes
- `/fale-conosco` — Fale Conosco

**Produtos:**
- `/produto/botijao-p13` — Botijão P13
- `/produto/botijao-p45` — Botijão P45
- `/produto/agua-mineral-20l` — Água Mineral 20L
- `/produto/gas-comercial` — Gás Comercial

Cada página terá:
- H1 SEO otimizado, descrição rica, CTAs WhatsApp/Telefone
- JSON-LD (`Product`, `Service`, `FAQPage` conforme o caso)
- Meta title e description dinâmicos
- Header e Footer reutilizados
- FAQ local relevante (3 perguntas)
- Animações framer-motion

### 4. Novos arquivos de dados
- `src/lib/pages-data.ts` — array com dados das páginas de navegação e produtos (slug, título, descrição, FAQ, tipo de schema)

### 5. Footer.tsx — Links atualizados
- Trocar `href="#inicio"` etc. por `<Link to="/disk-gas-pelotas">` etc.
- Trocar `href="#gas"` nos produtos por `<Link to="/produto/botijao-p13">` etc.
- Todos com `title` SEO otimizado

### 6. App.tsx — Novas rotas
- Adicionar rotas para as 9 páginas novas

### 7. sitemap.xml — Novas URLs
- Adicionar as 9 URLs das páginas dedicadas

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/Header.tsx` | Links condicionais home/interna |
| `src/pages/BairroPage.tsx` | Cores botões corrigidas |
| `src/lib/pages-data.ts` | Dados das páginas (novo) |
| `src/pages/PageTemplate.tsx` | Template reutilizável para páginas de navegação/produto (novo) |
| `src/components/Footer.tsx` | Links com rotas internas |
| `src/App.tsx` | 9 novas rotas |
| `public/sitemap.xml` | URLs novas |

