/**
 * Seção "Próximo passo" (CTA final): ferramentas mostradas por página,
 * e atalhos de assunto (abrem o WhatsApp com a mensagem pronta).
 */
import type { Kind } from "../data/site";

export type ToolKey =
  "planilha" | "erp" | "whatsapp" | "site" | "painel" | "instagram";

export const toolLabels: Record<ToolKey, string> = {
  planilha: "Planilhas",
  erp: "ERP",
  whatsapp: "WhatsApp",
  site: "Site",
  painel: "Painel",
  instagram: "Instagram",
};

/** Ferramentas que se conectam ao símbolo. Home e páginas gerais: todas. */
export const ctaTools: Record<Kind | "todas", ToolKey[]> = {
  todas: ["planilha", "erp", "whatsapp", "site", "painel"],
  dados: ["planilha", "erp", "painel"],
  ia: ["whatsapp", "erp", "planilha"],
  marca: ["instagram", "site", "whatsapp"],
  sites: ["site", "whatsapp", "instagram"],
};

/** Atalhos do estado final: cada um abre o WhatsApp com a mensagem pronta. */
export const ctaShortcuts: { key: Kind; label: string; message: string }[] = [
  {
    key: "dados",
    label: "Quero ver meus números",
    message:
      "Olá! Vim pelo site da DATAMAT e quero ver os números da minha empresa com mais clareza.",
  },
  {
    key: "ia",
    label: "Quero automatizar o atendimento",
    message:
      "Olá! Vim pelo site da DATAMAT e quero automatizar o atendimento e as tarefas repetitivas da minha empresa.",
  },
  {
    key: "marca",
    label: "Quero fortalecer minha marca",
    message:
      "Olá! Vim pelo site da DATAMAT e quero deixar a marca da minha empresa mais forte e reconhecível.",
  },
  {
    key: "sites",
    label: "Quero um site que traga clientes",
    message:
      "Olá! Vim pelo site da DATAMAT e quero um site que traga mais clientes para a minha empresa.",
  },
];
