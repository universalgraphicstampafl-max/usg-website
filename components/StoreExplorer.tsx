"use client";

/**
 * StoreExplorer — interactive 3D 7-Eleven showroom.
 * Phase 2: exterior + interior scenes, 21 hotspot pins, info panel,
 * Outside/Inside toggle, HUD (reset / guided tour / pin counter).
 *
 * All hotspot photos are now in place (no remaining placeholders).
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, SoftShadows, useTexture, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useCallback, useEffect } from "react";
import * as THREE from "three";

/* ============================= palette ============================= */
const C = {
  navy: "#001132", navyDark: "#000A1E", marigold: "#FBB034", marigoldDark: "#D89214", sky: "#00356B", skyDark: "#00264D", offwhite: "#EFEFEE",
  sevGreen: "#007A53", sevRed: "#DA291C", sevOrange: "#FF6720", sevWhite: "#F7F7F4",
  concrete: "#b8b4ab", asphalt: "#4a4d52", glass: "#9fd4e8", roof: "#e2e0da", beige: "#d8d2c4", beigeWall: "#cfc8ba",
  brick: "#b07a55", dkmetal: "#6a6f78", steel: "#9aa0a8", green: "#4f7a3a", trunk: "#6b4a32",
  floor: "#e8e6e0", floorDk: "#cfcdc6", wood: "#c8a06a", coffee: "#6b4a32",
};
const IMG = "/images/easy";

/* ============================= types ============================= */
type Vec3 = [number, number, number];
export type Hotspot = { id: string; cat: string; title: string; loc: string; pos: Vec3; desc: string; usg: string; img: string; imgs?: string[]; placeholder?: boolean; };

/* ============================= hotspot data ============================= */
const EXTERIOR_HOTSPOTS: Hotspot[] = [
  { id: "pump", cat: "Gas Pump", title: "Pump Topper & Pump Topper Extender", loc: "Fuel island", pos: [9.8, 4.1, 11.5], desc: "High-dwell-time advertising right at the pump \u2014 drivers stare at this for 3-5 minutes per fill.", usg: "USG uses pump toppers as a monthly kit item for new deals but keeps extenders for longer promotional windows to balance long term deals like loyalty with short term offers.", img: "/images/signtypes/panels/pump-1.webp", imgs: ["/images/signtypes/panels/pump-1.webp", "/images/signtypes/panels/pump-2.webp", "/images/signtypes/panels/pump-3.webp"] },
  { id: "window", cat: "Storefront", title: "Window Signs", loc: "Storefront glass", pos: [4.6, 3.55, -8.2], desc: "Promotional clings and price callouts on entrance doors and front glass \u2014 the last message before a customer walks in.", usg: "USG prints removable static and adhesive clings, die-cut to any shape, with easy seasonal swap-out.", img: `${IMG}/storefront-promo-window-cling.webp`, imgs: [`${IMG}/storefront-promo-window-cling.webp`, `${IMG}/storefront-promo-window-cling2.webp`, `${IMG}/storefront-promo-window-cling3.webp`] },
  { id: "aframe", cat: "A-Frame", title: "Sidewalk A-Frame", loc: "Entrance walkway", pos: [-3.75, 1.9, -6.2], desc: "Portable sidewalk boards that capture foot traffic with daily specials.", usg: "USG supplies durable A-frame hardware with printed, swappable insert panels.", img: `${IMG}/brunch-a-frame-sandwich-board.webp`, imgs: [`${IMG}/brunch-a-frame-sandwich-board.webp`, `${IMG}/brunch-a-frame-sandwich-board2.webp`, `${IMG}/brunch-a-frame-sandwich-board3.webp`] },
  { id: "flag", cat: "Flag", title: "Feather Flags", loc: "Lot perimeter", pos: [27, 4.4, 14.5], desc: "Tall feather and blade flags that create motion and draw eyes from the road.", usg: "USG offers feather flags in multiple formats with poles, bases, and ground stakes.", img: "/images/gallery/11-circle-k-hot-food-flag.webp", imgs: ["/images/gallery/11-circle-k-hot-food-flag.webp", `${IMG}/feather-flag-circle-k-hot-food2.webp`, `${IMG}/three-flag-formats-showroom.webp`] },
  { id: "bollard", cat: "Bollard", title: "Triangle Bollard", loc: "Fuel island, between the pumps", pos: [9.75, 2.45, 14.85], desc: "3 sided advertising vehicle that captures the attention of drivers as they make their way from the pump into the store. Advertisements are visible from all directions.", usg: "USG offers easy install bollards that can be customized to any shape and size.", img: "/images/signtypes/panels/bollard-1.webp", imgs: ["/images/signtypes/panels/bollard-1.webp", "/images/signtypes/panels/bollard-2.webp", "/images/signtypes/panels/bollard-3.webp"] },
  { id: "snaplock", cat: "Building", title: "Building Snaplock", loc: "Building exterior wall", pos: [7.5, 2.9, -16.2], desc: "The perfect alternative solution to window signage. Snaplocks sit safely in a frame that can be placed all around the building.", usg: "USG has the ability to provide both hardware and insert to maximize your location's advertising potential.", img: "/images/signtypes/panels/cigch-2.webp" },
  { id: "cigch", cat: "Window Display", title: "Cigarette Changeable", loc: "Front window", pos: [-1.2, 2.55, -7.5], desc: "These versatile window displays are the perfect way to ensure that your stores are able to easily keep up with the ever changing price points on your tobacco products.", usg: "USG offers semi permanent decal numbers that are quick to change out. As well as standard track and flip book options.", img: "/images/signtypes/cig-window.webp" },
  { id: "icemerch", cat: "Ice Merchandiser", title: "Ice Merch Decals", loc: "Front of store", pos: [-7.6, 2.9, -7.1], desc: "All weather rated materials that showcase your brand, deals, or loyalty programs on your outdoor ice merchandisers.", usg: "With our custom store profiles we will always know exactly how many of each size decal your stores need.", img: "/images/signtypes/panels/icemerch-1.webp", imgs: ["/images/signtypes/panels/icemerch-1.webp", "/images/signtypes/panels/icemerch-2.webp", "/images/signtypes/panels/icemerch-3.webp"] },
];
const INTERIOR_HOTSPOTS: Hotspot[] = [
  { id: "checkout", cat: "Counter", title: "Checkout & Impulse Signage", loc: "Front counter", pos: [-8.4, 2.4, 5], desc: "The counter zone \u2014 impulse racks, register toppers, and age-verification signage.", usg: "USG prints counter mats, register toppers, impulse-rack headers, and compliance signage.", img: "/images/signtypes/panels/checkout-1.webp", imgs: ["/images/signtypes/panels/checkout-1.webp", "/images/signtypes/panels/checkout-2.webp", "/images/signtypes/panels/checkout-3.webp"] },
  { id: "backbar", cat: "Tobacco", title: "Backbar Signage", loc: "Behind front counter", pos: [-9.6, 4.3, 5], desc: "Fully customized kits that allow for instantly changeable pricers on your tobacco products.", usg: "Fully assembled and kitted at time of shipment makes installation a breeze.", img: "/images/signtypes/backbar-kit.webp" },
  { id: "standee", cat: "Floor Display", title: "Standee", loc: "High-traffic walkway", pos: [-5.8, 2.6, -1.5], desc: "Freestanding point-of-purchase displays that are customized to the need of the promotion. Placed in high traffic area to increase visibility.", usg: "USG produces corrugated and permanent floor displays, shipped flat or pre-assembled.", img: "/images/signtypes/panels/standee-1.webp", imgs: ["/images/signtypes/panels/standee-1.webp", "/images/signtypes/panels/standee-2.webp", "/images/signtypes/panels/standee-3.webp"] },
  { id: "floorgfx", cat: "Floor Display", title: "Floor Graphics", loc: "Main aisle", pos: [0, 0.6, 5.9], desc: "Walk-on floor decals for wayfinding, promotions, and brand moments underfoot.", usg: "USG prints anti-slip floor graphics rated for high-traffic retail environments.", img: "/images/signtypes/panels/floorgfx-1.webp", imgs: ["/images/signtypes/panels/floorgfx-1.webp", "/images/signtypes/panels/floorgfx-2.webp", "/images/signtypes/panels/floorgfx-3.webp"] },
  { id: "shelf", cat: "Shelf Tag", title: "Shelf Tags", loc: "Center aisles", pos: [-1.5, 1.7, 2.2], desc: "These popular and inexpensive pricing tags allow for barcode scanning through clear material while calling out the current deal.", usg: "Our material makes application or removal quick and easy, while being highly durable. So your promos last as long as you need them to.", img: "/images/signtypes/panels/shelf-2.webp", imgs: ["/images/signtypes/panels/shelf-2.webp", "/images/signtypes/panels/shelf-clear-1.webp", "/images/signtypes/panels/shelf-clear-2.webp"] },
  { id: "wobbler", cat: "Shelf Tag", title: "Wobblers", loc: "Center aisles", pos: [4.3, 2.2, 4.6], desc: "These eye catching center store signs dangle into the aisle enticing customers to purchase deal items.", usg: "USG offers custom shapes and sizes to fit all your placement needs.", img: "/images/signtypes/panels/wobbler-final.webp" },
  { id: "coolerstatic", cat: "Cooler Graphics", title: "Cooler Door Statics", loc: "Beverage wall", pos: [9.2, 2.75, 3.8], desc: "Coming in all shapes and sizes these statics are an easily changeable option that catches the customers eye as soon as they walk up.", usg: "Offering static and adhesive options allows for monthly deals or more permanent signage such as \u201cWe ID\u201d decals.", img: "/images/signtypes/panels/coolerstatic-1.webp", imgs: ["/images/signtypes/panels/coolerstatic-1.webp", "/images/signtypes/panels/coolerstatic-2.webp", "/images/signtypes/panels/coolerstatic-3.webp"] },
  { id: "coolerstrip", cat: "Cooler Graphics", title: "Cooler Strips", loc: "Cooler shelf channel", pos: [9.2, 1.5, -3.8], desc: "These moisture proof signs are an ideal option for displaying beverage call outs.", usg: "We offer clear and matte material with shapes that rise above the channel allowing the product to still be seen but the deal to stand out.", img: "/images/signtypes/panels/coolerstrip-1.webp", imgs: ["/images/signtypes/panels/coolerstrip-1.webp", "/images/signtypes/panels/coolerstrip-2.webp", "/images/signtypes/panels/coolerstrip-3.webp"] },
  { id: "translite", cat: "Beverage", title: "Dispense Beverage Translites", loc: "Frozen & hot beverage stations", pos: [-3, 4.3, -6.2], desc: "Whether it is frozen drinks, or cappuccino machines these signs are used to create brand loyalty and drive repeat purchases.", usg: "We specialize in creating branded zones for all of your dispense bev machines.", img: "/images/signtypes/panels/translite-1.webp", imgs: ["/images/signtypes/panels/translite-1.webp", "/images/signtypes/panels/translite-2.webp", "/images/signtypes/panels/translite-3.webp"] },
  { id: "napkin", cat: "Counter", title: "Napkin Inserts", loc: "Foodservice counter", pos: [2.5, 2.1, -5.9], desc: "Napkin dispenser inserts that turn an everyday touchpoint into promotional real estate.", usg: "We specialize in creating branded zones for all of your dispense bev machines.", img: "/images/signtypes/panels/napkin-1.webp", imgs: ["/images/signtypes/panels/napkin-1.webp", "/images/signtypes/panels/napkin-2.webp", "/images/signtypes/panels/napkin-3.webp"] },
  { id: "hotfood", cat: "Menu Board", title: "Hot Food Signage", loc: "Foodservice counter", pos: [7, 4.35, -5.9], desc: "From roller grill displays to temperature rated hot case decals, we offer a full line of hot food signage to create a cohesive branded environment for your customers.", usg: "We specialize in developing permanent branded signage that compliments monthly promotional sales items creating a brand that brings customers back time and time again.", img: "/images/signtypes/panels/hotfood-1.webp", imgs: ["/images/signtypes/panels/hotfood-1.webp", "/images/signtypes/panels/hotfood-2.webp", "/images/signtypes/panels/hotfood-3.webp"] },
];

