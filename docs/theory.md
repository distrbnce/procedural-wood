# Procedural Wood Theory

Real wood has structure at several scales. A useful procedural model separates those scales into composable layers.

## Structural Categories

### Softwoods

Conifers such as pine generally have broad growth bands, visible latewood stripes, frequent knots, and minimal pore detail.

Algorithmic emphasis:

- Broad ring gradients.
- Strong directional fiber.
- Knot fields.
- Little to no pore field.

### Ring-Porous Hardwoods

Woods such as oak have large pores concentrated in earlywood bands, making annual rings visually strong.

Algorithmic emphasis:

- High contrast radial bands.
- Pore bands aligned with rings.
- Medullary rays or flecks.

### Diffuse-Porous Hardwoods

Woods such as maple, cherry, birch, and walnut distribute pores more evenly, producing smoother grain.

Algorithmic emphasis:

- Low or moderate ring contrast.
- Fine directional noise.
- Color variation and subtle figure.

## Core Signals

### Rings

Rings usually start from radial distance:

```c
float r = length(p - center);
float rings = sin(r * frequency);
```

For side grain, a cylindrical or projected coordinate often reads better than literal circles.

### Domain Warping

Warping bends ideal rings into organic grain:

```c
vec2 warped = p + fbm(p * warpScale) * warpStrength;
```

### Fiber

Directional grain comes from stretched noise:

```c
float fiber = noise(vec2(p.x * grainStretch, p.y));
```

### Features

Knots, pores, rays, curl, and spalting are layered feature masks. Species presets should declare which feature masks matter instead of baking them into one opaque shader.
