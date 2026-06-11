"use client";

/**
 * IoT telemetry scene for /products/iot/ — sensor readings rising off a
 * wireframe tank as a particle stream toward a floating data plane (the
 * "cloud"), with a red pulse ring at the sensor head. Time-driven, not
 * scroll-scrubbed: it reads as live instrumentation.
 *
 * Same flat/edge-drawn language as the tank scene. ~700 particles, unlit
 * materials, transparent canvas over the iron section.
 */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CREAM = new THREE.Color("#f4eee2");
const RED = new THREE.Color("#da2023");
const FAINT = "#8c847a";

const COUNT = 700;
const TANK_R = 0.85;
const TANK_H = 1.5;
const CLOUD_Y = 3.1;

type ParticleParams = {
  angle: number;
  radius: number;
  speed: number;
  phase: number;
  red: boolean;
};

/* Particle parameters are generated once at module load (this module is only
   ever loaded client-side via dynamic import) — keeps Math.random out of the
   render path per react-hooks/purity. */
function createParticles() {
  const params: ParticleParams[] = [];
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const red = Math.random() < 0.08;
    params.push({
      angle: Math.random() * Math.PI * 2,
      radius: TANK_R * (0.55 + Math.random() * 0.65),
      speed: 0.16 + Math.random() * 0.22,
      phase: Math.random(),
      red,
    });
    const c = red ? RED : CREAM;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { params, positions, colors };
}

const PARTICLES = createParticles();

function Stream() {
  const pointsRef = useRef<THREE.Points>(null);
  const { params, positions, colors } = PARTICLES;

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = clock.getElapsedTime();
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const p = params[i];
      if (!p) continue;
      const life = (t * p.speed + p.phase) % 1;
      const y = TANK_H + life * (CLOUD_Y - TANK_H);
      // Funnel: radius tightens, then fans back out into the plane.
      const funnel =
        life < 0.7 ? 1 - life * 0.9 : 0.37 + (life - 0.7) * 2.4;
      const spin = p.angle + life * 1.6;
      attr.setXYZ(
        i,
        Math.cos(spin) * p.radius * funnel,
        y,
        Math.sin(spin) * p.radius * funnel,
      );
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Tank() {
  const shell = useMemo(() => {
    const g = new THREE.CylinderGeometry(TANK_R, TANK_R, TANK_H, 40, 1, true);
    return new THREE.EdgesGeometry(g, 30);
  }, []);
  const roof = useMemo(() => {
    const g = new THREE.ConeGeometry(TANK_R * 1.04, 0.3, 40, 1, true);
    return new THREE.EdgesGeometry(g, 30);
  }, []);

  return (
    <group>
      <lineSegments geometry={shell} position-y={TANK_H / 2}>
        <lineBasicMaterial color={CREAM} transparent opacity={0.5} />
      </lineSegments>
      <lineSegments geometry={roof} position-y={TANK_H + 0.15}>
        <lineBasicMaterial color={CREAM} transparent opacity={0.5} />
      </lineSegments>
      <polarGridHelper
        args={[1.9, 8, 3, 48, new THREE.Color(FAINT), new THREE.Color("#211d18")]}
      />
    </group>
  );
}

function PulseRing() {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() % 2.4) / 2.4;
    if (ring.current) {
      const s = 0.2 + t * 1.5;
      ring.current.scale.set(s, s, s);
    }
    if (mat.current) mat.current.opacity = 0.55 * (1 - t);
  });

  return (
    <mesh ref={ring} position-y={TANK_H + 0.32} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.95, 1, 48]} />
      <meshBasicMaterial ref={mat} color={RED} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Cloud() {
  const grid = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    const g = grid.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.position.y = CLOUD_Y + Math.sin(t * 0.6) * 0.06;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.04, 0.04);
  });

  return (
    <group ref={grid} position-y={CLOUD_Y}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3.4, 2.2, 12, 8]} />
        <meshBasicMaterial color={CREAM} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <planeGeometry args={[0.5, 0.34]} />
        <meshBasicMaterial color={RED} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const rig = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    const g = rig.current;
    if (!g) return;
    g.rotation.y += delta * 0.08;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * -0.05, 0.05);
  });
  return <group ref={rig}>{children}</group>;
}

export function TelemetryScene({ dpr }: { dpr: number }) {
  return (
    <Canvas
      dpr={Math.min(dpr, 1.75)}
      camera={{ position: [3.1, 2.4, 4.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <group position-y={-1.5}>
        <Rig>
          <Tank />
          <Stream />
          <PulseRing />
          <Cloud />
        </Rig>
      </group>
    </Canvas>
  );
}
