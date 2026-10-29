import { siteConfig } from '../config/site';
import { AppError, ERROR_CODES } from '../lib/errors';

const API_URL = 'https://api.github.com';

async function request(path, { signal } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new AppError('Falha de rede ao falar com o GitHub', {
      code: ERROR_CODES.NETWORK,
      cause: error,
    });
  }

  if (response.ok) return response.json();

  const rateLimited =
    response.status === 429 ||
    (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0');
  if (rateLimited) {
    throw new AppError('Limite de requisições do GitHub atingido', {
      code: ERROR_CODES.RATE_LIMIT,
      status: response.status,
    });
  }
  if (response.status === 404) {
    throw new AppError('Recurso não encontrado no GitHub', {
      code: ERROR_CODES.NOT_FOUND,
      status: 404,
    });
  }
  throw new AppError(`GitHub respondeu ${response.status}`, { status: response.status });
}

/** Converte o formato da API do GitHub para o formato usado pelo app. */
export function mapRepo(raw) {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    language: raw.language,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    topics: raw.topics ?? [],
    url: raw.html_url,
    homepage: raw.homepage || null,
    pushedAt: raw.pushed_at,
    createdAt: raw.created_at,
    isFork: raw.fork,
    isArchived: raw.archived,
  };
}

/** Remove forks, o repositório de perfil e os repos excluídos por configuração. */
export function filterPortfolioRepos(repos, { username, excluded = [] }) {
  const hidden = new Set([username.toLowerCase(), ...excluded]);
  return repos
    .filter((repo) => !repo.isFork && !hidden.has(repo.name.toLowerCase()))
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
}

export async function fetchPortfolioRepos(
  username = siteConfig.githubUsername,
  { signal } = {},
) {
  const raw = await request(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
    { signal },
  );
  return filterPortfolioRepos(raw.map(mapRepo), {
    username,
    excluded: siteConfig.excludedRepos,
  });
}

/** Retorna bytes por linguagem, ex.: { JavaScript: 12000, CSS: 3000 }. */
export function fetchRepoLanguages(
  repoName,
  username = siteConfig.githubUsername,
  { signal } = {},
) {
  return request(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/languages`,
    { signal },
  );
}
