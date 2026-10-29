import PageSpinner from './PageSpinner';
import { EmptyState, ErrorState } from './StateMessage';

/**
 * Padrão único para qualquer dado remoto: carregando, erro, vazio ou conteúdo.
 * Passe `skeleton` com a mesma forma do conteúdo para evitar salto de layout.
 */
export default function QueryState({
  isLoading,
  error,
  isEmpty = false,
  onRetry,
  skeleton,
  emptyTitle,
  emptyDescription,
  children,
}) {
  if (isLoading) return skeleton ?? <PageSpinner />;
  if (error) return <ErrorState error={error} onRetry={onRetry} />;
  if (isEmpty) return <EmptyState title={emptyTitle} description={emptyDescription} />;
  return children;
}
