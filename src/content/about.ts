/**
 * Seção "Quem é a DATAMAT" (home): mapa das frentes, princípios e pessoas.
 */
import type { Kind } from "../data/site";

export const about = {
  eyebrow: "QUEM É A DATAMAT",
  title: "Começamos pelos dados.",
  highlight: "Seguimos o problema.",
  body: "Cada frente resolve um problema sozinha. Quando faz sentido, elas se conectam.",
  link: "Conhecer a DATAMAT",
};

/** As 4 frentes ao redor do símbolo. Dados é a base. */
export const fronts: {
  key: Kind;
  title: string;
  line: string;
  path: string;
}[] = [
  {
    key: "dados",
    title: "Dados & BI",
    line: "A base de tudo: os números da empresa organizados e confiáveis.",
    path: "/dados-bi",
  },
  {
    key: "ia",
    title: "IA & Automação",
    line: "As tarefas repetitivas passam a rodar sozinhas.",
    path: "/ia-automacao",
  },
  {
    key: "marca",
    title: "Marca & Growth",
    line: "A empresa passa a ser reconhecida e lembrada.",
    path: "/marca-growth",
  },
  {
    key: "sites",
    title: "Sites",
    line: "Uma presença digital que transforma visita em conversa.",
    path: "/sites",
  },
];

export const principles = [
  {
    title: "Começamos pelos dados",
    text: "Primeiro entender os números. Depois decidir o que fazer.",
  },
  {
    title: "Uma solução por vez",
    text: "Resolvemos o que importa agora, sem pacote fechado.",
  },
  {
    title: "Tudo se conecta",
    text: "Cada frente funciona sozinha e soma com as outras.",
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
