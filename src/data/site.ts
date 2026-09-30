export type Kind = "dados" | "ia" | "marca" | "sites";

type Solution = {
  key: Kind;
  number: string;
  title: string;
  short: string;
  line: string;
  path: string;
};

export const solutions: Solution[] = [
  {
    key: "dados",
    number: "01",
    title: "Dados & BI",
    short: "Entender",
    line: "Transforme informações em decisões.",
    path: "/dados-bi",
  },
  {
    key: "ia",
    number: "02",
    title: "IA & Automação",
    short: "Executar",
    line: "Transforme processos em eficiência.",
    path: "/ia-automacao",
  },
  {
    key: "marca",
    number: "03",
    title: "Marca & Growth",
    short: "Comunicar",
    line: "Transforme presença em estratégia.",
    path: "/marca-growth",
  },
  {
    key: "sites",
    number: "04",
    title: "Sites & Presença Digital",
    short: "Conectar",
    line: "Transforme seu site em um ativo do negócio.",
    path: "/sites",
  },
];

export const needs: Record<
  Kind,
  { label: string; outcome: string; detail: string }
> = {
  dados: {
    label: "Não enxergo meus números",
    outcome: "Enxergue antes de decidir.",
    detail: "Indicadores claros, no ritmo da sua operação.",
  },
  ia: {
    label: "Minha operação é manual",
    outcome: "Devolva tempo à equipe.",
    detail: "Fluxos que tiram tarefas repetitivas do caminho.",
  },
  marca: {
    label: "Minha marca não se destaca",
    outcome: "Seja lembrado pelo que importa.",
    detail: "Uma presença coerente com o seu valor.",
  },
  sites: {
    label: "Meu site não converte",
    outcome: "Transforme visitas em conversas.",
    detail: "Uma experiência clara, rápida e feita para o seu público.",
  },
};

// Defina o número com DDI e DDD, apenas dígitos, antes de ativar o canal.
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(
  /\D/g,
  "",
);

export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, conheci a DATAMAT pelo site e gostaria de conversar sobre minha empresa.")}`
  : null;

// Cole aqui a URL pública de incorporação do relatório quando ele estiver pronto.
export const powerBiEmbedUrl = import.meta.env.VITE_POWER_BI_EMBED_URL || "";
