import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './themeContext';
import { THEMES, applyTheme, readStoredTheme, storeTheme } from '../lib/theme';

/** Guarda o tema escolhido, aplica a classe `dark` no <html> e persiste no localStorage. */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === THEMES.dark ? THEMES.light : THEMES.dark)),
    [],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
