"use client";

const SHAPES = [
  { type: "circle", size: 42, x: 7,  y: 18, dur: 12, delay: 0,   op: 0.06 },
  { type: "circle", size: 16, x: 24, y: 62, dur: 18, delay: -3,  op: 0.08 },
  { type: "square", size: 20, x: 73, y: 14, dur: 14, delay: -6,  op: 0.05 },
  { type: "circle", size: 48, x: 87, y: 38, dur: 20, delay: -9,  op: 0.04 },
  { type: "square", size: 14, x: 55, y: 72, dur: 10, delay: -2,  op: 0.07 },
  { type: "circle", size: 26, x: 42, y: 8,  dur: 16, delay: -5,  op: 0.05 },
  { type: "square", size: 32, x: 14, y: 78, dur: 13, delay: -11, op: 0.06 },
  { type: "circle", size: 12, x: 63, y: 52, dur: 9,  delay: -4,  op: 0.09 },
] as const;

export default function HeroShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            border: "1px solid white",
            borderRadius: s.type === "circle" ? "50%" : "0",
            transform: s.type === "square" ? "rotate(45deg)" : undefined,
            animation: `heroFloat ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