/* ============================= geometry helpers ============================= */
type BoxProps = { args: Vec3; position?: Vec3; rotation?: Vec3; color: string; opacity?: number; transparent?: boolean; metalness?: number; roughness?: number; po?: number; };
function Box({ args, position = [0, 0, 0], rotation, color, opacity, transparent, metalness = 0.05, roughness = 0.85, po }: BoxProps) {
  const isThin = Math.min(...args) < 0.16;
  const offset = po ?? (isThin ? 6 : 0);
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} transparent={transparent} opacity={opacity ?? 1} metalness={metalness} roughness={roughness} polygonOffset={offset > 0} polygonOffsetFactor={-1} polygonOffsetUnits={-offset * 2} />
    </mesh>
  );
}
function Cyl({ args, position = [0, 0, 0], rotation, color }: { args: [number, number, number, number?]; position?: Vec3; rotation?: Vec3; color: string }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={args as [number, number, number, number]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}
function TriStripe({ width, depthFront, scaleY = 1, position = [0, 0, 0], rotation }: { width: number; depthFront: number; scaleY?: number; position?: Vec3; rotation?: Vec3 }) {
  const hh = 0.42 * scaleY;
  return (
    <group position={position} rotation={rotation}>
      {[C.sevGreen, C.sevRed, C.sevOrange].map((c, i) => (<Box key={i} args={[width, hh, 0.08]} position={[0, -i * (hh + 0.02), depthFront]} color={c} />))}
    </group>
  );
}
function SevenLogo({ scale = 1, position = [0, 0, 0] }: { scale?: number; position?: Vec3 }) {
  return (
    <group position={position}>
      <Box args={[2.4 * scale, 0.9 * scale, 0.12]} color={C.sevWhite} />
      <Box args={[2.05 * scale, 0.66 * scale, 0.14]} position={[0, 0, 0.02]} color={C.sevGreen} />
      <Box args={[0.5 * scale, 0.5 * scale, 0.16]} position={[-0.45 * scale, 0, 0.04]} color={C.sevRed} />
      <Box args={[0.85 * scale, 0.11 * scale, 0.16]} position={[0.25 * scale, 0.28 * scale, 0.04]} color={C.sevOrange} />
    </group>
  );
}


/* ============================= texture helpers ============================= */
function useTiled(url: string, rx: number, ry: number) {
  const base = useTexture(url);
  return useMemo(() => {
    const t = base.clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [base, rx, ry]);
}
function useSRGB(url: string) {
  const t = useTexture(url);
  useMemo(() => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true; }, [t]);
  return t;
}

function Tree({ position, s = 1 }: { position: Vec3; s?: number }) {
  const foliage = useSRGB("/textures/foliage.png");
  return (
    <group position={position}>
      <Cyl args={[0.13, 0.22, 2.4]} position={[0, 1.2, 0]} color="#5a4632" />
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((r, i) => (
        <mesh key={i} position={[0, 3.1 * s, 0]} rotation={[0, r, 0]}>
          <planeGeometry args={[4.4 * s, 4.4 * s]} />
          <meshStandardMaterial map={foliage} transparent alphaTest={0.4} side={THREE.DoubleSide} roughness={0.95} />
        </mesh>
      ))}
      {/* soft ground shadow disc */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.7 * s, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/* ============================= daylight rig ============================= */
function Daylight() {
  return (
    <>
      <Sky distance={450000} sunPosition={[-40, 55, 38]} turbidity={4.5} rayleigh={0.55} mieCoefficient={0.004} mieDirectionalG={0.85} />
      <fog attach="fog" args={["#cfe0ee", 62, 150]} />
      <hemisphereLight args={["#dceaff", "#9a9384", 0.6]} />
      <directionalLight
        position={[-18, 26, 16]} intensity={1.9} color="#fff3dd" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30}
        shadow-camera-near={1} shadow-camera-far={90} shadow-bias={-0.0004}
      />
      <directionalLight position={[20, 12, -14]} intensity={0.35} color="#dfeaff" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}


/* ============================= licensed GLB assets (CC-BY 4.0, see /public/models/licenses) ============================= */
function StationModel() {
  const { scene } = useGLTF("/models/gas-station.glb");
  useMemo(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
  }, [scene]);
  // native meters; recentered so the station core (store + canopy) sits at world origin
  return <primitive object={scene} scale={1.25} position={[-6.25, 0, 10]} />;
}
useGLTF.preload("/models/gas-station.glb");

function ShelfModel({ url, position, rotationY = 0, scale = 2.2 }: { url: string; position: Vec3; rotationY?: number; scale?: number }) {
  const { scene } = useGLTF(url);
  const inst = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
    return c;
  }, [scene]);
  return <primitive object={inst} position={position} rotation={[0, rotationY, 0]} scale={scale} />;
}
useGLTF.preload("/models/shelf-chips.glb");
useGLTF.preload("/models/shelf-drinks.glb");

