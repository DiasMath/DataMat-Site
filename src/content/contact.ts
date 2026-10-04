/**
 * Contatos oficiais exibidos no rodapé. Os valores vêm das variáveis de
 * ambiente (.env.local no computador; Environment Variables na Vercel).
 * O que estiver vazio não aparece no site.
 */
const env = import.meta.env;
const clean = (v: string | undefined) => (v ?? "").trim();

export const contact = {
  email: clean(env.VITE_CONTACT_EMAIL),
  city: clean(env.VITE_CONTACT_CITY),
  cnpj: clean(env.VITE_CONTACT_CNPJ),
  legalName: clean(env.VITE_CONTACT_LEGAL_NAME),
  instagram: clean(env.VITE_INSTAGRAM_URL),
  linkedin: clean(env.VITE_LINKEDIN_URL),
};
