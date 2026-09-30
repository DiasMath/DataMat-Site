import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  // No build do pré-render (Node), empacota o GSAP e os ícones junto,
  // porque os arquivos deles não rodam direto no Node.
  ssr: { noExternal: ["gsap", "lucide-react"] },
});
