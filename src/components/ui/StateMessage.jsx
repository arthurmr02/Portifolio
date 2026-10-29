import Button from './Button';
import Card from './Card';
import { getFriendlyMessage } from '../../lib/errors';

function StateMessage({ title, description, action, role }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-10 text-center" role={role}>
      <h3 className="font-display text-xl">{title}</h3>
      {description && <p className="text-muted max-w-md text-sm">{description}</p>}
      {action}
    </Card>
  );
}

/** Falha ao carregar dados: mensagem amigável + botão para tentar de novo. */
export function ErrorState({ error, onRetry, title = 'Não foi possível carregar' }) {
  return (
    <StateMessage
      role="alert"
      title={title}
      description={getFriendlyMessage(error)}
      action={
        onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Tentar de novo
          </Button>
        )
      }
    />
  );
}

/** Lista vazia: explica o que aconteceu em vez de mostrar um espaço em branco. */
export function EmptyState({ title = 'Nada por aqui ainda', description }) {
  return <StateMessage title={title} description={description} />;
}
