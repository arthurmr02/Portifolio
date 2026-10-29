export const DEFAULT_FEATURED_COUNT = 3;

/**
 * Decide quais projetos aparecem em destaque na home.
 * - Se o dono marcou destaques no dashboard, usa exatamente esses (na ordem marcada).
 * - Se não marcou nenhum (ou o banco está indisponível), mostra os mais recentes.
 */
export function selectFeaturedRepos(
  repos,
  featuredNames,
  fallbackCount = DEFAULT_FEATURED_COUNT,
) {
  const byName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
  const chosen = featuredNames
    .map((name) => byName.get(name.toLowerCase()))
    .filter(Boolean);
  return chosen.length > 0 ? chosen : repos.slice(0, fallbackCount);
}
