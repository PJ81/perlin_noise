import Noise2D from "./noise.js";

const noise = new Noise2D();

const ctx = document.getElementsByTagName("canvas")[0].getContext("2d");

for (let y = 0; y < 500; y++) {
  for (let x = 0; x < 500; x++) {
    let n = 0.0,
      a = 1.0,
      f = 0.005;
    for (let o = 0; o < 10; o++) {
      let v = a * noise.noise(x * f, y * f);
      n += v;
      a *= 0.5;
      f *= 2.0;
    }

    n += 1.0;
    n *= 0.5;

    /*
    let rgb = Math.round(255 * n);
    if (n < 0.5)
      ctx.fillStyle = "rgba(0.0,0.0," + (rgb * 2) + ",1.0)";
    else if (n < 0.9)
      ctx.fillStyle = "rgba(0.0," + rgb + "," + Math.round(rgb * 0.5) + ",1.0)";
    else
      ctx.fillStyle = "rgba(" + rgb + "," + rgb + "," + rgb + ",1.0)";
    */

    const c = 255 * n;
    ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
    ctx.fillRect(x, y, 1, 1);
  }
}