/** Códigos de erro usados para decidir a mensagem mostrada ao visitante. */
export const ERROR_CODES = {
  RATE_LIMIT: 'RATE_LIMIT',
  NOT_FOUND: 'NOT_FOUND',
  NETWORK: 'NETWORK',
  NOT_CONFIGURED: 'NOT_CONFIGURED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNKNOWN: 'UNKNOWN',
};

export class AppError extends Error {
  constructor(message, { code = ERROR_CODES.UNKNOWN, status, cause } = {}) {
    super(message, { cause });
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}

/** Texto amigável para qualquer erro vindo dos serviços. */
export function getFriendlyMessage(error) {
  switch (error?.code) {
    case ERROR_CODES.RATE_LIMIT:
      return 'O GitHub limitou as requisições por um tempo. Tente novamente em alguns minutos.';
    case ERROR_CODES.NETWORK:
      return 'Não foi possível conectar. Verifique sua internet e tente de novo.';
    case ERROR_CODES.NOT_FOUND:
      return 'Não encontramos o que você procura.';
    case ERROR_CODES.NOT_CONFIGURED:
      return 'Este recurso ainda não foi configurado no servidor.';
    case ERROR_CODES.UNAUTHORIZED:
      return 'Sua sessão expirou. Entre novamente.';
    default:
      return 'Algo deu errado do nosso lado. Tente novamente.';
  }
}
