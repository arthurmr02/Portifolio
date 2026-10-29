export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEMES = { light: 'light', dark: 'dark' };

/** Cores do tema para uso fora do CSS (ex.: cena 3D). Espelham src/index.css. */
export const themeColors = {
  light: { accent: '#c2410c', ink: '#14110f' },
  dark: { accent: '#ff6a3d', ink: '#f2efe8' },
};

/** Lê o tema salvo. O padrão é escuro, igual ao script inline do index.html. */
export function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === THEMES.light
      ? THEMES.light
      : THEMES.dark;
  } catch {
    return THEMES.dark;
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Modo privado ou armazenamento bloqueado: o tema vale só nesta visita.
  }
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === THEMES.dark);
}
