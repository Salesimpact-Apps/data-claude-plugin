---
name: enriquecer-leads
description: Enriquece listas mistas de leads (CNPJ e/ou domínio, LinkedIn, razão social). Se a lista for só CNPJ, use enriquecer-cnpj-lote.
---

Se todos os itens tiverem só CNPJ, desvie para `submit_cnpj_enrichment`.
Caso contrário, use `enrich_company_list` (máx. 500 por chamada). Acima de 500, fatie e serialize.
Depois, se o usuário quiser contato, use as tools de contato por domínio/LinkedIn.
Entregue `.xlsx` via `export_workbook`. Não cite providers. Não peça chaves.
