/**
 * Contatos oficiais (rodapé e página de Contato). Os valores vêm das
 * variáveis de ambiente (.env.local no computador; Environment Variables na
 * Vercel). O que estiver vazio não aparece no site.
 */
const env = import.meta.env;
const clean = (v: string | undefined) => (v ?? "").trim();

export const contact = {
  email: clean(env.VITE_CONTACT_EMAIL),
  /** ex.: "Seg a sex, 9h às 18h" */
  hours: clean(env.VITE_CONTACT_HOURS),
  cnpj: clean(env.VITE_CONTACT_CNPJ),
  legalName: clean(env.VITE_CONTACT_LEGAL_NAME),
  instagram: clean(env.VITE_INSTAGRAM_URL),
  linkedin: clean(env.VITE_LINKEDIN_URL),
  /** Portal do cliente (link "Área do cliente"; vazio = não aparece). */
  portal: clean(env.VITE_PORTAL_URL),
};
