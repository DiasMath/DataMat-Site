# Datamat — Redesign completo do site institucional

Reformulação visual total da Datamat: de consultoria genérica para marca de tecnologia jovem, ousada e visualmente rica. Identidade própria (nada de clone da ROQT), estrutura moderna em bento grid, vídeo no hero, microanimações e conteúdo enxuto.

## Direção visual (decidida)

- **Paleta Âmbar Noir**: base preta `#0D0D0D`, superfícies `#1A1A1A`, âmbar `#FFA928` como cor de marca, laranja-brasa `#FF6B35` como acento secundário. Texto claro sobre fundo escuro, com seções pontuais em off-white para respiro.
- **Tipografia**: Syne (títulos, bold/extrabold, tracking apertado, tamanhos grandes) + Plus Jakarta Sans (corpo, enxuto).
- **Layout**: bento grid como assinatura — blocos de tamanhos variados em soluções, diferenciais e números.
- **Textura gráfica**: grids de pontos, linhas de dados estilizadas, bordas sutis com brilho âmbar, ruído leve. Sem ícones genéricos de estoque como protagonistas.
- **Movimento**: fade/slide ao entrar em viewport, parallax leve, hover com elevação e brilho, contadores animados. Tudo respeitando `prefers-reduced-motion`.

## Estrutura da home

1. **Header fixo** — logo Datamat, menu (Soluções, Cases, Sobre, Blog, Contato), CTA "Fale com um especialista". Fundo transparente no topo do hero, escurece com blur ao rolar. Menu mobile em overlay full-screen.
2. **Hero** — vídeo em loop de fundo (mp4 placeholder, mudo, `playsinline`) com overlay escuro + poster estático usado como fallback em mobile e conexões lentas. Headline curta e forte, subheadline de uma linha, CTA primário e secundário.
   Variações de headline propostas: "Do dado à decisão, sem complicação." / "Dados que decidem por você — quase." / "Menos planilha. Mais decisão."
3. **Prova social** — faixa com carrossel automático e infinito de logos (placeholders), em escala de cinza com cor no hover.
4. **Soluções (bento grid)** — 4 blocos de tamanhos diferentes: Business Intelligence, Engenharia de Dados, Ciência de Dados, Inteligência Artificial. Cada um com imagem/visual grande, título curto, 1–2 linhas e link para sua página própria.
5. **Como trabalhamos** — timeline horizontal escaneável (scroll horizontal no mobile) com 4–5 passos, numeração grande e linha de progresso animada.
6. **Resultados em números** — 3 números grandes com contador animado ao entrar na tela (placeholders).
7. **Depoimentos/Cases** — carrossel horizontal de cards com foto, nome, cargo, frase curta e resultado numérico em destaque.
8. **CTA final** — seção full-width com imagem/vídeo de fundo diferente do hero, headline grande e botão de agendamento.
9. **Footer** — logo, colunas (Soluções, Empresa, Contato), redes sociais, endereço, copyright.

## Páginas de soluções

Quatro páginas internas (`/solucoes/business-intelligence`, `/engenharia-de-dados`, `/ciencia-de-dados`, `/inteligencia-artificial`) compartilhando um template comum: hero da solução, "para quem é", o que entregamos (bento), etapas, resultados e CTA. Conteúdo inicial em placeholder marcado.

`/cases` recebe o novo design system (header/footer/cards) para não destoar. Páginas `Blog` e `Demo` ficam fora do escopo desta rodada.

## Detalhes técnicos

- Novo design system em `index.css` + `tailwind.config.ts`: todos os tokens (cores em HSL, fontes, sombras, gradientes âmbar) semânticos — sem cores hardcoded em componentes.
- Componentes reutilizáveis novos em `src/components/ui-kit/`: `SectionHeading`, `BentoCard`, `AnimatedCounter`, `LogoMarquee`, `TestimonialCard`, `CTAButton`, `Reveal` (wrapper de animação em scroll).
- Seções da home reescritas em `src/components/sections/` (as atuais, muito textuais, são substituídas); `Header` e `Footer` refeitos.
- Rotas novas em `App.tsx` para as 4 páginas de solução, com template compartilhado.
- Performance: vídeo do hero comprimido e só em desktop, `poster` como fallback, `loading="lazy"` + `width/height` em todas as imagens, fontes com `display=swap`.
- SEO: title/meta description por página, H1 único, headings semânticos, alt text, JSON-LD Organization atualizado, sitemap ajustado com as novas rotas.
- Todos os pontos de troca de conteúdo marcados com comentários `{/* TODO CONTEÚDO: ... */}` (vídeos, imagens, logos de clientes, números, depoimentos, textos).
