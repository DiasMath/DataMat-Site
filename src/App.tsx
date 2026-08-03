import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Demo from "./pages/Demo.tsx";
import Cases from "./pages/Cases.tsx";
import SolutionPage from "./pages/SolutionPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/solucoes/:slug" element={<SolutionPage />} />
      <Route path="/demonstracao" element={<Demo />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
