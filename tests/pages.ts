import pages from "../src/data/pages.json" with { type: "json" };

/** Todas as páginas do site, com barra final (o servidor de teste exige). */
export const paths = Object.keys(pages).map((p) => (p === "/" ? "/" : `${p}/`));

/** CSS que congela animações e transições nos prints. */
export const freeze = `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}
.js .orbit-ring,.js .motion-core,.js .motion-source,.js .motion-result{visibility:visible!important}`;
