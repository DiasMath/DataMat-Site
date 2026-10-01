/**
 * Textos da home. Mude aqui sem mexer no layout.
 * Regra: uma frase por item — quem explica é a cena animada.
 */
import type { Kind } from "../data/site";

export type Pain = {
  key: Kind;
  pain: string; // a dor, como o cliente fala
  answer: string; // a virada, em uma frase
  path: string; // página da solução
  solution: string; // nome da solução
  /** Opcional: vídeo de verdade no lugar da cena animada
   *  (ex.: "/videos/dados.mp4" em public/videos/). */
  video?: string;
};

export const pains: Pain[] = [
  {
    key: "dados",
    pain: "Não enxergo meus números",
    answer: "Sistemas e planilhas viram um painel que se atualiza sozinho.",
    path: "/dados-bi",
    solution: "Dados & BI",
  },
  {
    key: "ia",
    pain: "Minha operação é manual",
    answer: "A IA atende, consulta o estoque e cria o pedido por você.",
    path: "/ia-automacao",
    solution: "IA & Automação",
  },
  {
    key: "marca",
    pain: "Minha marca não se destaca",
    answer: "Uma identidade coerente em cada post e em cada contato.",
    path: "/marca-growth",
    solution: "Marca & Growth",
  },
  {
    key: "sites",
    pain: "Meu site não traz clientes",
    answer: "Um site direto ao ponto, que leva a conversa para o WhatsApp.",
    path: "/sites",
    solution: "Sites",
  },
];

export const casesTeaser = {
  eyebrow: "CASES",
  title: "O que muda quando os dados trabalham pela empresa.",
  body: "Veja como uma distribuidora saiu do fechamento manual para a gestão do dia a dia.",
  cta: "Ver os cases",
};

/**
 * Hero: problemas que orbitam o sol da DATAMAT e saem como soluções.
 * Textos curtos (cabem num cartão pequeno).
 */
export const orbitPairs = [
  { problem: "Dados dispersos", solution: "Painel de gestão" },
  { problem: "Rotinas manuais", solution: "Atendimento automático" },
  { problem: "Marca sem padrão", solution: "Marca reconhecível" },
  { problem: "Site que não vende", solution: "Site que gera contatos" },
  { problem: "Decisões no escuro", solution: "Decisões com dados" },
];
