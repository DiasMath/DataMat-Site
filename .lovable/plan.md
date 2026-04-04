

## Plano: Página de Demonstração + Link na Navbar

### O que será feito

1. **Novo link "Demonstração" no Header** — Adicionar ao array `navLinks` um item que aponta para `/demonstracao` (usando React Router `Link` em vez de anchor tags para navegação interna entre páginas).

2. **Nova página `src/pages/Demo.tsx`** — Página com o mesmo design system (cores terrosas, Plus Jakarta Sans, componentes consistentes):
   - **Hero banner** com imagem de fundo escura/gradiente (estilo roqt.com.br), título em destaque tipo "Veja seus dados ganharem vida" e subtítulo explicativo.
   - **Seção de contexto** com texto + ícones explicando o que o cliente verá na demonstração (cards com benefícios tipo: "Dashboards Interativos", "Filtros Dinâmicos", "Dados em Tempo Real").
   - **Seção do iframe Power BI** com título, texto introdutório e um container estilizado com placeholder para o iframe (com bordas arredondadas, sombra, aspect-ratio 16:9). O iframe terá um `src` placeholder para ser substituído pelo link real do Power BI.
   - **CTA final** incentivando o contato após ver a demo.
   - **Footer** reutilizado da página principal.

3. **Atualizar `App.tsx`** — Adicionar rota `/demonstracao` apontando para a nova página.

4. **Atualizar `Header.tsx`** — Converter links para usar React Router (`Link` / `useNavigate`) para links de rota, mantendo hash links para a página principal. Adicionar "Demonstração" como link de navegação.

### Detalhes técnicos

- Header precisará distinguir entre hash links (`#sobre`) e route links (`/demonstracao`), usando `<a>` para hash e `<Link>` para rotas.
- A página Demo reutilizará o Header e Footer existentes.
- O iframe do Power BI usará `allowFullScreen` e será responsivo via aspect-ratio container.

