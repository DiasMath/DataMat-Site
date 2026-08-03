# Datamat — Redesign completo do site institucional

Reformulação visual total da Datamat: de consultoria genérica para marca de tecnologia jovem, ousada e visualmente rica — mas com credibilidade suficiente para um público de gestores/C-level que vai confiar dados sensíveis da empresa à Datamat. Identidade própria (nada de clone da ROQT), estrutura moderna em bento grid, vídeo no hero, microanimações e conteúdo enxuto.

## Direção visual (decidida)

- **Paleta Âmbar Noir**: base preta `#0D0D0D`, superfícies `#1A1A1A`, âmbar `#FFA928` como cor de marca, laranja-brasa `#FF6B35` como acento secundário. Texto claro sobre fundo escuro, com seções pontuais em off-white para respiro.
- **Tipografia com intenção**: Syne apenas em títulos de seção e no headline do hero, com escala tipográfica saltada e não-linear (hero ~clamp 3.5–7rem; H2 ~2.5rem; kickers em 0.75rem caixa alta com tracking largo) — nada de incrementos lineares. Plus Jakarta Sans no corpo, e seu **itálico** reservado para citações e depoimentos.
- **Bento assimétrico, sem simetria repetida**: o conceito de bento fica, mas nenhuma seção repete o padrão de grade da anterior (nada de 2x2 seguido de 2x2). Alturas variam de verdade (spans irregulares), e cada seção tem ao menos um elemento que rompe a grade: card sobreposto ao vizinho, imagem que vaza do container, ou bloco com rotação de 1–2 graus. Exceção deliberada: "Como trabalhamos" não segue essa regra — é o respiro sóbrio da página.
- **Visual central é dado real estilizado**: mockups de dashboard com dados fictícios, composições antes/depois (planilha bagunçada → painel limpo), gráficos de linha/barra estilizados. **Proibido**: cérebro brilhante, rede neural, circuito, robô, gráfico de pizza genérico de estoque.
- **Textura gráfica como assinatura**: grid de pontos e linhas de dados aparecem sempre ancorados aos mesmos elementos — atrás dos números/estatísticas e como marca d'água nos headers de seção. Em nenhum outro lugar.
- **Movimento contido**: parallax e brilho **só** no hero e no CTA final. Nas demais seções, no máximo fade + slide sutil ao entrar em viewport. Hover discreto (leve elevação ou mudança de cor), sem glow. Respeita `prefers-reduced-motion`.

## Estrutura da home

1. **Header fixo** — logo Datamat, menu (Soluções, Cases, Sobre, Blog, Contato), CTA "Fale com um especialista". Fundo transparente no topo do hero, escurece com blur ao rolar. Menu mobile em overlay full-screen.
2. **Hero** — vídeo em loop de fundo (mp4 placeholder, mudo, `playsinline`) com overlay escuro + poster estático como fallback em mobile e conexões lentas. Headline definitiva: **"Menos planilha. Mais decisão."**, com quebra de linha e alinhamento assimétrico (à esquerda, deslocada da coluna central, segunda linha recuada), subheadline de uma linha, CTA primário e secundário. Parallax leve no vídeo.
3. **Prova social** — tratada como elemento de peso, não decorativo (é o principal sinal de credibilidade para esse público): título curto de contexto acima ("Empresas que confiam na Datamat"), carrossel automático e infinito de logos em escala de cinza com cor no hover, e logos em tamanho legível — nada pequeno a ponto de parecer preenchimento; ao inserir os logos reais, priorizar reconhecibilidade.
4. **Soluções (bento assimétrico)** — 4 blocos de proporções distintas para Business Intelligence, Engenharia de Dados, Ciência de Dados e IA. Um dos blocos avança sobre a faixa vizinha e o mockup de dashboard vaza da borda do card. Título curto, 1–2 linhas, link para a página da solução.
5. **Como trabalhamos (seção sóbria)** — timeline horizontal escaneável (scroll horizontal no mobile), numeração enorme em Syne, linha de progresso. Zero rotações, zero sobreposições, composição alinhada e simétrica: mantém paleta e tipografia da marca, mas com tom deliberadamente contido — "somos dinâmicos, mas rigorosos com o que entregamos".
6. **Resultados em números** — 3 números grandes com contador animado, ancorados na textura de grid de pontos; um dos blocos com rotação leve para quebrar o alinhamento.
7. **Depoimentos/Cases** — carrossel horizontal: foto do cliente, nome, cargo, frase em Plus Jakarta itálico e resultado numérico em destaque ao lado.
8. **CTA final** — seção full-width com mídia de fundo diferente do hero, headline grande e botão de agendamento. Único outro lugar com parallax/brilho.
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
- Todos os pontos de troca de conteúdo marcados com comentários `{/* TODO CONTEÚDO: ... */}`, com prioridade explícita para material real:
  - fotos de depoimento → "usar foto real do cliente, não banco de imagens";
  - logos → "logos reais de clientes/parceiros, não placeholders genéricos";
  - fotos de equipe (seção Sobre futura) → "foto real da equipe, não banco de imagens".

