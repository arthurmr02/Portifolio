import { getSupabase, throwIfError } from './supabase';

export async function getSession() {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.getSession();
  throwIfError(error);
  return data.session;
}

/** Avisa sempre que o login muda. Retorna a função para parar de ouvir. */
export async function subscribeToAuthChanges(callback) {
  const supabase = await getSupabase();
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    callback(session),
  );
  return () => data.subscription.unsubscribe();
}

export async function signIn({ email, password }) {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  throwIfError(error);
}

export async function signOut() {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();
  throwIfError(error);
}
