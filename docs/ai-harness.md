# Harness de IA

"Harness" é tudo que cerca o modelo para ele trabalhar do jeito do projeto: instruções, regras
de permissão, automações, procedimentos reutilizáveis e acesso a ferramentas. Tudo abaixo está
versionado no repositório.

## Ferramenta e modelo

- **Ferramenta:** Claude Code (agente de código com acesso ao repositório, terminal e hooks).
  Escolhido porque lê o projeto inteiro, executa lint/testes/build e roda os comandos do fluxo
  Git, em vez de só sugerir trechos de código. Também permite versionar as instruções (`CLAUDE.md`),
  skills, agentes e MCPs junto do código.
- **Modelo:** Claude Sonnet 5.5. Bom equilíbrio entre qualidade de código e velocidade/custo para
  um projeto com muitas iterações pequenas. Para uma decisão de arquitetura mais difícil seria
  possível trocar de modelo na mesma sessão.

## Mapa dos arquivos

```
CLAUDE.md                          instruções permanentes do projeto
.mcp.json                          conectores MCP (GitHub e Supabase)
.claude/
  settings.json                    permissões e hooks
  hooks/guard-main.sh              bloqueia commit/push direto na main
  hooks/format-file.sh             formata cada arquivo editado com Prettier
  skills/new-component/SKILL.md    como criar um componente
  skills/commit-conventional/      como commitar no padrão
  skills/feature-workflow/         da branch ao deploy
  agents/code-reviewer.md          revisor das convenções
  agents/perf-auditor.md           auditor de performance
.husky/ + commitlint + lint-staged verificação automática a cada commit
.github/workflows/ci.yml           mesmos checks no servidor
```

## O que cada peça faz e por que existe

| Peça                                    | O que faz                                                                                                                    | Por que escolhi                                                                                                                               |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`CLAUDE.md`**                         | Stack, arquitetura em camadas, regras ("componente não chama API"), nomenclatura, padrão de commits e branches, comandos     | É lido no início de toda sessão. Sem isso a IA "chuta" padrões e cada conversa começa do zero. Fica curto e objetivo para não gastar contexto |
| **`settings.json` (permissões)**        | Libera comandos seguros (lint, test, build, git status/add/commit) e **nega** ler `.env`, `--force`, `--no-verify`, `rm -rf` | Menos interrupções com o que é seguro e proteção contra o que seria grave. `.env` nunca entra no contexto da IA                               |
| **Hook `guard-main.sh`** (PreToolUse)   | Se a IA tentar `git commit`/`git push` na `main`, o comando é bloqueado e ela recebe a instrução de criar `feature/*`        | Instrução em texto pode ser ignorada; hook não pode. Garante a estratégia de branches                                                         |
| **Hook `format-file.sh`** (PostToolUse) | Roda Prettier no arquivo que a IA acabou de editar                                                                           | O código já nasce no padrão, antes do commit                                                                                                  |
| **Skill `new-component`**               | Passo a passo: escolher pasta, procurar em `ui/` antes de criar, separar lógica, três estados de dado, nomes                 | Tarefa repetida muitas vezes. A skill só é carregada quando necessária (economiza contexto)                                                   |
| **Skill `commit-conventional`**         | Confere branch, divide commits por assunto, roda checks e escreve a mensagem no padrão                                       | Padroniza o histórico. Se a mensagem sair fora do padrão, o `commitlint` ainda recusa                                                         |
| **Skill `feature-workflow`**            | Branch, camadas de baixo para cima, verificação, merge e deploy                                                              | Dá o fluxo completo para qualquer funcionalidade nova                                                                                         |
| **Agente `code-reviewer`**              | Revisa o diff contra as regras do projeto em um contexto separado, sem editar                                                | "Segunda opinião" sem o viés de quem escreveu o código; só lê (ferramentas limitadas)                                                         |
| **Agente `perf-auditor`**               | Roda o build, confere chunks e se `three`/Supabase vazaram para o pacote inicial                                             | Protege a meta de Lighthouse                                                                                                                  |
| **MCP GitHub**                          | Dá à IA acesso a issues e Pull Requests do repositório                                                                       | Permite abrir e revisar PRs sem sair da conversa                                                                                              |
| **MCP Supabase (somente leitura)**      | Deixa a IA consultar o esquema e os dados do banco                                                                           | `read_only=true` para a IA nunca alterar dados de produção. Token e ID vêm de variáveis de ambiente, fora do Git                              |

> **Antes de gravar o vídeo:** os MCPs precisam de `GITHUB_PERSONAL_ACCESS_TOKEN` e
> `SUPABASE_PROJECT_REF` no seu ambiente (veja `.env.example`). Mostre no vídeo só o que você
> realmente conectou e usou.

## Como o conjunto força cada padrão

| Padrão                        | Camada de instrução                               | Camada de automação                                                    |
| ----------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| Arquitetura em camadas        | `CLAUDE.md` (regras 1 a 7), skill `new-component` | Agente `code-reviewer` no diff                                         |
| Estilo e formatação           | `CLAUDE.md`                                       | Hook `format-file.sh`; `lint-staged` (ESLint + Prettier) no commit; CI |
| Mensagens de commit           | `CLAUDE.md`, skill `commit-conventional`          | `commitlint` via Husky `commit-msg`; permissão nega `--no-verify`      |
| Branches por funcionalidade   | `CLAUDE.md`, skill `feature-workflow`             | Hook `guard-main.sh` bloqueia commit/push na `main`                    |
| Nomenclatura                  | `CLAUDE.md`                                       | Revisão do `code-reviewer`                                             |
| Performance (chunks, imagens) | `CLAUDE.md` (regras 4 e 5)                        | Agente `perf-auditor`, `npm run analyze`                               |
| Segredos fora do Git          | `CLAUDE.md`                                       | Permissão nega ler `.env`; `.gitignore`; `.env.example`                |

A ideia central: **instrução diz o que fazer, automação impede o que não pode acontecer.** O que
é crítico (branch, commit, segredo) tem trava automática, não só pedido educado.

## Como eu conduzi a IA neste projeto

1. Li o enunciado e transformei os 12 requisitos em tarefas.
2. Montei o harness antes de escrever funcionalidades (primeira branch: `feature/harness-ia`).
3. Para cada funcionalidade: branch `feature/*`, implementação de baixo para cima
   (serviço, hook, componente, página), teste da regra principal e merge `--no-ff` na `main`.
4. Verifiquei o resultado no navegador (telas, estados de erro e carregamento, redirecionamento do
   painel) e com Lighthouse, em vez de confiar só no que a IA disse.
5. Fiz "teste de mutação" manual: quebrei de propósito o bloqueio do painel e do botão de envio
   para confirmar que os testes falham quando deveriam.
6. Revisei e entendi cada arquivo, porque preciso explicar o código na entrevista.
