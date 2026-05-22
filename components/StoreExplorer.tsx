"use client";

/**
 * StoreExplorer — interactive 3D 7-Eleven showroom (Phase 1: exterior scene only).
 * React Three Fiber port of the standalone prototype. Pins, interior, and the
 * Outside/Inside toggle land in Phase 2.
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

/* ---- brand + material palette ---- */
const C = {
  navy: "#1B2D5E",
  sevGreen: "#007A53",
  sevRed: "#DA291C",
  sevOrange: "#FF6720",
  sevWhite: "#F7F7F4",
  concrete: "#b8b4ab",
  asphalt: "#4a4d52",
  glass: "#9fd4e8",
  roof: "#e2e0da",
  beige: "#d8d2c4",
  beigeWall: "#cfc8ba",
  brick: "#b07a55",
  dkmetal: "#6a6f78",
  steel: "#9aa0a8",
  green: "#4f7a3a",
  trunk: "#6b4a32",
};

/** A standard mesh box. Thin panels auto-get polygon offset to avoid z-fighting. */
function Box({
  args,
  position = [0, 0, 0],
  rotation,
  color,
  opacity,
  transparent,
  metalness = 0.05,
  roughness = 0.85,
  po,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  opacity?: number;
  transparent?: boolean;
  metalness?: number;
  roughness?: number;
  po?: number;
}) {
  const isThin = Math.min(...args) < 0.16;
  const offset = po ?? (isThin ? 6 : 0);
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        transparent={transparent}
        opacity={opacity ?? 1}
        metalness={metalness}
        roughness={roughness}
        polygonOffset={offset > 0}
        polygonOffsetFactor={-1}
        polygonOffsetUnits={-offset * 2}
      />
    </mesh>
  );
}

