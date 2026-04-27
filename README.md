# Procedural Wood

A parameterized reference library for procedural wood grain algorithms and species presets.

## Goals

- Map real wood visual traits to reusable procedural parameters.
- Provide clear algorithm building blocks for rings, grain, pores, rays, knots, and warping.
- Offer species-oriented presets for common woods.
- Keep implementations portable across shader languages and creative coding environments.

## Core Idea

Wood grain can be modeled as a stack of procedural signals:

- Growth rings from radial or cylindrical distance fields.
- Domain warping for natural irregularity.
- Directional fiber noise for long grain.
- Feature fields for knots, pores, rays, curls, and mineral streaks.
- Color ramps tuned per wood species.

## Repository Layout

```text
algorithms/     Core concepts and reference formulas
docs/           Theory, taxonomy, and source notes
examples/       Small runnable or visual examples
presets/        Species profiles as portable JSON
shaders/        Metal, GLSL, and OpenFrameworks starters
```

## Species Presets

The initial presets cover common rendering targets:

- Pine: softwood, broad rings, knots, warm yellow-orange tones.
- Oak: ring-porous hardwood, strong pores, visible rays.
- Walnut: dark diffuse-porous hardwood, smooth flowing grain.
- Maple: pale diffuse-porous hardwood, subtle smooth grain.
- Cherry: warm reddish hardwood, fine smooth grain.
- Mahogany: reddish brown hardwood, ribbon-like stripe figure.
- Birch: pale subtle grain, low contrast.
- Teak: golden brown, oily appearance, moderate dark streaks.

## Status

Early scaffold. The first milestone is a documented taxonomy plus matching shader implementations for the shared parameter model.
