import { useId } from 'react';

const CONTROL =
  'w-full rounded-xl border bg-bg px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none';

/**
 * Campo de formulário com rótulo, dica e mensagem de erro ligados por aria.
 * Aceita `ref` e props do `register` do React Hook Form diretamente.
 */
export default function Field({
  label,
  error,
  hint,
  multiline = false,
  className = '',
  ...props
}) {
  const id = useId();
  const Control = multiline ? 'textarea' : 'input';
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${CONTROL} ${error ? 'border-red-500' : 'border-line'}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-muted mt-1.5 text-sm">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
