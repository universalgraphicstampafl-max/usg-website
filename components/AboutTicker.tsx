"use client";

import { motion } from "framer-motion";

const PHRASES = [
  "Signage Made For U.",
  "Custom Designs For U.",
  "Quick Turns For U.",
  "A Signage Partner For U.",
];

/** Renders the trailing "U" in each phrase as the actual U from the USG logo mark. */
function Phrase({ text }: { text: string }) {
  const idx = text.lastIndexOf("U");
  return (
    <span className="flex-shrink-0 flex items-baseline text-2xl md:text-4xl font-black text-white whitespace-nowrap">
      {text.slice(0, idx)}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/usg-logo-u.png"
        alt="U"
        className="inline-block h-[1.05em] w-auto self-center translate-y-[0.08em] ml-[0.32em] mr-[0.1em]"
      />
      {text.slice(idx + 1)}
    </span>
  );
}

export default function AboutTicker() {
  const doubled = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      aria-label="Signage Made For U. Custom Designs For U. Quick Turns For U. A Signage Partner For U."
    >
      <motion.div
        className="flex items-center gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((p, i) => (
          <Phrase key={`${p}-${i}`} text={p} />
        ))}
      </motion.div>
    </div>
  );
}
