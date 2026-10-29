// Cores aproximadas das linguagens (paleta do GitHub) para o ponto colorido do card.
const COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#663399',
  Java: '#b07219',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  PHP: '#4f5d95',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00b4ab',
  Kotlin: '#a97bff',
  Go: '#00add8',
  Rust: '#dea584',
  Jupyter: '#da5b0b',
};

export function getLanguageColor(language) {
  return COLORS[language] ?? '#8a8a8a';
}
