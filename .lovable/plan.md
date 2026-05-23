## Objetivo

1. Corrigir a homepage para não renderizar mais textos antigos com `Liquigás` em atributos/SEO da home nem horários antigos com `22h`.
2. Adicionar ao Dashboard de Analytics uma seção de breakdown por `utm_source`, `utm_medium` e `utm_campaign`, para identificar campanhas que geram mais visitas.

## Correção da homepage

A inspeção da home mostra que os badges visíveis já estão corretos (`Revenda Autorizada`, `22:30h`), mas ainda há ocorrências renderizadas no DOM por atributos de imagem, títulos e JSON-LD de produtos da home.

Vou ajustar a homepage para:

- Trocar alt/title do hero e cards de produto removendo `Liquigás`.
- Remover `Liquigás` do JSON-LD de produtos renderizado na home (`ProductsGas`).
- Padronizar `Revenda autorizada` para `Revenda Autorizada` na seção de vantagens.
- Ajustar a lógica/texto do `UrgencyBar` para considerar fim às `22:30h`, evitando qualquer referência residual a `22h`.
- Manter `Liquigás` apenas onde for estritamente nome de arquivo/import interno, sem aparecer no DOM.

## Breakdown de UTM no Admin

### Backend de analytics

Criar uma função segura no banco:

```sql
analytics_utm_breakdown(from_ts, to_ts, lim)
```

Ela retorna agrupamentos por:

- `utm_source`
- `utm_medium`
- `utm_campaign`

Com métricas:

- pageviews
- visitantes únicos
- sessões
- bounce rate
- tempo médio na página
- percentual do tráfego do período

A função continuará protegida para admin via `has_role(auth.uid(), 'admin')`, seguindo o padrão das funções existentes.

### Frontend

Adicionar em `src/hooks/useAnalytics.ts`:

- `useUtmBreakdown(period)` usando a nova RPC.

Criar componente:

- `src/components/admin/analytics/UtmBreakdownTable.tsx`

Interface proposta:

- Card no Dashboard abaixo do gráfico e acima/ao lado da tabela de páginas.
- Tabela com colunas: Origem, Mídia, Campanha, Views, Únicos, Sessões, Bounce, Tempo médio, Participação.
- Agrupar valores vazios como `(direto)` / `(sem mídia)` / `(sem campanha)`.
- Ordenar por pageviews desc.
- Estado vazio: “Sem UTMs no período”.

### Dashboard

Atualizar `AdminDashboard.tsx` para incluir a nova seção de UTMs respeitando o filtro de período já existente (`Hoje`, `Ontem`, `7 dias`, `30 dias`).

## Verificação

- Rodar busca em `src/` por `22h`, `09h às 22h` e ocorrências renderizadas de `Liquigás` na homepage.
- Verificar via browser extract que a homepage não expõe mais `22h` nem `Revenda autorizada Liquigás`.
- Confirmar que o Dashboard carrega a nova tabela de UTMs sem quebrar as métricas existentes.