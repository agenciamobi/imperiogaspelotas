

# Redesign Visual — Inspiração Ultragaz

Reformulação completa do visual da landing page, adaptando o estilo corporativo e profissional da Ultragaz para a identidade da Império Gás e Água (verde escuro + laranja).

## Principais Mudanças

### 1. Header — Barra dupla como Ultragaz
- **Top bar** fixa com telefones e horário de atendimento (fundo verde escuro)
- **Nav principal** com logo, menu com hover highlights, botão "Peça seu Gás" em destaque
- Menu mobile em drawer

### 2. Hero — Carousel com gradiente
- Banner carousel (usando embla-carousel já instalado) com 2-3 slides:
  - Slide 1: "Disk Gás e Água em Pelotas" com imagem do botijão
  - Slide 2: "Água Mineral 20L com entrega"
  - Slide 3: "Revenda Autorizada Liquigás"
- Fundo com gradiente verde (como o azul da Ultragaz), formas arredondadas
- Indicadores de slide e setas de navegação

### 3. Barra de acesso rápido (nova seção)
- Similar à seção "Já sou cliente" da Ultragaz
- Cards: "Peça pelo WhatsApp", "Ligue agora", "Horário de entrega"
- Fundo branco, cards com ícones e bordas suaves

### 4. Produtos — Grid de cards com imagens grandes
- Estilo "Energias Ultragaz": cards grandes com imagem de fundo, overlay com título e CTA
- 3 cards: Gás Residencial, Gás Comercial, Água Mineral
- Hover com zoom suave na imagem

### 5. Tipos de Botijão — Layout limpo
- Manter grid atual mas com visual mais corporativo
- Cards com fundo branco, sombra suave, badge de categoria
- Separação visual clara Residencial vs Comercial

### 6. Diferenciais — Ícones em grid limpo
- Estilo mais flat e corporativo (sem blobs)
- Fundo cinza claro, ícones em círculos verde/laranja
- 6 itens em grid 3x2

### 7. Como Funciona — Steps horizontais
- Manter 3 steps mas com visual mais limpo
- Linha conectora mais visível entre steps
- Números grandes em destaque

### 8. Uso do P13 — Manter com ajustes visuais
- Remover blobs, adicionar fundo gradiente suave

### 9. CTA "Ainda não pediu?" (nova seção)
- Inspirada em "Ainda não é cliente Ultragaz?"
- Fundo gradiente verde, texto grande, botão WhatsApp

### 10. Blog Preview (nova seção)
- 3-4 cards de artigos como na Ultragaz
- Conteúdos: "Dicas de segurança", "Benefícios da água mineral", "Como conservar seu botijão", "Gás P13: o mais usado"
- Layout horizontal com imagem + título

### 11. FAQ — Manter com visual limpo
- Remover fundo muted, usar branco
- Accordion mais espaçado

### 12. Contato — Reorganizar
- Estilo mais limpo como a Ultragaz
- Canais de contato em cards lado a lado
- Mapa ou endereço

### 13. Footer — Multi-colunas profissional
- Top: canais de venda (WhatsApp, telefones)
- Middle: links de navegação em 3-4 colunas
- Bottom: copyright, SEO keywords

### 14. Barra fixa inferior (mobile)
- Inspirada na Ultragaz: "Comprar Botijão" + "Fale Conosco"
- Aparece apenas no mobile, fixa na parte inferior

### 15. CSS / Design System
- Remover blobs orgânicos, adotar visual mais corporativo com gradientes suaves
- Bordas mais arredondadas (16px+)
- Sombras suaves em cards
- Gradientes verdes (similar ao azul da Ultragaz)

## Arquivos Modificados
- `src/index.css` — Atualizar variáveis e remover blob utilities
- `tailwind.config.ts` — Ajustar animações
- `src/components/Header.tsx` — Barra dupla
- `src/components/Hero.tsx` — Carousel com gradiente
- `src/components/ProductsGas.tsx` — Cards grandes com imagem
- `src/components/ProductsWater.tsx` — Visual corporativo
- `src/components/Differentials.tsx` — Grid limpo
- `src/components/HowItWorks.tsx` — Steps refinados
- `src/components/P13Usage.tsx` — Sem blobs
- `src/components/FAQ.tsx` — Visual limpo
- `src/components/Contact.tsx` — Reorganizado
- `src/components/Footer.tsx` — Multi-colunas
- `src/components/WhatsAppFloat.tsx` — Manter

## Novos Arquivos
- `src/components/QuickAccess.tsx` — Barra de acesso rápido
- `src/components/CtaBanner.tsx` — CTA "Ainda não pediu?"
- `src/components/BlogPreview.tsx` — Preview de artigos
- `src/components/MobileBar.tsx` — Barra fixa mobile
- `src/pages/Index.tsx` — Adicionar novas seções

