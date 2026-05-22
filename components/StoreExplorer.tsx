"use client";

/**
 * StoreExplorer — interactive 3D 7-Eleven showroom.
 * Phase 2: exterior + interior scenes, 21 hotspot pins, info panel,
 * Outside/Inside toggle, HUD (reset / guided tour / pin counter).
 *
 * NOTE: 6 interior hotspots use closest-match placeholder photos
 * (slurpee, fountain, coffee, checkout, lottery, floorgfx) — these
 * need real fixture photography from the client. Flagged with `placeholder: true`.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState, useCallback } from "react";
import * as THREE from "three";

/* ============================= palette ============================= */
const C = {
  navy: "#1B2D5E", navyDark: "#142248", marigold: "#EFA51E", marigoldDark: "#C8830A", sky: "#5CB8E4", skyDark: "#3A9DCC", offwhite: "#F5F4F0",
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
  { id: "pylon", cat: "Pylon", title: "Roadside Pylon Sign", loc: "Lot entrance", pos: [-17, 9.8, 16], desc: "The tall freestanding sign that pulls drivers off the road — fuel pricing, brand marks, and promotions visible from a distance.", usg: "USG fabricates and installs illuminated pylon faces and price-pole inserts, surveyed to your exact cabinet dimensions.", img: `${IMG}/marlboro-gas-pump-promo.webp` },
  { id: "pump", cat: "Gas Pump", title: "Pump Topper Graphics", loc: "Fuel island", pos: [-1.8, 3.0, 8.5], desc: "High-dwell-time advertising right at the pump — drivers stare at this for 3-5 minutes per fill.", usg: "USG produces weatherproof pump-topper inserts and dispenser wraps that snap into standard frames.", img: `${IMG}/gas-pump-celsius-topper.webp` },
  { id: "window", cat: "Storefront", title: "Window Clings", loc: "Storefront glass", pos: [-1.2, 2.6, 4.7], desc: "Promotional clings and price callouts on entrance doors and front glass — the last message before a customer walks in.", usg: "USG prints removable static and adhesive clings, die-cut to any shape, with easy seasonal swap-out.", img: `${IMG}/storefront-promo-window-cling.webp` },
  { id: "aframe", cat: "A-Frame", title: "Sidewalk A-Frame", loc: "Entrance walkway", pos: [6.5, 2.0, 5.4], desc: "Portable sidewalk boards that capture foot traffic with daily specials.", usg: "USG supplies durable A-frame hardware with printed, swappable insert panels.", img: `${IMG}/brunch-a-frame-sandwich-board.webp` },
  { id: "flag", cat: "Flag", title: "Feather Flags", loc: "Lot perimeter", pos: [-13, 3.8, 15.5], desc: "Tall feather and blade flags that create motion and draw eyes from the road.", usg: "USG prints feather flags in multiple formats with poles, bases, and ground stakes.", img: `${IMG}/feather-flag-circle-k-hot-food2.webp` },
];
const INTERIOR_HOTSPOTS: Hotspot[] = [
  { id: "beercave_h", cat: "Cooler Graphics", title: "Beer Cave Header", loc: "Walk-in cooler entrance", pos: [8.5, 4.0, -4.5], desc: "The lit header band above the walk-in beer cave — a category destination cue visible across the store.", usg: "USG builds illuminated beer-cave headers and entry surrounds, sized to the opening.", img: `${IMG}/corona-find-your-beach-beer-cave.webp` },
  { id: "beercave_d", cat: "Cooler Graphics", title: "Beer Cave Door Decals", loc: "Walk-in cooler doors", pos: [8.3, 2.2, -3], desc: "Full-height decals on the glass cave doors that merchandise brands and promos.", usg: "USG produces door-sized cling and adhesive decals, planogram-accurate, easy to swap.", img: `${IMG}/cooler-doors-promotional-graphics.webp` },
  { id: "reachin", cat: "Cooler Graphics", title: "Reach-In Cooler Doors", loc: "Beverage wall", pos: [8.3, 3.0, 3], desc: "The wall of reach-in glass doors — turned into branded merchandising with full-door graphics.", usg: "USG prints reach-in door wraps and handle-rail signage across the cooler run.", img: `${IMG}/cooler-doors-promotional-graphics2.webp` },
  { id: "slurpee", cat: "Beverage", title: "Slurpee Machine Topper", loc: "Frozen drink station", pos: [-5, 3.4, -6.5], desc: "The iconic frozen-drink machine — topper graphics, flavor tags, and the Slurpee brand crown.", usg: "USG produces machine toppers, flavor-strip inserts, and surround graphics for frozen and dispensed drinks.", img: `${IMG}/iced-coffee-dispenser.webp`, placeholder: true },
  { id: "fountain", cat: "Beverage", title: "Big Gulp Fountain", loc: "Fountain drink station", pos: [-1, 3.2, -6.5], desc: "The Big Gulp fountain wall — cup-size callouts, flavor branding, and overhead category signage.", usg: "USG prints fountain valance graphics, cup-size guides, and dispenser branding.", img: `${IMG}/iced-coffee-dispenser2.webp`, placeholder: true },
  { id: "coffee", cat: "Beverage", title: "Coffee Bar Signage", loc: "Hot beverage station", pos: [3.5, 3.2, -6.5], desc: "The self-serve coffee bar — overhead menu, flavor tags, and price callouts.", usg: "USG produces coffee-bar valances, menu panels, and condiment-station signage.", img: `${IMG}/iced-coffee-dispenser3.webp`, placeholder: true },
  { id: "grill", cat: "Menu Board", title: "Roller Grill / Hot Food Menu", loc: "Foodservice counter", pos: [7, 3.8, -6.3], desc: "The hot-food program signage — roller grill menus, combo deals, and LTO callouts.", usg: "USG designs and prints hot-food menus and provides modular rail systems for fast updates.", img: `${IMG}/hot-dog-combo-menu-signs.webp` },
  { id: "suspended", cat: "Menu Board", title: "Suspended Category Signage", loc: "Ceiling, center store", pos: [0, 4.6, -1], desc: "Ceiling-hung category and wayfinding signage that floats above the aisles.", usg: "USG fabricates suspended sign blades with hanging hardware rated for your ceiling type.", img: `${IMG}/suspended-menu-board.webp` },
  { id: "shelf", cat: "Shelf Talker", title: "Gondola Shelf Talkers", loc: "Center aisles", pos: [0, 1.7, 3.6], desc: "Price and promo flags clipped to shelf edges — the workhorse of in-aisle merchandising.", usg: "USG prints shelf-edge talkers, wobblers, and channel strips in bulk with quick reorder.", img: `${IMG}/coke-pepsi-shelf-talkers.webp` },
  { id: "endcap", cat: "Floor Display", title: "Endcap Floor Display", loc: "Aisle endcap", pos: [-3, 2.0, 4.4], desc: "Freestanding point-of-purchase displays that command floor space at endcaps.", usg: "USG produces corrugated and permanent floor displays, shipped flat or pre-assembled.", img: `${IMG}/vuex-pop-floor-display.webp` },
  { id: "checkout", cat: "Counter", title: "Checkout & Impulse Signage", loc: "Front counter", pos: [-8.4, 2.2, 5], desc: "The counter zone — impulse racks, register toppers, and age-verification signage.", usg: "USG prints counter mats, register toppers, impulse-rack headers, and compliance signage.", img: `${IMG}/karma-wellness-poster-frame.webp`, placeholder: true },
  { id: "backbar", cat: "Tobacco", title: "Tobacco Backbar", loc: "Behind front counter", pos: [-9.5, 3.6, 5], desc: "The regulated tobacco fixture behind the register — pricing, brand headers, and compliance.", usg: "USG produces backbar headers, price channels, and FDA-compliant tobacco signage.", img: `${IMG}/marlboro-gas-pump-promo.webp` },
  { id: "lottery", cat: "Counter", title: "Lottery & ATM Signage", loc: "Front counter end", pos: [-7.5, 2.0, 6.5], desc: "Lottery dispensers, jackpot callouts, and ATM/financial-services signage at the counter.", usg: "USG prints lottery toppers, jackpot inserts, and ATM/service decals.", img: `${IMG}/marlboro-gas-pump-promo2.webp` },
  { id: "floorgfx", cat: "Floor Display", title: "Floor Graphics", loc: "Main aisle", pos: [0, 0.4, 4.5], desc: "Walk-on floor decals for wayfinding, promotions, and brand moments underfoot.", usg: "USG prints anti-slip floor graphics rated for high-traffic retail environments.", img: `${IMG}/vuex-pop-floor-display.webp`, placeholder: true },
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

/* ============================= EXTERIOR SCENE ============================= */
function ExteriorScene() {
  const BW = 17, BH = 4.6, BD = 11;
  const cols: [number, number][] = [[-6, -2.4], [6, -2.4], [-6, 2.4], [6, 2.4]];
  const pumps: [number, number][] = [[-4.2, 0], [0, 0], [4.2, 0]];
  return (
    <group>
      <mesh position={[0, -0.2, 0]} receiveShadow><boxGeometry args={[54, 0.4, 42]} /><meshStandardMaterial color={C.asphalt} roughness={0.95} /></mesh>
      {Array.from({ length: 7 }).map((_, i) => (<Box key={`p${i}`} args={[0.12, 0.02, 3.4]} position={[3 + i * 1.9, 0.02, 9.5]} color="#d8d3c0" />))}
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
        {Array.from({ length: 7 }).map((_, i) => (<Box key={`ml${i}`} args={[0.1, BH - 1.1, 0.13]} position={[(i - 6) * 1.35 - 0.3, BH / 2 + 0.05, BD / 2 + 0.1]} color={C.dkmetal} />))}
        <Box args={[BW + 0.5, 1.5, 0.35]} position={[0, BH + 0.65, BD / 2 + 0.16]} color={C.sevWhite} />
        <Box args={[0.35, 1.5, BD + 0.5]} position={[-BW / 2 - 0.12, BH + 0.65, 0]} color={C.sevWhite} />
        <Box args={[0.35, 1.5, BD + 0.5]} position={[BW / 2 + 0.12, BH + 0.65, 0]} color={C.sevWhite} />
        <Box args={[BW + 0.5, 1.5, 0.35]} position={[0, BH + 0.65, -BD / 2 - 0.16]} color={C.sevWhite} />
        <TriStripe width={BW + 0.5} depthFront={BD / 2 + 0.35} position={[0, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, Math.PI / 2, 0]} position={[-BW / 2 - 0.3, BH + 1.15, 0]} />
        <TriStripe width={BD + 0.5} depthFront={0} rotation={[0, -Math.PI / 2, 0]} position={[BW / 2 + 0.3, BH + 1.15, 0]} />
        <SevenLogo scale={1.15} position={[-4, BH + 0.7, BD / 2 + 0.36]} />
        <Box args={[BW, 0.4, BD]} position={[0, BH + 0.2, 0]} color={C.roof} />
        {Array.from({ length: 3 }).map((_, i) => (<Box key={`hv${i}`} args={[1.5, 0.85, 1.5]} position={[-4.5 + i * 4.5, BH + 0.72, -2.5]} color={C.steel} />))}
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
            <mesh position={[x, 2.35, z]} rotation={[0, Math.PI / 6, 0]} castShadow><cylinderGeometry args={[0.45, 0.45, 4.7, 3]} /><meshStandardMaterial color={C.sevWhite} roughness={0.8} /></mesh>
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
      <group position={[-17, 0, 16]}>
        <Cyl args={[0.3, 0.3, 6.8]} position={[0, 3.4, 0]} color={C.dkmetal} />
        <Box args={[3.2, 3.4, 0.55]} position={[0, 7.3, 0]} color={C.sevWhite} />
        <Box args={[2.8, 1.6, 0.12]} position={[0, 8.0, 0.3]} color={C.sevGreen} />
        <Box args={[0.66, 1.12, 0.14]} position={[-0.5, 8.0, 0.36]} color={C.sevRed} />
        <Box args={[2.8, 0.22, 0.13]} position={[0, 7.05, 0.3]} color={C.sevOrange} />
        <Box args={[2.8, 1.05, 0.12]} position={[0, 6.35, 0.3]} color={C.sevRed} />
        <Box args={[2.3, 0.62, 0.1]} position={[0, 6.35, 0.37]} color={C.sevWhite} />
      </group>
      {([[-13, 15], [-13.9, 15.7], [-12.1, 15.7]] as [number, number][]).map(([x, z], i) => (
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

/* ============================= INTERIOR SCENE (open-air cutaway) ============================= */
function InteriorScene() {
  const RW = 22, RD = 16, RH = 5.8, WALL = 2.2;
  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow><boxGeometry args={[RW, 0.3, RD]} /><meshStandardMaterial color={C.floor} roughness={0.6} /></mesh>
      {Array.from({ length: 9 }).map((_, i) => (<Box key={`ft${i}`} args={[0.05, 0.31, RD]} position={[(i - 4) * 2.4, 0.01, 0]} color={C.floorDk} roughness={0.6} />))}
      {Array.from({ length: 7 }).map((_, i) => (<Box key={`led${i}`} args={[0.5, 0.08, RD - 2]} position={[(i - 3) * 3, RH - 0.4, 0]} color="#ffffff" metalness={0} roughness={0.3} />))}
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
      {/* suspended blades */}
      {([[-5, -1], [0, -1], [5, -1], [-2.5, 3], [2.5, 3]] as [number, number][]).map(([x, z], i) => (
        <group key={`sb${i}`}>
          <Cyl args={[0.02, 0.02, 1]} position={[x, RH - 0.7, z]} color="#999999" />
          <Box args={[2.0, 0.7, 0.1]} position={[x, RH - 1.25, z]} color={C.sevRed} />
        </group>
      ))}
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
            <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
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
            <sphereGeometry args={[0.26, 20, 20]} />
            <meshBasicMaterial color={C.marigold} transparent />
          </mesh>
          <mesh name="ring">
            <ringGeometry args={[0.32, 0.44, 24]} />
            <meshBasicMaterial color={C.sky} transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ============================= SCENE CONTROLLER ============================= */
const CAM = {
  exterior: { pos: [22, 14, 22] as Vec3, target: [-1, 3, 0] as Vec3, min: 12, max: 40, minP: 0.2, maxP: 1.45 },
  interior: { pos: [0, 16, 18] as Vec3, target: [0, 1.2, -0.5] as Vec3, min: 8, max: 38, minP: 0.15, maxP: 1.2 },
};

function Scene({ mode, foundSet, onPick }: { mode: "exterior" | "interior"; foundSet: Set<number>; onPick: (h: Hotspot, i: number) => void }) {
  const sceneRoot = useRef<THREE.Group>(null);
  const list = mode === "exterior" ? EXTERIOR_HOTSPOTS : INTERIOR_HOTSPOTS;
  return (
    <>
      <color attach="background" args={["#0e1830"]} />
      <fog attach="fog" args={["#0e1830", 42, 90]} />
      <ambientLight intensity={0.52} color="#bfd0ff" />
      <directionalLight position={[-14, 20, 12]} intensity={1.2} color="#fff0d8" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-left={-28} shadow-camera-right={28} shadow-camera-top={28} shadow-camera-bottom={-28}
        shadow-camera-near={1} shadow-camera-far={70} />
      <directionalLight position={[16, 12, -10]} intensity={0.38} color="#6f8fff" />
      <directionalLight position={[0, 8, -16]} intensity={0.28} color="#EFA51E" />
      <pointLight position={[0, 7, 0]} intensity={0.5} distance={40} />
      <group ref={sceneRoot}>{mode === "exterior" ? <ExteriorScene /> : <InteriorScene />}</group>
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

/* ============================= MAIN COMPONENT (overlay UI) ============================= */
export default function StoreExplorer() {
  const [mode, setMode] = useState<"exterior" | "interior">("exterior");
  const [active, setActive] = useState<Hotspot | null>(null);
  const [foundExt] = useState(() => new Set<number>());
  const [foundInt] = useState(() => new Set<number>());
  const [, force] = useState(0);

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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 24px", pointerEvents: "none", background: "linear-gradient(180deg, rgba(20,34,72,0.8) 0%, rgba(20,34,72,0) 100%)" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.sky, fontWeight: 600 }}>
          Interactive Showroom · {mode === "exterior" ? "Exterior" : "Interior"}
        </div>
        <div style={{ fontSize: "clamp(22px,3vw,34px)", color: "#fff", fontWeight: 800, lineHeight: 1.05, marginTop: 4 }}>
          Signage lives <em style={{ fontStyle: "italic", fontWeight: 400, color: C.marigold }}>everywhere.</em>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Drag to orbit · scroll to zoom · tap a glowing pin to explore</div>
      </div>

      {/* mode toggle */}
      <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", display: "flex", background: "rgba(20,34,72,0.78)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 5, border: "1px solid rgba(92,184,228,0.3)", zIndex: 6 }}>
        {(["exterior", "interior"] as const).map((m) => (
          <button key={m} onClick={() => switchMode(m)} style={{
            background: mode === m ? C.marigold : "transparent", color: mode === m ? C.navyDark : "rgba(255,255,255,0.65)",
            border: "none", fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 999, cursor: "pointer", transition: ".25s",
          }}>{m === "exterior" ? "Outside" : "Inside"}</button>
        ))}
      </div>

      {/* counter */}
      <div style={{ position: "absolute", top: 72, right: 24, color: "rgba(255,255,255,0.55)", fontSize: 12, textAlign: "right", pointerEvents: "none" }}>
        <b style={{ color: C.marigold, fontSize: 22, display: "block", fontWeight: 800 }}>{foundSet.size}</b>/{list.length} explored
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
              <span style={{ position: "absolute", top: 14, left: 14, background: C.marigold, color: C.navyDark, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 999, zIndex: 2 }}>{active.cat}</span>
              <button onClick={() => setActive(null)} style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, border: "none", borderRadius: "50%", background: "rgba(20,34,72,0.85)", color: "#fff", fontSize: 18, cursor: "pointer", zIndex: 2 }}>×</button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {active.placeholder && (
                <span style={{ position: "absolute", bottom: 10, left: 14, right: 14, background: "rgba(20,34,72,0.85)", color: "#fff", fontSize: 11, padding: "5px 10px", borderRadius: 6 }}>Representative photo — actual fixture image coming soon</span>
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
