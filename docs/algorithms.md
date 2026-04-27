# Algorithms

## Radial Rings

The classic wood shader begins with distance from a center point and applies a periodic function.

```c
float radialRings(vec2 p, float frequency) {
    return 0.5 + 0.5 * sin(length(p) * frequency);
}
```

Use for end grain, knots, and stylized ring fields.

## Cylindrical Side Grain

Side grain is often better represented by treating one axis as distance through a virtual trunk.

```c
float sideRings(vec2 p, float frequency) {
    float radius = p.x;
    return 0.5 + 0.5 * sin(radius * frequency);
}
```

## Fractal Noise

Layered noise adds detail at multiple scales.

```c
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}
```

## Domain Warping

Domain warping distorts ideal structure before evaluating rings or fibers.

```c
vec2 warp(vec2 p, float scale, float strength) {
    return p + vec2(fbm(p * scale), fbm(p * scale + 17.0)) * strength;
}
```

## Fiber Grain

Long grain is directional and anisotropic.

```c
float fiberGrain(vec2 p, float stretch, float strength) {
    return noise(vec2(p.x * stretch, p.y)) * strength;
}
```

## Pore Field

Pores are small dark marks. Ring-porous woods concentrate them along earlywood bands; diffuse-porous woods distribute them gently.

## Ray Field

Medullary rays are lighter radial flecks, especially visible in oak. A first model can use narrow directional masks multiplied by ring structure.
