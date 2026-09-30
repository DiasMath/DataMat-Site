import { Route, Routes } from "react-router-dom";
import { MotionDirector } from "./motion/MotionDirector";
import { Meta } from "./components/Meta";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppPreview, WhatsAppFloat } from "./components/contact";
import { Home } from "./pages/Home";
import { DataPage } from "./pages/DataPage";
import { AutomationPage } from "./pages/AutomationPage";
import { BrandPage } from "./pages/BrandPage";
import { SitesPage } from "./pages/SitesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFound } from "./pages/NotFound";

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
              <Route path="/" element={<Home />} />
              <Route path="/dados-bi" element={<DataPage />} />
              <Route path="/ia-automacao" element={<AutomationPage />} />
              <Route path="/marca-growth" element={<BrandPage />} />
              <Route path="/sites" element={<SitesPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
