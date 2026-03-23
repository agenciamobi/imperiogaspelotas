

# Hero de Alto Impacto — Estilo Referência

Recriar o hero inspirado no print enviado: fundo verde vibrante com gradiente, botijão grande à direita, mascote Liquigás, elementos decorativos (formas orgânicas verde/laranja), e mockup de WhatsApp. Layout impactante e visual.

## Mudanças

### 1. ConversionHero.tsx — Redesign completo
- **Fundo:** Gradiente verde vibrante cobrindo toda a seção (como no print), com formas decorativas SVG (blob verde escuro + laranja atrás do botijão)
- **Layout esquerdo:** Título bold grande branco "PEÇA SEU GÁS DE COZINHA AGORA!", subtítulo, dois botões CTA laranja empilhados ("Compre gás pelo WhatsApp" + "Peça gás pelo Telefone")
- **Layout direito:** Imagem grande do botijão P13 + mascote Liquigás sobrepostos + mockup de chat WhatsApp flutuante (CSS puro, como no print)
- **Formas decorativas:** Blobs SVG verde escuro e laranja posicionados com absolute atrás das imagens
- **Mover o formulário** para um componente separado ou removê-lo do hero (o hero agora é visual puro com CTAs diretos)
- O formulário pode ser mantido na seção Contact ou como um modal

### 2. Novos assets
- Copiar as imagens enviadas: botijão com WhatsApp overlay, mascote Liquigás, galões de água

### 3. CSS
- Atualizar `--hero-gradient` para verde mais vibrante
- Adicionar classe para a curva SVG inferior (transição curva entre hero e próxima seção, como no print)
- Estilizar mockup de chat WhatsApp com CSS

### 4. Index.tsx
- Manter ConversionHero como primeira seção
- O formulário de pedido migra para a seção de contato ou permanece acessível via scroll

## Arquivos
- `src/components/ConversionHero.tsx` — redesign completo
- `src/index.css` — gradiente hero atualizado + curva SVG
- Copiar assets: botijão com overlay, mascote, água

