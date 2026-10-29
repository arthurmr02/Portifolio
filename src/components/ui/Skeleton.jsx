/** Bloco cinza pulsante. Dê a mesma altura/largura do conteúdo real para não haver salto de layout. */
export default function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-line/70 animate-pulse rounded-md ${className}`}
    />
  );
}