function Cyl({
  args,
  position = [0, 0, 0],
  rotation,
  color,
}: {
  args: [number, number, number, number?];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={args as [number, number, number, number]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

/** 7-Eleven green/red/orange stacked stripe band. */
function TriStripe({
  width,
  depthFront,
  scaleY = 1,
  position = [0, 0, 0],
  rotation,
}: {
  width: number;
  depthFront: number;
  scaleY?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const hh = 0.42 * scaleY;
  const cols = [C.sevGreen, C.sevRed, C.sevOrange];
  return (
    <group position={position} rotation={rotation}>
      {cols.map((c, i) => (
        <Box key={i} args={[width, hh, 0.08]} position={[0, -i * (hh + 0.02), depthFront]} color={c} />
      ))}
    </group>
  );
}

/** Simplified 7-Eleven logo block. */
function SevenLogo({ scale = 1, position = [0, 0, 0] }: { scale?: number; position?: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[2.4 * scale, 0.9 * scale, 0.12]} color={C.sevWhite} />
      <Box args={[2.05 * scale, 0.66 * scale, 0.14]} position={[0, 0, 0.02]} color={C.sevGreen} />
      <Box args={[0.5 * scale, 0.5 * scale, 0.16]} position={[-0.45 * scale, 0, 0.04]} color={C.sevRed} />
      <Box args={[0.85 * scale, 0.11 * scale, 0.16]} position={[0.25 * scale, 0.28 * scale, 0.04]} color={C.sevOrange} />
    </group>
  );
}

function ExteriorScene() {
  const BW = 17,
    BH = 4.6,
    BD = 11;

  const cols: [number, number][] = [
    [-6, -2.4],
    [6, -2.4],
    [-6, 2.4],
    [6, 2.4],
  ];
  const pumps: [number, number][] = [
    [-4.2, 0],
    [0, 0],
    [4.2, 0],
  ];

  return (
    <group>
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[54, 0.4, 42]} />
        <meshStandardMaterial color={C.asphalt} roughness={0.95} />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => (
        <Box key={`p${i}`} args={[0.12, 0.02, 3.4]} position={[3 + i * 1.9, 0.02, 9.5]} color="#d8d3c0" />
      ))}
      {([[-22, -16], [22, -16], [-22, 16], [22, 16]] as [number, number][]).map(([x, z], i) => (
        <group key={`ls${i}`}>
          <Box args={[3, 0.5, 3]} position={[x, 0.15, z]} color={C.green} roughness={0.9} />
          <Cyl args={[0.15, 0.2, 1.4]} position={[x, 0.9, z]} color={C.trunk} />
          <Cyl args={[1.0, 1.2, 1.4, 8]} position={[x, 1.9, z]} color="#4f7a3a" />
        </group>
      ))}
      <Box args={[20, 0.45, 3.6]} position={[0, 0.06, 5.0]} color={C.concrete} roughness={0.9} />

      <group position={[2, 0, -1.5]}>
        <Box args={[BW, 1.2, 0.42]} position={[0, 0.6, BD / 2 - 0.02]} color={C.brick} />
        <Box args={[BW, BH, 0.4]} position={[0, BH / 2, -BD / 2]} color={C.beige} />
        <Box args={[0.4, BH, BD]} position={[-BW / 2, BH / 2, 0]} color={C.beigeWall} />
        <Box args={[0.4, BH, BD]} position={[BW / 2, BH / 2, 0]} color={C.beigeWall} />
        <Box args={[BW, 0.4, 0.25]} position={[0, BH - 0.2, BD / 2]} color={C.dkmetal} />
        <Box args={[BW, 0.4, 0.25]} position={[0, 0.5, BD / 2]} color={C.dkmetal} />
        <Box args={[9.5, BH - 1.1, 0.1]} position={[-3.2, BH / 2 + 0.05, BD / 2 + 0.06]} color={C.glass} transparent opacity={0.32} metalness={0.3} />
        <Box args={[3.2, 3.4, 0.16]} position={[4.2, 1.9, BD / 2 + 0.1]} color="#142248" transparent opacity={0.5} />
        <Box args={[3.5, 0.4, 0.2]} position={[4.2, 3.7, BD / 2 + 0.12]} color={C.dkmetal} />
        {Array.from({ length: 7 }).map((_, i) => (
          <Box key={`ml${i}`} args={[0.1, BH - 1.1, 0.13]} position={[(i - 6) * 1.35 - 0.3, BH / 2 + 0.05, BD / 2 + 0.1]} color={C.dkmetal} />
        ))}
        <Box args={[BW + 0.5, 1.5, 0.35]} position={[0, BH + 0.65, BD / 2 + 0.16]} color={C.sevWhite} />
        <Box args={[0.35, 1.5, BD + 0.5]} position={[-BW / 2 - 0.12, BH + 0.65, 0]} color={C.sevWhite} />
        <Box args={[0.35, 1.5, BD + 0.5]} position={[BW / 2 + 0.12, BH + 0.65, 0]} color={C.sevWhite} />
        <Box args={[BW + 0.5, 1.5, 0.35]} position={[0, BH + 0.65, -BD / 2 - 0.16]} color={C.sevWhite} />
        <TriStripe width={BW + 0.5} depthFront={BD / 2 + 0.35} position={[0, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, Math.PI / 2, 0]} position={[-BW / 2 - 0.3, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, -Math.PI / 2, 0]} position={[BW / 2 + 0.3, BH + 1.15, 0]} />
        <SevenLogo scale={1.15} position={[-4, BH + 0.7, BD / 2 + 0.36]} />
        <Box args={[BW, 0.4, BD]} position={[0, BH + 0.2, 0]} color={C.roof} />
        {Array.from({ length: 3 }).map((_, i) => (
          <Box key={`hv${i}`} args={[1.5, 0.85, 1.5]} position={[-4.5 + i * 4.5, BH + 0.72, -2.5]} color={C.steel} />
        ))}
        <Box args={[0.5, 3, 8]} position={[BW / 2 - 0.6, 1.6, -1]} color={C.dkmetal} />
        <Box args={[0.15, 2.6, 7.6]} position={[BW / 2 - 0.85, 1.6, -1]} color={C.glass} transparent opacity={0.45} metalness={0.4} />
      </group>

      <group position={[-6, 0, 8.5]}>
        <Box args={[14, 0.7, 6.5]} position={[0, 5.4, 0]} color={C.sevWhite} />
        <Box args={[14.2, 1.0, 0.22]} position={[0, 4.8, 3.25]} color={C.sevWhite} />
        <Box args={[14.2, 1.0, 0.22]} position={[0, 4.8, -3.25]} color={C.sevWhite} />
        <TriStripe width={14.2} depthFront={3.38} scaleY={0.6} position={[0, 5.05, 0]} />
        <SevenLogo scale={1.0} position={[0, 4.78, 3.4]} />
        {cols.map(([x, z], i) => (
          <group key={`col${i}`}>
            <mesh position={[x, 2.35, z]} rotation={[0, Math.PI / 6, 0]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 4.7, 3]} />
              <meshStandardMaterial color={C.sevWhite} roughness={0.8} />
            </mesh>
            <Box args={[1.1, 0.5, 1.1]} position={[x, 0.3, z]} color={C.sevGreen} />
          </group>
        ))}
        {pumps.map(([x, z], i) => (
          <group key={`pump${i}`}>
            <Box args={[2.0, 0.35, 2.8]} position={[x, 0.17, z]} color={C.concrete} />
            <Box args={[1.05, 2.0, 0.72]} position={[x, 1.2, z]} color={C.sevWhite} />
            <Box args={[1.2, 0.6, 0.9]} position={[x, 2.3, z]} color={C.sevGreen} />
            <Box args={[0.62, 0.6, 0.06]} position={[x, 1.45, z + 0.4]} color={C.glass} metalness={0.3} />
            <Cyl args={[0.05, 0.05, 0.8]} position={[x + 0.6, 1.3, z + 0.25]} color="#2a2a2a" />
          </group>
        ))}
      </group>

      <group position={[-14, 0, 9]}>
        <Cyl args={[0.3, 0.3, 6.8]} position={[0, 3.4, 0]} color={C.dkmetal} />
        <Box args={[3.2, 3.4, 0.55]} position={[0, 7.3, 0]} color={C.sevWhite} />
        <Box args={[2.8, 1.6, 0.12]} position={[0, 8.0, 0.3]} color={C.sevGreen} />
        <Box args={[0.66, 1.12, 0.14]} position={[-0.5, 8.0, 0.36]} color={C.sevRed} />
        <Box args={[2.8, 0.22, 0.13]} position={[0, 7.05, 0.3]} color={C.sevOrange} />
        <Box args={[2.8, 1.05, 0.12]} position={[0, 6.35, 0.3]} color={C.sevRed} />
        <Box args={[2.3, 0.62, 0.1]} position={[0, 6.35, 0.37]} color={C.sevWhite} />
      </group>

      {([[-11, 5], [-11.9, 5.7], [-10.1, 5.7]] as [number, number][]).map(([x, z], i) => (
        <group key={`flag${i}`}>
          <Cyl args={[0.05, 0.05, 4.2]} position={[x, 2.1, z]} color="#dddddd" />
          <Box args={[0.08, 2.5, 0.95]} position={[x, 3.2, z + 0.5]} rotation={[0, 0.1, 0]} color={[C.sevGreen, C.sevRed, C.sevOrange][i]} />
        </group>
      ))}

      <group position={[6.5, 0, 5.4]} rotation={[0, -0.35, 0]}>
        <group rotation={[-0.26, 0, 0]} position={[0, 0, 0.42]}>
          <Box args={[1.3, 1.6, 0.06]} position={[0, 0.8, 0]} color={C.dkmetal} />
          <Box args={[1.08, 1.42, 0.04]} position={[0, 0.8, 0.05]} color={C.sevOrange} po={6} />
          <Box args={[1.0, 0.28, 0.05]} position={[0, 1.3, 0.07]} color={C.sevWhite} po={8} />
          <Box args={[0.78, 0.5, 0.05]} position={[0, 0.672, 0.07]} color={C.sevRed} po={8} />
        </group>
        <group rotation={[0.26, 0, 0]} position={[0, 0, -0.42]}>
          <Box args={[1.3, 1.6, 0.06]} position={[0, 0.8, 0]} color={C.dkmetal} />
          <Box args={[1.08, 1.42, 0.04]} position={[0, 0.8, -0.05]} color={C.sevGreen} po={6} />
        </group>
        <Box args={[1.34, 0.14, 0.5]} position={[0, 1.6 * Math.cos(0.26), 0]} color={C.dkmetal} />
      </group>
    </group>
  );
}

