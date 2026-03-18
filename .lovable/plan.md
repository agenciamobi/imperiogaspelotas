

# Redesign: Header, UrgencyBar, PriceCards e Footer

## 1. Header — Logo centralizado, menu à esquerda, CTA à direita

**Estrutura:** Layout em 3 colunas com `justify-between`:
- **Esquerda:** Hamburger menu (mobile) + nav links (desktop)
- **Centro:** Logo centralizado com `absolute center` ou flex grow
- **Direita:** Botão CTA "Peça Agora" (WhatsApp)
- **Textura:** Adicionar um SVG pattern de textura business sutil (topography ou diagonal lines) como pseudo-element com baixa opacidade sobre o fundo branco existente

**Arquivo:** `src/components/Header.tsx`

## 2. UrgencyBar — Remover botão, centralizar mensagem

- Remover o `<Button>` "Peça Agora"
- Mudar layout de `justify-between` para `justify-center`
- Centralizar o texto com o timer

**Arquivo:** `src/components/UrgencyBar.tsx`

## 3. Fontes arredondadas para títulos

- Substituir **Space Grotesk** (geométrica/angular) por **Nunito** ou **Poppins** (arredondadas e bold)
- Atualizar Google Fonts link no `index.html`
- Atualizar `fontFamily.display` no `tailwind.config.ts`

## 4. Retirar preços dos produtos

- Remover `oldPrice`, `price`, `discount` dos dados em `PriceCards.tsx`
- Remover o bloco de preço (`<div className="rounded-xl bg-muted p-4">`)
- Manter imagem, título, subtítulo e botão WhatsApp
- Atualizar texto da seção em `ProductsGas.tsx` (remover "Preço Promocional")

## 5. Footer — Alto impacto com textura business e links SEO

**Redesign completo:**
- **Layout 4 colunas:** Logo+descrição | Links Institucionais | Links de Produtos | Contato
- **Links SEO:** "Disk Gás Pelotas", "Água Mineral Pelotas", "Entrega Rápida", "Botijão P13", etc.
- **Textura business:** SVG pattern de fundo sutil (mesmo estilo do header, mas sobre o verde escuro)
- **Visual:** Mais espaçamento, tipografia mais forte, ícones de redes sociais
- **Bottom bar:** Copyright + links de política de privacidade

**Arquivo:** `src/components/Footer.tsx`

## 6. CSS — Texturas business

Adicionar classes utilitárias em `src/index.css`:
- `.texture-business-light` — pattern SVG branco/cinza com 3-5% opacidade (para header)
- `.texture-business-dark` — pattern SVG branco com 5-8% opacidade (para footer sobre verde escuro)
- Usar CSS `background-image` com inline SVG data URI para padrão geométrico sutil

## Arquivos Modificados
- `index.html` — trocar fonte Google Fonts
- `tailwind.config.ts` — atualizar fontFamily.display
- `src/index.css` — adicionar texturas CSS
- `src/components/Header.tsx` — reestruturar layout 3 colunas + textura
- `src/components/UrgencyBar.tsx` — remover botão, centralizar
- `src/components/PriceCards.tsx` — remover preços
- `src/components/ProductsGas.tsx` — ajustar texto da seção
- `src/components/Footer.tsx` — redesign completo com links SEO + textura

