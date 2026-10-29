import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listFeaturedNames, setFeatured } from '../services/featured';
import { selectFeaturedRepos } from '../lib/featured';
import { useRepos } from './useRepos';

const featuredKey = ['featured'];

export function useFeaturedNames() {
  return useQuery({ queryKey: featuredKey, queryFn: listFeaturedNames });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ repoName, featured }) => setFeatured(repoName, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: featuredKey }),
  });
}

/** Projetos da home: os destacados no dashboard, ou os mais recentes como alternativa. */
export function useHomeProjects() {
  const repos = useRepos();
  const featured = useFeaturedNames();

  const projects = useMemo(
    () => (repos.data ? selectFeaturedRepos(repos.data, featured.data ?? []) : []),
    [repos.data, featured.data],
  );

  return {
    projects,
    // Falha nos destaques não quebra a home: ela só cai para os mais recentes.
    isLoading: repos.isPending || featured.isPending,
    error: repos.error,
    refetch: repos.refetch,
  };
}
