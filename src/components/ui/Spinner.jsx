/** Indicador de carregamento. Use `decorative` quando houver um texto ao lado (ex.: "Enviando..."). */
export default function Spinner({
  size = 'md',
  label = 'Carregando',
  decorative = false,
}) {
  const dimensions = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  const a11y = decorative
    ? { 'aria-hidden': true }
    : { role: 'status', 'aria-label': label };

  return (
    <svg
      className={`${dimensions} shrink-0 animate-spin`}
      viewBox="0 0 24 24"
      fill="none"
      {...a11y}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity=".25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
