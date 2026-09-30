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

// Defina o número com DDI e DDD, apenas dígitos, antes de ativar o canal.
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(
  /\D/g,
  "",
);

export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, conheci a DATAMAT pelo site e gostaria de conversar sobre minha empresa.")}`
  : null;
