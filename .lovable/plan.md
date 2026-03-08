

# Refinamento Visual — Estilo Ultragaz Completo

Aplicar o visual corporativo da Ultragaz em todas as seções restantes. A Ultragaz usa: fundos com gradientes azuis vibrantes, cards com bordas arredondadas grandes, seções com fundo colorido alternado, footer com mega-menu estilo "canais de venda", e barras de CTA fixas com ícones grandes.

## Mudanças por Componente

### 1. Hero — Gradiente mais vibrante + decoração curva
- Adicionar uma curva SVG na parte inferior do hero (como a Ultragaz usa transições curvas entre seções)
- Aumentar contraste do gradiente, torná-lo mais vibrante
- Melhorar espaçamento e tamanho da tipografia

### 2. QuickAccess — Estilo "Já sou cliente" da Ultragaz
- Redesenhar como uma barra horizontal com ícone + título + descrição + botões lado a lado
- Fundo branco com borda e sombra suave, layout mais largo
- Ícone à esquerda, texto descritivo, e botões/links à direita

### 3. ProductsGas — Estilo "Energias Ultragaz" com cards de imagem grande
- Transformar em cards grandes com overlay de gradiente sobre imagem
- 3 cards principais: Gás Residencial, Gás Comercial, Água Mineral (como os 4 cards da Ultragaz)
- Manter a grid de botijões abaixo em formato mais limpo
- Adicionar subtítulo descritivo e CTA em cada card

### 4. ProductsWater — Seção com fundo colorido
- Adicionar fundo gradiente suave (verde claro) em vez de branco
- Layout mais impactante com imagem maior
- Badges de benefícios com visual mais clean

### 5. Differentials — Fundo branco, ícones em círculos coloridos
- Remover fundo muted, usar branco
- Ícones em círculos maiores com gradiente
- Adicionar separador visual superior (curva SVG)

### 6. HowItWorks — Steps com números grandes em círculos coloridos
- Números em círculos com gradiente verde
- Linha conectora mais visível e estilizada
- Fundo cinza claro sutil

### 7. P13Usage — Manter gradiente, adicionar curva SVG no topo
- Curva SVG decorativa no topo da seção
- Imagem do botijão maior com sombra

### 8. CtaBanner — Estilo "Ainda não é cliente Ultragaz?"
- Layout lado a lado: texto à esquerda, imagem/ilustração à direita
- Fundo com gradiente verde vibrante
- Tipografia maior e mais impactante
- Botão com estilo arredondado e destaque

### 9. BlogPreview — Estilo "Blog da Ultragaz"
- Card principal maior à esquerda (featured) + 3 cards menores à direita
- Imagens no topo de cada card
- Header com "Blog" + "Ver tudo" alinhados
- Fundo cinza claro

### 10. FAQ — Visual mais limpo
- Fundo branco, sem bg muted
- Cards do accordion com bordas mais suaves
- Mais espaçamento entre itens

### 11. Contact — Reorganizar como mega-seção
- Fundo gradiente suave
- Cards de contato maiores com ícones em círculos coloridos
- Seção de newsletter ou formulário simples

### 12. Footer — Mega footer estilo Ultragaz
- **Seção 1 "Canais de venda"**: WhatsApp, Telefones em layout de cards/botões
- **Seção 2 "Acesso rápido"**: Links para seções do site em grid
- **Seção 3 "Atendimento"**: Informações de horário e cobertura
- Fundo verde escuro, tipografia clara, separadores
- Bottom bar com copyright e keywords SEO

### 13. NavLink.tsx — Criar componente auxiliar
- Componente para links de nav com hover animado

### 14. CSS — Adicionar utilitários
- `.section-curve` — SVG curve between sections
- Gradientes adicionais para seções
- Ajustar sombras e bordas

## Arquivos a Modificar
- `src/index.css` — Novos utilitários CSS
- `src/components/Hero.tsx` — Curva inferior SVG
- `src/components/QuickAccess.tsx` — Layout "Já sou cliente"
- `src/components/ProductsGas.tsx` — Cards grandes com overlay
- `src/components/ProductsWater.tsx` — Fundo colorido
- `src/components/Differentials.tsx` — Visual limpo
- `src/components/HowItWorks.tsx` — Steps refinados
- `src/components/P13Usage.tsx` — Curva SVG
- `src/components/CtaBanner.tsx` — Layout lado a lado
- `src/components/BlogPreview.tsx` — Featured card layout
- `src/components/FAQ.tsx` — Fundo branco
- `src/components/Contact.tsx` — Mega seção
- `src/components/Footer.tsx` — Mega footer Ultragaz
- `src/components/MobileBar.tsx` — Ajuste visual

## Novo Arquivo
- `src/components/NavLink.tsx` — Link de navegação reutilizável

