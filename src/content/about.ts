/**
 * Seção "Quem é a DATAMAT" (home): texto que explica quem somos e como
 * pensamos. Sem animação além da entrada suave padrão.
 */
export const about = {
  eyebrow: "QUEM É A DATAMAT",
  title: "Começamos pelos dados.",
  highlight: "Seguimos o problema.",
  lead: "Uma empresa não precisa contratar quatro frentes. Precisa resolver o que importa agora.",
  body: [
    "A DATAMAT nasceu da inteligência de dados e reúne competências para agir onde o desafio realmente está: nos números, na operação, na marca ou no site.",
    "Cada solução funciona sozinha. Quando faz sentido, elas se conectam, e a empresa passa a decidir com clareza e a executar com estrutura.",
  ],
  link: "Conhecer a DATAMAT",
};

export const principles = [
  {
    title: "Começamos pelos dados",
    text: "Antes de propor qualquer coisa, entendemos os números e a rotina da empresa.",
  },
  {
    title: "Uma solução por vez",
    text: "Resolvemos o que mais pesa agora, sem pacote fechado nem projeto que nunca termina.",
  },
  {
    title: "Tudo se conecta",
    text: "Dados, automação, marca e site somam quando trabalham juntos.",
  },
];

/**
 * Quem está por trás. Preencha com foto (em public/equipe/), nome e papel;
 * enquanto estiver vazio, o bloco não aparece no site.
 */
export const people: {
  name: string;
  role: string;
  photo: string;
  quote?: string;
}[] = [];
