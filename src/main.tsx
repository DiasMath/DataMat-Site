import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource-variable/dm-sans";
import "./styles/index.css";
import { bootedFromPrerender } from "./lib/boot";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Páginas pré-renderizadas no build já trazem o HTML pronto: o React só
// "assume" o que está na tela (hydrate). Em desenvolvimento, ou se o HTML
// recebido for de outra página, renderiza do zero.
if (bootedFromPrerender) {
  ReactDOM.hydrateRoot(container, app);
} else {
  container.innerHTML = "";
  ReactDOM.createRoot(container).render(app);
}
