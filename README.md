<p align="center">
  <img src="logo.png" width="360" alt="Salesimpact">
</p>

<h1 align="center">Salesimpact Data</h1>

<p align="center">Plugin privado da Salesimpact para o Claude (web, Cowork e Code).</p>

Este repositório é o **marketplace público** do plugin. O produto em si é **privado**: só clientes e times autorizados, com conta e créditos Salesimpact, devem habilitá-lo.

Não é um plugin comunitário. Não envie chaves, tokens nem URLs de fontes de dados neste repositório ou no chat do Claude.

## O que o plugin faz

O plugin já aponta o MCP para `https://data-plugin.salesimpact.com.br/mcp`. Depois do login Salesimpact, o Claude passa a:

- buscar empresas brasileiras (CNPJ, domínio, razão social, LinkedIn)
- encontrar contatos (e-mail, telefone, discovery)
- enriquecer listas de CNPJ em lote e devolver planilha Salesimpact
- enriquecer leads mistos (até 500 por chamada)
- montar estudos de mercado (CNAE, UF, faixas) com análise e `.xlsx`

As fontes de dados ficam no servidor. O Claude só vê a marca Salesimpact, o saldo de créditos e as tools.

## Instalação (Claude Code)

```text
/plugin marketplace add Salesimpact-Apps/data-claude-plugin
/plugin install salesimpact@salesimpact
```

O plugin nasce **desabilitado**. Ao ligar, o conector já usa a URL do MCP. Faça o login na tela da Salesimpact — a senha não passa pelo Claude.

Validação local, se você tiver o CLI:

```powershell
claude plugin validate ./plugin
```

## Claude.ai e Cowork

1. Customize → Plugins → **+** → Add marketplace → repositório `Salesimpact-Apps/data-claude-plugin`
2. Browse plugins → Install em **Salesimpact Data**
3. Ligue o plugin. O conector já vem com a URL do MCP. Autorize na tela da Salesimpact.

Não cole `${user_config.mcp_url}` e não adicione um conector avulso. O MCP é componente do plugin.

## Atualizações

A versão está em `plugin/.claude-plugin/plugin.json` (`1.0.1`). O Claude usa essa string como chave de cache.

1. A Salesimpact publica um commit e **incrementa** `version`.
2. No Claude Code: `/plugin marketplace update` e depois `/plugin update`.

Push sem mudar a versão não chega no cliente.

## Skills

| Skill | Quando usar |
|-------|-------------|
| `estudo-de-mercado` | TAM, CNAE, “quantas empresas…”, análise + planilha |
| `enriquecer-cnpj-lote` | Lista de CNPJs (o servidor fatia em 10.000) |
| `enriquecer-leads` | Lista mista (CNPJ / domínio / LinkedIn / razão), máx. 500 |
| `buscar-empresas` | Lookup pontual no Brasil |
| `encontrar-contatos` | E-mail, telefone, discovery |
| `creditos` | Saldo, custo, `INSUFFICIENT_CREDITS` / `RATE_LIMITED` |

Agents: `market-analyst` e `lead-enricher`.

## Créditos

- 1 crédito Salesimpact por resultado encontrado. Sem match = 0.
- Discovery de contatos não cobra.
- Saldo insuficiente → `INSUFFICIENT_CREDITS`.
- Limite temporário → `RATE_LIMITED` + `retry_after_seconds`.

## O que este repositório não contém

Só a camada que o Claude instala: manifesto, skills, agents e o MCP com a URL pública do gateway.

Não há código do gateway, banco, deploy nem credenciais. Não peça e não cole API keys de terceiros.

## Uso

Material e marca da Salesimpact. Uso restrito a quem tiver autorização e créditos. Todos os direitos reservados.
