---
name: buscar-empresas
description: Lookup pontual de empresas brasileiras por CNPJ, domínio, razão social, LinkedIn, grupo econômico, filiais ou padrão de e-mail.
---

Use `lookup_company` para match exato (CNPJ, domínio sem URL, LinkedIn, razão social).
Use `search_company` quando o nome for aproximado; depois confirme com `lookup_company`.
Domínio: `totvs.com.br`, nunca `https://www.totvs.com.br/contato`.
Grupo econômico: `lookup_economic_group`. Padrão de e-mail: `lookup_email_pattern`.
Nunca faça lookup em loop para listas — use `submit_cnpj_enrichment`.
Não cite fontes externas. Não peça chaves.
