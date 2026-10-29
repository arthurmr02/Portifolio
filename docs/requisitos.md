# CP3 - Portfolio - Stack e Harness Engineering

# Visão geral

Você vai construir e publicar o seu próprio site de portfólio em React e apresentar as decisões de engenharia do projeto num vídeo que simula uma entrevista de emprego.

- **Formato:** individual
- **Entrega (na tarefa do Teams):**
  - Link do projeto no github
  - Link do projeto publicado na Vercel
  - Link do vídeo no modo não listado no Youtube
- **Prazo:** 03/11
- **Uso de IA:** liberado e esperado. Você deve saber explicar tudo o que está no seu código e mostrar como configurou e conduziu a IA durante o projeto.

### Inspirações

https://reactjsexample.com/24-best-free-open-source-react-portfolio-page-templates/

https://bruno-simon.com/

https://www.awwwards.com/websites/portfolio/

Os requisitos abaixo descrevem o que o site precisa fazer. Cada um traz, em itálico, algumas possibilidades de implementação. Elas servem de ponto de partida: você pode usar outras, desde que pesquise as alternativas, compare prós e contras e justifique a sua escolha.

## Requisitos do site

Todos os requisitos são obrigatórios.

### 1. Rotas

- Link individual para cada projeto (ex.: `/projetos/meu-app`)
- Página amigável para rota inexistente (404) e para falha no carregamento da API
- Link compartilhado abre direto na página certa, inclusive ao atualizar o navegador

_Possibilidades: React Router, TanStack Router, wouter, Next.js; configuração de redirecionamento no servidor (ex.: .htaccess)_

### 2. Estados de carregamento

- Todo dado vindo de API exibe os estados de carregamento, erro e lista vazia
- Indicador visual enquanto carrega (ex.: skeleton nos cards de projeto, spinner no envio do formulário)
- Botão de enviar bloqueado durante o envio, evitando mensagens duplicadas

_Possibilidades: skeleton ou spinner; estados com useState, Suspense, TanStack Query, SWR; react-loading-skeleton ou componentes da biblioteca de UI_

### 3. Integração com o GitHub

- Projetos carregados pela API do GitHub, sem cadastro manual
- Cada card exibe dados do repositório (ex.: descrição, linguagem, data da última atualização)

_Possibilidades: fetch, axios, TanStack Query; tratamento do limite de requisições da API_

### 4. Formulário de contato

- Validação por campo com mensagem específica (ex.: "e-mail inválido", "mensagem com no mínimo 20 caracteres")
- Mensagem enviada por e-mail ao dono do site e salva para consulta no dashboard
- Feedback de sucesso ou erro após o envio

_Possibilidades: validação manual, React Hook Form, Formik; Zod, Yup; EmailJS, Formspree, backend próprio_

### 5. Dashboard do dono

- Acesso protegido por login, redirecionando quem não está autenticado
- Lista das mensagens recebidas, com opção de marcar como respondida
- Seleção dos projetos que aparecem em destaque na home

_Possibilidades: Supabase, Firebase, Appwrite, PocketBase, backend em Node; rotas protegidas; Context, Zustand, Redux Toolkit ou nenhuma biblioteca de estado_

### 6. Preferências do visitante

- Tema claro/escuro persistido entre visitas (ex.: o site abre no escuro se o visitante saiu no escuro)

_Possibilidades: Context + localStorage, Zustand, bibliotecas de tema_

### 7. Interface

- Layout responsivo testado em celular e desktop
- Componentes visuais reaproveitados (ex.: o mesmo botão e o mesmo card em todas as páginas)
- Identidade visual própria, podendo incluir elementos 3D interativos (ex.: objeto na home que reage ao mouse ou à rolagem)

_Possibilidades: CSS puro, CSS Modules, Tailwind, shadcn/ui, MUI, Mantine; Three.js, React Three Fiber, Spline_

### 8. Performance

