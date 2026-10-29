import { getSupabase, throwIfError } from './supabase';

export async function createMessage({ name, email, message }) {
  const supabase = await getSupabase();
  const { error } = await supabase.from('messages').insert({ name, email, message });
  throwIfError(error);
}

/** Apenas o dono autenticado consegue ler (regra RLS em supabase/schema.sql). */
export async function listMessages() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('messages')
    .select('id, name, email, message, replied, created_at')
    .order('created_at', { ascending: false });
  throwIfError(error);
  return data;
}

export async function setMessageReplied(id, replied) {
  const supabase = await getSupabase();
  const { error } = await supabase.from('messages').update({ replied }).eq('id', id);
  throwIfError(error);
}
