import { assetsMap } from "./assetsMap";
import * as PIXI from "pixi.js";

export class Loader {
  private loader: PIXI.Loader;
  constructor(loader: PIXI.Loader) {
    this.loader = loader;
  }

  preload() {
    PIXI.utils.clearTextureCache();
    return new Promise<void>((resolve) => {
      assetsMap.sprites.forEach((value) =>
        this.loader.add(value.name, value.url)
      );
      this.loader.load(() => {
        resolve();
      });
    });
  }
}
