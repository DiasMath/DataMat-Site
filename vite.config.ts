import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  // No build do pré-render (Node), empacota o GSAP e os ícones junto,
  // porque os arquivos deles não rodam direto no Node.
  ssr: { noExternal: ["gsap", "lucide-react"] },
});
