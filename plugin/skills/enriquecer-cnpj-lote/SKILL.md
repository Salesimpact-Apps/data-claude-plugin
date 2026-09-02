---
name: enriquecer-cnpj-lote
description: Enriquece listas de CNPJ (planilha, CSV ou colar). Até 10 mil por lote; acima disso o servidor quebra automaticamente. Devolve planilha Salesimpact. Use when the user sends CNPJs in bulk.
---

Nunca chame `lookup_company` em loop.

1. Extraia a coluna de CNPJ (máscara irrelevante).
2. `get_credit_balance` e avise se o pior caso (1 crédito por CNPJ) não couber.
3. Envie a lista **inteira** em `submit_cnpj_enrichment`. Quem fatia em 10.000 é o gateway:
   - 1–10.000 → 1 lote
   - 23.400 → 3 lotes
4. Faça poll de `enrichment_job_status` a cada 4–5 segundos. Relate "lote 2 de 3". Não cole linhas no chat.
5. Ao `done`, resuma matched/unmatched/créditos e entregue `download_url`.
6. Nome sugerido: `Salesimpact - Enriquecimento CNPJ - {data}.xlsx`.

Se o job falhar no meio, não reenvie tudo sem o usuário pedir.
