"use client";

/**
 * StoreExplorer — interactive 3D 7-Eleven showroom.
 * Phase 2: exterior + interior scenes, 21 hotspot pins, info panel,
 * Outside/Inside toggle, HUD (reset / guided tour / pin counter).
 *
 * All hotspot photos are now in place (no remaining placeholders).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, SoftShadows, useTexture } from "@react-three/drei";
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
export type Hotspot = { id: string; cat: string; title: string; loc: string; pos: Vec3; desc: string; usg: string; img: string; placeholder?: boolean; };

/* ============================= hotspot data ============================= */
const EXTERIOR_HOTSPOTS: Hotspot[] = [
  { id: "pump", cat: "Gas Pump", title: "Pump Topper & Pump Topper Extender", loc: "Fuel island", pos: [-16.5, 3.6, 12.5], desc: "High-dwell-time advertising right at the pump \u2014 drivers stare at this for 3-5 minutes per fill.", usg: "USG uses pump toppers as a monthly kit item for new deals but keeps extenders for longer promotional windows to balance long term deals like loyalty with short term offers.", img: "/images/signtypes/pump-topper.webp" },
  { id: "window", cat: "Storefront", title: "Window Signs", loc: "Storefront glass", pos: [-3.6, 2.7, 4.6], desc: "Promotional clings and price callouts on entrance doors and front glass \u2014 the last message before a customer walks in.", usg: "USG prints removable static and adhesive clings, die-cut to any shape, with easy seasonal swap-out.", img: `${IMG}/storefront-promo-window-cling.webp` },
  { id: "aframe", cat: "A-Frame", title: "Sidewalk A-Frame", loc: "Entrance walkway", pos: [3.2, 2.0, 5.8], desc: "Portable sidewalk boards that capture foot traffic with daily specials.", usg: "USG supplies durable A-frame hardware with printed, swappable insert panels.", img: `${IMG}/brunch-a-frame-sandwich-board.webp` },
  { id: "flag", cat: "Flag", title: "Feather Flags", loc: "Lot perimeter", pos: [14.5, 4.6, 14.5], desc: "Tall feather and blade flags that create motion and draw eyes from the road.", usg: "USG offers feather flags in multiple formats with poles, bases, and ground stakes.", img: `${IMG}/feather-flag-circle-k-hot-food2.webp` },
  { id: "bollard", cat: "Bollard", title: "Triangle Bollard", loc: "Pump-to-door walkway", pos: [-7.5, 2.2, 7.5], desc: "3 sided advertising vehicle that captures the attention of drivers as they make their way from the pump into the store. Advertisements are visible from all directions.", usg: "USG offers easy install bollards that can be customized to any shape and size.", img: "/images/signtypes/triangle-bollard.webp" },
  { id: "snaplock", cat: "Building", title: "Building Snaplock", loc: "Building exterior wall", pos: [11.0, 3.0, 2.2], desc: "The perfect alternative solution to window signage. Snaplocks sit safely in a frame that can be placed all around the building.", usg: "USG has the ability to provide both hardware and insert to maximize your location's advertising potential.", img: "/images/signtypes/building-snaplock.webp" },
  { id: "cigch", cat: "Window Display", title: "Cigarette Changeable", loc: "Front window", pos: [6.9, 2.7, 4.4], desc: "These versatile window displays are the perfect way to ensure that your stores are able to easily keep up with the ever changing price points on your tobacco products.", usg: "USG offers semi permanent decal numbers that are quick to change out. As well as standard track and flip book options.", img: `${IMG}/cig-changeable.webp` },
  { id: "icemerch", cat: "Ice Merchandiser", title: "Ice Merch Decals", loc: "Front of store", pos: [-8.5, 2.0, 3.4], desc: "All weather rated materials that showcase your brand, deals, or loyalty programs on your outdoor ice merchandisers.", usg: "With our custom store profiles we will always know exactly how many of each size decal your stores need.", img: "/images/signtypes/ice-merch.webp" },
];
const INTERIOR_HOTSPOTS: Hotspot[] = [
  { id: "checkout", cat: "Counter", title: "Checkout & Impulse Signage", loc: "Front counter", pos: [-8.4, 2.4, 5], desc: "The counter zone \u2014 impulse racks, register toppers, and age-verification signage.", usg: "USG prints counter mats, register toppers, impulse-rack headers, and compliance signage.", img: `${IMG}/checkout-counter-signage.webp` },
  { id: "backbar", cat: "Tobacco", title: "Backbar Signage", loc: "Behind front counter", pos: [-9.6, 4.0, 5], desc: "Fully customized kits that allow for instantly changeable pricers on your tobacco products.", usg: "Fully assembled and kitted at time of shipment makes installation a breeze.", img: "/images/signtypes/backbar-kit.webp" },
  { id: "standee", cat: "Floor Display", title: "Standee", loc: "Store entrance", pos: [-5.5, 2.6, 6.2], desc: "Freestanding point-of-purchase displays that are customized to the need of the promotion. Placed in high traffic area to increase visibility.", usg: "USG produces corrugated and permanent floor displays, shipped flat or pre-assembled.", img: "/images/signtypes/standee.webp", placeholder: true },
  { id: "floorgfx", cat: "Floor Display", title: "Floor Graphics", loc: "Main aisle", pos: [0, 0.6, 4.5], desc: "Walk-on floor decals for wayfinding, promotions, and brand moments underfoot.", usg: "USG prints anti-slip floor graphics rated for high-traffic retail environments.", img: `${IMG}/floor-graphics-aisle.webp` },
  { id: "shelf", cat: "Shelf Tag", title: "Shelf Tags", loc: "Center aisles", pos: [-3, 1.9, 3.8], desc: "These popular and inexpensive pricing tags allow for barcode scanning through clear material while calling out the current deal.", usg: "Our material makes application or removal quick and easy, while being highly durable. So your promos last as long as you need them to.", img: "/images/signtypes/shelf-tag.webp" },
  { id: "wobbler", cat: "Shelf Tag", title: "Wobblers", loc: "Center aisles", pos: [3, 2.2, 3.8], desc: "These eye catching center store signs dangle into the aisle enticing customers to purchase deal items.", usg: "USG offers custom shapes and sizes to fit all your placement needs.", img: `${IMG}/coke-pepsi-shelf-talkers.webp` },
  { id: "coolerstatic", cat: "Cooler Graphics", title: "Cooler Door Statics", loc: "Beverage wall", pos: [8.3, 3.2, 3], desc: "Coming in all shapes and sizes these statics are an easily changeable option that catches the customers eye as soon as they walk up.", usg: "Offering static and adhesive options allows for monthly deals or more permanent signage such as \u201cWe ID\u201d decals.", img: `${IMG}/cooler-doors-promotional-graphics2.webp` },
  { id: "coolerstrip", cat: "Cooler Graphics", title: "Cooler Strips", loc: "Cooler shelf channel", pos: [8.3, 1.6, -1], desc: "These moisture proof signs are an ideal option for displaying beverage call outs.", usg: "We offer clear and matte material with shapes that rise above the channel allowing the product to still be seen but the deal to stand out.", img: "/images/signtypes/cooler-strip.webp" },
  { id: "translite", cat: "Beverage", title: "Dispense Beverage Translites", loc: "Frozen & hot beverage stations", pos: [-3, 3.6, -6.3], desc: "Whether it is frozen drinks, or cappuccino machines these signs are used to create brand loyalty and drive repeat purchases.", usg: "We specialize in creating branded zones for all of your dispense bev machines.", img: `${IMG}/slurpee-machine-topper.webp` },
  { id: "napkin", cat: "Counter", title: "Napkin Inserts", loc: "Foodservice counter", pos: [2.5, 2.0, -5.4], desc: "Napkin dispenser inserts that turn an everyday touchpoint into promotional real estate.", usg: "We specialize in creating branded zones for all of your dispense bev machines.", img: "/images/signtypes/napkin-insert.webp" },
  { id: "hotfood", cat: "Menu Board", title: "Hot Food Signage", loc: "Foodservice counter", pos: [7, 3.9, -6.1], desc: "From roller grill displays to temperature rated hot case decals, we offer a full line of hot food signage to create a cohesive branded environment for your customers.", usg: "We specialize in developing permanent branded signage that compliments monthly promotional sales items creating a brand that brings customers back time and time again.", img: `${IMG}/hot-dog-combo-menu-signs.webp` },
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
      {[0, Math.PI / 2].map((r, i) => (
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
      <SoftShadows size={16} samples={10} focus={0.5} />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

/* ============================= EXTERIOR SCENE ============================= */
function ExteriorScene() {
  const asphalt = useTiled("/textures/asphalt.jpg", 6.5, 5);
  const concrete = useTiled("/textures/concrete.jpg", 7, 1.4);
  const stucco = useTiled("/textures/stucco.jpg", 4.5, 1.3);
  const stuccoSide = useTiled("/textures/stucco.jpg", 3, 1.3);
  const roofTex = useTiled("/textures/roof.jpg", 4.5, 3);
  const poster = useSRGB("/images/easy/qsr-soup-lto-poster.webp");
  const cigTex = useSRGB("/images/easy/cig-changeable.webp");
  const BW = 17, BH = 4.6, BD = 11;
  const cols: [number, number][] = [[-6, -2.4], [6, -2.4], [-6, 2.4], [6, 2.4]];
  const pumps: [number, number][] = [[-4.2, 0], [0, 0], [4.2, 0]];
  return (
    <group>
      {/* asphalt lot */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[54, 0.4, 42]} />
        <meshStandardMaterial map={asphalt} color="#c9c9c9" roughness={0.97} />
      </mesh>
      {/* worn parking stall lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Box key={`p${i}`} args={[0.12, 0.02, 3.4]} position={[3 + i * 1.9, 0.02, 9.5]} color="#d3cebd" roughness={0.92} />
      ))}
      {/* landscape islands with trees */}
      {([[-22, -16], [22, -16], [-22, 16], [22, 16]] as [number, number][]).map(([x, z], i) => (
        <group key={`ls${i}`}>
          <mesh position={[x, 0.12, z]} receiveShadow>
            <cylinderGeometry args={[2.1, 2.3, 0.24, 24]} />
            <meshStandardMaterial color="#57683f" roughness={1} />
          </mesh>
          <mesh position={[x, 0.06, z]}>
            <cylinderGeometry args={[2.35, 2.4, 0.14, 24]} />
            <meshStandardMaterial map={concrete} color="#c8c4b9" roughness={0.9} />
          </mesh>
          <Tree position={[x, 0, z]} s={1 + (i % 2) * 0.18} />
        </group>
      ))}
      {/* sidewalk + curb */}
      <mesh position={[0, 0.06, 5.0]} receiveShadow>
        <boxGeometry args={[20, 0.45, 3.6]} />
        <meshStandardMaterial map={concrete} color="#d6d2c8" roughness={0.9} />
      </mesh>
      <Box args={[20, 0.2, 0.24]} position={[0, 0.1, 6.9]} color="#b9b5aa" roughness={0.9} />
      {/* red safety bollards along storefront */}
      {[-5, -2, 1, 4, 7].map((x, i) => (
        <group key={`bl${i}`} position={[x, 0, 6.55]}>
          <Cyl args={[0.15, 0.15, 1.0, 16]} position={[0, 0.5, 0]} color="#c22a1e" />
          <mesh position={[0, 1.02, 0]}><sphereGeometry args={[0.15, 16, 12]} /><meshStandardMaterial color="#c22a1e" roughness={0.5} /></mesh>
        </group>
      ))}

      {/* ── BUILDING ─────────────────────────────────────────── */}
      <group position={[2, 0, -1.5]}>
        {/* brick base under glazing */}
        <Box args={[BW, 1.2, 0.42]} position={[0, 0.6, BD / 2 - 0.02]} color={C.brick} roughness={0.9} />
        {/* rear + side walls (stucco) */}
        <mesh position={[0, BH / 2, -BD / 2]} castShadow receiveShadow>
          <boxGeometry args={[BW, BH, 0.4]} />
          <meshStandardMaterial map={stucco} color="#ded8ca" roughness={0.92} />
        </mesh>
        <mesh position={[-BW / 2, BH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, BH, BD]} />
          <meshStandardMaterial map={stuccoSide} color="#d7d1c2" roughness={0.92} />
        </mesh>
        <mesh position={[BW / 2, BH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, BH, BD]} />
          <meshStandardMaterial map={stuccoSide} color="#d7d1c2" roughness={0.92} />
        </mesh>
        {/* storefront trim */}
        <Box args={[BW, 0.4, 0.25]} position={[0, BH - 0.2, BD / 2]} color="#3c4046" metalness={0.6} roughness={0.35} />
        <Box args={[BW, 0.4, 0.25]} position={[0, 0.5, BD / 2]} color="#3c4046" metalness={0.6} roughness={0.35} />
        {/* lit interior visible through the glazing */}
        <mesh position={[-3.2, 2.1, BD / 2 - 1.6]}>
          <boxGeometry args={[9.2, 3.4, 0.12]} />
          <meshStandardMaterial color="#fff3da" emissive="#ffe1a6" emissiveIntensity={0.85} />
        </mesh>
        {[-6.4, -4.4, -2.4, -0.4, 1.4].map((x, i) => (
          <Box key={`sh${i}`} args={[1.3, 2.0, 0.5]} position={[x, 1.35, BD / 2 - 0.95]} color={i % 2 ? "#8c8677" : "#7c766a"} roughness={0.9} />
        ))}
        <pointLight position={[-3.2, 3.2, BD / 2 - 1.0]} intensity={0.5} distance={9} color="#ffe8bd" />
        {/* storefront glass — reflective */}
        <mesh position={[-3.2, BH / 2 + 0.05, BD / 2 + 0.06]}>
          <boxGeometry args={[9.5, BH - 1.1, 0.1]} />
          <meshStandardMaterial color="#5d7c8c" transparent opacity={0.38} metalness={0.9} roughness={0.05} envMapIntensity={1.6} />
        </mesh>
        {/* entrance door within glazing */}
        <Box args={[0.08, BH - 1.3, 0.16]} position={[-0.15, BH / 2, BD / 2 + 0.12]} color="#2e3238" metalness={0.7} roughness={0.3} />
        <Box args={[0.08, BH - 1.3, 0.16]} position={[-1.45, BH / 2, BD / 2 + 0.12]} color="#2e3238" metalness={0.7} roughness={0.3} />
        <Box args={[1.4, 0.09, 0.14]} position={[-0.8, 1.85, BD / 2 + 0.13]} color="#c8ccd2" metalness={0.85} roughness={0.2} />
        {/* promo poster on the glass (USG-produced signage) */}
        <mesh position={[-5.6, 2.35, BD / 2 + 0.13]}>
          <planeGeometry args={[1.7, 1.15]} />
          <meshStandardMaterial map={poster} roughness={0.6} />
        </mesh>
        {/* dark tinted window (right of glazing) + awning */}
        <mesh position={[4.2, 1.9, BD / 2 + 0.1]}>
          <boxGeometry args={[3.2, 3.4, 0.16]} />
          <meshStandardMaterial color="#131c26" transparent opacity={0.85} metalness={0.85} roughness={0.08} envMapIntensity={1.4} />
        </mesh>
        <Box args={[3.5, 0.4, 0.2]} position={[4.2, 3.7, BD / 2 + 0.12]} color="#3c4046" metalness={0.6} roughness={0.35} />
        {/* mullions */}
        {Array.from({ length: 7 }).map((_, i) => (
          <Box key={`ml${i}`} args={[0.1, BH - 1.1, 0.13]} position={[(i - 6) * 1.35 - 0.3, BH / 2 + 0.05, BD / 2 + 0.1]} color="#2e3238" metalness={0.7} roughness={0.3} />
        ))}
        {/* illuminated fascia sign band */}
        <mesh position={[0, BH + 0.65, BD / 2 + 0.16]} castShadow>
          <boxGeometry args={[BW + 0.5, 1.5, 0.35]} />
          <meshStandardMaterial color={C.sevWhite} emissive="#fffaf0" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
        <Box args={[0.35, 1.5, BD + 0.5]} position={[-BW / 2 - 0.12, BH + 0.65, 0]} color={C.sevWhite} roughness={0.4} />
        <Box args={[0.35, 1.5, BD + 0.5]} position={[BW / 2 + 0.12, BH + 0.65, 0]} color={C.sevWhite} roughness={0.4} />
        <Box args={[BW + 0.5, 1.5, 0.35]} position={[0, BH + 0.65, -BD / 2 - 0.16]} color={C.sevWhite} roughness={0.4} />
        <TriStripe width={BW + 0.5} depthFront={BD / 2 + 0.35} position={[0, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, Math.PI / 2, 0]} position={[-BW / 2 - 0.3, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, -Math.PI / 2, 0]} position={[BW / 2 + 0.3, BH + 1.15, 0]} />
        <SevenLogo scale={1.15} position={[-4, BH + 0.7, BD / 2 + 0.36]} />
        {/* roof */}
        <mesh position={[0, BH + 0.2, 0]}>
          <boxGeometry args={[BW, 0.4, BD]} />
          <meshStandardMaterial map={roofTex} color="#b3afa4" roughness={1} />
        </mesh>
        {Array.from({ length: 3 }).map((_, i) => (
          <Box key={`hv${i}`} args={[1.5, 0.85, 1.5]} position={[-4.5 + i * 4.5, BH + 0.72, -2.5]} color="#9aa0a8" metalness={0.55} roughness={0.45} />
        ))}
        {/* building snaplock frames on the right exterior wall */}
        {[1.2, 2.6, 4.0].map((z, i) => (
          <group key={`snap${i}`} position={[BW / 2 + 0.24, 2.6, z]}>
            <Box args={[0.08, 1.35, 0.95]} color="#1c1f24" metalness={0.5} roughness={0.4} />
            <Box args={[0.06, 1.15, 0.78]} position={[0.04, 0, 0]} color={[C.sevRed, "#1e4f8f", C.sevOrange][i]} roughness={0.55} po={8} />
          </group>
        ))}
        {/* cigarette changeable display in the tinted window */}
        <mesh position={[4.7, 2.1, BD / 2 + 0.19]}>
          <planeGeometry args={[1.9, 1.2]} />
          <meshStandardMaterial map={cigTex} roughness={0.55} />
        </mesh>
        {/* side service glazing */}
        <Box args={[0.5, 3, 8]} position={[BW / 2 - 0.6, 1.6, -1]} color="#3c4046" metalness={0.6} roughness={0.35} />
        <mesh position={[BW / 2 - 0.85, 1.6, -1]}>
          <boxGeometry args={[0.15, 2.6, 7.6]} />
          <meshStandardMaterial color="#33454f" transparent opacity={0.6} metalness={0.85} roughness={0.08} envMapIntensity={1.4} />
        </mesh>
      </group>

      {/* ── FUEL CANOPY ──────────────────────────────────────── */}
      <group position={[-6, 0, 8.5]}>
        <Box args={[14, 0.7, 6.5]} position={[0, 5.4, 0]} color={C.sevWhite} roughness={0.45} />
        <mesh position={[0, 4.8, 3.25]} castShadow>
          <boxGeometry args={[14.2, 1.0, 0.22]} />
          <meshStandardMaterial color={C.sevWhite} emissive="#fffaf0" emissiveIntensity={0.3} roughness={0.4} />
        </mesh>
        <Box args={[14.2, 1.0, 0.22]} position={[0, 4.8, -3.25]} color={C.sevWhite} roughness={0.4} />
        <TriStripe width={14.2} depthFront={3.38} scaleY={0.6} position={[0, 5.05, 0]} />
        <SevenLogo scale={1.0} position={[0, 4.78, 3.4]} />
        {/* under-canopy downlights */}
        {([[-3.5, -1.4], [0.5, -1.4], [-3.5, 1.4], [0.5, 1.4], [4, 0]] as [number, number][]).map(([x, z], i) => (
          <mesh key={`dl${i}`} position={[x, 5.02, z]} rotation={[Math.PI, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.06, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#fff6dd" emissiveIntensity={1.4} />
          </mesh>
        ))}
        {cols.map(([x, z], i) => (
          <group key={`col${i}`}>
            <mesh position={[x, 2.35, z]} castShadow>
              <cylinderGeometry args={[0.38, 0.38, 4.7, 20]} />
              <meshStandardMaterial color="#e8e5de" metalness={0.3} roughness={0.4} />
            </mesh>
            <Box args={[1.1, 0.5, 1.1]} position={[x, 0.3, z]} color="#c22a1e" roughness={0.6} />
          </group>
        ))}
        {pumps.map(([x, z], i) => (
          <group key={`pump${i}`}>
            <mesh position={[x, 0.17, z]} receiveShadow>
              <boxGeometry args={[2.0, 0.35, 2.8]} />
              <meshStandardMaterial color="#cfccc2" roughness={0.85} />
            </mesh>
            <Box args={[1.05, 2.0, 0.72]} position={[x, 1.2, z]} color="#f2f0ea" metalness={0.35} roughness={0.35} />
            <Box args={[1.2, 0.6, 0.9]} position={[x, 2.3, z]} color={C.sevGreen} roughness={0.5} />
            {/* pump display screens (lit) */}
            <mesh position={[x, 1.45, z + 0.4]}>
              <boxGeometry args={[0.62, 0.6, 0.06]} />
              <meshStandardMaterial color="#0d1420" emissive="#3d70c4" emissiveIntensity={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[x, 1.45, z - 0.4]}>
              <boxGeometry args={[0.62, 0.6, 0.06]} />
              <meshStandardMaterial color="#0d1420" emissive="#3d70c4" emissiveIntensity={0.9} roughness={0.2} />
            </mesh>
            {/* nozzles + hoses */}
            <Box args={[0.16, 0.3, 0.14]} position={[x + 0.62, 1.35, z + 0.2]} color="#1c1c1c" roughness={0.6} />
            <Box args={[0.16, 0.3, 0.14]} position={[x - 0.62, 1.35, z - 0.2]} color="#1c1c1c" roughness={0.6} />
            <Cyl args={[0.035, 0.035, 0.9]} position={[x + 0.6, 1.0, z + 0.22]} color="#222222" />
            <Cyl args={[0.035, 0.035, 0.9]} position={[x - 0.6, 1.0, z - 0.22]} color="#222222" />
          </group>
        ))}
      </group>

      {/* ── PYLON SIGN ───────────────────────────────────────── */}
      <group position={[-24, 0, 19]} rotation={[0, 0.6, 0]}>
        <Cyl args={[0.3, 0.3, 6.8, 20]} position={[0, 3.4, 0]} color="#4a4f57" />
        <mesh position={[0, 7.3, 0]} castShadow>
          <boxGeometry args={[3.2, 3.4, 0.55]} />
          <meshStandardMaterial color={C.sevWhite} emissive="#fffaf0" emissiveIntensity={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 8.0, 0.3]}>
          <boxGeometry args={[2.8, 1.6, 0.12]} />
          <meshStandardMaterial color={C.sevGreen} emissive={C.sevGreen} emissiveIntensity={0.35} />
        </mesh>
        <Box args={[0.66, 1.12, 0.14]} position={[-0.5, 8.0, 0.36]} color={C.sevRed} />
        <Box args={[2.8, 0.22, 0.13]} position={[0, 7.05, 0.3]} color={C.sevOrange} />
        <mesh position={[0, 6.35, 0.3]}>
          <boxGeometry args={[2.8, 1.05, 0.12]} />
          <meshStandardMaterial color={C.sevRed} emissive={C.sevRed} emissiveIntensity={0.3} />
        </mesh>
        <Box args={[2.3, 0.62, 0.1]} position={[0, 6.35, 0.37]} color={C.sevWhite} />
      </group>

      {/* feather flags */}
      {([[14.5, 14], [13.6, 14.7], [15.4, 14.7]] as [number, number][]).map(([x, z], i) => (
        <group key={`flag${i}`}>
          <Cyl args={[0.05, 0.05, 4.2, 12]} position={[x, 2.1, z]} color="#c9ccd1" />
          <Box args={[0.08, 2.5, 0.95]} position={[x, 3.2, z + 0.5]} rotation={[0, 0.1, 0]} color={[C.sevGreen, C.sevRed, C.sevOrange][i]} roughness={0.75} />
        </group>
      ))}

      {/* sidewalk A-frame */}
      <group position={[3.2, 0, 5.8]} rotation={[0, -0.35, 0]}>
        <group rotation={[-0.26, 0, 0]} position={[0, 0, 0.42]}>
          <Box args={[1.3, 1.6, 0.06]} position={[0, 0.8, 0]} color="#3c4046" metalness={0.6} roughness={0.35} />
          <Box args={[1.08, 1.42, 0.04]} position={[0, 0.8, 0.05]} color={C.sevOrange} po={6} />
          <Box args={[1.0, 0.28, 0.05]} position={[0, 1.3, 0.07]} color={C.sevWhite} po={8} />
          <Box args={[0.78, 0.5, 0.05]} position={[0, 0.672, 0.07]} color={C.sevRed} po={8} />
        </group>
        <group rotation={[0.26, 0, 0]} position={[0, 0, -0.42]}>
          <Box args={[1.3, 1.6, 0.06]} position={[0, 0.8, 0]} color="#3c4046" metalness={0.6} roughness={0.35} />
          <Box args={[1.08, 1.42, 0.04]} position={[0, 0.8, -0.05]} color={C.sevGreen} po={6} />
        </group>
        <Box args={[1.34, 0.14, 0.5]} position={[0, 1.6 * Math.cos(0.26), 0]} color="#3c4046" metalness={0.6} roughness={0.35} />
      </group>

      {/* ── TRIANGLE BOLLARD (pump-to-door walkway) ──────── */}
      <group position={[-7.5, 0, 7.5]}>
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

      {/* ── ICE MERCHANDISER (front of store) ──────────── */}
      <group position={[-8.5, 0, 3.4]}>
        <Box args={[2.2, 1.7, 1.3]} position={[0, 0.85, 0]} color="#f4f3ef" roughness={0.5} />
        <Box args={[2.2, 0.4, 0.06]} position={[0, 1.85, 0.63]} color="#e8e6e0" roughness={0.5} />
        <Box args={[0.55, 0.7, 0.06]} position={[-0.7, 0.85, 0.66]} color="#c22a1e" roughness={0.6} />
        <Box args={[0.55, 0.7, 0.06]} position={[0.05, 0.85, 0.66]} color="#c22a1e" roughness={0.6} />
        <Box args={[0.55, 0.7, 0.06]} position={[0.8, 0.85, 0.66]} color="#1e4f8f" roughness={0.6} />
        <Box args={[0.9, 0.55, 0.05]} position={[0.6, 1.45, 0.65]} color="#1e4f8f" roughness={0.6} />
      </group>
    </group>
  );
}

/* ============================= INTERIOR SCENE (open-air cutaway) ============================= */
function InteriorScene() {
  const RW = 22, RD = 16, RH = 5.8, WALL = 2.2;
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
      {/* RIGHT WALL: reach-in coolers + beer cave */}
      {Array.from({ length: 6 }).map((_, i) => {
        const z = 5.5 - i * 1.4;
        return (<group key={`ri${i}`}>
          <Box args={[0.5, 4.2, 1.3]} position={[RW / 2 - 0.6, 2.2, z]} color={C.dkmetal} />
          <Box args={[0.14, 3.7, 1.15]} position={[RW / 2 - 0.88, 2.2, z]} color={C.sky} transparent opacity={0.5} metalness={0.4} />
          <Box args={[0.16, 0.5, 1.2]} position={[RW / 2 - 0.9, 4.0, z]} color={C.sevWhite} />
        </group>);
      })}
      <Box args={[0.5, 4.6, 5]} position={[RW / 2 - 0.6, 2.3, -4.5]} color={C.steel} />
      <Box args={[0.16, 4, 4.6]} position={[RW / 2 - 0.9, 2.0, -4.5]} color={C.skyDark} transparent opacity={0.45} metalness={0.4} />
      <Box args={[3.4, 1.0, 0.5]} position={[RW / 2 - 2, 4.7, -4.5]} color={C.sevGreen} />
      <Box args={[3.0, 0.55, 0.52]} position={[RW / 2 - 2, 4.7, -4.5]} color={C.sevWhite} />
      {/* BACK WALL: slurpee / fountain / coffee / grill */}
      <group position={[-5, 0, -RD / 2 + 1.4]}>
        <Box args={[2.6, 2.4, 1.5]} position={[0, 1.2, 0]} color={C.steel} />
        <Box args={[2.6, 1.0, 1.5]} position={[0, 2.9, 0]} color={C.sevRed} />
        <Box args={[2.2, 0.6, 0.08]} position={[0, 2.9, 0.77]} color={C.sevWhite} />
        {[-0.7, 0, 0.7].map((x, i) => (<Cyl key={i} args={[0.16, 0.16, 0.5]} position={[x, 1.7, 0.8]} color={C.dkmetal} />))}
      </group>
      <group position={[-1, 0, -RD / 2 + 1.4]}>
        <Box args={[3.2, 2.2, 1.4]} position={[0, 1.1, 0]} color={C.sevWhite} />
        <Box args={[3.2, 1.0, 1.4]} position={[0, 2.7, 0]} color={C.sevGreen} />
        <Box args={[2.9, 0.55, 0.08]} position={[0, 2.7, 0.73]} color={C.sevWhite} />
        {Array.from({ length: 6 }).map((_, i) => (<Box key={i} args={[0.26, 0.5, 0.18]} position={[-1.1 + i * 0.44, 1.55, 0.74]} color={C.sevRed} />))}
      </group>
      <group position={[3.5, 0, -RD / 2 + 1.4]}>
        <Box args={[3, 1.1, 1.4]} position={[0, 0.55, 0]} color={C.wood} />
        {Array.from({ length: 4 }).map((_, i) => (<Cyl key={i} args={[0.22, 0.18, 0.65]} position={[-1 + i * 0.66, 1.45, 0]} color={C.coffee} />))}
        <Box args={[3, 0.95, 0.12]} position={[0, 2.7, 0.55]} color={C.coffee} />
      </group>
      <group position={[7, 0, -RD / 2 + 1.4]}>
        <Box args={[2.4, 1.1, 1.4]} position={[0, 0.7, 0]} color={C.steel} />
        <Box args={[2.2, 0.45, 1.2]} position={[0, 1.45, 0]} color="#8a5a2a" />
        <Box args={[2.6, 1.3, 0.16]} position={[0, 3.3, 0.5]} color={C.navyDark} />
        <Box args={[2.3, 1.05, 0.1]} position={[0, 3.3, 0.6]} color={C.sevWhite} />
      </group>
      {/* CENTER: gondola aisles + products + endcap */}
      {Array.from({ length: 3 }).map((_, a) => {
        const gx = -3 + a * 3;
        return (<group key={`g${a}`}>
          <Box args={[2.2, 1.6, 7]} position={[gx, 0.8, 0]} color={C.offwhite} roughness={0.7} />
          {Array.from({ length: 3 }).map((_, s) => (<Box key={s} args={[2.3, 0.1, 0.05]} position={[gx, 0.55 + s * 0.45, 3.62]} color={[C.sevRed, C.sevGreen, C.sevOrange][s]} metalness={0} />))}
          {Array.from({ length: 3 }).map((_, r) => Array.from({ length: 5 }).map((_, cc) => (<Box key={`${r}-${cc}`} args={[0.32, 0.28, 0.18]} position={[gx - 0.9 + cc * 0.45, 0.7 + r * 0.45, 3.66]} color={["#dd2233", "#22aa77", "#ffaa33", "#3377bb", "#99bb33"][cc]} />)))}
        </group>);
      })}
      <Box args={[2.0, 1.5, 1.0]} position={[-3, 0.85, 4.4]} color={C.sevOrange} />
      {/* FRONT-LEFT: counter + tobacco backbar + impulse */}
      <group position={[-RW / 2 + 2.6, 0, RD / 2 - 3]}>
        <Box args={[1.6, 1.1, 7]} position={[0, 0.7, 0]} color={C.wood} />
        <Box args={[0.1, 1.1, 7]} position={[0.82, 0.7, 0]} color={C.sevWhite} />
        <Box args={[0.5, 3.2, 7]} position={[-1.0, 2.6, 0]} color={C.beige} />
        <Box args={[0.12, 2.6, 6.4]} position={[-0.7, 2.6, 0]} color={C.dkmetal} />
        <Box args={[0.14, 0.45, 6.4]} position={[-0.65, 3.8, 0]} color={C.sevRed} />
        <Box args={[1.4, 1.3, 1.0]} position={[0, 0.95, 3]} color={C.sevGreen} />
      </group>
      {/* lottery + ATM */}
      <group position={[-RW / 2 + 3.5, 0, RD / 2 - 1.5]}>
        <Box args={[1.4, 1.6, 0.8]} position={[0, 0.8, 0]} color={C.sevWhite} />
        <Box args={[1.2, 0.5, 0.12]} position={[0, 1.75, 0.42]} color={C.sevOrange} />
        <Box args={[1, 1.7, 0.8]} position={[1.8, 0.85, 0]} color={C.dkmetal} />
      </group>
      {/* floor graphic */}
      <Box args={[2.6, 0.32, 2.6]} position={[0, 0.02, 4.5]} color={C.sevGreen} roughness={0.5} />
      <Box args={[2.0, 0.33, 2.0]} position={[0, 0.03, 4.5]} color={C.sevWhite} roughness={0.5} />

      {/* standee at the entrance */}
      <group position={[-5.5, 0, 6.2]} rotation={[0, 0.35, 0]}>
        <Box args={[0.95, 1.7, 0.4]} position={[0, 0.85, 0]} color={C.sevOrange} roughness={0.6} />
        <Box args={[0.8, 0.5, 0.42]} position={[0, 1.45, 0]} color={C.sevWhite} roughness={0.6} po={6} />
        <Box args={[1.05, 0.28, 0.44]} position={[0, 1.85, 0]} color={C.sevGreen} roughness={0.6} />
      </group>

      {/* wobblers on the right gondola */}
      {[1.0, 1.45, 1.9].map((y, i) => (
        <group key={`wob${i}`} position={[3 + (i - 1) * 0.8, y, 3.66]}>
          <Box args={[0.02, 0.02, 0.3]} position={[0, 0, 0.15]} color="#d5d5d5" />
          <Box args={[0.32, 0.26, 0.02]} position={[0, -0.1, 0.32]} color={[C.sevRed, C.sevOrange, "#1e4f8f"][i]} roughness={0.5} />
        </group>
      ))}

      {/* cooler strips on the reach-in shelf channels */}
      {[0.9, 1.5, 2.1].map((y, i) => (
        <Box key={`cs${i}`} args={[0.05, 0.14, 1.15]} position={[RW / 2 - 0.92, y, -1]} color={C.marigold} roughness={0.5} />
      ))}

      {/* dispense beverage translite (lit) between frozen + fountain stations */}
      <mesh position={[-3, 3.5, -RD / 2 + 1.45]}>
        <boxGeometry args={[2.4, 0.85, 0.12]} />
        <meshStandardMaterial color="#eaf4ff" emissive="#bcd9ff" emissiveIntensity={0.9} roughness={0.3} />
      </mesh>

      {/* napkin dispenser with promo insert on the foodservice counter */}
      <group position={[2.5, 1.35, -5.4]}>
        <Box args={[0.32, 0.6, 0.28]} position={[0, 0.3, 0]} color="#141414" roughness={0.4} />
        <Box args={[0.24, 0.42, 0.02]} position={[0, 0.32, 0.15]} color={C.sevRed} roughness={0.5} />
      </group>
    </group>
  );
}

/* ============================= PINS (pulse + occlusion + click) ============================= */
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
        m.color.set(foundSet.has(i) ? C.sky : C.marigold);
      }
      if (stem) { const m = stem.material as THREE.MeshBasicMaterial; m.opacity = o; m.transparent = true; }
    });
  });

  return (
    <group ref={groupRef}>
      {list.map((h, i) => (
        <group key={h.id} position={h.pos}>
          <mesh name="stem" position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshBasicMaterial color={C.marigold} transparent />
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
            <meshBasicMaterial color={C.marigold} transparent />
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

/* ============================= SCENE CONTROLLER ============================= */
const CAM = {
  exterior: { pos: [20, 13, 26] as Vec3, target: [0, 2.5, 2] as Vec3, min: 12, max: 46, minP: 0.2, maxP: 1.45 },
  interior: { pos: [0, 16, 18] as Vec3, target: [0, 1.2, -0.5] as Vec3, min: 8, max: 38, minP: 0.15, maxP: 1.2 },
};

function Scene({ mode, foundSet, onPick }: { mode: "exterior" | "interior"; foundSet: Set<number>; onPick: (h: Hotspot, i: number) => void }) {
  const sceneRoot = useRef<THREE.Group>(null);
  const list = mode === "exterior" ? EXTERIOR_HOTSPOTS : INTERIOR_HOTSPOTS;
  return (
    <>
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
  const [foundExt] = useState(() => new Set<number>());
  const [foundInt] = useState(() => new Set<number>());
  const [, force] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    force((n) => n + 1);
  }, [foundSet]);

  const switchMode = (m: "exterior" | "interior") => {
    if (m === mode) return;
    setActive(null);
    setMode(m);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "78vh", minHeight: 520, background: "#0e1830", borderRadius: 16, overflow: "hidden" }}>
      <Canvas key={mode} shadows camera={{ position: CAM[mode].pos, fov: 42 }} gl={{ antialias: true }} dpr={[1, 2]}>
        <Scene mode={mode} foundSet={foundSet} onPick={onPick} />
      </Canvas>

      {/* top overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: isMobile ? "16px 16px" : "20px 24px", pointerEvents: "none", background: "linear-gradient(180deg, rgba(0,10,30,0.85) 0%, rgba(0,10,30,0) 100%)" }}>
        <div style={{ fontSize: isMobile ? 10 : 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.marigold, fontWeight: 600 }}>
          Interactive Showroom · {mode === "exterior" ? "Exterior" : "Interior"}
        </div>
        <div style={{ fontSize: isMobile ? 20 : "clamp(22px,3vw,34px)", color: "#fff", fontWeight: 800, lineHeight: 1.05, marginTop: 4 }}>
          Signage lives <em style={{ fontStyle: "italic", fontWeight: 400, color: C.marigold }}>everywhere.</em>
        </div>
        <div style={{ marginTop: 8, fontSize: isMobile ? 11 : 13, color: "rgba(255,255,255,0.7)" }}>Drag to orbit · scroll to zoom · tap a glowing pin to explore</div>

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
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, textAlign: "right" }}>
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
        <div style={{ position: "absolute", top: 72, right: 24, color: "rgba(255,255,255,0.55)", fontSize: 12, textAlign: "right", pointerEvents: "none" }}>
          <b style={{ color: C.marigold, fontSize: 22, display: "block", fontWeight: 800 }}>{foundSet.size}</b>/{list.length} explored
        </div>
      )}

      {/* info panel */}
      <aside style={{
        position: "absolute", top: 0, right: 0, height: "100%", width: "min(400px,88%)", background: C.offwhite,
        transform: active ? "translateX(0)" : "translateX(100%)", transition: "transform .42s cubic-bezier(.16,1,.3,1)",
        display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.3)", zIndex: 10,
      }}>
        {active && (
          <>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#222", overflow: "hidden", flexShrink: 0 }}>
              <span style={{ position: "absolute", top: 14, left: 14, background: C.marigold, color: C.navyDark, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 999, zIndex: 2 }}>{active.cat}</span>
              <button onClick={() => setActive(null)} style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, border: "none", borderRadius: "50%", background: "rgba(0,10,30,0.85)", color: "#fff", fontSize: 18, cursor: "pointer", zIndex: 2 }}>×</button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {active.placeholder && (
                <span style={{ position: "absolute", bottom: 10, left: 14, right: 14, background: "rgba(0,10,30,0.85)", color: "#fff", fontSize: 11, padding: "5px 10px", borderRadius: 6 }}>Representative photo — actual fixture image coming soon</span>
              )}
            </div>
            <div style={{ padding: "22px 26px", overflowY: "auto", flex: 1 }}>
              <h2 style={{ fontSize: 23, fontWeight: 800, color: C.navy, lineHeight: 1.1 }}>{active.title}</h2>
              <div style={{ fontSize: 13, color: C.skyDark, fontWeight: 600, marginTop: 4 }}>📍 {active.loc}</div>
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
