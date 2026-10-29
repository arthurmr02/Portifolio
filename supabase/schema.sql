-- Esquema do banco do portfólio. Cole no SQL Editor do Supabase e execute uma vez.
--
-- ANTES: em Authentication > Providers > Email, desative "Allow new users to sign up"
-- e crie manualmente o seu usuário (Authentication > Users > Add user).
-- Assim, o único usuário autenticado possível é o dono, e as políticas abaixo
-- (que liberam o papel "authenticated") valem só para ele.

-- Mensagens do formulário de contato ------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 80),
  email      text not null check (char_length(email) between 5 and 254),
  message    text not null check (char_length(message) between 20 and 1000),
  replied    boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Qualquer visitante pode ENVIAR, mas não consegue ler nem alterar.
create policy "visitantes podem enviar mensagens"
  on public.messages for insert
  to anon, authenticated
  with check (replied = false);

-- Só o dono lê e marca como respondida.
create policy "dono le mensagens"
  on public.messages for select
  to authenticated
  using (true);

create policy "dono atualiza mensagens"
  on public.messages for update
  to authenticated
  using (true) with check (true);

-- Projetos em destaque na home -----------------------------------------------
create table if not exists public.featured_repos (
  repo_name  text primary key check (char_length(repo_name) between 1 and 100),
  created_at timestamptz not null default now()
);

alter table public.featured_repos enable row level security;

-- Todos leem (a home é pública); só o dono escreve.
create policy "todos leem destaques"
  on public.featured_repos for select
  to anon, authenticated
  using (true);

create policy "dono cria destaques"
  on public.featured_repos for insert
  to authenticated
  with check (true);

create policy "dono atualiza destaques"
  on public.featured_repos for update
  to authenticated
  using (true) with check (true);

create policy "dono remove destaques"
  on public.featured_repos for delete
  to authenticated
  using (true);
