export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uRadius;
  uniform vec2 uClick;
  uniform float uClickStrength;
  uniform float uClickRadius;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aRandom;
  attribute float aSize;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float delay = aRandom * 0.35;
    float p = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
    // Fast burst out of the center, then a soft settle into the logo.
    p = 1.0 - pow(1.0 - p, 4.0);

    vec3 pos = mix(aStart, position, p);

    float t = uTime * 0.6;
    pos.x += sin(t + aRandom * 40.0) * 0.012;
    pos.y += cos(t * 0.9 + aRandom * 30.0) * 0.012;
    pos.z += sin(t * 0.7 + aRandom * 20.0) * 0.06;

    vec2 delta = pos.xy - uMouse;
    float dist = length(delta);
    float falloff = 1.0 - smoothstep(0.0, uRadius, dist);
    float force = falloff * falloff * uMouseStrength;
    pos.xy += normalize(delta + 0.0001) * force * (0.08 + aRandom * 0.06);
    pos.z += force * (0.12 + aRandom * 0.18);

    vec2 clickDelta = pos.xy - uClick;
    float clickDist = length(clickDelta);
    float clickFalloff = 1.0 - smoothstep(0.0, uClickRadius, clickDist);
    float clickForce = clickFalloff * clickFalloff * uClickStrength;
    // Stagger return slightly per particle so the settle feels organic.
    float clickPush = clickForce * (0.16 + aRandom * 0.1);
    pos.xy += normalize(clickDelta + 0.0001) * clickPush;
    pos.z += clickForce * (0.1 + aRandom * 0.12);

    float totalForce = force + clickForce;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float sizeScale = mix(0.35, 1.0, p);
    gl_PointSize = uSize * aSize * uPixelRatio * sizeScale * (1.0 + totalForce * 0.25) / -mvPosition.z;

    vColor = aColor * (1.0 + totalForce * 0.12);
    vAlpha = mix(0.0, 1.0, smoothstep(0.0, 0.2, p));
  }
`;

export const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor * 0.85, alpha);
  }
`;
