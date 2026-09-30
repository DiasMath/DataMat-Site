import { clients } from "./clients";

/**
 * Cases de clientes (página /cases e chamada na home).
 * Números e fatos: só o que o cliente confirmou. Nada inventado.
 */
export type CaseStep = { label: string; note?: string };

export type ClientCase = {
  slug: string;
  title: string;
  context: string; // uma frase: o cenário
  before: { steps: CaseStep[]; pain: string };
  after: { steps: CaseStep[]; gain: string };
  results: { value: string; label: string }[];
  visual: "timeline" | "factors";
};

/** Cliente dos cases desta página. */
export const client = clients[0];

export const cases: ClientCase[] = [
  {
    slug: "dre-automatizado",
    title: "DRE automatizado e fluxo de caixa",
    context:
      "Todo fim de mês, o fechamento dependia de extrair, categorizar e montar relatórios à mão.",
    before: {
      steps: [
        { label: "Exporta do ERP" },
        { label: "Categoriza no GPT" },
        { label: "Monta a planilha" },
        { label: "DRE do mês", note: "dias depois do fechamento" },
      ],
      pain: "O resultado do mês só aparecia quando o mês já tinha acabado.",
    },
    after: {
      steps: [
        { label: "ERP" },
        { label: "Automação DATAMAT" },
        { label: "Painel de DRE e DFC", note: "no dia seguinte" },
      ],
      gain: "O mês é acompanhado enquanto acontece, com DRE e fluxo de caixa.",
    },
    results: [
      { value: "100%", label: "do processo mensal automatizado" },
      { value: "D+1", label: "DRE atualizado no dia seguinte" },
      { value: "Diário", label: "acompanhamento das métricas" },
    ],
    visual: "timeline",
  },
  {
    slug: "sugestao-de-compras",
    title: "Sugestão de compras inteligente",
    context:
      "A compra era sugerida só pelo que vendeu nos últimos 12 meses, sem olhar margem nem estoque.",
    before: {
      steps: [
        { label: "Vendas de 12 meses" },
        { label: "Projeção de 3 meses" },
        { label: "Compra", note: "sem ver margem ou prioridade" },
      ],
      pain: "Comprava-se no escuro, sem saber o que dava mais retorno.",
    },
    after: {
      steps: [
        { label: "Vendas, margem, estoque e prioridade" },
        { label: "Tela de sugestão" },
        { label: "Excel para o fornecedor", note: "em um clique" },
      ],
      gain: "O comprador decide com vários fatores na mesma tela.",
    },
    results: [
      { value: "1 → vários", label: "fatores analisados na compra" },
      { value: "Margem", label: "entra na decisão de compra" },
      { value: "1 clique", label: "lista exportada ao fornecedor" },
    ],
    visual: "factors",
  },
];
