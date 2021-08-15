class Canvas {
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  private gameWidth = 400;
  private gameHeight = 240;

  init() {
    this.element = document.querySelector("canvas");
    this.context = this.element.getContext("2d");

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas);
  }

  clear() {
    this.element.width ^= 0;
  }

  private resizeCanvas = () => {
    const w = Math.round(window.innerWidth / this.gameWidth);
    const h = Math.round(window.innerHeight / this.gameHeight);
    const factor = Math.max(Math.min(w, h) - 1, 1);

    this.element.width = this.gameWidth;
    this.element.height = this.gameHeight;
    this.element.style.width = `${this.gameWidth * factor}px`;
    this.element.style.height = `${this.gameHeight * factor}px`;
  };
}

export const canvas = new Canvas();
