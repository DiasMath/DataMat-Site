/**
 * Clientes exibidos no site (faixa da home, página de cases).
 * Logo: arquivo em public/clientes/ (PNG ou SVG, ~240 px, fundo próprio).
 * logoMono (opcional): versão branca com fundo transparente (PNG/SVG). É a que
 * aparece no carrossel quando houver muitos clientes; sem ela, a logo normal
 * aparece em tons de cinza e ganha cor ao passar o mouse.
 * Só inclua clientes que autorizaram o uso da marca.
 */
export type Client = {
  name: string;
  logo: string;
  segment: string;
  logoMono?: string;
};

export const clients: Client[] = [
  {
    name: "Loja Juntos.com",
    logo: "/clientes/lojajuntos.png",
    segment: "Distribuidora B2B · Varejo",
  },
];
