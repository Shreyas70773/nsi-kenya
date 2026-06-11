"use client";

/**
 * CAD-style stainless tank that assembles as the host section scrolls.
 *
 * Aesthetic: flat-shaded surfaces + drawn edges — an engineering drawing in
 * space, not a rendered product shot. Honors the "flat UI, lit 3D" rule by
 * using unlit basic materials with edge lines (no gradients, no PBR gloss).
 *
 * The host section drives `progress` (0–1, scrubbed by ScrollTrigger);
 * each part of the tank settles into place inside its own window of that
 * progress. Idle: slow rotation + pointer tilt.
 */
import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CREAM = "#f4eee2";
const IRON = "#211d18";
const RED = "#da2023";
const FAINT = "#8c847a";

/** Part schedule: [progress start, progress end] per assembly step. */
type PartSpec = {
  key: string;
  window: [number, number];
  /** Drop-in offset direction: 1 = from above, -1 = from below. */
  from: 1 | -1;
  geometry: "cylinder" | "cone" | "torus";
  args: (number | boolean)[];
  y: number;
  color?: string;
  edgeColor?: string;
  edgeOpacity?: number;
};

const PARTS: PartSpec[] = [
  // Skirt rises from the pad.
  { key: "skirt", window: [0.0, 0.16], from: -1, geometry: "cylinder", args: [1.04, 1.08, 0.3, 48, 1, true], y: 0.15 },
  // Four shell courses stack like real course-by-course fabrication.
  { key: "course-1", window: [0.1, 0.28], from: 1, geometry: "cylinder", args: [1, 1, 0.55, 48, 1, true], y: 0.58 },
  { key: "course-2", window: [0.24, 0.42], from: 1, geometry: "cylinder", args: [1, 1, 0.55, 48, 1, true], y: 1.13 },
  { key: "course-3", window: [0.38, 0.56], from: 1, geometry: "cylinder", args: [1, 1, 0.55, 48, 1, true], y: 1.68 },
  { key: "course-4", window: [0.52, 0.7], from: 1, geometry: "cylinder", args: [1, 1, 0.55, 48, 1, true], y: 2.23 },
  // Weld band — the brand-red datum line.
  { key: "band", window: [0.66, 0.8], from: 1, geometry: "torus", args: [1.005, 0.012, 8, 64], y: 1.405, color: RED, edgeColor: RED, edgeOpacity: 0 },
  // Roof cone caps it.
  { key: "roof", window: [0.76, 0.92], from: 1, geometry: "cone", args: [1.04, 0.42, 48, 1, true], y: 2.71 },
  // Manway nozzle on the roof.
  { key: "nozzle", window: [0.88, 1.0], from: 1, geometry: "cylinder", args: [0.14, 0.14, 0.22, 24, 1, false], y: 2.99 },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Part({
  spec,
  progress,
}: {
  spec: PartSpec;
  progress: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    switch (spec.geometry) {
      case "cylinder":
        return new THREE.CylinderGeometry(...(spec.args as [number, number, number, number, number, boolean]));
      case "cone":
        return new THREE.ConeGeometry(...(spec.args as [number, number, number, number, boolean]));
      case "torus": {
        const g = new THREE.TorusGeometry(...(spec.args as [number, number, number, number]));
        g.rotateX(Math.PI / 2);
        return g;
      }
    }
  }, [spec]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 30), [geometry]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const [a, b] = spec.window;
    const p = progress.current ?? 0;
    const local = easeOut(THREE.MathUtils.clamp((p - a) / (b - a), 0, 1));

    g.position.y = spec.y + (1 - local) * 1.9 * spec.from;
    g.scale.setScalar(0.92 + local * 0.08);
    if (matRef.current) matRef.current.opacity = local * (spec.color === RED ? 1 : 0.92);
    if (edgeMatRef.current)
      edgeMatRef.current.opacity = local * (spec.edgeOpacity ?? 0.55);
  });

  return (
    <group ref={group} position-y={spec.y}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          ref={matRef}
          color={spec.color ?? IRON}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          ref={edgeMatRef}
          color={spec.edgeColor ?? CREAM}
          transparent
          opacity={0}
        />
      </lineSegments>
    </group>
  );
}

function TankAssembly({ progress }: { progress: RefObject<number> }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g) return;
    const p = progress.current ?? 0;
    // Slow idle turn + a quarter-turn earned across the scroll.
    g.rotation.y += delta * 0.12;
    const targetX = state.pointer.y * -0.06;
    const targetZ = state.pointer.x * 0.05;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.06);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, targetZ, 0.06);
    g.position.y = -1.45 + (1 - easeOut(Math.min(p * 2, 1))) * -0.2;
  });

  return (
    <group ref={rig} position={[0, -1.45, 0]}>
      {PARTS.map((spec) => (
        <Part key={spec.key} spec={spec} progress={progress} />
      ))}
      {/* CAD ground reference. */}
      <polarGridHelper args={[2.3, 12, 4, 64, new THREE.Color(FAINT), new THREE.Color(IRON)]} position-y={0.001} />
    </group>
  );
}

export function TankScene({
  dpr,
  progress,
}: {
  dpr: number;
  progress?: RefObject<number>;
}) {
  const fallbackProgress = useRef(1);
  return (
    <Canvas
      dpr={Math.min(dpr, 1.75)}
      camera={{ position: [3.4, 1.4, 4.4], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <TankAssembly progress={progress ?? fallbackProgress} />
    </Canvas>
  );
}
