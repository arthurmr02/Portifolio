import { QueryClient } from '@tanstack/react-query';
import { ERROR_CODES } from './errors';

const NO_RETRY = [
  ERROR_CODES.RATE_LIMIT,
  ERROR_CODES.NOT_FOUND,
  ERROR_CODES.NOT_CONFIGURED,
  ERROR_CODES.UNAUTHORIZED,
];

/**
 * Cache global. Os dados do GitHub ficam "frescos" por 10 minutos, então navegar
 * entre páginas reaproveita a resposta em vez de chamar a API de novo.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => !NO_RETRY.includes(error?.code) && failureCount < 1,
    },
  },
});
