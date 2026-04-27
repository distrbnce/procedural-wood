const presetFiles = [
  "../../presets/pine/pine.json",
  "../../presets/oak/oak.json",
  "../../presets/walnut/walnut.json",
  "../../presets/maple/maple.json",
  "../../presets/cherry/cherry.json",
  "../../presets/mahogany/mahogany.json",
  "../../presets/birch/birch.json",
  "../../presets/teak/teak.json"
];

const embeddedPresets = [
  {
    "name": "Pine",
    "category": "softwood",
    "ringFrequency": 5.5,
    "ringContrast": 0.65,
    "warpStrength": 0.35,
    "warpScale": 1.1,
    "grainStrength": 0.55,
    "grainStretch": 9.0,
    "knotDensity": 0.8,
    "poreDensity": 0.02,
    "rayIntensity": 0.0,
    "baseColor": "#d9a85f",
    "latewoodColor": "#9a5b25"
  },
  {
    "name": "Oak",
    "category": "ring-porous hardwood",
    "ringFrequency": 9.0,
    "ringContrast": 0.8,
    "warpStrength": 0.25,
    "warpScale": 1.5,
    "grainStrength": 0.65,
    "grainStretch": 12.0,
    "knotDensity": 0.15,
    "poreDensity": 0.85,
    "rayIntensity": 0.75,
    "baseColor": "#b9864f",
    "latewoodColor": "#5c341c"
  },
  {
    "name": "Walnut",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 6.0,
    "ringContrast": 0.35,
    "warpStrength": 0.7,
    "warpScale": 1.8,
    "grainStrength": 0.7,
    "grainStretch": 10.0,
    "knotDensity": 0.2,
    "poreDensity": 0.25,
    "rayIntensity": 0.05,
    "baseColor": "#5b351f",
    "latewoodColor": "#1f130d"
  },
  {
    "name": "Maple",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 7.0,
    "ringContrast": 0.18,
    "warpStrength": 0.2,
    "warpScale": 1.2,
    "grainStrength": 0.25,
    "grainStretch": 14.0,
    "knotDensity": 0.05,
    "poreDensity": 0.12,
    "rayIntensity": 0.1,
    "baseColor": "#e3c995",
    "latewoodColor": "#b98f55"
  },
  {
    "name": "Cherry",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 7.5,
    "ringContrast": 0.32,
    "warpStrength": 0.32,
    "warpScale": 1.4,
    "grainStrength": 0.42,
    "grainStretch": 11.0,
    "knotDensity": 0.12,
    "poreDensity": 0.18,
    "rayIntensity": 0.08,
    "baseColor": "#b7653f",
    "latewoodColor": "#6c2f20"
  },
  {
    "name": "Mahogany",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 6.5,
    "ringContrast": 0.45,
    "warpStrength": 0.45,
    "warpScale": 1.3,
    "grainStrength": 0.65,
    "grainStretch": 18.0,
    "knotDensity": 0.04,
    "poreDensity": 0.2,
    "rayIntensity": 0.12,
    "ribbonStripeIntensity": 0.7,
    "baseColor": "#8f3f27",
    "latewoodColor": "#40170f"
  },
  {
    "name": "Birch",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 6.0,
    "ringContrast": 0.16,
    "warpStrength": 0.18,
    "warpScale": 1.0,
    "grainStrength": 0.22,
    "grainStretch": 13.0,
    "knotDensity": 0.1,
    "poreDensity": 0.08,
    "rayIntensity": 0.08,
    "baseColor": "#e6cf9e",
    "latewoodColor": "#bd945e"
  },
  {
    "name": "Teak",
    "category": "diffuse-porous hardwood",
    "ringFrequency": 7.0,
    "ringContrast": 0.45,
    "warpStrength": 0.38,
    "warpScale": 1.6,
    "grainStrength": 0.62,
    "grainStretch": 12.0,
    "knotDensity": 0.08,
    "poreDensity": 0.22,
    "rayIntensity": 0.08,
    "oilStreakIntensity": 0.55,
    "baseColor": "#b87935",
    "latewoodColor": "#4a2a16"
  }
];