export default function StoreExplorer() {
  const scene = useMemo(() => <ExteriorScene />, []);
  return (
    <div style={{ width: "100%", height: "70vh", minHeight: 480, background: "#0e1830", borderRadius: 16, overflow: "hidden" }}>
      <Canvas shadows camera={{ position: [22, 14, 22], fov: 42 }} gl={{ antialias: true }} dpr={[1, 2]}>
        <color attach="background" args={["#0e1830"]} />
        <fog attach="fog" args={["#0e1830", 42, 80]} />
        <ambientLight intensity={0.5} color="#bfd0ff" />
        <directionalLight
          position={[-14, 20, 12]}
          intensity={1.2}
          color="#fff0d8"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-26}
          shadow-camera-right={26}
          shadow-camera-top={26}
          shadow-camera-bottom={-26}
          shadow-camera-near={1}
          shadow-camera-far={70}
        />
        <directionalLight position={[16, 12, -10]} intensity={0.38} color="#6f8fff" />
        <directionalLight position={[0, 8, -16]} intensity={0.28} color="#EFA51E" />
        {scene}
        <OrbitControls target={[-1, 3, 0]} enablePan={false} minDistance={12} maxDistance={40} minPolarAngle={0.2} maxPolarAngle={1.45} />
      </Canvas>
    </div>
  );
}
