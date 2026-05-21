"use client";

export default function HeroMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Sky-blue orb — 12s drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: "65%", height: "85%",
          top: "5%", left: "5%",
          background: "radial-gradient(ellipse, rgba(58,171,220,0.22) 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "meshOrb1 12s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Gold orb — 18s drift */}
      <div
        className="absolute rounded-full"
        style={{
          width: "55%", height: "65%",
          bottom: "0%", right: "-5%",
          background: "radial-gradient(ellipse, rgba(239,165,30,0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "meshOrb2 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Deep shadow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "45%", background: "linear-gradient(to top, rgba(20,34,72,0.65) 0%, transparent 100%)" }}
      />
    </div>
  );
}
