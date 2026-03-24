

# Header Transparente, Mobile Nativo, SEO Bairros de Pelotas

## 1. Header — Transparente com transição ao scroll

**Comportamento:** Transparente sobre o hero (sem borda, sem fundo). Ao rolar, transição suave para fundo branco com sombra e textura business.
- Usar `useState` + `useEffect` com `scroll` listener para detectar `scrollY > 50`
- Classes dinâmicas: transparente (`bg-transparent text-white`) → sólido (`bg-white/95 backdrop-blur text-foreground shadow`)
- Logo e nav links mudam de cor conforme estado
- Manter layout 3 colunas (menu | logo | CTA)
- UrgencyBar fica acima, sempre visível

**Arquivo:** `src/components/Header.tsx`

## 2. Mobile — Experiência tipo app nativo

### Header mobile
- Hamburger menu abre como drawer full-screen (overlay escuro + slide da esquerda)
- Links maiores com ícones, espaçamento generoso (touch-friendly)
- Botão WhatsApp CTA grande no final do menu

### MobileBar
- Redesign: 3 botões (WhatsApp | Ligar | Início) com ícones maiores e labels
- Cantos arredondados no topo, sombra mais forte
- Safe area padding para iPhones (`pb-safe`)

### WhatsAppFloat
- Já oculto no mobile (correto), manter

**Arquivos:** `src/components/Header.tsx`, `src/components/MobileBar.tsx`

## 3. Footer — Alto impacto + crédito MOBI

- Adicionar seção de bairros atendidos (grid de links SEO)
- Bottom bar: "Desenvolvido por MOBI - Marketing Inteligente" com `<a href="https://agenciamobi.com.br/" target="_blank" rel="noopener noreferrer" title="MOBI Marketing Inteligente - Agência de Marketing Digital">`
- Todos os links do footer com `title` attributes para SEO

**Arquivo:** `src/components/Footer.tsx`

## 4. SEO — Bairros de Pelotas (sem Praia do Laranjal)

### index.html — Schema JSON-LD
- Expandir `areaServed` de `City` para array com bairros principais
- Adicionar FAQ schema com perguntas por bairro
- Keywords meta com bairros

### Footer — Links de bairros
Grid de links SEO: "Gás Centro Pelotas", "Gás Fragata", "Gás Areal", "Gás Três Vendas", "Gás Porto", "Gás Navegantes", "Gás Simões Lopes", "Gás Cohab Tablada", "Gás Dunas", etc. (~25 bairros)

### Componentes — title/alt attributes
- Adicionar `title` em todos os `<a>` tags nos componentes principais
- Alt text com localização em imagens

**Bairros incluídos:** Centro, Fragata, Areal, Três Vendas, Porto, Navegantes, Simões Lopes, Cohab Tablada, Dunas, Jardim Europa, Bom Jesus, Guabiroba, São Gonçalo, Sítio Floresta, Cohab Lindóia, Pestano, Sanga Funda, Getúlio Vargas, Obelisco, Santa Terezinha, Vila Nova, Cruzeiro, Hipódromo, Colônia, Passo dos Negros

## 5. CSS — Ajustes

- Adicionar `env(safe-area-inset-bottom)` para MobileBar
- Transição suave no header: `transition-all duration-300`

## Arquivos Modificados
- `src/components/Header.tsx` — transparente + scroll + drawer mobile
- `src/components/MobileBar.tsx` — estilo app nativo 3 botões
- `src/components/Footer.tsx` — bairros SEO + crédito MOBI
- `src/index.css` — safe area, transições
- `index.html` — SEO bairros schema + keywords

