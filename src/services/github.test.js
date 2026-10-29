import { afterEach, describe, expect, it, vi } from 'vitest';
import { ERROR_CODES } from '../lib/errors';
import { fetchPortfolioRepos, filterPortfolioRepos, mapRepo } from './github';

const raw = (overrides) => ({
  id: 1,
  name: 'meu-app',
  description: 'Descrição',
  language: 'JavaScript',
  stargazers_count: 2,
  forks_count: 0,
  topics: undefined,
  html_url: 'https://github.com/u/meu-app',
  homepage: '',
  pushed_at: '2026-10-01T00:00:00Z',
  created_at: '2026-09-01T00:00:00Z',
  fork: false,
  archived: false,
  ...overrides,
});

afterEach(() => vi.unstubAllGlobals());

describe('mapRepo', () => {
  it('converte para o formato do app e trata campos vazios', () => {
    const repo = mapRepo(raw());
    expect(repo).toMatchObject({ name: 'meu-app', stars: 2, topics: [], homepage: null });
    expect(repo.pushedAt).toBe('2026-10-01T00:00:00Z');
  });
});

describe('filterPortfolioRepos', () => {
  it('remove forks, repo de perfil e excluídos; ordena do mais recente ao mais antigo', () => {
    const repos = [
      mapRepo(raw({ id: 1, name: 'antigo', pushed_at: '2026-01-01T00:00:00Z' })),
      mapRepo(raw({ id: 2, name: 'novo', pushed_at: '2026-10-01T00:00:00Z' })),
      mapRepo(raw({ id: 3, name: 'fork-de-alguem', fork: true })),
      mapRepo(raw({ id: 4, name: 'Usuario' })),
      mapRepo(raw({ id: 5, name: 'escondido' })),
    ];
    const result = filterPortfolioRepos(repos, {
      username: 'usuario',
      excluded: ['escondido'],
    });
    expect(result.map((r) => r.name)).toEqual(['novo', 'antigo']);
  });
});

describe('fetchPortfolioRepos', () => {
  it('traduz o limite de requisições do GitHub em um erro específico', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('{}', { status: 403, headers: { 'x-ratelimit-remaining': '0' } }),
        ),
    );
    await expect(fetchPortfolioRepos('usuario')).rejects.toMatchObject({
      code: ERROR_CODES.RATE_LIMIT,
    });
  });

  it('traduz falha de rede em um erro de rede', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(fetchPortfolioRepos('usuario')).rejects.toMatchObject({
      code: ERROR_CODES.NETWORK,
    });
  });

  it('devolve a lista já filtrada quando a resposta é ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          Response.json([raw(), raw({ id: 2, name: 'fork', fork: true })]),
        ),
    );
    const repos = await fetchPortfolioRepos('usuario');
    expect(repos.map((r) => r.name)).toEqual(['meu-app']);
  });
});
