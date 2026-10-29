import { useMessages, useSetReplied } from '../../hooks/useMessages';
import { formatDate } from '../../lib/formatDate';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import QueryState from '../ui/QueryState';
import Skeleton from '../ui/Skeleton';

function MessageSkeleton() {
  return (
    <div role="status" aria-label="Carregando mensagens" className="space-y-3">
      {[0, 1, 2].map((item) => (
        <Card key={item} className="space-y-3" aria-hidden="true">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </Card>
      ))}
    </div>
  );
}

function MessageItem({ message, isUpdating, onToggle }) {
  return (
    <Card as="li" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-medium">{message.name}</p>
          <a
            className="text-accent text-sm hover:underline"
            href={`mailto:${message.email}`}
          >
            {message.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted text-xs">{formatDate(message.created_at)}</span>
          <Badge tone={message.replied ? 'neutral' : 'accent'}>
            {message.replied ? 'Respondida' : 'Nova'}
          </Badge>
        </div>
      </div>
      <p className="text-muted text-sm whitespace-pre-line">{message.message}</p>
      <Button
        size="sm"
        variant="secondary"
        loading={isUpdating}
        onClick={() => onToggle(message)}
      >
        {message.replied ? 'Marcar como não respondida' : 'Marcar como respondida'}
      </Button>
    </Card>
  );
}

export default function MessageList() {
  const { data, isPending, error, refetch } = useMessages();
  const setReplied = useSetReplied();
  const updatingId = setReplied.isPending ? setReplied.variables?.id : null;

  return (
    <QueryState
      isLoading={isPending}
      error={error}
      onRetry={refetch}
      isEmpty={data?.length === 0}
      skeleton={<MessageSkeleton />}
      emptyTitle="Nenhuma mensagem ainda"
      emptyDescription="Quando alguém usar o formulário de contato, a mensagem aparece aqui."
    >
      <ul className="space-y-3">
        {data?.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isUpdating={updatingId === message.id}
            onToggle={(item) =>
              setReplied.mutate({ id: item.id, replied: !item.replied })
            }
          />
        ))}
      </ul>
      {setReplied.error && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          Não foi possível atualizar a mensagem. Tente de novo.
        </p>
      )}
    </QueryState>
  );
}
