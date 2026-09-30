/**
 * Clientes exibidos no site (faixa da home, página de cases).
 * Logo: arquivo em public/clientes/ (PNG ou SVG, ~240 px, fundo próprio).
 * Só inclua clientes que autorizaram o uso da marca.
 */
export type Client = { name: string; logo: string; segment: string };

export const clients: Client[] = [
  {
    name: "Loja Juntos.com",
    logo: "/clientes/lojajuntos.png",
    segment: "Distribuidora B2B · Varejo",
  },
];
