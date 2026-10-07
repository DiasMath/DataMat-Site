/**
 * Menu do site. As descrições aparecem no painel "Soluções" do cabeçalho.
 */
import { BarChart3, Bot, Sparkles, MonitorSmartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MenuSolution = {
  title: string;
  path: string;
  description: string;
  icon: LucideIcon;
};

export const menuSolutions: MenuSolution[] = [
  {
    title: "Dados & BI",
    path: "/dados-bi",
    description: "Seus números num painel que se atualiza sozinho.",
    icon: BarChart3,
  },
  {
    title: "IA & Automação",
    path: "/ia-automacao",
    description: "Atendimento e tarefas repetitivas rodando sem a equipe.",
    icon: Bot,
  },
  {
    title: "Marca & Growth",
    path: "/marca-growth",
    description: "Identidade e conteúdo que fazem a empresa ser lembrada.",
    icon: Sparkles,
  },
  {
    title: "Sites",
    path: "/sites",
    description: "Sites rápidos que levam o visitante até o WhatsApp.",
    icon: MonitorSmartphone,
  },
];

export const menuLinks = [
  { label: "Cases", to: "/cases" },
  { label: "Demonstrações", to: "/demonstracoes" },
  { label: "Sobre", to: "/sobre" },
];
