// https://rtouti.github.io/graphics/perlin-noise-algorithm


import Point from "./point.js";

export default class Noise2D {

  private permutation: number[];

  constructor() {
    this.makePermutation();

  }

  private makePermutation(): void {
    this.permutation = [];

    for (let i = 0; i < 256; i++) {
      this.permutation.push(i);
    }

    this.shuffle(this.permutation);

    for (let i = 0; i < 256; i++) {
      this.permutation.push(this.permutation[i]);
    }
  }

  private shuffle<T>(arrayToShuffle: T[]): void {
    for (let e = arrayToShuffle.length - 1; e > 0; e--) {
      const index = Math.floor(Math.random() * (e + 1));
      const temp = arrayToShuffle[e];

      arrayToShuffle[e] = arrayToShuffle[index];
      arrayToShuffle[index] = temp;
    }
  }

  private getConstantVector(v: number): Point {
    // v is the value from the permutation table
    const h = v & 3;
    if (h == 0)
      return new Point(1.0, 1.0);
    else if (h == 1)
      return new Point(-1.0, 1.0);
    else if (h == 2)
      return new Point(-1.0, -1.0);
    else
      return new Point(1.0, -1.0);
  }

  private fade(t: number): number {
    return ((6 * t - 15) * t + 10) * t * t * t;
  }

  private lerp(t: number, a1: number, a2: number): number {
    return a1 + t * (a2 - a1);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const topRight = new Point(xf - 1.0, yf - 1.0);
    const topLeft = new Point(xf, yf - 1.0);
    const bottomRight = new Point(xf - 1.0, yf);
    const bottomLeft = new Point(xf, yf);

    // Select a value from the permutation array for each of the 4 corners
    const valueTopRight = this.permutation[this.permutation[X + 1] + Y + 1];
    const valueTopLeft = this.permutation[this.permutation[X] + Y + 1];
    const valueBottomRight = this.permutation[this.permutation[X + 1] + Y];
    const valueBottomLeft = this.permutation[this.permutation[X] + Y];

    const dotTopRight = topRight.dot(this.getConstantVector(valueTopRight));
    const dotTopLeft = topLeft.dot(this.getConstantVector(valueTopLeft));
    const dotBottomRight = bottomRight.dot(this.getConstantVector(valueBottomRight));
    const dotBottomLeft = bottomLeft.dot(this.getConstantVector(valueBottomLeft));

    const u = this.fade(xf);
    const v = this.fade(yf);

    return this.lerp(u,
      this.lerp(v, dotBottomLeft, dotTopLeft),
      this.lerp(v, dotBottomRight, dotTopRight)
    )
  }
}
