import { CTA } from "../components/FinalCta";
import { HomeHero } from "./HomeHero";
import { ClientStrip } from "../components/home/ClientStrip";
import { PainSolutions } from "../components/home/PainSolutions";
import { CasesTeaser } from "../components/home/CasesTeaser";
import { AboutDatamat } from "../components/home/AboutDatamat";
import { Faq } from "../components/home/Faq";

export function Home() {
  return (
    <>
      <HomeHero />

      <ClientStrip />

      <PainSolutions id="demonstracoes" />

      <AboutDatamat />

      <CasesTeaser />

      <Faq />

      <CTA title="Seu próximo passo começa com uma conversa." />
    </>
  );
}