/* ============================= EXTERIOR SCENE ============================= */
function ExteriorScene() {
  const cigTex = useSRGB("/images/signtypes/cig-window.webp");
  return (
    <group>
      <StationModel />

      {/* ── USG signage props on the licensed site ─────────── */}
      {/* sidewalk A-frame near the entrance */}
      <group position={[-3.75, 0, -6.2]} rotation={[0, 0.4, 0]}>
        <group rotation={[-0.26, 0, 0]} position={[0, 0, 0.42]}>
          <Box args={[1.1, 1.4, 0.06]} position={[0, 0.7, 0]} color="#3c4046" metalness={0.6} roughness={0.35} />
          <Box args={[0.92, 1.24, 0.04]} position={[0, 0.7, 0.05]} color={C.sevOrange} po={6} />
          <Box args={[0.84, 0.26, 0.05]} position={[0, 1.12, 0.07]} color={C.sevWhite} po={8} />
        </group>
        <group rotation={[0.26, 0, 0]} position={[0, 0, -0.42]}>
          <Box args={[1.1, 1.4, 0.06]} position={[0, 0.7, 0]} color="#3c4046" metalness={0.6} roughness={0.35} />
          <Box args={[0.92, 1.24, 0.04]} position={[0, 0.7, -0.05]} color={C.sevGreen} po={6} />
        </group>
      </group>

      {/* feather flags on the east lot edge, against the bush line */}
      {([[27, 14.5], [28.2, 14.6], [27.9, 15.6]] as [number, number][]).map(([x, z], i) => (
        <group key={`flag${i}`}>
          <Cyl args={[0.05, 0.05, 4.2, 12]} position={[x, 2.1, z]} color="#c9ccd1" />
          <Box args={[0.08, 2.5, 0.95]} position={[x, 3.2, z + 0.5]} rotation={[0, 0.1, 0]} color={[C.sevGreen, C.sevRed, C.sevOrange][i]} roughness={0.75} />
        </group>
      ))}

      {/* triangle bollard between the pumps on the fuel island */}
      <group position={[9.75, 0.16, 14.85]}>
        <Cyl args={[0.16, 0.16, 0.5, 16]} position={[0, 0.25, 0]} color="#c22a1e" />
        <mesh position={[0, 1.35, 0]} rotation={[0, Math.PI / 6, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.52, 1.7, 3]} />
          <meshStandardMaterial color="#4a9bd4" roughness={0.55} />
        </mesh>
        <mesh position={[0, 2.05, 0]} rotation={[0, Math.PI / 6, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.28, 3]} />
          <meshStandardMaterial color="#0f2740" roughness={0.5} />
        </mesh>
      </group>

      {/* snaplock frames on the store's east wall */}
      {[-14.2, -16.2, -18.2].map((z, i) => (
        <group key={`snap${i}`} position={[7.15, 2.6, z]}>
          <Box args={[0.08, 1.35, 0.95]} color="#1c1f24" metalness={0.5} roughness={0.4} />
          <Box args={[0.06, 1.15, 0.78]} position={[0.04, 0, 0]} color={[C.sevRed, "#1e4f8f", C.sevOrange][i]} roughness={0.55} po={8} />
        </group>
      ))}

      {/* window promo sign on the storefront glass (client-marked spot) */}
      <group position={[4.6, 2.75, -8.47]}>
        <Box args={[1.55, 1.1, 0.05]} color={C.sevOrange} po={6} />
        <LabelPanel text="HOT DEAL" bg={C.sevOrange} fg="#ffffff" size={[1.35, 0.34]} position={[0, 0.26, 0.04]} fs={96} texW={640} texH={160} />
        <LabelPanel text="2 FOR $5" bg={C.sevWhite} fg={C.sevRed} size={[1.1, 0.42]} position={[0, -0.18, 0.04]} fs={96} texW={640} texH={224} />
      </group>

      {/* cigarette changeable applied to the OUTSIDE face of the window (frame outer face ~z -7.9) */}
      <mesh position={[-1.2, 2.55, -7.82]}>
        <planeGeometry args={[1.1, 1.65]} />
        <meshStandardMaterial map={cigTex} roughness={0.55} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-8} />
      </mesh>
    </group>
  );
}

