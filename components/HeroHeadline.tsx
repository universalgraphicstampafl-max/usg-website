"use client";

const WORDS = ["Every", "store.", "On", "brand.", "On", "time."];

export default function HeroHeadline() {
  return (
    <h1
      className="text-5xl md:text-6xl font-extrabold tracking-brand-tight leading-tight mb-6 text-white"
      style={{ perspective: "1000px" }}
    >
      {WORDS.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.22em]"
          style={{
            animation: `wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.08}s both`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
