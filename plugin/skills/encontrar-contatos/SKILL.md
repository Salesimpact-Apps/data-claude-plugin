---
name: encontrar-contatos
description: Encontra e-mail, telefone ou perfil a partir de LinkedIn, domínio+nome, e-mail reverso, ou discovery de ICP.
---

- E-mail: `find_contact_email` (LinkedIn OU domínio + nome + sobrenome)
- Telefone: `find_contact_phone`
- A partir de um e-mail: `lookup_by_email`
- Lista por domínio/cargo: `search_contacts_by_domain`
- Discovery sem e-mail/tel: `discover_contacts` (grátis em créditos); depois enriqueça com find_contact_*
- Empresas globais: `discover_companies`

Se o alvo for empresa brasileira, resolva a empresa primeiro (`lookup_company` / lote) e use o domínio no contato.
`list_filter_values` para indústria, país, faixas.
Entregas tabulares via `export_workbook`.
