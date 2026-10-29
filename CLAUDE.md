# Portfólio React: instruções para a IA

Site de portfólio individual em React. Os projetos vêm da API do GitHub, as mensagens
de contato ficam no Supabase e o dono gerencia tudo em um painel protegido por login.
Idioma do site e dos textos: português do Brasil. Não use travessão (—) em textos.

## Comandos

- `npm run dev`: servidor local
- `npm run lint` e `npm run format:check`: padrão de código
- `npm test`: Vitest (rode antes de abrir qualquer merge)
- `npm run build`: build de produção; `npm run analyze` mostra o tamanho dos chunks

## Stack (não troque sem registrar em docs/stack-decisions.md)

React 19 + Vite, JavaScript (sem TypeScript), Tailwind CSS v4, React Router v7,
TanStack Query, React Hook Form + Zod, Supabase (auth e banco), Formspree (e-mail),
React Three Fiber (cena 3D), Vitest + Testing Library. Deploy na Vercel.

## Arquitetura (camadas e responsabilidades)

```
src/
  app/          App, rotas (routes.jsx), layouts e providers globais
  pages/        uma página por rota; só monta componentes e chama hooks
  components/
    ui/         peças genéricas reutilizadas (Button, Card, Skeleton, QueryState...)
    layout/     Header, Footer, ThemeToggle
    home/ projects/ contact/ dashboard/   componentes por funcionalidade
  hooks/        lógica com estado e chamadas a serviços (useRepos, useContactForm...)
  services/     único lugar que fala com APIs externas (GitHub, Supabase, Formspree)
  schemas/      validação com Zod
  contexts/     tema e autenticação (Provider em .jsx, contexto em .js)
  lib/          funções puras (formatação, erros, seleção de destaques)
  config/       variáveis de ambiente e textos do site
```

Regras que a IA deve respeitar:

1. Componente visual não chama `fetch`, Supabase nem GitHub. Isso vai em `services/`
   e é consumido por um hook em `hooks/`.
2. Todo dado remoto trata três estados: carregando (skeleton), erro (com "tentar de
   novo") e vazio. Use o componente `QueryState`.
3. Reaproveite `ui/` antes de criar algo novo. Botão é sempre `Button`, cartão é `Card`.
4. Itens pesados (cena 3D, painel, Supabase) entram por `import()` dinâmico ou
   `lazy` de rota. Nunca importe `three` ou `@supabase/supabase-js` no pacote inicial.
5. Sem salto de layout: skeletons com a mesma altura do conteúdo, imagens com
   `width`/`height`, `loading="lazy"` fora da primeira dobra.
6. Dados do GitHub usam o cache do TanStack Query (`staleTime` de 10 min). Não crie
   `queryKey` novas para os mesmos repositórios.
7. Segredos nunca vão para o Git. Variáveis do app começam com `VITE_` e são públicas;
   toda variável nova entra em `.env.example`.

## Convenções de nome

- Componentes e arquivos de componente: `PascalCase.jsx` (`ProjectCard.jsx`)
- Hooks: `useCamelCase.js`, sempre começando com `use`
- Serviços, libs, schemas: `camelCase.js`
- Testes ao lado do arquivo testado: `ContactForm.test.jsx`
- Constantes: `UPPER_SNAKE_CASE`; código e comentários em português sem acentos
  desnecessários nos identificadores (nomes de variáveis em inglês, textos ao usuário
  em português)
- Um componente por arquivo, com `export default`; hooks e funções com export nomeado

## Git

- Commits no padrão Conventional Commits, em português, no imperativo:
  `feat: adiciona validação do formulário de contato`
  Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `chore`, `ci`.
  O `commitlint` (Husky `commit-msg`) recusa mensagens fora do padrão.
- GitHub Flow: `main` é sempre publicável e cada push nela faz deploy na Vercel.
  Cada funcionalidade nasce em `feature/<nome>`, correções em `fix/<nome>`.
  Integre com merge `--no-ff` (ou Pull Request) depois de lint, testes e build passando.
- Nunca commite direto na `main` nem use `--no-verify`. Um hook em
  `.claude/hooks/guard-main.sh` bloqueia isso.
- Commits pequenos e frequentes, um assunto por commit.

## Qualidade antes de terminar qualquer tarefa

1. `npm run lint && npm run format:check`
2. `npm test`
3. `npm run build` (confira se `three` e `supabase-js` continuam em chunks separados)

O hook `PostToolUse` já formata cada arquivo editado com o Prettier; o `lint-staged`
roda ESLint e Prettier de novo a cada commit.

## O que NÃO fazer

- Não adicionar dependência sem justificar no commit e em `docs/stack-decisions.md`.
- Não cadastrar projetos manualmente: eles vêm sempre do GitHub.
- Não ler nem imprimir `.env`.
- Não mudar `vercel.json` (o rewrite para `index.html` mantém links diretos funcionando).
