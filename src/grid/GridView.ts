import { Container } from "pixi.js";

export class GridView {
  public container: Container;

  constructor() {
    this.container = new Container();
    this.container.sortableChildren = true;
    this.container.pivot.set(-75, 75);
  }
}
