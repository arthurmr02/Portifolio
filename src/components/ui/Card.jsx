/** Cartão padrão do site: mesmo borda, fundo e raio em projetos, mensagens e estados. */
export default function Card({
  as: Component = 'div',
  interactive = false,
  className = '',
  ...props
}) {
  const hover = interactive ? 'transition-colors hover:border-accent' : '';
  return (
    <Component
      className={`border-line bg-surface rounded-2xl border p-5 sm:p-6 ${hover} ${className}`}
      {...props}
    />
  );
}
