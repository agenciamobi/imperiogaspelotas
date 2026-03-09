

# Auditoria — Problemas e Melhorias Encontradas

Após análise completa do código, encontrei **15 pontos** entre bugs, componentes órfãos, problemas de UX e melhorias necessárias.

---

## Problemas Críticos

### 1. Componentes órfãos (código morto)
6 componentes existem nos arquivos mas **não são importados em lugar nenhum**:
- `Hero.tsx` — substituído por `ConversionHero`, mas ainda existe
- `QuickAccess.tsx` — não usado
- `BlogPreview.tsx` — não usado
- `P13Usage.tsx` — não usado
- `ProductsWater.tsx` — não usado
- `CtaBanner.tsx` — não usado

**Ação:** Deletar todos ou reintegrar os úteis na página.

### 2. `Flame` importado mas não usado no UrgencyBar
Linha 1 importa `Flame` de lucide-react, mas só `Clock` é usado. Lint warning.

### 3. Formulário do hero não valida nada
O formulário em `ConversionHero` aceita qualquer input e redireciona ao WhatsApp mesmo com campos vazios. Sem máscara de telefone, sem validação mínima.

**Ação:** Adicionar validação básica (nome obrigatório, telefone com formato), máscara de telefone, e desabilitar botão quando vazio.

### 4. Página 404 em inglês
`NotFound.tsx` mostra "Oops! Page not found" e "Return to Home" — deveria estar em português para consistência.

---

## Problemas de UX/Conversão

### 5. Imagem do P45 usa asset errado
`PriceCards.tsx` usa `botijao-p08.png` para o produto "Botijão P45". O asset `botijao-p02.png` também existe sem uso. Imagens possivelmente trocadas.

### 6. WhatsApp float sobrepõe MobileBar
`WhatsAppFloat` posiciona `bottom-20` no mobile, mas a `MobileBar` é fixa no bottom. O botão flutuante fica redundante com o botão "Comprar Botijão" da MobileBar — são dois CTAs de WhatsApp competindo.

**Ação:** Esconder `WhatsAppFloat` no mobile (já tem MobileBar) ou remover completamente pois já há CTAs suficientes.

### 7. Falta scroll-margin para navegação com âncoras
O header fixo (UrgencyBar + navbar = ~104px) cobre o conteúdo quando se clica nas âncoras (#gas, #vantagens, etc.). Falta `scroll-margin-top` nas seções.

### 8. Seções Guarantees e Differentials são redundantes
Ambas falam de "revenda autorizada", "segurança", "preço transparente". Conteúdo quase idêntico em duas seções separadas — dilui o impacto.

**Ação:** Unificar em uma única seção de benefícios/garantias.

### 9. Nenhum feedback visual no formulário
Ao clicar "Quero pedir com desconto", o usuário é redirecionado sem nenhum feedback. Sem loading state, sem toast de confirmação.

---

## Melhorias Técnicas

### 10. Link WhatsApp duplicado em 7+ arquivos
O número `5553991162002` está hardcoded em `Header`, `ConversionHero`, `PriceCards`, `Contact`, `Footer`, `WhatsAppFloat`, `MobileBar`, e `UrgencyBar` — cada um com mensagem diferente. Qualquer mudança de número exige editar 8 arquivos.

**Ação:** Criar um `src/lib/constants.ts` com o número e funções helper para gerar links.

### 11. Fontes Google Fonts sem fallback adequado
As fontes carregam via Google Fonts CDN. Se falhar, cai para `sans-serif` genérico. Sem `font-display: swap` explícito no CSS (apenas no link do Google).

### 12. Faltam meta tags OG image
O `index.html` tem `og:title` e `og:description` mas não tem `og:image` — compartilhamentos em redes sociais ficam sem imagem preview.

### 13. Dark mode definido mas nunca ativado
Existe todo um theme `.dark` no CSS e `darkMode: ["class"]` no Tailwind, mas não há toggle nem detecção automática. Código morto.

### 14. `NavLink.tsx` criado mas nunca usado
Componente auxiliar de navegação existe mas não é importado em nenhum lugar.

### 15. Sem lazy loading nas seções abaixo do fold
Todas as seções carregam de uma vez. Para uma landing page com muitas imagens, falta code-splitting ou lazy loading dos componentes abaixo do fold.

---

## Plano de Implementação

### Fase 1 — Limpeza (deletar código morto)
- Deletar: `Hero.tsx`, `QuickAccess.tsx`, `BlogPreview.tsx`, `P13Usage.tsx`, `ProductsWater.tsx`, `CtaBanner.tsx`, `NavLink.tsx`
- Remover import de `Flame` no UrgencyBar

### Fase 2 — Constantes centralizadas
- Criar `src/lib/constants.ts` com número WhatsApp, funções de link, e configs
- Atualizar todos os 8 componentes para usar a constante

### Fase 3 — Correções de UX
- Traduzir NotFound para português + link de WhatsApp
- Adicionar `scroll-margin-top: 120px` nas seções com id
- Esconder WhatsAppFloat no mobile
- Corrigir imagem do P45 no PriceCards
- Adicionar validação mínima no formulário do hero (nome + telefone obrigatórios)

### Fase 4 — Unificação de conteúdo
- Mesclar Guarantees dentro de Differentials em uma seção única mais forte
- Remover Guarantees do Index

### Fase 5 — SEO e performance
- Adicionar `og:image` no index.html
- Adicionar `scroll-margin-top` via CSS para seções âncora
- Remover theme dark não utilizado

