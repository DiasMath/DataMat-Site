import type { ComponentType } from "react";
import type { Kind } from "../../data/site";
import type { SceneProps } from "./useScene";
import { DadosScene } from "./DadosScene";
import { IaScene } from "./IaScene";
import { MarcaScene } from "./MarcaScene";
import { SitesScene } from "./SitesScene";

/**
 * Cenas animadas (os "vídeos" da home), feitas em código: leves, nítidas em
 * qualquer tela e fáceis de editar. Para trocar uma cena por um vídeo de
 * verdade (ex.: Google Flow), use o campo `video` em src/content/home.ts.
 */
export const scenes: Record<Kind, ComponentType<SceneProps>> = {
  dados: DadosScene,
  ia: IaScene,
  marca: MarcaScene,
  sites: SitesScene,
};
export type { SceneProps };