- Nota mínima de 80 em performance no Lighthouse, em modo mobile
- Imagens otimizadas em formato e tamanho, carregadas só quando aparecem na tela
- Dashboard e elementos pesados (ex.: cena 3D) carregados sob demanda, fora do pacote inicial do visitante
- Sem saltos de layout durante o carregamento
- Sem requisições repetidas à API do GitHub ao navegar entre páginas

_Possibilidades: React.lazy + Suspense, divisão por rota; WebP ou AVIF, loading="lazy", sharp; cache com TanStack Query ou SWR; memo e useMemo; rollup-plugin-visualizer; Lighthouse e PageSpeed Insights_

### 9. Testes

- Testes automatizados cobrindo, no mínimo, a validação do formulário e o bloqueio do dashboard sem login

_Possibilidades: Vitest + Testing Library, Playwright_

### 10. Deploy

- Site publicado com URL pública
- Publicação automática a cada push na branch principal

_Possibilidades: Vercel, Netlify, Hostinger, Locaweb, HostGator, KingHost; deploy via GitHub Actions_

### 11. Versionamento

- Commits seguindo um padrão de mensagem definido (ex.: `feat: adiciona validação do formulário de contato`)
- Estratégia de branches definida, com cada funcionalidade desenvolvida em branch própria e integrada à principal (ex.: `feature/dashboard`)
- Padrões descritos no README e nas instruções do projeto para a IA, para que ela também os siga

_Possibilidades: Conventional Commits, Gitmoji; commitlint + Husky; GitHub Flow, Git Flow, trunk-based; pull requests e proteção da branch principal_

### 12. Arquitetura e padronização do código

- Estrutura de pastas com responsabilidades claras (ex.: `components`, `pages`, `services`, `hooks`)
- Componentes pequenos e reaproveitáveis, com a lógica separada da apresentação (ex.: chamadas à API em `services` ou em hooks personalizados, fora dos componentes visuais)
- Convenções de nomenclatura definidas (ex.: componentes em PascalCase, hooks começando com `use`), descritas no README e nas instruções do projeto para a IA
- Padrão de código verificado automaticamente (ex.: lint e formatação aplicados antes de cada commit)

_Possibilidades: organização por tipo de arquivo ou por funcionalidade (feature-based), atomic design; hooks personalizados; ESLint, Prettier, Biome; Husky + lint-staged; TypeScript_

## Repositório

- Repositório público no GitHub, com histórico de commits distribuído ao longo do prazo
- Arquivo `.env` fora do repositório, com um `.env.example` indicando as variáveis necessárias
- README com informações sobre o projeto, tecnologias utilizadas e instruções para rodar o projeto

## Vídeo de entrevista

Imagine que você está numa entrevista técnica para uma vaga de desenvolvimento front-end e o entrevistador pediu para você apresentar o seu portfólio, com foco na stack tecnológica e no harness de IA que você montou para desenvolvê-lo.

- Duração máxima de 8 minutos
- Rosto e tela visíveis durante todo o vídeo
- Publicado no YouTube como **não listado**

O vídeo deve cobrir três partes:

1. **Stack e arquitetura:** apresente as tecnologias do projeto e como elas se conectam. Use elementos visuais como um diagrama simples da estrutura de pastas e do fluxo de dados, explique o critério usado para dividir os componentes e o caminho de uma alteração desde a branch até o deploy.
2. **Justificativas da stack:** para cada escolha relevante, diga quais opções você comparou, qual critério usou e o que aceitou perder.
3. **Harness de IA:** apresente o conjunto que você montou para trabalhar com a IA neste projeto e justifique cada escolha, como fez com a stack:
   - ferramenta e modelo utilizados, e por que eles
   - instruções do projeto, skills, conectores/MCPs e agentes configurados, mostrando os arquivos versionados no repositório
   - como esse conjunto faz a IA seguir os padrões de arquitetura, código, commits e branches do projeto
