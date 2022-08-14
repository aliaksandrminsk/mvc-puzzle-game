import { App } from "./App";
import * as PIXI from "pixi.js";

declare global {
  interface Window {
    PIXI: any;
  }
}

window.PIXI = PIXI;
const app = new App();
app.run();
