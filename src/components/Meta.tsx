import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pages from "../data/pages.json";

type PageMeta = { title: string; description: string };
const meta = pages as Record<string, PageMeta>;

/**
 * Atualiza título e descrição ao navegar entre páginas.
 * Os mesmos textos são gravados no HTML de cada rota no build
 * (scripts/route-shells.mjs), que é o que o Google e o WhatsApp leem.
 */
export function Meta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const pagePath = pathname.replace(/\/+$/, "") || "/";
    const page = meta[pagePath] ?? {
      title: "Página não encontrada | DATAMAT",
      description: meta["/"].description,
    };
    document.title = page.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page.description);
  }, [pathname]);
  return null;
}
