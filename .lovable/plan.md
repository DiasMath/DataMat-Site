

## Plano: Redesign da Página de Demonstração — Layout Mais Dinâmico

### Problema identificado
A página atual usa 4 cards em grid, o mesmo padrão repetido em várias seções da landing page. Isso torna a experiência visual monótona.

### O que vai mudar

**1. Substituir os 4 cards por seções intercaladas texto + visual (zig-zag layout)**

Em vez de cards em grid, criar 3-4 blocos onde texto fica de um lado e uma ilustração/mockup do outro, alternando a posição a cada bloco (esquerda/direita). Cada bloco representa uma funcionalidade:

- **Bloco 1** (imagem à direita): "Dashboards Interativos" — texto explicativo à esquerda, mockup visual de um dashboard à direita (imagem decorativa com gradiente/glow).
- **Bloco 2** (imagem à esquerda): "Filtros que Revelam Insights" — imagem à esquerda mostrando ícones de filtros/segmentação, texto à direita.
- **Bloco 3** (imagem à direita): "Dados Sempre Atualizados" — texto sobre conexão em tempo real, visual à direita com ícones de sync/conexão.
- **Bloco 4** (imagem à esquerda): "Feito Sob Medida" — texto sobre personalização, visual à esquerda.

As "imagens" serão elementos decorativos criados com CSS/SVG (mockups abstratos de dashboards com barras, linhas, cards internos), sem depender de imagens externas.

**2. Adicionar uma seção "Como Funciona" antes do iframe**

Uma mini-timeline horizontal com 3 passos simples: "Conectamos seus dados" → "Criamos seus dashboards" → "Você explora e decide". Layout horizontal com ícones e setas conectando os passos. Quebra a monotonia e prepara o contexto antes do iframe.

**3. Melhorar o container do iframe**

Adicionar um "browser chrome" fake (barra de título com dots coloridos estilo macOS) em volta do iframe para dar mais realismo e sofisticação visual.

**4. Manter Hero e CTA como estão** — já funcionam bem.

### Detalhes técnicos

- Tudo dentro de `src/pages/Demo.tsx` — arquivo único, sem criar novos componentes.
- Zig-zag layout usando `flex-row` / `flex-row-reverse` alternado com `md:flex-row` responsivo (empilha no mobile).
- Mockups visuais feitos com divs estilizadas (barras de gráfico com `bg-primary`, cards miniatura) — zero dependência de imagens externas.
- Animações de entrada com `framer-motion` (fade + slide lateral, acompanhando a direção do layout).

