import { isSupabaseConfigured, siteConfig } from '../config/site';
import { AppError, ERROR_CODES } from '../lib/errors';

let clientPromise;

/**
 * Cria o cliente do Supabase sob demanda, com import dinâmico. Assim a biblioteca
 * (que é pesada) não entra no pacote inicial e só baixa quando alguém realmente
 * precisa de dados: destaques da home, formulário ou dashboard.
 */
export function getSupabase() {
  if (!isSupabaseConfigured) {
    return Promise.reject(
      new AppError('Supabase não configurado', { code: ERROR_CODES.NOT_CONFIGURED }),
    );
  }
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(siteConfig.supabaseUrl, siteConfig.supabaseAnonKey),
  );
  return clientPromise;
}

/** Lança um AppError padronizado quando o Supabase devolve erro. */
export function throwIfError(error) {
  if (!error) return;
  const code =
    error.code === 'PGRST301' || error.status === 401 || error.status === 403
      ? ERROR_CODES.UNAUTHORIZED
      : ERROR_CODES.UNKNOWN;
  throw new AppError(error.message, { code, status: error.status, cause: error });
}