/* ============================= canvas-label signage (no font deps — drawn at runtime) ============================= */
function makeLabelTexture(text: string, bg: string, fg: string, w: number, h: number, fs: number) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = fg;
  ctx.font = `800 ${fs}px "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + fs * 0.05);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function LabelPanel({ text, bg = "#0d3b66", fg = "#ffffff", size, position, rotation, lit = false, fs = 92, texW = 640, texH = 160 }: {
  text: string; bg?: string; fg?: string; size: [number, number]; position: Vec3; rotation?: Vec3; lit?: boolean; fs?: number; texW?: number; texH?: number;
}) {
  const tex = useMemo(() => makeLabelTexture(text, bg, fg, texW, texH, fs), [text, bg, fg, texW, texH, fs]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      {lit
        ? <meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.8} roughness={0.35} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-8} />
        : <meshStandardMaterial map={tex} roughness={0.6} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-8} />}
    </mesh>
  );
}

/* ============================= floor decal (canvas-drawn wayfinding graphic) ============================= */
function FloorDecal({ position }: { position: Vec3 }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const x = c.getContext("2d")!;
    x.fillStyle = "#f5f4ef";
    x.beginPath(); x.arc(256, 256, 252, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.sevGreen; x.lineWidth = 30;
    x.beginPath(); x.arc(256, 256, 230, 0, Math.PI * 2); x.stroke();
    x.strokeStyle = C.sevRed; x.lineWidth = 6;
    x.beginPath(); x.arc(256, 256, 206, 0, Math.PI * 2); x.stroke();
    x.fillStyle = C.navy;
    x.font = '800 62px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
    x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText("HOT DEALS", 256, 140);
    x.fillText("THIS WAY", 256, 374);
    x.fillStyle = C.sevOrange;
    x.beginPath();
    x.moveTo(256, 186); x.lineTo(322, 262); x.lineTo(282, 262); x.lineTo(282, 332);
    x.lineTo(230, 332); x.lineTo(230, 262); x.lineTo(190, 262);
    x.closePath(); x.fill();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.35, 48]} />
      <meshStandardMaterial map={tex} roughness={0.45} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-10} />
    </mesh>
  );
}

/* ============================= cooler wall (Pasha-inspired, procedural) ============================= */
const COOLER_CATS = [
  { label: "COLD BEER", doors: 3, bg: "#0d3b66", drinks: ["#c8860a", "#8a5a2a", "#3a6b35", "#b03a2e", "#d4a017"], tall: true },
  { label: "WINE", doors: 2, bg: "#5b1a2e", drinks: ["#4a1420", "#2e4a1f", "#7a1f1f", "#3b2314", "#6e1030"], tall: true },
  { label: "ENERGY", doors: 2, bg: C.sevGreen, drinks: ["#2ecc40", "#0074d9", "#ff4136", "#ffdc00", "#b10dc9"], tall: false },
];
const COOLER_DW = 1.9;
const COOLER_DECKS = [0.22, 0.78, 1.34, 1.9];
function CoolerBank({ x }: { x: number }) {
  const total = COOLER_CATS.reduce((n, c) => n + c.doors, 0);
  const runL = total * COOLER_DW;
  const doors: { z: number; cat: number }[] = [];
  const headers: { z: number; w: number; cat: number }[] = [];
  let zc = -runL / 2;
  COOLER_CATS.forEach((cat, ci) => {
    headers.push({ z: zc + (cat.doors * COOLER_DW) / 2, w: cat.doors * COOLER_DW - 0.24, cat: ci });
    for (let d = 0; d < cat.doors; d++) { doors.push({ z: zc + COOLER_DW / 2, cat: ci }); zc += COOLER_DW; }
  });
  return (
    <group>
      {/* carcass, kick, lit cavity */}
      <Box args={[1.35, 3.7, runL + 0.6]} position={[x - 0.62, 1.85, 0]} color="#20242b" roughness={0.6} />
      <Box args={[1.5, 0.16, runL + 0.6]} position={[x - 0.65, 0.08, 0]} color="#101216" />
      <mesh position={[x - 0.72, 1.42, 0]}>
        <boxGeometry args={[1.0, 2.5, runL - 0.15]} />
        <meshStandardMaterial color="#eef3f6" emissive="#dfe9f0" emissiveIntensity={0.38} roughness={0.4} />
      </mesh>
      {/* shelf decks */}
      {COOLER_DECKS.map((y, i) => (
        <Box key={`dk${i}`} args={[0.85, 0.05, runL - 0.2]} position={[x - 0.7, y, 0]} color="#c6ccd2" metalness={0.3} roughness={0.5} />
      ))}
      {/* stocked product rows */}
      {doors.map((door, di) => {
        const cat = COOLER_CATS[door.cat];
        const r = cat.tall ? 0.075 : 0.09;
        const h = cat.tall ? 0.42 : 0.3;
        return COOLER_DECKS.map((deck, s) =>
          Array.from({ length: 4 }).map((_, b) => (
            <Cyl key={`p${di}-${s}-${b}`} args={[r, r, h, 10]}
              position={[x - 0.95, deck + 0.045 + h / 2, door.z - COOLER_DW / 2 + 0.35 + b * ((COOLER_DW - 0.7) / 3)]}
              color={cat.drinks[(di + s * 2 + b) % cat.drinks.length]} />
          ))
        );
      })}
      {/* glass doors */}
      {doors.map((d, i) => (
        <group key={`door${i}`} position={[x - 1.42, 0, d.z]}>
          <Box args={[0.05, 2.6, 0.09]} position={[0, 1.45, -COOLER_DW / 2 + 0.045]} color="#14171c" metalness={0.4} roughness={0.4} />
          <Box args={[0.05, 2.6, 0.09]} position={[0, 1.45, COOLER_DW / 2 - 0.045]} color="#14171c" metalness={0.4} roughness={0.4} />
          <Box args={[0.05, 0.1, COOLER_DW]} position={[0, 2.7, 0]} color="#14171c" metalness={0.4} roughness={0.4} />
          <Box args={[0.05, 0.12, COOLER_DW]} position={[0, 0.21, 0]} color="#14171c" metalness={0.4} roughness={0.4} />
          <Box args={[0.03, 2.4, COOLER_DW - 0.2]} position={[0.02, 1.45, 0]} color="#cfe4ee" transparent opacity={0.16} metalness={0.35} roughness={0.12} po={4} />
          <Box args={[0.06, 0.85, 0.07]} position={[-0.06, 1.45, COOLER_DW / 2 - 0.22]} color="#c9ccd1" metalness={0.6} roughness={0.3} />
        </group>
      ))}
      {/* category lightbox header band */}
      <Box args={[1.45, 0.95, runL + 0.6]} position={[x - 0.6, 3.22, 0]} color="#14171c" roughness={0.55} />
      <Box args={[1.35, 0.1, runL + 0.6]} position={[x - 0.62, 3.72, 0]} color="#20242b" />
      {headers.map((hd, i) => (
        <LabelPanel key={`hdr${i}`} text={COOLER_CATS[hd.cat].label} bg={COOLER_CATS[hd.cat].bg} fg="#ffffff"
          size={[hd.w, 0.72]} position={[x - 1.34, 3.22, hd.z]} rotation={[0, -Math.PI / 2, 0]} lit fs={96} texW={1024} texH={192} />
      ))}
    </group>
  );
}

/* ============================= checkout + tobacco backbar (procedural) ============================= */
function CheckoutZone() {
  return (
    <group position={[-8.4, 0, 5]}>
      {/* counter body, top, customer-side promo panels, mat */}
      <Box args={[1.5, 1.02, 6.0]} position={[0, 0.53, 0]} color="#2b3038" roughness={0.6} />
      <Box args={[1.7, 0.09, 6.2]} position={[0, 1.08, 0]} color="#e8e4da" roughness={0.35} />
      <Box args={[0.06, 0.8, 1.8]} position={[0.78, 0.55, -1.5]} color={C.sevGreen} po={6} />
      <Box args={[0.06, 0.8, 1.8]} position={[0.78, 0.55, 0.5]} color={C.sevOrange} po={6} />
      <Box args={[0.06, 0.8, 1.4]} position={[0.78, 0.55, 2.2]} color={C.sevRed} po={6} />
      <Box args={[0.9, 0.02, 1.1]} position={[0.1, 1.13, 1.1]} color={C.navyDark} roughness={0.7} />
      {/* POS terminal (cashier-facing screen) */}
      <group position={[-0.3, 1.12, -0.5]}>
        <Cyl args={[0.16, 0.2, 0.06, 12]} position={[0, 0.03, 0]} color="#33373d" />
        <Cyl args={[0.04, 0.04, 0.42, 10]} position={[0, 0.24, 0]} color="#33373d" />
        <group position={[0, 0.62, 0]} rotation={[0, 0.35, 0.06]}>
          <Box args={[0.06, 0.52, 0.74]} color="#15181d" metalness={0.3} roughness={0.35} />
          <mesh position={[-0.045, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.64, 0.42]} />
            <meshStandardMaterial color="#0d2f52" emissive="#1c5da8" emissiveIntensity={0.7} roughness={0.3} />
          </mesh>
        </group>
      </group>
      {/* register drawer, barcode scanner, customer card reader */}
      <Box args={[0.55, 0.14, 0.75]} position={[-0.32, 1.19, 0.35]} color="#22262c" metalness={0.3} roughness={0.45} />
      <group position={[0.05, 1.12, -1.35]}>
        <Box args={[0.18, 0.06, 0.18]} position={[0, 0.03, 0]} color="#111418" />
        <Cyl args={[0.05, 0.07, 0.3, 10]} position={[0, 0.2, 0]} color="#111418" />
        <Box args={[0.14, 0.1, 0.1]} position={[0, 0.38, 0]} color="#22262c" />
      </group>
      <group position={[0.62, 1.12, 1.9]}>
        <Cyl args={[0.03, 0.03, 0.3, 8]} position={[0, 0.15, 0]} color="#33373d" />
        <Box args={[0.07, 0.32, 0.2]} position={[0, 0.42, 0]} rotation={[0, 0, -0.35]} color="#15181d" metalness={0.3} roughness={0.4} />
      </group>
      {/* impulse rack at the queue end of the counter */}
      <group position={[0, 0, -3.4]}>
        <Box args={[1.3, 1.35, 0.7]} position={[0, 0.7, 0]} color="#2b3038" roughness={0.6} />
        {[0.5, 0.82, 1.14].map((y, r) => (
          <group key={`ir${r}`}>
            <Box args={[0.06, 0.03, 0.66]} position={[0.66, y - 0.14, 0]} color="#9aa0a8" metalness={0.4} />
            {[-0.2, 0, 0.2].map((z, k) => (
              <Box key={k} args={[0.07, 0.24, 0.17]} position={[0.68, y, z]} color={[["#b03a2e", "#ffdc00", "#0074d9"], ["#2ecc40", "#7a1f1f", "#ff851b"], ["#f5e6c8", "#b10dc9", "#0d3b66"]][r][k]} roughness={0.6} />
            ))}
          </group>
        ))}
      </group>
      {/* tobacco backbar with pricer channels, against the left wall */}
      <group position={[-1.9, 0, 0]}>
        <Box args={[0.75, 0.9, 6.2]} position={[0, 0.45, 0]} color="#2b3038" roughness={0.6} />
        <Box args={[0.55, 3.0, 6.2]} position={[-0.08, 2.4, 0]} color="#3a3f47" roughness={0.6} />
        {[1.35, 1.95, 2.55, 3.15].map((y, r) => (
          <group key={`bb${r}`}>
            {Array.from({ length: 8 }).map((_, k) => (
              <Box key={k} args={[0.16, 0.34, 0.58]} position={[0.24, y + 0.24, -2.55 + k * 0.73]} color={["#7a1f1f", "#0d3b66", "#3a6b35", "#8a5a2a", "#5b1a2e", "#33502e", "#6e4a1f", "#123b5c"][(k + r) % 8]} roughness={0.6} />
            ))}
            <Box args={[0.05, 0.12, 5.9]} position={[0.3, y, 0]} color="#f2f2ee" po={6} />
            {Array.from({ length: 8 }).map((_, k) => (
              <Box key={`t${k}`} args={[0.06, 0.09, 0.28]} position={[0.31, y, -2.55 + k * 0.73]} color={C.sevRed} po={8} />
            ))}
          </group>
        ))}
        <Box args={[0.6, 0.8, 6.2]} position={[-0.05, 4.3, 0]} color="#14171c" roughness={0.55} />
        <LabelPanel text="TOBACCO — MUST BE 21+" bg={C.navyDark} fg="#ffffff" size={[5.6, 0.56]} position={[0.26, 4.3, 0]} rotation={[0, Math.PI / 2, 0]} lit fs={64} texW={1024} texH={112} />
      </group>
    </group>
  );
}

/* ============================= INTERIOR SCENE (open-air cutaway) ============================= */
function InteriorScene() {
  const RW = 22, RD = 16, WALL = 2.2;
  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow><boxGeometry args={[RW, 0.3, RD]} /><meshStandardMaterial color={C.floor} roughness={0.6} /></mesh>
      {Array.from({ length: 9 }).map((_, i) => (<Box key={`ft${i}`} args={[0.05, 0.31, RD]} position={[(i - 4) * 2.4, 0.01, 0]} color={C.floorDk} roughness={0.6} />))}
      {/* low cutaway walls + stripe caps */}
      <Box args={[RW, WALL, 0.3]} position={[0, WALL / 2, -RD / 2]} color={C.beige} />
      <Box args={[RW, 0.3, 0.34]} position={[0, WALL + 0.15, -RD / 2]} color={C.sevRed} />
      <Box args={[0.3, WALL, RD]} position={[-RW / 2, WALL / 2, 0]} color="#e5e1d8" />
      <Box args={[0.34, 0.3, RD]} position={[-RW / 2, WALL + 0.15, 0]} color={C.sevRed} />
      <Box args={[0.3, WALL, RD]} position={[RW / 2, WALL / 2, 0]} color="#e5e1d8" />
      <Box args={[0.34, 0.3, RD]} position={[RW / 2, WALL + 0.15, 0]} color={C.sevRed} />
      <Box args={[RW, 0.5, 0.3]} position={[0, 0.25, RD / 2]} color={C.beige} />
      <Box args={[RW, 0.18, 0.34]} position={[0, 0.55, RD / 2]} color={C.sevOrange} />

      {/* RIGHT WALL: glass-door cooler bank with COLD BEER / WINE / ENERGY lightbox headers */}
      <CoolerBank x={RW / 2} />
      {/* cooler door static (promo decal on an ENERGY door) */}
      <Box args={[0.03, 0.85, 1.15]} position={[9.56, 1.75, 3.8]} color={C.sevRed} po={8} />
      <Box args={[0.03, 0.55, 0.85]} position={[9.55, 1.75, 3.8]} color={C.sevWhite} po={10} />
      {/* cooler strips on the beer-door shelf channels */}
      {[0.78, 1.34, 1.9].map((y, i) => (
        <Box key={`cs${i}`} args={[0.04, 0.13, 1.55]} position={[9.87, y + 0.03, -3.8]} color={C.marigold} roughness={0.5} po={8} />
      ))}

      {/* BACK WALL: frozen / fountain / coffee / hot food, with lit menu headers */}
      <group position={[-5, 0, -RD / 2 + 1.4]}>
        <Box args={[2.6, 2.4, 1.5]} position={[0, 1.2, 0]} color={C.steel} />
        <Box args={[2.6, 1.0, 1.5]} position={[0, 2.9, 0]} color={C.sevRed} />
        <LabelPanel text="FROZEN DRINKS" bg="#ffffff" fg={C.sevRed} size={[2.2, 0.6]} position={[0, 2.9, 0.78]} fs={72} texW={768} texH={192} />
        {[-0.7, 0, 0.7].map((x, i) => (<Cyl key={i} args={[0.16, 0.16, 0.5]} position={[x, 1.7, 0.8]} color={C.dkmetal} />))}
      </group>
      <group position={[-1, 0, -RD / 2 + 1.4]}>
        <Box args={[3.2, 2.2, 1.4]} position={[0, 1.1, 0]} color={C.sevWhite} />
        <Box args={[3.2, 1.0, 1.4]} position={[0, 2.7, 0]} color={C.sevGreen} />
        <LabelPanel text="FOUNTAIN DRINKS" bg="#ffffff" fg={C.sevGreen} size={[2.9, 0.55]} position={[0, 2.7, 0.74]} fs={72} texW={1024} texH={192} />
        {Array.from({ length: 6 }).map((_, i) => (<Box key={i} args={[0.26, 0.5, 0.18]} position={[-1.1 + i * 0.44, 1.55, 0.74]} color={C.sevRed} />))}
      </group>
      <group position={[3.5, 0, -RD / 2 + 1.4]}>
        <Box args={[3, 1.1, 1.4]} position={[0, 0.55, 0]} color={C.wood} />
        {Array.from({ length: 4 }).map((_, i) => (<Cyl key={i} args={[0.22, 0.18, 0.65]} position={[-1 + i * 0.66, 1.45, 0]} color={C.coffee} />))}
        <Box args={[3, 0.95, 0.12]} position={[0, 2.7, 0.55]} color={C.coffee} />
        <LabelPanel text="FRESH COFFEE" bg={C.coffee} fg="#f5e6c8" size={[2.7, 0.75]} position={[0, 2.7, 0.62]} fs={80} texW={896} texH={256} />
      </group>
      <group position={[7, 0, -RD / 2 + 1.4]}>
        <Box args={[2.4, 1.1, 1.4]} position={[0, 0.7, 0]} color={C.steel} />
        <Box args={[2.2, 0.45, 1.2]} position={[0, 1.45, 0]} color="#8a5a2a" />
        {/* hot dog roller grill on the hot case */}
        <Box args={[1.9, 0.08, 0.9]} position={[0, 1.72, 0]} color="#b9bfc6" metalness={0.6} roughness={0.3} />
        <Box args={[0.06, 0.26, 0.9]} position={[-0.95, 1.85, 0]} color="#9aa0a8" metalness={0.6} roughness={0.35} />
        <Box args={[0.06, 0.26, 0.9]} position={[0.95, 1.85, 0]} color="#9aa0a8" metalness={0.6} roughness={0.35} />
        {[-0.32, -0.16, 0, 0.16, 0.32].map((z, i) => (
          <Cyl key={`rl${i}`} args={[0.035, 0.035, 1.85, 10]} position={[0, 1.8, z]} rotation={[0, 0, Math.PI / 2]} color="#d6d9dd" />
        ))}
        {([[-0.45, -0.24], [0.3, -0.24], [-0.15, -0.08], [0.5, 0.08], [-0.55, 0.08], [0.1, 0.24]] as [number, number][]).map(([hx, hz], i) => (
          <Cyl key={`hd${i}`} args={[0.055, 0.055, 0.52, 10]} position={[hx, 1.87, hz]} rotation={[0, 0, Math.PI / 2]} color={["#8f3a1e", "#a04524", "#93401f"][i % 3]} />
        ))}
        <Box args={[1.9, 0.55, 0.03]} position={[0, 2.05, -0.44]} color="#cfe4ee" transparent opacity={0.25} metalness={0.3} roughness={0.15} />
        <Box args={[1.9, 0.03, 0.55]} position={[0, 2.32, -0.18]} rotation={[0.18, 0, 0]} color="#cfe4ee" transparent opacity={0.25} metalness={0.3} roughness={0.15} />
        <Box args={[2.6, 1.3, 0.16]} position={[0, 3.3, 0.5]} color={C.navyDark} />
        <LabelPanel text="HOT FOOD" bg="#ffffff" fg={C.sevRed} size={[2.3, 1.05]} position={[0, 3.3, 0.59]} fs={110} texW={768} texH={352} />
      </group>

      {/* CENTER: real stocked gondolas (Rendevr, CC-BY) */}
      {[-3.2, 0.2, 3.6].map((gx, i) => (
        <group key={`g${i}`}>
          <ShelfModel url="/models/shelf-chips.glb" position={[gx - 0.7, 0, -0.8]} rotationY={Math.PI / 2} />
          <ShelfModel url="/models/shelf-drinks.glb" position={[gx + 0.7, 0, 2.5]} rotationY={-Math.PI / 2} />
        </group>
      ))}

      {/* FRONT-LEFT: checkout with POS + tobacco backbar */}
      <CheckoutZone />
      {/* lottery + ATM by the front wall */}
      <group position={[-6.8, 0, 7.3]}>
        <Box args={[1.4, 1.6, 0.8]} position={[0, 0.8, 0]} color={C.sevWhite} />
        <Box args={[1.2, 0.5, 0.12]} position={[0, 1.75, 0.42]} color={C.sevOrange} />
        <Box args={[1, 1.7, 0.8]} position={[1.8, 0.85, 0]} color={C.dkmetal} />
      </group>
      {/* floor graphic — printed wayfinding decal */}
      <FloorDecal position={[0, 0.17, 5.9]} />

      {/* standee in the open walkway between checkout and the beverage stations */}
      <group position={[-5.8, 0, -1.5]} rotation={[0, 0.35, 0]}>
        <Box args={[0.95, 1.7, 0.4]} position={[0, 0.85, 0]} color={C.sevOrange} roughness={0.6} />
        <Box args={[0.8, 0.5, 0.42]} position={[0, 1.45, 0]} color={C.sevWhite} roughness={0.6} po={6} />
        <Box args={[1.05, 0.28, 0.44]} position={[0, 1.85, 0]} color={C.sevGreen} roughness={0.6} />
      </group>

      {/* wobbler clipped to the right gondola's shelf edge (neon green for visibility) */}
      <group position={[4.3, 1.6, 4.35]}>
        <Box args={[0.02, 0.02, 0.34]} position={[0, 0, 0.17]} color="#d5d5d5" />
        <mesh position={[0, -0.12, 0.36]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.34, 0.28, 0.02]} />
          <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
      </group>

      {/* dispense beverage translite (lit) between frozen + fountain stations */}
      <mesh position={[-3, 3.5, -RD / 2 + 1.45]}>
        <boxGeometry args={[2.4, 0.85, 0.12]} />
        <meshStandardMaterial color="#eaf4ff" emissive="#bcd9ff" emissiveIntensity={0.9} roughness={0.3} />
      </mesh>
      <LabelPanel text="ICE COLD DRINKS" bg="#eaf4ff" fg="#0d3b66" size={[2.25, 0.7]} position={[-3, 3.5, -RD / 2 + 1.52]} lit fs={80} texW={768} texH={224} />

      {/* napkin dispenser with promo insert on the foodservice counter */}
      <group position={[2.5, 1.12, -6.0]}>
        <Box args={[0.32, 0.6, 0.28]} position={[0, 0.3, 0]} color="#141414" roughness={0.4} />
        <Box args={[0.24, 0.42, 0.02]} position={[0, 0.32, 0.15]} color={C.sevRed} roughness={0.5} />
      </group>
    </group>
  );
}

/* ============================= PINS (pulse + occlusion + click) ============================= */
const PIN_UNFOUND = "#FF3131"; // neon red — not yet explored
const PIN_FOUND = "#39FF14";   // neon green — explored
function Pins({ list, occludeRoot, foundSet, onPick }: {
  list: Hotspot[];
  occludeRoot: React.MutableRefObject<THREE.Group | null>;
  foundSet: Set<number>;
  onPick: (h: Hotspot, i: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const pinPos = useMemo(() => new THREE.Vector3(), []);
  const opacities = useRef<number[]>(list.map(() => 1));
  // the hotspot list changes length when switching exterior<->interior; resize or pins beyond the old length get NaN opacity
  if (opacities.current.length !== list.length) opacities.current = list.map(() => 1);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera;
    const g = groupRef.current;
    if (!g) return;
    g.children.forEach((child, i) => {
      const head = child.getObjectByName("head") as THREE.Mesh | null;
      const ring = child.getObjectByName("ring") as THREE.Mesh | null;
      const stem = child.getObjectByName("stem") as THREE.Mesh | null;
      const pulse = 1 + Math.sin(t * 2.5 + i * 0.6) * 0.12;
      if (head) head.scale.setScalar(pulse);
      if (ring) {
        ring.lookAt(cam.position);
        const rp = (Math.sin(t * 2.5 + i * 0.6) + 1) / 2;
        ring.scale.setScalar(1 + rp * 0.8);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - rp) * opacities.current[i];
      }
      // occlusion
      child.getWorldPosition(pinPos);
      dir.copy(pinPos).sub(cam.position);
      const dist = dir.length();
      dir.normalize();
      raycaster.set(cam.position, dir);
      let occluded = false;
      if (occludeRoot.current) {
        const hits = raycaster.intersectObjects(occludeRoot.current.children, true);
        occluded = hits.length > 0 && hits[0].distance < dist - 0.6;
      }
      const target = occluded ? 0.1 : 1;
      opacities.current[i] += (target - opacities.current[i]) * 0.15;
      const o = opacities.current[i];
      if (head) {
        const m = head.material as THREE.MeshBasicMaterial;
        m.opacity = o; m.transparent = true;
        m.color.set(foundSet.has(i) ? PIN_FOUND : PIN_UNFOUND);
      }
      if (stem) {
        const m = stem.material as THREE.MeshBasicMaterial;
        m.opacity = o; m.transparent = true;
        m.color.set(foundSet.has(i) ? PIN_FOUND : PIN_UNFOUND);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {list.map((h, i) => (
        <group key={h.id} position={h.pos}>
          <mesh name="stem" position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshBasicMaterial color={PIN_UNFOUND} transparent />
          </mesh>
          <mesh
            name="head"
            onPointerDown={(e) => {
              e.stopPropagation();
              if (opacities.current[i] < 0.4) return; // occluded — ignore
              onPick(h, i);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            <sphereGeometry args={[0.36, 24, 24]} />
            <meshBasicMaterial color={PIN_UNFOUND} transparent />
          </mesh>
          <mesh name="ring">
            <ringGeometry args={[0.44, 0.6, 28]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}


/* ============================= camera rig (no canvas remount) ============================= */
function CameraRig({ mode }: { mode: "exterior" | "interior" }) {
  const camera = useThree((st) => st.camera);
  const controls = useThree((st) => st.controls) as { target: THREE.Vector3; update: () => void } | null;
  useEffect(() => {
    camera.position.set(...CAM[mode].pos);
    if (controls) {
      controls.target.set(...CAM[mode].target);
      controls.update();
    }
  }, [mode, camera, controls]);
  return null;
}

/* ============================= SCENE CONTROLLER ============================= */
const CAM = {
  exterior: { pos: [44, 19, 23] as Vec3, target: [-2, 2, -7] as Vec3, min: 10, max: 66, minP: 0.2, maxP: 1.45 },
  interior: { pos: [0, 16, 18] as Vec3, target: [0, 1.2, -0.5] as Vec3, min: 8, max: 38, minP: 0.15, maxP: 1.2 },
};

function Scene({ mode, foundSet, onPick }: { mode: "exterior" | "interior"; foundSet: Set<number>; onPick: (h: Hotspot, i: number) => void }) {
  const sceneRoot = useRef<THREE.Group>(null);
  const list = mode === "exterior" ? EXTERIOR_HOTSPOTS : INTERIOR_HOTSPOTS;
  return (
    <>
      <CameraRig mode={mode} />
      <SoftShadows size={16} samples={10} focus={0.5} />
      {mode === "exterior" ? (
        <Daylight />
      ) : (
        <>
          <color attach="background" args={["#141c2c"]} />
          <fog attach="fog" args={["#141c2c", 42, 90]} />
          <ambientLight intensity={0.72} color="#f0ead9" />
          <directionalLight position={[-14, 20, 12]} intensity={1.3} color="#fff0d8" castShadow
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-left={-28} shadow-camera-right={28} shadow-camera-top={28} shadow-camera-bottom={-28}
            shadow-camera-near={1} shadow-camera-far={70} />
          <directionalLight position={[16, 12, -10]} intensity={0.3} color="#cfdcff" />
          <pointLight position={[0, 7, 0]} intensity={0.6} distance={40} color="#fff2d9" />
        </>
      )}
      <Suspense fallback={null}>
        <group ref={sceneRoot}>{mode === "exterior" ? <ExteriorScene /> : <InteriorScene />}</group>
      </Suspense>
      <Pins list={list} occludeRoot={sceneRoot} foundSet={foundSet} onPick={onPick} />
      <OrbitControls
        makeDefault
        target={CAM[mode].target}
        enablePan={false}
        minDistance={CAM[mode].min}
        maxDistance={CAM[mode].max}
        minPolarAngle={CAM[mode].minP}
        maxPolarAngle={CAM[mode].maxP}
      />
    </>
  );
}

/* ============================= STATIC PREVIEW SCENE (landing page) ============================= */
function StaticScene() {
  const sceneRoot = useRef<THREE.Group>(null);
  // gentle auto-rotate so it reads as "3D" without being interactive
  useFrame((state) => {
    if (sceneRoot.current) sceneRoot.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.18;
  });
  return (
    <>
      <Daylight />
      <SoftShadows size={16} samples={10} focus={0.5} />
      <Suspense fallback={null}>
        <group ref={sceneRoot}><ExteriorScene /></group>
      </Suspense>
    </>
  );
}

/* ============================= MAIN COMPONENT (overlay UI) ============================= */
/* ============================= STATIC PREVIEW COMPONENT (landing page) ============================= */
function StaticPreview() {
  return (
    <a href="/gallery" aria-label="Open the interactive 3D store explorer" style={{ display: "block", textDecoration: "none" }}>
      <div style={{ position: "relative", width: "100%", height: "min(56vw,520px)", minHeight: 320, background: "#0e1830", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
        <Canvas shadows camera={{ position: [22, 14, 22], fov: 42 }} gl={{ antialias: true }} dpr={[1, 2]}>
          <StaticScene />
        </Canvas>
        {/* non-interactive overlay; the whole tile is the link to /gallery */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "26px 28px", background: "linear-gradient(180deg, rgba(0,10,30,0.45) 0%, rgba(0,10,30,0) 30%, rgba(0,10,30,0) 60%, rgba(0,10,30,0.78) 100%)" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.marigold, fontWeight: 600 }}>Interactive 3D Showroom</div>
          <div style={{ fontSize: "clamp(20px,3vw,30px)", color: "#fff", fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>
            Step inside a live retail site.
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, alignSelf: "flex-start", background: C.marigold, color: C.navyDark, fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 999 }}>
            Explore in 3D <span style={{ fontSize: 18 }}>→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ============================= MAIN COMPONENT (overlay UI) ============================= */
export default function StoreExplorer({ staticPreview = false }: { staticPreview?: boolean }) {
  if (staticPreview) return <StaticPreview />;
  return <InteractiveExplorer />;
}

function InteractiveExplorer() {
  const [mode, setMode] = useState<"exterior" | "interior">("exterior");
  const [active, setActive] = useState<Hotspot | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [foundExt] = useState(() => new Set<number>());
  const [foundInt] = useState(() => new Set<number>());
  const [, force] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const list = mode === "exterior" ? EXTERIOR_HOTSPOTS : INTERIOR_HOTSPOTS;
  const foundSet = mode === "exterior" ? foundExt : foundInt;

  const onPick = useCallback((h: Hotspot, i: number) => {
    foundSet.add(i);
    setActive(h);
    setImgIdx(0);
    force((n) => n + 1);
  }, [foundSet]);

  const switchMode = (m: "exterior" | "interior") => {
    if (m === mode) return;
    setActive(null);
    setMode(m);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "78vh", minHeight: 520, background: "#0e1830", borderRadius: 16, overflow: "hidden" }}>
      <Canvas shadows camera={{ position: CAM.exterior.pos, fov: 42 }} gl={{ antialias: true }} dpr={[1, 2]}>
        <Scene mode={mode} foundSet={foundSet} onPick={onPick} />
      </Canvas>

      {/* top overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: isMobile ? "16px 16px" : "20px 24px", pointerEvents: "none", background: "linear-gradient(180deg, rgba(0,10,30,0.92) 0%, rgba(0,10,30,0.5) 62%, rgba(0,10,30,0) 100%)" }}>
        <div style={{ fontSize: isMobile ? 10 : 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.marigold, fontWeight: 600 }}>
          Interactive Showroom · {mode === "exterior" ? "Exterior" : "Interior"}
        </div>
        <div style={{ fontSize: isMobile ? 20 : "clamp(22px,3vw,34px)", color: "#fff", fontWeight: 800, lineHeight: 1.05, marginTop: 4 }}>
          Signage lives <em style={{ fontStyle: "italic", fontWeight: 400, color: C.marigold }}>everywhere.</em>
        </div>
        <div style={{ marginTop: 8, fontSize: isMobile ? 11 : 13, color: "rgba(255,255,255,0.92)", textShadow: "0 1px 6px rgba(0,10,30,0.95), 0 0 2px rgba(0,10,30,0.9)" }}>Drag to orbit · scroll to zoom · tap a glowing pin to explore</div>

        {/* on mobile, toggle + counter live INSIDE the stacked header (no overlap) */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, pointerEvents: "auto" }}>
            <div style={{ display: "flex", background: "rgba(0,10,30,0.78)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 4, border: "1px solid rgba(0,53,107,0.3)" }}>
              {(["exterior", "interior"] as const).map((m) => (
                <button key={m} onClick={() => switchMode(m)} style={{
                  background: mode === m ? C.marigold : "transparent", color: mode === m ? C.navyDark : "rgba(255,255,255,0.65)",
                  border: "none", fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 999, cursor: "pointer", transition: ".25s",
                }}>{m === "exterior" ? "Outside" : "Inside"}</button>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, textAlign: "right", textShadow: "0 1px 6px rgba(0,10,30,0.95)" }}>
              <b style={{ color: C.marigold, fontSize: 18, fontWeight: 800 }}>{foundSet.size}</b>/{list.length} explored
            </div>
          </div>
        )}
      </div>

      {/* mode toggle — desktop only (floats centered top); on mobile it's in the header above */}
      {!isMobile && (
        <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", display: "flex", background: "rgba(0,10,30,0.78)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 5, border: "1px solid rgba(0,53,107,0.3)", zIndex: 6 }}>
          {(["exterior", "interior"] as const).map((m) => (
            <button key={m} onClick={() => switchMode(m)} style={{
              background: mode === m ? C.marigold : "transparent", color: mode === m ? C.navyDark : "rgba(255,255,255,0.65)",
              border: "none", fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 999, cursor: "pointer", transition: ".25s",
            }}>{m === "exterior" ? "Outside" : "Inside"}</button>
          ))}
        </div>
      )}

      {/* counter — desktop only; on mobile it's in the header above */}
      {!isMobile && (
        <div style={{ position: "absolute", top: 72, right: 24, color: "rgba(255,255,255,0.9)", fontSize: 12, textAlign: "right", pointerEvents: "none", textShadow: "0 1px 6px rgba(0,10,30,0.95), 0 0 2px rgba(0,10,30,0.9)" }}>
          <b style={{ color: C.marigold, fontSize: 22, display: "block", fontWeight: 800, textShadow: "0 1px 6px rgba(0,10,30,0.95)" }}>{foundSet.size}</b>/{list.length} explored
        </div>
      )}

      {/* CC-BY attribution (required by asset licenses) — tucked behind an info toggle to keep the view clean */}
      <div style={{ position: "absolute", bottom: 8, left: 14, zIndex: 5, display: "flex", alignItems: "center", gap: 8, pointerEvents: "auto" }}>
        <button
          onClick={() => setCreditsOpen((o) => !o)}
          aria-label="3D asset credits"
          title="3D asset credits"
          style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,10,30,0.55)", color: "rgba(255,255,255,0.5)", fontSize: 11, fontStyle: "italic", fontFamily: "Georgia, serif", cursor: "pointer", lineHeight: 1, padding: 0 }}
        >i</button>
        {creditsOpen && (
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(0,10,30,0.7)", padding: "4px 10px", borderRadius: 6 }}>
            3D assets: <a href="https://sketchfab.com/3d-models/gas-station-eeb913b90b4344ddbd7852f82a7ef160" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}>&quot;Gas station&quot; by Elbolillo</a> · shelves by <a href="https://sketchfab.com/Rendevr" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}>Rendevr</a> (CC-BY 4.0)
          </span>
        )}
      </div>

      {/* info panel */}
      <aside style={{
        position: "absolute", top: 0, right: 0, height: "100%", width: "min(400px,88%)", background: C.offwhite,
        transform: active ? "translateX(0)" : "translateX(100%)", transition: "transform .42s cubic-bezier(.16,1,.3,1)",
        display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.3)", zIndex: 10,
      }}>
        {active && (
          <>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#222", overflow: "hidden", flexShrink: 0 }}>
              <button onClick={() => setActive(null)} style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, border: "none", borderRadius: "50%", background: "rgba(0,10,30,0.85)", color: "#fff", fontSize: 18, cursor: "pointer", zIndex: 2 }}>×</button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.imgs ? active.imgs[imgIdx] : active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {active.imgs && active.imgs.length > 1 && (
                <div style={{ position: "absolute", bottom: 10, right: 12, display: "flex", gap: 6, zIndex: 2 }}>
                  {active.imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      aria-label={`Show image variation ${i + 1}`}
                      style={{
                        width: 26, height: 26, borderRadius: "50%", border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: 700,
                        background: i === imgIdx ? C.marigold : "rgba(0,10,30,0.75)",
                        color: i === imgIdx ? C.navyDark : "rgba(255,255,255,0.8)",
                      }}
                    >{i + 1}</button>
                  ))}
                </div>
              )}
              {active.placeholder && (
                <span style={{ position: "absolute", bottom: 10, left: 14, right: 14, background: "rgba(0,10,30,0.85)", color: "#fff", fontSize: 11, padding: "5px 10px", borderRadius: 6 }}>Representative photo — actual fixture image coming soon</span>
              )}
            </div>
            <div style={{ padding: "22px 26px", overflowY: "auto", flex: 1 }}>
              <h2 style={{ fontSize: 23, fontWeight: 800, color: C.navy, lineHeight: 1.1 }}>{active.title}</h2>
              <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.6, color: "#3a3a3a" }}>{active.desc}</p>
              <div style={{ marginTop: 18, padding: "15px 17px", background: "#fff", borderLeft: `3px solid ${C.marigold}`, borderRadius: "0 8px 8px 0" }}>
                <h4 style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: C.marigoldDark, fontWeight: 700 }}>How USG delivers it</h4>
                <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.55, color: "#444" }}>{active.usg}</p>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
