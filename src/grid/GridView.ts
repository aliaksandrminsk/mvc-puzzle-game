import { Container, Loader, Point } from "pixi.js";
import * as particles from "@pixi/particle-emitter";

export class GridView {
  public container: Container;
  private readonly particlesContainer: Container;
  private particlesEmitter: particles.Emitter;

  constructor() {
    this.container = new Container();
    this.container.sortableChildren = true;
    this.container.pivot.set(-75, 75);

    this.particlesContainer = new Container();
    this.container.addChild(this.particlesContainer);

    const config = Loader.shared.resources["emitter.json"].data;

    this.particlesEmitter = new particles.Emitter(
      this.particlesContainer,
      config
    );
  }

  public showExplosion(position: Point): void {
    this.particlesContainer.position.set(position.x, position.y);
    let elapsed: number = Date.now();
    let emitting: boolean = true;

    const update = () => {
      if (emitting) {
        requestAnimationFrame(update);
        const now: number = Date.now();
        this.particlesEmitter.update((now - elapsed) / 1000);
        elapsed = now;
      }
    };
    this.particlesEmitter.playOnce(() => (emitting = false));
    update();
  }
}
