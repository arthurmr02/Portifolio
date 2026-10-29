import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../lib/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEMES.dark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      className="border-line text-muted hover:border-accent hover:text-ink grid h-9 w-9 place-items-center rounded-full border transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        )}
      </svg>
    </button>
  );
}