const controlSchema = [
  ["ringFrequency", 1, 18, 0.1],
  ["ringContrast", 0, 1, 0.01],
  ["warpStrength", 0, 1.5, 0.01],
  ["warpScale", 0.2, 4, 0.1],
  ["grainStrength", 0, 1.5, 0.01],
  ["grainStretch", 1, 28, 0.1],
  ["knotDensity", 0, 1, 0.01],
  ["poreDensity", 0, 1, 0.01],
  ["rayIntensity", 0, 1, 0.01],
  ["ribbonStripeIntensity", 0, 1, 0.01],
  ["oilStreakIntensity", 0, 1, 0.01]
];

const labels = {
  ringFrequency: "Ring frequency",
  ringContrast: "Ring contrast",
  warpStrength: "Warp strength",
  warpScale: "Warp scale",
  grainStrength: "Grain strength",
  grainStretch: "Grain stretch",
  knotDensity: "Knot density",
  poreDensity: "Pore density",
  rayIntensity: "Ray intensity",
  ribbonStripeIntensity: "Ribbon stripe",
  oilStreakIntensity: "Oil streaks"
};

const fallbackValues = {
  ribbonStripeIntensity: 0,
  oilStreakIntensity: 0
};

const state = {
  presets: [],
  current: null,
  renderFrame: 0,
  resizeFrame: 0
};

const maxRenderPixels = 260000;

const presetSelect = document.querySelector("#presetSelect");
const speciesMeta = document.querySelector("#speciesMeta");
const controls = document.querySelector("#controls");
const sideCanvas = document.querySelector("#sideCanvas");
const endCanvas = document.querySelector("#endCanvas");
const sideResolution = document.querySelector("#sideResolution");
const endResolution = document.querySelector("#endResolution");
const exportButton = document.querySelector("#exportButton");
const exportDialog = document.querySelector("#exportDialog");
const exportText = document.querySelector("#exportText");

const sideContext = sideCanvas.getContext("2d", { willReadFrequently: false });
const endContext = endCanvas.getContext("2d", { willReadFrequently: false });

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

function fbm(x, y) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < 5; i += 1) {
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

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function preparePreset(preset) {
  const prepared = structuredClone(preset);
  for (const [key] of controlSchema) {
    prepared[key] ??= fallbackValues[key] ?? 0;
  }
  prepared.baseRgb = hexToRgb(prepared.baseColor);
  prepared.latewoodRgb = hexToRgb(prepared.latewoodColor);
  return prepared;
}

function writePixel(data, offset, u, v, params, mode) {
  const x = (u - 0.5) * 3.2;
  const y = (v - 0.5) * 2.2;

  const warpX = (fbm(x * params.warpScale, y * params.warpScale) - 0.5) * params.warpStrength;
  const warpY = (fbm(x * params.warpScale + 19.7, y * params.warpScale - 6.3) - 0.5) * params.warpStrength;
  const wx = x + warpX;
  const wy = y + warpY;

  const ringCoordinate = mode === "end"
    ? Math.hypot(wx, wy) * 1.35
    : wx + Math.sin(wy * 2.4) * 0.08;

  let rings = 0.5 + 0.5 * Math.sin(ringCoordinate * params.ringFrequency + fbm(wx * 2.5, wy * 2.5) * 2.2);
  rings = Math.pow(rings, lerp(1.0, 4.5, params.ringContrast));

  const fiber = fbm(wx * 0.75, wy * params.grainStretch) * params.grainStrength;
  const poreSeed = noise(wx * 38, wy * 38);
  const pores = params.poreDensity * (poreSeed > 0.72 ? 0.22 : 0);
  const rays = params.rayIntensity * Math.pow(Math.abs(Math.sin((mode === "end" ? Math.atan2(wy, wx) : wx) * 36)), 28) * 0.35;
  const knots = params.knotDensity * knotField(wx, wy, mode);
  const ribbon = (params.ribbonStripeIntensity ?? 0) * Math.pow(0.5 + 0.5 * Math.sin((wx + wy * 0.18) * 13), 3) * 0.25;
  const oil = (params.oilStreakIntensity ?? 0) * Math.pow(fbm(wx * 2.2, wy * 8), 2) * 0.28;

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

function renderCanvas(canvas, context, resolutionLabel, mode) {
  const rect = canvas.getBoundingClientRect();
  const cssWidth = Math.max(320, rect.width);
  const cssHeight = Math.max(280, rect.height);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  const rawWidth = cssWidth * pixelRatio;
  const rawHeight = cssHeight * pixelRatio;
  const pixelScale = Math.min(1, Math.sqrt(maxRenderPixels / (rawWidth * rawHeight)));
  const width = Math.max(260, Math.floor(rawWidth * pixelScale));
  const height = Math.max(220, Math.floor(rawHeight * pixelScale));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const params = state.current;
  const image = context.createImageData(width, height);
  const data = image.data;
  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      writePixel(data, offset, x / width, v, params, mode);
    }
  }
  context.putImageData(image, 0, 0);
  resolutionLabel.textContent = `${width} x ${height}`;
}

