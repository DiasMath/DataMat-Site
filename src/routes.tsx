import type { ReactElement } from "react";
import pages from "./data/pages.json";
import { Home } from "./pages/Home";
import { DataPage } from "./pages/DataPage";
import { AutomationPage } from "./pages/AutomationPage";
import { BrandPage } from "./pages/BrandPage";
import { SitesPage } from "./pages/SitesPage";
import { AboutPage } from "./pages/AboutPage";
import { CasesPage } from "./pages/CasesPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";

/**
 * Páginas do site. Para criar uma página nova:
 * 1. crie o componente em src/pages/
 * 2. adicione título e descrição em src/data/pages.json
 * 3. adicione a rota aqui (o TypeScript acusa se faltar no pages.json)
 * O build gera o HTML, o sitemap e as tags de SEO a partir desta lista.
 */
type PagePath = keyof typeof pages;

export const routes: Record<PagePath, ReactElement> = {
  "/": <Home />,
  "/dados-bi": <DataPage />,
  "/ia-automacao": <AutomationPage />,
  "/marca-growth": <BrandPage />,
  "/sites": <SitesPage />,
  "/sobre": <AboutPage />,
  "/cases": <CasesPage />,
  "/contato": <ContactPage />,
  "/privacidade": <PrivacyPage />,
};
