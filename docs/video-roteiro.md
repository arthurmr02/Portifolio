# Roteiro do vídeo de entrevista (máximo 8 min)

Regras: rosto e tela visíveis o tempo todo, máximo de 8 minutos, YouTube **não listado**.
Fale como em uma entrevista: direto, com o "porquê" de cada escolha. Os tempos abaixo somam 7min45.

## 0:00 a 0:30 | Abertura

"Oi, eu sou o Arthur. Vou apresentar meu portfólio com foco em duas coisas: a stack e a
arquitetura do site, e o conjunto de IA (o harness) que montei para desenvolvê-lo."

Na tela: o site publicado na home (mostre rapidamente a cena 3D reagindo ao mouse e o tema claro/escuro).

## 0:30 a 3:00 | Parte 1: Stack e arquitetura

**Tecnologias (0:30)** Mostre a tabela de stack do README. Uma frase por tecnologia: React + Vite,
Tailwind, React Router, TanStack Query, React Hook Form + Zod, Supabase, Formspree, React Three Fiber, Vitest, Vercel.

**Estrutura de pastas e critério de divisão (1:00)** Mostre a árvore `src/` no editor.

- `pages` só compõem; `components/ui` é genérico e reaproveitado (Button, Card, Field, QueryState);
  componentes de funcionalidade conhecem o domínio (ProjectCard).
- Regra de ouro: componente não fala com API. Fica em `services/`, vira estado em `hooks/`.

**Fluxo de dados (1:40)** Mostre o diagrama do README. Exemplo ao vivo: `ProjectsPage` chama
`useRepos` (hook), que usa TanStack Query, que chama `services/github.js`, que chama a API. Cache de 10 min:
navegue entre páginas com a aba Network aberta e mostre que a API do GitHub não é chamada de novo.

**Da branch ao deploy (2:20)** Mostre `git log --graph --oneline`: branch `feature/*`, commit
no padrão, hook do Husky (lint-staged + commitlint), merge `--no-ff` na `main`, CI no GitHub Actions
e deploy automático da Vercel. Abra a aba Actions e o painel da Vercel.

## 3:00 a 5:00 | Parte 2: Justificativas da stack

Use `docs/stack-decisions.md`. Para cada escolha: **comparei X e Y, usei o critério Z, aceitei perder W.**
Escolha de 5 a 6 para dar tempo. Sugestão:

1. **Vite em vez de Next** | site é SPA, sem SEO pesado; aceitei perder SSR. (20 s)
2. **TanStack Query em vez de useEffect** | cache resolve "sem requisições repetidas" e dá loading/erro/retry. (25 s)
3. **Tailwind em vez de MUI** | identidade visual própria e tema por variáveis CSS; aceitei classes longas. (20 s)
4. **Supabase em vez de backend próprio** | Postgres + login + RLS sem servidor; aceitei dependência externa. (25 s)
5. **React Hook Form + Zod** | poucos re-renders e schema testável sozinho. (20 s)
6. **Three.js sob demanda** | custa ~240 kB, então só carrega em tela larga e no ocioso; no celular entra um SVG. Mostre o `npm run analyze` / aba Network. (30 s)

Se sobrar tempo: JavaScript em vez de TypeScript (o que aceitei perder) e GitHub Flow em vez de Git Flow.

## 5:00 a 7:30 | Parte 3: Harness de IA

Use `docs/ai-harness.md`. Mostre os **arquivos versionados** no editor.

**Ferramenta e modelo (5:00)** Claude Code, modelo Claude Sonnet 5.5. Por quê: lê o repositório inteiro, executa
lint/testes/git, e permite versionar as instruções. Sonnet pelo equilíbrio entre qualidade e velocidade.

**Instruções (5:25)** Abra o `CLAUDE.md`: stack, camadas, regras, nomenclatura, commits e branches. "É lido toda sessão."

**Automação (5:50)** Abra `.claude/settings.json` e os hooks. Demonstre ao vivo: peça à IA para fazer
commit estando na `main` e mostre o `guard-main.sh` bloqueando. Mostre o `format-file.sh` formatando.
Frase-chave: "instrução diz o que fazer; hook impede o que não pode acontecer."

**Skills e agentes (6:35)** Abra `new-component`, `commit-conventional`, `feature-workflow` e os agentes
`code-reviewer` e `perf-auditor`. Explique: skills carregam só quando preciso (economiza contexto); agentes
rodam em contexto separado, só leitura, dando uma "segunda opinião".

**MCPs (7:05)** GitHub (PRs e issues) e Supabase em modo somente leitura (a IA nunca altera dados de produção).
Mostre o `.mcp.json` e que o token vem de variável de ambiente.

**Como força os padrões (7:20)** Mostre a tabela "Como o conjunto força cada padrão": arquitetura, estilo,
commits, branches, nomenclatura, performance, segredos.

## 7:30 a 7:45 | Fechamento

"Usei a IA para acelerar, mas revisei e sei explicar cada arquivo. Obrigado!"

## Checklist antes de gravar

- [ ] Links do README preenchidos e site publicado funcionando
- [ ] Supabase, Formspree e variáveis da Vercel configurados (teste o formulário e o painel antes)
- [ ] MCPs conectados (só mostre o que realmente usou)
- [ ] Abas prontas: site, editor com a árvore `src/`, terminal com `git log --graph --oneline`, GitHub Actions, Vercel, Network
- [ ] Fechar abas e notificações com dados pessoais; esconder `.env` e tokens
- [ ] Gravação com rosto e tela visíveis, no máximo 8 minutos
- [ ] YouTube: visibilidade **Não listado**; copie o link para a tarefa do Teams

## Perguntas que o "entrevistador" pode fazer

- _Por que não TypeScript?_ Prazo e foco em arquitetura; Zod valida nas bordas; migraria em um projeto maior.
- _Como você garante que o painel é seguro?_ Duas camadas: a rota é protegida no front, mas a segurança de verdade é a RLS no
  Supabase (visitante só insere mensagens; só o usuário autenticado lê) e cadastro público desativado.
- _E se o GitHub limitar as requisições?_ O serviço identifica o limite e mostra mensagem específica; o cache de 10 min reduz as chamadas.
- _O que você faria com mais tempo?_ Testes de ponta a ponta (Playwright), paginação de repositórios, imagens próprias otimizadas (WebP/AVIF) e i18n.
- _Como você sabe que a IA não errou?_ Testes, lint, build, revisão do diff, agente revisor, verificação no navegador e Lighthouse.
