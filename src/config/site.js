const env = import.meta.env;

const splitList = (value) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

/** Configuracao do site, lida das variaveis de ambiente (ver .env.example). */
export const siteConfig = {
  ownerName: env.VITE_OWNER_NAME || 'Seu Nome',
  ownerRole: env.VITE_OWNER_ROLE || 'Desenvolvedor front-end',
  ownerEmail: env.VITE_OWNER_EMAIL || '',
  githubUsername: env.VITE_GITHUB_USERNAME || 'octocat',
  excludedRepos: splitList(env.VITE_EXCLUDED_REPOS),
  formspreeFormId: env.VITE_FORMSPREE_FORM_ID || '',
  supabaseUrl: env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY || '',
};

export const isSupabaseConfigured = Boolean(
  siteConfig.supabaseUrl && siteConfig.supabaseAnonKey,
);
