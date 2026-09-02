---
name: creditos
description: Explica saldo, custo estimado e erros de crédito ou limite. Use when the user asks about créditos, saldo, custo, RATE_LIMITED or INSUFFICIENT_CREDITS.
---

Use `get_credit_balance`.
Regra geral: 1 crédito Salesimpact por resultado encontrado. Discovery de contatos não cobra. Sem match = 0.
Lotes: pior caso = 1 crédito por CNPJ. Avise antes de submeter.
Nunca peça chave de API de provider. Prefira lote a N lookups.
`INSUFFICIENT_CREDITS` = saldo baixo. `RATE_LIMITED` = aguarde `retry_after_seconds` e tente de novo.
