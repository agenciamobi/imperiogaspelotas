

# Ajustes de Logo, Horário, SEO Produtos e Páginas de Bairros

## 1. Logo no Footer — Aumentar tamanho
- `Footer.tsx`: Alterar `className="h-12"` para `h-20` na imagem do logo

## 2. Header — Esconder barra vermelha ao rolar
- `Header.tsx`: Envolver `<UrgencyBar />` com condição `{!scrolled && <UrgencyBar />}` para ocultar ao rolar
- Isso faz o header ficar mais limpo quando sólido/branco

## 3. Horário de Atendimento 09h–22h + Lógica do Contador
- `constants.ts`: Adicionar `DELIVERY_START_HOUR = 9`, atualizar `BUSINESS_HOURS = "Todos os dias das 09h às 22h"`
- `UrgencyBar.tsx`: Reescrever `calculateTimeLeft`:
  - **Antes das 09h**: "Faltam Xh Xmin para iniciarmos as entregas de hoje"
  - **Entre 09h–22h**: "Faltam Xh Xmin para encerrar entregas" (comportamento atual)
  - **Após 22h**: "Faltam Xh Xmin para iniciarmos as entregas de hoje" (conta até 09h do dia seguinte)

## 4. SEO Forte na Seção Produtos
- `ProductsGas.tsx`: Adicionar texto SEO rico com keywords locais (h2 com "Gás de Cozinha e Água Mineral em Pelotas"), parágrafo descritivo com bairros, schema `ItemList` inline
- `PriceCards.tsx`: Adicionar `title` e `alt` SEO-otimizados em cada produto (ex: "Botijão P13 Liquigás - Disk Gás Pelotas RS - Entrega Rápida"), adicionar microdados `itemScope itemType Product` nos cards

## 5. Páginas Dedicadas por Bairro — SEO/GEO/LEO/AEO
Criar um componente `BairroPage.tsx` reutilizável e rotas dinâmicas `/bairro/:slug`:

- **`src/pages/BairroPage.tsx`**: Página template com:
  - H1: "Disk Gás e Água em {Bairro} - Pelotas RS"
  - Texto SEO descritivo do serviço no bairro
  - Lista de produtos disponíveis
  - CTAs WhatsApp/Telefone
  - FAQ local (3 perguntas específicas do bairro)
  - JSON-LD `LocalBusiness` com `areaServed` específico do bairro
  - Meta tags dinâmicas via `document.title` e meta description
  - Link de volta para a home
  - Header e Footer reutilizados

- **`src/lib/bairros.ts`**: Array com dados dos 22 bairros (nome, slug, descrição curta)

- **`App.tsx`**: Adicionar rota `/bairro/:slug` apontando para `BairroPage`

- **`Footer.tsx`**: Alterar links dos bairros de `href="#contato"` para `href="/bairro/{slug}"` usando `<Link>` do react-router

- **`public/sitemap.xml`**: Adicionar URLs de cada bairro

## Arquivos Modificados
- `src/lib/constants.ts` — horário 09h
- `src/components/UrgencyBar.tsx` — lógica antes/depois do horário
- `src/components/Header.tsx` — esconder barra ao rolar
- `src/components/Footer.tsx` — logo maior + links bairros com rotas
- `src/components/ProductsGas.tsx` — SEO forte
- `src/components/PriceCards.tsx` — microdados produtos
- `src/lib/bairros.ts` — dados dos bairros (novo)
- `src/pages/BairroPage.tsx` — página dedicada (novo)
- `src/App.tsx` — rota bairro
- `public/sitemap.xml` — URLs bairros

