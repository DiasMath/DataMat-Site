/**
 * Dados ilustrativos do painel de DRE (página /cases). Valores em R$ mil.
 * "Out*" é o mês corrente, parcial (acumulado até o dia 23).
 */
export const demoMonths = ["Jul", "Ago", "Set", "Out*"];

type Line = { label: string; values: number[] };
export type Group = {
  key: string;
  label: string;
  lines: Line[];
  kind: "receita" | "deducao" | "custo" | "fixa" | "variavel";
};

export const groups: Group[] = [
  {
    key: "receita",
    label: "Receita bruta",
    kind: "receita",
    lines: [
      { label: "Venda de produtos", values: [380, 366, 398, 298] },
      { label: "Serviços", values: [32, 32, 33, 24] },
    ],
  },
  {
    key: "deducoes",
    label: "(−) Deduções e impostos",
    kind: "deducao",
    lines: [
      { label: "ICMS", values: [-31, -30, -33, -24] },
      { label: "PIS/COFINS", values: [-13, -12, -14, -10] },
      { label: "Devoluções", values: [-5, -5, -5, -4] },
    ],
  },
  {
    key: "cmv",
    label: "(−) CMV",
    kind: "custo",
    lines: [
      {
        label: "Custo das mercadorias vendidas",
        values: [-228, -224, -236, -177],
      },
    ],
  },
  {
    key: "fixas",
    label: "(−) Despesas fixas",
    kind: "fixa",
    lines: [
      { label: "Folha e encargos", values: [-38, -38, -39, -29] },
      { label: "Aluguel", values: [-12, -12, -12, -9] },
      { label: "Sistemas e serviços", values: [-8, -8, -9, -6] },
    ],
  },
  {
    key: "variaveis",
    label: "(−) Despesas variáveis",
    kind: "variavel",
    lines: [
      { label: "Fretes", values: [-21, -20, -22, -16] },
      { label: "Comissões", values: [-17, -16, -17, -13] },
    ],
  },
];

const sum = (lines: Line[], m: number) =>
  lines.reduce((acc, l) => acc + l.values[m], 0);
export const groupTotal = (key: string, m: number) =>
  sum(groups.find((g) => g.key === key)!.lines, m);

/** Indicadores calculados a partir dos grupos, por mês. */
export const metrics = (m: number) => {
  const receita = groupTotal("receita", m);
  const deducoes = groupTotal("deducoes", m);
  const liquida = receita + deducoes;
  const cmv = groupTotal("cmv", m);
  const lucroBruto = liquida + cmv;
  const fixas = groupTotal("fixas", m);
  const variaveis = groupTotal("variaveis", m);
  const despesas = fixas + variaveis;
  const resultado = lucroBruto + despesas;
  return {
    receita,
    deducoes,
    liquida,
    cmv,
    lucroBruto,
    fixas,
    variaveis,
    despesas,
    resultado,
  };
};
