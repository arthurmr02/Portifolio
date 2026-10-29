import Spinner from './Spinner';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS = {
  primary: 'bg-accent text-accent-ink hover:opacity-90',
  secondary: 'border border-line bg-surface text-ink hover:border-accent',
  ghost: 'text-muted hover:text-ink',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * Botão único do site. Com `as={Link}` vira link com o mesmo visual.
 * Com `loading`, mostra o spinner e fica bloqueado, o que evita envios duplicados.
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}) {
  const nativeProps =
    Component === 'button'
      ? { type: props.type ?? 'button', disabled: props.disabled || loading }
      : {};

  return (
    <Component
      {...props}
      {...nativeProps}
      aria-busy={loading || undefined}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {loading && <Spinner size="sm" decorative />}
      {children}
    </Component>
  );
}
