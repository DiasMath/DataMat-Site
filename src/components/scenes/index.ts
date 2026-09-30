import type { ComponentType } from "react";
import type { Kind } from "../../data/site";
import type { SceneProps } from "./useScene";
import { DadosScene, LENGTH as dadosLength } from "./DadosScene";
import { IaScene, LENGTH as iaLength } from "./IaScene";
import { MarcaScene, LENGTH as marcaLength } from "./MarcaScene";
import { SitesScene, LENGTH as sitesLength } from "./SitesScene";

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
/** Duração de cada cena, em segundos. */
export const sceneLengths: Record<Kind, number> = {
  dados: dadosLength,
  ia: iaLength,
  marca: marcaLength,
  sites: sitesLength,
};
export type { SceneProps };
