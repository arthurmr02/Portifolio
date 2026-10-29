import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { isSupabaseConfigured } from '../config/site';
import { getSession, signIn, signOut, subscribeToAuthChanges } from '../services/auth';

/**
 * Mantém a sessão do dono. Só é montado nas rotas /entrar e /painel,
 * então visitantes comuns nunca baixam nem inicializam o Supabase.
 */
export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    let unsubscribe = () => {};

    getSession()
      .then((current) => active && setSession(current))
      .catch(() => active && setSession(null))
      .finally(() => active && setLoading(false));

    subscribeToAuthChanges((next) => active && setSession(next))
      .then((stop) => {
        if (active) unsubscribe = stop;
        else stop();
      })
      .catch(() => {});

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback((credentials) => signIn(credentials), []);
  const logout = useCallback(() => signOut(), []);

  const value = useMemo(
    () => ({
      session,
      status: loading ? 'loading' : session ? 'authenticated' : 'unauthenticated',
      isConfigured: isSupabaseConfigured,
      login,
      logout,
    }),
    [session, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
