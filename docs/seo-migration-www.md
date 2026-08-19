# Migração SEO — www.imperiogaspelotas.com.br → imperiogaspelotas.com.br

## Objetivo

Consolidar a autoridade do domínio antigo `www.imperiogaspelotas.com.br` no domínio canônico `imperiogaspelotas.com.br`, preservando apenas URLs com equivalência real e evitando transportar conteúdo obsoleto, duplicado ou não confiável.

## Domínio canônico

Primário pretendido:

`https://imperiogaspelotas.com.br`

O host `www.imperiogaspelotas.com.br` deve apontar para a mesma publicação e redirecionar permanentemente para o domínio primário quando a configuração de domínio estiver concluída.

## Mapeamento confirmado

| URL antiga | Destino recomendado | Ação | Motivo |
|---|---|---|---|
| `https://www.imperiogaspelotas.com.br/` | `https://imperiogaspelotas.com.br/` | 301 | Mesma entidade e homepage |
| `https://www.imperiogaspelotas.com.br/agua-mineral-pelotas/` | `https://imperiogaspelotas.com.br/agua-mineral-pelotas` | 301 | Mesma intenção de busca; conteúdo novo substitui texto antigo |
| `https://www.imperiogaspelotas.com.br/blog/` | `https://imperiogaspelotas.com.br/guias` | 301 | Hub editorial antigo → hub editorial novo |
| `https://www.imperiogaspelotas.com.br/conheca-o-novo-site-da-companhia-de-caldas-gas-liquigas/` | sem equivalente | 404/410 | Anúncio institucional datado e sem valor equivalente atual |

## Conteúdo que não deve ser migrado literalmente

A página antiga de água mineral contém alegações de saúde e comparações com água de torneira/filtrada que não devem ser reaproveitadas no site atual. O redirecionamento deve preservar apenas a URL/intenção, levando para a nova página comercial factual de água mineral.

## Posts legados ainda sem destino confirmado

O índice antigo do blog menciona conteúdos sobre:

- gás;
- gás liquinho 5kg;
- disk gás mais próximo;
- botijão liquinho;
- botijão liquigas;
- venda de gas;
- gás pelotas;
- melhor água da cidade;
- gás de cozinha.

Não criar redirecionamentos em massa para a homepage. Primeiro confirmar a URL exata e a intenção de cada post. Só usar 301 quando existir uma página nova realmente equivalente.

Destinos candidatos, sujeitos a validação da URL antiga:

- conteúdos genéricos sobre gás em Pelotas → `/disk-gas-pelotas`;
- conteúdo sobre preço do P13 → `/preco-gas-pelotas`;
- conteúdo sobre segurança/manuseio → `/seguranca-botijao-gas`;
- conteúdo sobre P13 → `/produto/botijao-p13`;
- conteúdo sobre P08 → `/produto/botijao-p08`;
- conteúdo sobre Liquinho 2kg → `/produto/liquinho-2kg`;
- conteúdo sobre água mineral 20L → `/agua-mineral-pelotas` ou `/produto/agua-mineral-20l`, conforme intenção.

## Regras para a migração

1. Manter `imperiogaspelotas.com.br` como canonical em todas as páginas novas.
2. Conectar `www` e sem `www` ao mesmo projeto e definir apenas um domínio primário.
3. Preferir redirecionamentos HTTP 301 no host/servidor antigo para URLs com equivalência real.
4. Não redirecionar automaticamente todas as páginas antigas para a homepage.
5. Conteúdo obsoleto sem equivalente deve retornar 404 ou 410 depois do corte.
6. Preservar query strings quando tecnicamente possível, mas nunca permitir que UTMs alterem canonical.
7. Após o corte, atualizar sitemap e reenviar/validar no Search Console.
8. Monitorar URLs antigas por pelo menos algumas semanas após a migração.

## Pendências externas

- confirmar que `imperiogaspelotas.com.br` abre a publicação nova corretamente;
- conectar `www.imperiogaspelotas.com.br` ao projeto novo;
- definir o domínio sem `www` como Primary;
- implementar os 301 de caminhos legados no ambiente que hoje serve o WordPress antigo;
- recuperar acesso de leitura à propriedade do Search Console para acompanhar indexação e consultas;
- confirmar o endereço/NAP oficial antes de publicar Schema `LocalBusiness` com endereço físico.
