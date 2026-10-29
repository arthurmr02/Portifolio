/**
 * Converte bytes por linguagem ({ JavaScript: 900, CSS: 100 }) em porcentagens ordenadas.
 * Linguagens abaixo de 1% são agrupadas em "Outras" para a barra não ficar ilegível.
 */
export function languageShare(bytesByLanguage) {
  const entries = Object.entries(bytesByLanguage ?? {});
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];

  const shares = entries
    .map(([language, bytes]) => ({ language, percent: (bytes / total) * 100 }))
    .sort((a, b) => b.percent - a.percent);

  const main = shares.filter((item) => item.percent >= 1);
  const rest = shares.filter((item) => item.percent < 1);
  if (rest.length === 0) return main;
  return [
    ...main,
    { language: 'Outras', percent: rest.reduce((sum, i) => sum + i.percent, 0) },
  ];
}
