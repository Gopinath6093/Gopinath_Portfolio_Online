"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { getScrollY } from "@/lib/scroll-root";

const BACKGROUND = "#0a0a0a";
// Netflix red (#E50914) as raw sRGB, because the custom shaders write straight to the framebuffer.
const RED_GLSL = "vec3(0.898, 0.035, 0.078)";

type PointerState = { x: number; y: number; active: boolean };

function seededRandom(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixel;
  uniform float uAspect;
  uniform float uStrength;
  uniform vec2 uMouse;
  attribute float aSeed;
  varying float vLight;
  varying float vTwinkle;

  void main() {
    vec3 p = position;
    float depth = 0.3 + aSeed * 0.7;
    p.x += sin(uTime * 0.15 + aSeed * 40.0) * 0.45;
    // Slow upward drift plus scroll parallax, wrapped inside a 14 unit tall volume.
    float lift = uTime * 0.12 * depth + uScroll * depth;
    p.y = mod(p.y + 7.0 + lift, 14.0) - 7.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vec2 ndc = gl_Position.xy / gl_Position.w;
    float d = length((ndc - uMouse) * vec2(uAspect, 1.0));
    vLight = smoothstep(0.35, 0.0, d) * uStrength;
    vTwinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 50.0);

    float size = (0.6 + aSeed * 1.0) * (1.0 + vLight * 0.8);
    gl_PointSize = size * uPixel * (7.0 / -mv.z);
  }
`;

const dustFragment = /* glsl */ `
  varying float vLight;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.0, d);
    vec3 dust = vec3(0.62, 0.62, 0.68);
    vec3 color = mix(dust, ${RED_GLSL}, vLight);
    float alpha = disc * disc * (0.16 + vLight * 0.7) * vTwinkle;
    gl_FragColor = vec4(color * alpha, 1.0);
  }
`;

const glowVertex = /* glsl */ `
  varying vec2 vNdc;

  void main() {
    vNdc = position.xy;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uStrength;
  varying vec2 vNdc;

  void main() {
    vec2 p = vNdc * vec2(uAspect, 1.0);
    vec2 m = uMouse * vec2(uAspect, 1.0);

    // A small, dim spot centred exactly on the cursor with a quick falloff.
    float d = length(p - m);
    float pool = exp(-d * d * 10.0) * 0.22 + exp(-d * 4.0) * 0.045;

    // Dither by a few LSBs to avoid colour banding in the dark gradient.
    float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 255.0;
    vec3 color = ${RED_GLSL} * pool * uStrength + noise * 0.6;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Scene({
  pointer,
  count,
}: {
  pointer: React.RefObject<PointerState>;
  count: number;
}) {
  const dustRef = useRef<THREE.ShaderMaterial>(null);
  const glowRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const random = seededRandom(1337);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 26;
      positions[i * 3 + 1] = (random() - 0.5) * 14;
      positions[i * 3 + 2] = random() * 14 - 9;
      seeds[i] = random();
    }
    return { positions, seeds };
  }, [count]);

  const dustUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixel: { value: 1 },
      uAspect: { value: 1 },
      uStrength: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );
  const glowUniforms = useMemo(
    () => ({
      uAspect: { value: 1 },
      uStrength: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );
  const wasActive = useRef(false);

  useFrame((state, delta) => {
    const dust = dustRef.current;
    const glow = glowRef.current;
    if (!dust || !glow) return;

    const time = state.clock.elapsedTime;
    const aspect = state.size.width / state.size.height;
    const input = pointer.current;
    const mouse = dust.uniforms.uMouse.value as THREE.Vector2;

    // The light only exists while a pointer is over the page; it snaps to the first position, then tracks tightly.
    if (input.active && !wasActive.current) mouse.set(input.x, input.y);
    wasActive.current = input.active;
    mouse.x = THREE.MathUtils.damp(mouse.x, input.x, 14, delta);
    mouse.y = THREE.MathUtils.damp(mouse.y, input.y, 14, delta);
    (glow.uniforms.uMouse.value as THREE.Vector2).copy(mouse);

    const strength = THREE.MathUtils.damp(dust.uniforms.uStrength.value, input.active ? 1 : 0, 6, delta);
    dust.uniforms.uStrength.value = strength;
    glow.uniforms.uStrength.value = strength;

    dust.uniforms.uTime.value = time;
    dust.uniforms.uScroll.value = getScrollY() * 0.0016;
    dust.uniforms.uPixel.value = state.gl.getPixelRatio() * 2.2;
    dust.uniforms.uAspect.value = aspect;
    glow.uniforms.uAspect.value = aspect;
  });

  return (
    <>
      <color attach="background" args={[BACKGROUND]} />

      <mesh frustumCulled={false} renderOrder={0}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={glowRef}
          uniforms={glowUniforms}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          blending={THREE.AdditiveBlending}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      <points frustumCulled={false} renderOrder={1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={dustRef}
          uniforms={dustUniforms}
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          blending={THREE.AdditiveBlending}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </points>
    </>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    // The page keeps its plain #0a0a0a background if WebGL is unavailable.
    return this.state.failed ? null : this.props.children;
  }
}

export default function VoidScene({
  lite,
  reducedMotion,
}: {
  lite: boolean;
  reducedMotion: boolean;
}) {
  const pointer = useRef<PointerState>({ x: 0, y: 0.15, active: false });

  useEffect(() => {
    // Window-level listener: the canvas itself ignores pointer events so the UI above stays clickable.
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <WebGLBoundary>
      <Canvas
        frameloop={reducedMotion ? "demand" : "always"}
        dpr={lite ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        // The canvas must never intercept events; the window listener above drives the light.
        style={{ pointerEvents: "none" }}
      >
        <Scene pointer={pointer} count={lite ? 700 : 1800} />
      </Canvas>
    </WebGLBoundary>
  );
}
