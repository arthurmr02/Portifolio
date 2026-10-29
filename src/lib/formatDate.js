const relativeFormatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const UNITS = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
];

/** Ex.: "há 3 dias". Recebe uma data ISO e, opcionalmente, o "agora" (para testes). */
export function formatRelativeDate(iso, now = Date.now()) {
  const diffSeconds = Math.round((new Date(iso).getTime() - now) / 1000);
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeFormatter.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return 'agora mesmo';
}

export function formatDate(iso) {
  return dateFormatter.format(new Date(iso));
}
