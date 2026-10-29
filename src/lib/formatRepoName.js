/** "meu-app_legal" vira "meu app legal", só para exibição. O nome original vai na URL. */
export function formatRepoName(name) {
  return name.replace(/[-_]+/g, ' ').trim();
}
