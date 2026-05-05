# Correção do Mix de Produtos + Reforço de SEO

## Mix correto (conforme print enviado)
1. **Botijão P13** — Residencial (mais pedido)
2. **Botijão P08** — Comercial (pequenos comércios)
3. **Liquinho 2kg** — Portátil
4. **Água Mineral 20L** — Hidratação

Remover todas as menções a P45, P90, P02, P05, P20 e a "gás comercial/industrial P45" do site público.

## 1. Assets de imagens
Copiar os arquivos enviados para `src/assets/`:
- `user-uploads://gas_p13.avif` → `src/assets/botijao-p13.avif` (substitui o atual)
- `user-uploads://gas_p08.avif` → `src/assets/botijao-p08.avif` (novo)
- `user-uploads://gas_p20.avif` → `src/assets/liquinho-p2.avif` (novo, 2kg "liquinho")
- Manter `agua-mineral.png` existente

(O `botijao-p02.png` antigo será descontinuado.)

## 2. Front-end — textos e cards

**`src/components/PriceCards.tsx`**
- Trocar grid para 4 colunas (`md:grid-cols-2 lg:grid-cols-4`)
- Atualizar array `products` para os 4 itens do print, com badges:
  - P13: "Mais Pedido" (destaque amarelo)
  - P08: "Comercial"
  - Liquinho 2kg: "Portátil"
  - Água 20L: "Hidratação"
- Alts e seoTitles atualizados com cauda longa: ex. "Botijão P08 para pequenos comércios em Pelotas RS — entrega rápida pelo WhatsApp"

**`src/components/ProductsGas.tsx`**
- Subtítulo: "Botijão P13, P08, Liquinho 2kg e Água Mineral 20L com entrega rápida em Pelotas RS"
- Schema `ItemList` reescrito com 4 produtos corretos
- Título H2 mantém "Gás de Cozinha e Água Mineral em Pelotas"

**`src/components/FAQ.tsx`**
- Substituir "P13, P45 e P90" por "P13, P08 e Liquinho 2kg"
- Reescrever a pergunta sobre comércios apontando P08 como solução comercial

**`src/components/Footer.tsx`**
- Trocar links: P13, P08, Liquinho 2kg, Água Mineral
- Remover "Botijão P45" e "Gás Comercial"

**`src/pages/BairroPage.tsx`**
- Trocar referências P45 → P08; ajustar `desc` e schema JSON-LD

## 3. Páginas de produto (`src/lib/pages-data.ts`)
- **Remover** páginas: `botijao-p45`, `gas-comercial`
- **Adicionar** páginas: `botijao-p08`, `liquinho-2kg`
- Atualizar descrição das páginas "home/entrega" para refletir o mix correto
- FAQs por produto com palavras-chave de cauda longa:
  - "qual o preço do botijão P08 em Pelotas"
  - "onde comprar liquinho 2kg em Pelotas RS"
  - "gás portátil para fogareiro Pelotas"

## 4. SEO — palavras-chave fluidas (não keyword stuffing)

**`index.html`**
- `<meta description>`: reescrever mencionando "Botijão P13, P08, Liquinho 2kg portátil e galão de água mineral 20L em Pelotas RS — entrega rápida via WhatsApp todos os dias das 09h às 22h"
- `<meta keywords>`: ajustar removendo P45/P90/P02 e adicionando: "botijão P08 Pelotas", "gás P08 comercial Pelotas", "liquinho 2kg Pelotas", "gás portátil Pelotas", "gás camping Pelotas", "botijão pequeno Pelotas", "recarga liquinho Pelotas"
- JSON-LD: substituir produtos no `Product`/`ItemList`/`OfferCatalog` para os 4 corretos
- FAQ schema: atualizar respostas P02..P90 → P13/P08/Liquinho 2kg

**Cauda longa fluida em copy** (inserir naturalmente em parágrafos existentes, sem repetir mecanicamente):
- ProductsGas, Differentials, BairroPage, pages-data: usar variações como
  - "entrega de botijão de gás 13kg em Pelotas RS no mesmo dia"
  - "onde comprar liquinho 2kg em Pelotas para fogareiro e camping"
  - "botijão P08 ideal para pequenos comércios e food trucks em Pelotas"
  - "água mineral 20L com entrega em domicílio em Pelotas todos os dias"

## 5. Memória de projeto
Atualizar `mem://negocio/mix-produtos` com a lista oficial:
P13 (residencial), P08 (comercial), Liquinho 2kg (portátil), Água 20L.

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/assets/` | Copiar 3 imagens novas (.avif) |
| `src/components/PriceCards.tsx` | 4 cards + badges |
| `src/components/ProductsGas.tsx` | Texto + JSON-LD |
| `src/components/FAQ.tsx` | Atualizar produtos |
| `src/components/Footer.tsx` | Links de produto |
| `src/pages/BairroPage.tsx` | P45→P08, schema |
| `src/lib/pages-data.ts` | Remover P45/comercial, criar P08/Liquinho |
| `src/lib/bairros.ts` | Ajustar descrições |
| `index.html` | Meta tags + JSON-LD + FAQ |
| `mem://negocio/mix-produtos` | Atualizar regra |