function render() {
  if (!state.current) {
    return;
  }
  speciesMeta.textContent = state.current.category;
  renderCanvas(sideCanvas, sideContext, sideResolution, "side");
  renderCanvas(endCanvas, endContext, endResolution, "end");
}

function scheduleRender() {
  if (state.renderFrame) {
    return;
  }

  state.renderFrame = window.requestAnimationFrame(() => {
    state.renderFrame = 0;
    render();
  });
}

function updatePreset(name) {
  const preset = state.presets.find((item) => item.name === name);
  state.current = preparePreset(preset);
  buildControls();
  scheduleRender();
}

function buildControls() {
  controls.replaceChildren();
  for (const [key, min, max, step] of controlSchema) {
    const control = document.createElement("label");
    control.className = "control";

    const top = document.createElement("div");
    top.className = "control-top";

    const label = document.createElement("span");
    label.className = "control-label";
    label.textContent = labels[key];

    const value = document.createElement("span");
    value.className = "control-value";
    value.textContent = Number(state.current[key]).toFixed(2);

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = state.current[key];
    input.addEventListener("input", () => {
      state.current[key] = Number(input.value);
      value.textContent = Number(state.current[key]).toFixed(2);
      scheduleRender();
    });

    top.append(label, value);
    control.append(top, input);
    controls.append(control);
  }
}

function setupPresetSelect() {
  for (const preset of state.presets) {
    const option = document.createElement("option");
    option.value = preset.name;
    option.textContent = preset.name;
    presetSelect.append(option);
  }
  presetSelect.addEventListener("change", () => updatePreset(presetSelect.value));
}

async function loadPresets() {
  try {
    state.presets = await Promise.all(
      presetFiles.map(async (file) => {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Unable to load ${file}`);
        }
        return response.json();
      })
    );
  } catch {
    state.presets = structuredClone(embeddedPresets);
  }
}

exportButton.addEventListener("click", () => {
  exportText.value = JSON.stringify(state.current, null, 2);
  exportDialog.showModal();
});

window.addEventListener("resize", () => {
  if (state.resizeFrame) {
    window.cancelAnimationFrame(state.resizeFrame);
  }
  state.resizeFrame = window.requestAnimationFrame(() => {
    state.resizeFrame = 0;
    scheduleRender();
  });
});

try {
  await loadPresets();
  setupPresetSelect();
  updatePreset(state.presets[0].name);
} catch (error) {
  speciesMeta.textContent = error.message;
}
