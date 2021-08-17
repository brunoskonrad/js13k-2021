export class GameLoop {
  frameRef: number;

  lastTime: number;
  lag: number = 0.0;
  isRunning: boolean = false;

  static MS_UPDATE_RATE = 1 / 60;

  update(_deltaTime: number) {}

  render() {}

  start = () => {
    this.lastTime = Date.now();
    this.isRunning = true;
    this.tick();
  };

  stop = () => {
    cancelAnimationFrame(this.frameRef);
    this.isRunning = false;
  };

  private tick = () => {
    const current = Date.now();
    const ellapsed = (current - this.lastTime) / 1000;
    this.lastTime = current;
    this.lag += ellapsed;

    this.update(ellapsed);

    while (this.lag >= GameLoop.MS_UPDATE_RATE) {
      this.render();

      this.lag -= GameLoop.MS_UPDATE_RATE;
    }

    this.lastTime = current;
    this.frameRef = requestAnimationFrame(this.tick);
  };
}
