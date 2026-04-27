#include <metal_stdlib>
using namespace metal;

struct WoodParams {
    float ringFrequency;
    float ringContrast;
    float warpStrength;
    float warpScale;
    float grainStrength;
    float grainStretch;
    float3 baseColor;
    float3 latewoodColor;
};

float hash21(float2 p) {
    return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(float2 p) {
    float2 i = floor(p);
    float2 f = fract(p);
    float2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash21(i), hash21(i + float2(1.0, 0.0)), u.x),
        mix(hash21(i + float2(0.0, 1.0)), hash21(i + float2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(float2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * valueNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

float3 proceduralWood(float2 uv, constant WoodParams& params) {
    float2 warped = uv + float2(fbm(uv * params.warpScale), fbm(uv * params.warpScale + 19.7)) * params.warpStrength;
    float rings = 0.5 + 0.5 * sin(warped.x * params.ringFrequency + fbm(warped * 3.0) * 2.0);
    rings = pow(rings, mix(1.0, 4.0, params.ringContrast));

    float grain = fbm(float2(warped.x * 0.6, warped.y * params.grainStretch)) * params.grainStrength;
    float mask = clamp(rings + grain, 0.0, 1.0);

    return mix(params.baseColor, params.latewoodColor, mask);
}
