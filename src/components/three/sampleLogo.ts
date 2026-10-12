export interface ParticleData {
  positions: Float32Array;
  starts: Float32Array;
  colors: Float32Array;
  randoms: Float32Array;
  sizes: Float32Array;
  count: number;
}

const SAMPLE_WIDTH = 320;
const LOGO_WORLD_WIDTH = 3.3;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Samples opaque pixels of the logo into particle targets, plus a few ambient "dust" particles. */
export async function sampleLogo(src: string, logoCount: number, dustCount: number): Promise<ParticleData> {
  const img = await loadImage(src);
  const width = SAMPLE_WIDTH;
  const height = Math.round((img.height / img.width) * width);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context unavailable");
  ctx.drawImage(img, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  const candidates: number[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 140) candidates.push(y * width + x);
    }
  }

  const count = logoCount + dustCount;
  const positions = new Float32Array(count * 3);
  const starts = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const sizes = new Float32Array(count);

  const scale = LOGO_WORLD_WIDTH / width;
  const worldHeight = height * scale;

  for (let i = 0; i < logoCount; i++) {
    const index = candidates[Math.floor(Math.random() * candidates.length)];
    const px = index % width;
    const py = Math.floor(index / width);
    const o = index * 4;

    positions[i * 3] = (px + Math.random()) * scale - LOGO_WORLD_WIDTH / 2;
    positions[i * 3 + 1] = worldHeight / 2 - (py + Math.random()) * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;

    // Burst from a tight cloud at the origin so the canvas edges never clip the intro.
    const radius = Math.pow(Math.random(), 2) * 0.12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starts[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starts[i * 3 + 2] = radius * Math.cos(phi);

    colors[i * 3] = data[o] / 255;
    colors[i * 3 + 1] = data[o + 1] / 255;
    colors[i * 3 + 2] = data[o + 2] / 255;
    randoms[i] = Math.random();
    sizes[i] = 0.6 + Math.random() * 0.8;
  }

  const palette = [
    [1, 0.68, 0],
    [0.97, 0.5, 0.25],
    [0.97, 0.5, 0.61],
    [0.97, 0.4, 0.88],
  ];

  for (let i = logoCount; i < count; i++) {
    const x = (Math.random() - 0.5) * 5;
    const y = (Math.random() - 0.5) * 5;
    const z = (Math.random() - 0.5) * 3 - 0.5;
    positions.set([x, y, z], i * 3);
    starts.set([x, y, z], i * 3);
    const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
    const dim = 0.25 + Math.random() * 0.25;
    colors.set([r * dim, g * dim, b * dim], i * 3);
    randoms[i] = Math.random();
    sizes[i] = 0.4 + Math.random() * 0.6;
  }

  return { positions, starts, colors, randoms, sizes, count };
}
