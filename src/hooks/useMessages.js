import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listMessages, setMessageReplied } from '../services/messages';

const messagesKey = ['messages'];

export function useMessages() {
  return useQuery({ queryKey: messagesKey, queryFn: listMessages });
}

export function useSetReplied() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, replied }) => setMessageReplied(id, replied),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: messagesKey }),
  });
}
