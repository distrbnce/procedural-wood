// Portable GLSL starter for species-driven procedural wood.

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

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

vec3 proceduralWood(vec2 uv, vec3 baseColor, vec3 latewoodColor, float ringFrequency, float ringContrast, float warpStrength, float warpScale, float grainStrength, float grainStretch) {
    vec2 warped = uv + vec2(fbm(uv * warpScale), fbm(uv * warpScale + 19.7)) * warpStrength;
    float rings = 0.5 + 0.5 * sin(warped.x * ringFrequency + fbm(warped * 3.0) * 2.0);
    rings = pow(rings, mix(1.0, 4.0, ringContrast));

    float grain = fbm(vec2(warped.x * 0.6, warped.y * grainStretch)) * grainStrength;
    float mask = clamp(rings + grain, 0.0, 1.0);

    return mix(baseColor, latewoodColor, mask);
}
