## Objetivo

Eliminar todas as ocorrências remanescentes de "Revenda Autorizada Liquigás" (deixando apenas "Revenda Autorizada") e padronizar horários que ainda mostram "22h" para "22:30h" nos contextos de atendimento/entrega.

## Diagnóstico

A correção anterior atualizou apenas `site-content-defaults.ts` (fallback). O conteúdo real exibido vem da tabela `site_content` no banco, que ainda contém os textos antigos:

- `hero.benefits` → "Revenda autorizada Liquigás" e "Atendimento até às 22h"
- `social_proof.badges` → "Revenda autorizada Liquigás" e "Entregas todos os dias até 22h"
- `faq.items` → 4 respostas mencionam "revenda autorizada Liquigás" e "8h às 22h"
- `global.business_hours` → "Todos os dias das 09h às 22h"

Há também ocorrências no código que não foram atualizadas:

- `src/lib/constants.ts` → `BUSINESS_HOURS = "09h às 22h"`
- `src/lib/site-content-defaults.ts` linhas 6, 59 → "business_hours" e card "Revenda autorizada"
- `src/lib/pages-data.ts` → FAQs e descrições com "09h às 22h" e "Revenda Autorizada Liquigás"
- `src/lib/bairros.ts` → descrição com "09h às 22h"
- `src/pages/BairroPage.tsx` → FAQ dinâmica "09h às 22h"

> Observação: a marca "Liquigás" será mantida nos nomes de produto e `schema.org` Brand (ex.: "Botijão P13 Liquigás"), porque ali é identificação do produto, não posicionamento da revenda. Será removida apenas quando aparecer na frase "Revenda Autorizada Liquigás" ou similar.

## Plano de execução

### 1. Sincronizar banco (`site_content`)

Migration SQL com `UPDATE` em registros existentes:

- `hero.benefits[1].text` → "Revenda Autorizada"
- `hero.benefits[2].text` → "Atendimento até às 22:30h"
- `social_proof.badges[0].text` → "Revenda Autorizada"
- `social_proof.badges[1].text` → "Entregas todos os dias até 22:30h"
- `faq.items[*].a/q` → substituir "revenda autorizada Liquigás"/"Liquigás são seguros" por "Revenda Autorizada"/"são seguros"; trocar "8h às 22h" e "09h às 22h" por "09h às 22:30h"
- `global.business_hours` → "Todos os dias das 09h às 22:30h"

Uso de `jsonb_set` + `regexp_replace` por registro.

### 2. Atualizar fallback e constantes

- `src/lib/constants.ts`: `BUSINESS_HOURS = "Todos os dias das 09h às 22:30h"`
- `src/lib/site-content-defaults.ts`: `business_hours` e card "Revenda autorizada" → texto normalizado

### 3. Atualizar conteúdo estático de páginas

- `src/lib/pages-data.ts` (≈10 ocorrências de "09h às 22h" + 2 de "Revenda Autorizada" / "Liquigás" no contexto de revenda)
- `src/lib/bairros.ts` (descrição Obelisco)
- `src/pages/BairroPage.tsx` (FAQ template das LPs de bairro)
- `src/pages/LandingPromo.tsx` (já estava OK, conferir)

### 4. JSON-LD / SEO

- `src/pages/PageTemplate.tsx` e `src/pages/BairroPage.tsx`: `openingHours: "Mo-Su 09:00-22:30"`

### 5. Não alterar

- Nomes de produto / `Brand: Liquigás` em schema.org dos produtos
- `mascote-liquigas.png` (asset)
- Lógica do `UrgencyBar` (cálculo do próximo dia após 22h) — pode permanecer; ajuste de horário de corte é uma decisão à parte e não foi pedido.

### 6. Memória

Atualizar `mem://index.md` Core: "Open 09:00-22:00" → "Atendimento 09:00-22:30".

## Verificação

- `rg -i "revenda autorizada liquig|às 22h|09h às 22h"` em `src/` deve retornar vazio.
- `psql` consulta em `site_content` confirma textos atualizados.
- Preview da home mostra badges/benefícios já com novos textos.
