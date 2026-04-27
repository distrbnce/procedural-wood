function hash2(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function noise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = smoothstep(fx);
  const uy = smoothstep(fy);

  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

function fbm(x, y, octaves = 5) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i += 1) {
    value += amplitude * noise(x * frequency, y * frequency);
    frequency *= 2;
    amplitude *= 0.5;
  }
  return value;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function writePixel(data, offset, u, v, params, mode, quality) {
  const x = (u - 0.5) * 3.2;
  const y = (v - 0.5) * 2.2;
  const octaves = quality === "preview" ? 3 : 5;

  const warpX = (fbm(x * params.warpScale, y * params.warpScale, octaves) - 0.5) * params.warpStrength;
  const warpY = (fbm(x * params.warpScale + 19.7, y * params.warpScale - 6.3, octaves) - 0.5) * params.warpStrength;
  const wx = x + warpX;
  const wy = y + warpY;

  const ringCoordinate = mode === "end"
    ? Math.hypot(wx, wy) * 1.35
    : wx + Math.sin(wy * 2.4) * 0.08;

  let rings = 0.5 + 0.5 * Math.sin(ringCoordinate * params.ringFrequency + fbm(wx * 2.5, wy * 2.5, octaves) * 2.2);
  rings = Math.pow(rings, lerp(1.0, 4.5, params.ringContrast));

  const fiber = fbm(wx * 0.75, wy * params.grainStretch, octaves) * params.grainStrength;
  const poreSeed = quality === "preview" ? 0 : noise(wx * 38, wy * 38);
  const pores = quality === "preview" ? 0 : params.poreDensity * (poreSeed > 0.72 ? 0.22 : 0);
  const rays = quality === "preview" ? 0 : params.rayIntensity * Math.pow(Math.abs(Math.sin((mode === "end" ? Math.atan2(wy, wx) : wx) * 36)), 28) * 0.35;
  const knots = quality === "preview" ? 0 : params.knotDensity * knotField(wx, wy, mode);
  const ribbon = (params.ribbonStripeIntensity ?? 0) * Math.pow(0.5 + 0.5 * Math.sin((wx + wy * 0.18) * 13), 3) * 0.25;
  const oil = (params.oilStreakIntensity ?? 0) * Math.pow(fbm(wx * 2.2, wy * 8, octaves), 2) * 0.28;

  const mask = clamp(rings + fiber + pores + knots + oil - rays + ribbon, 0, 1);
  const highlight = clamp(0.08 + rays + ribbon * 0.4 - pores, -0.15, 0.25);
  const highlightOffset = highlight * 255;
  const baseColor = params.baseRgb;
  const latewoodColor = params.latewoodRgb;

  data[offset] = clamp(Math.round(lerp(baseColor[0], latewoodColor[0], mask) + highlightOffset), 0, 255);
  data[offset + 1] = clamp(Math.round(lerp(baseColor[1], latewoodColor[1], mask) + highlightOffset), 0, 255);
  data[offset + 2] = clamp(Math.round(lerp(baseColor[2], latewoodColor[2], mask) + highlightOffset), 0, 255);
  data[offset + 3] = 255;
}

function knotField(x, y, mode) {
  if (mode === "end") {
    return 0;
  }

  const centers = [
    [-0.95, -0.45, 0.18],
    [0.25, 0.18, 0.24],
    [1.08, -0.08, 0.16]
  ];

  let value = 0;
  for (const [cx, cy, radius] of centers) {
    const dx = (x - cx) / radius;
    const dy = (y - cy) / (radius * 0.56);
    const d = Math.hypot(dx, dy);
    value += Math.max(0, 1 - d) * (0.5 + 0.5 * Math.sin(d * 18));
  }
  return clamp(value, 0, 1) * 0.45;
}

self.addEventListener("message", (event) => {
  const { id, mode, quality, width, height, params } = event.data;
  const data = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      writePixel(data, offset, x / width, v, params, mode, quality);
    }
  }

  self.postMessage({ id, mode, quality, width, height, pixels: data.buffer }, [data.buffer]);
});
