import { Route, Routes } from "react-router-dom";
import { MotionDirector } from "./motion/MotionDirector";
import { Meta } from "./components/Meta";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppPreview, WhatsAppFloat } from "./components/contact";
import { NotFound } from "./pages/NotFound";
import { routes } from "./routes";

export default function App() {
  return (
    <>
      <a
        className="skip-link"
        href="#principal"
        onClick={() => document.getElementById("principal")?.focus()}
      >
        Pular para o conteúdo
      </a>
      <MotionDirector />
      <Meta />
      <Header />
      <WhatsAppFloat />
      <WhatsAppPreview />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="principal" tabIndex={-1}>
            <Routes>
              {Object.entries(routes).map(([path, element]) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
