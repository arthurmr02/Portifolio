import { useQuery } from '@tanstack/react-query';
import { siteConfig } from '../config/site';
import { fetchPortfolioRepos, fetchRepoLanguages } from '../services/github';

const reposKey = ['github', siteConfig.githubUsername, 'repos'];

/** Lista de repositórios. O cache global evita chamar a API de novo ao trocar de página. */
export function useRepos() {
  return useQuery({
    queryKey: reposKey,
    queryFn: ({ signal }) => fetchPortfolioRepos(siteConfig.githubUsername, { signal }),
  });
}

/** Um repositório pelo nome, lido do mesmo cache da lista (sem nova requisição). */
export function useRepo(name) {
  return useQuery({
    queryKey: reposKey,
    queryFn: ({ signal }) => fetchPortfolioRepos(siteConfig.githubUsername, { signal }),
    select: (repos) =>
      repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()) ?? null,
  });
}

export function useRepoLanguages(name) {
  return useQuery({
    queryKey: ['github', siteConfig.githubUsername, 'languages', name],
    queryFn: ({ signal }) =>
      fetchRepoLanguages(name, siteConfig.githubUsername, { signal }),
    enabled: Boolean(name),
  });
}
