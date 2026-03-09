
# Landing Page de Conversão — Estilo Juros Abusivos Veicular

Transformar a homepage atual em uma landing page focada em conversão, inspirada no design de alta performance de jurosabusivosveicular.com.br, mantendo a identidade verde/laranja da Império.

## Análise do Estilo de Referência
O site jurosabusivosveicular.com.br utiliza:
- **Headers fixos com urgência** ("Últimos dias", contador regressivo)
- **Formulários prominentes** com campos mínimos e CTAs laranja
- **Social proof intenso** (depoimentos, números de clientes)
- **Seções de benefícios** com ícones e textos diretos
- **Blocos de "prova"** com logos de empresas/certificações
- **FAQ estratégico** para objeções comuns
- **Múltiplos pontos de conversão** ao longo da página

## Adaptação para Império Gás e Água

### 1. Header de Urgência (novo)
- Barra fixa no topo: "Promoção Especial - Frete Grátis Acima de R$ 50"
- Timer ou badge de "Oferta por Tempo Limitado"
- Botão "Peça Agora" fixo no header

### 2. Hero com Formulário Lado a Lado
- **Esquerda**: Headline impactante + benefícios principais
  - "Gás e Água com Entrega em 30 Minutos"
  - "Sem Taxa de Entrega • Preço Justo • Qualidade Garantida"
- **Direita**: Formulário simples (Nome, Telefone, Endereço) + CTA laranja
- Remover carousel, focar em conversão única

### 3. Social Proof Intensivo
- Seção logo após hero: "Mais de 5.000 clientes atendidos"
- Grid de depoimentos com fotos reais
- Badges: "Revenda Autorizada Liquigás", "15 anos no mercado"

### 4. Benefícios com Ícones (reformular Differentials)
- 6 pontos principais em grid 2x3
- Textos mais diretos: "Entrega em 30min", "Sem taxa extra", "Botijões novos"
- Ícones maiores com background colorido

### 5. "Como Funciona" Simplificado
- 3 steps apenas: "Peça" → "Entregamos" → "Pronto"
- Visual mais clean, foco na simplicidade

### 6. Produtos com Preços Visíveis
- Mostrar preços principais dos botijões
- Cards com "De R$ X Por R$ Y"
- CTA individual em cada produto

### 7. Garantias e Certificações
- Nova seção: logos de parceiros (Liquigás, etc.)
- Garantias: "Troca grátis", "Dinheiro de volta"
- Certificações de qualidade

### 8. FAQ para Objeções
- Perguntas estratégicas: "É seguro?", "Quanto tempo demora?", "Qual a área de entrega?"
- Respostas que removem barreiras à compra

### 9. CTA Final Urgente
- "Não perca tempo - Peça seu gás agora"
- Formulário duplicado ou botão WhatsApp gigante
- "Últimas entregas do dia"

### 10. Footer Simplificado
- Apenas essencial: contatos, horários, endereço
- Remover links desnecessários para não distrair da conversão

## Mudanças Técnicas

### Novos Componentes
- `UrgencyBar.tsx` - Barra de urgência fixa
- `ConversionHero.tsx` - Hero com formulário
- `SocialProof.tsx` - Depoimentos e números
- `PriceCards.tsx` - Produtos com preços
- `Guarantees.tsx` - Garantias e certificações

### Componentes Modificados
- `Header.tsx` - Adicionar barra de urgência
- `QuickAccess.tsx` - Remover ou simplificar
- `ProductsGas.tsx` - Adicionar preços visíveis
- `Differentials.tsx` - Focar em benefícios de conversão
- `FAQ.tsx` - Perguntas estratégicas para vendas
- `Contact.tsx` - Apenas formulário simples
- `Footer.tsx` - Versão minimalista

### Paleta de Conversão
- **Primária**: Verde Império (manter identidade)
- **CTA**: Laranja vibrante (#FF6B35) para botões
- **Urgência**: Vermelho para elementos de pressa
- **Social Proof**: Azul para credibilidade

### Layout de Conversão
- **Single column flow** para mobile
- **Formulários sticky** em desktop
- **CTAs múltiplos** sem poluir
- **Menos seções** para manter foco

## Estratégia de Conversão
- **Reduzir friction**: menos campos nos formulários
- **Aumentar urgência**: ofertas por tempo limitado
- **Social proof**: depoimentos e números
- **Remover distrações**: links externos, navegação complexa
- **Múltiplos CTAs**: em pontos estratégicos da página
