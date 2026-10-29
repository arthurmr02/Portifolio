import { getSupabase, throwIfError } from './supabase';

/** Nomes dos repositórios marcados como destaque, na ordem em que foram marcados. */
export async function listFeaturedNames() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('featured_repos')
    .select('repo_name')
    .order('created_at', { ascending: true });
  throwIfError(error);
  return data.map((row) => row.repo_name);
}

export async function setFeatured(repoName, featured) {
  const supabase = await getSupabase();
  const query = featured
    ? supabase.from('featured_repos').upsert({ repo_name: repoName })
    : supabase.from('featured_repos').delete().eq('repo_name', repoName);
  const { error } = await query;
  throwIfError(error);
}
