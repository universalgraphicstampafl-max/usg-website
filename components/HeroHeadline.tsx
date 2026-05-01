"use client";

type Phrase = { text: string; italic?: boolean };

const PHRASES: Phrase[] = [
  { text: "Every store." },
  { text: "On brand.", italic: true },
  { text: "On time." },
];

export default function HeroHeadline() {
  let wordIndex = 0;

  return (
    <h1
      className="text-5xl md:text-6xl font-extrabold tracking-brand-tight leading-tight mb-6 text-white"
      style={{ perspective: "1000px" }}
    >
      {PHRASES.map((phrase, p) => {
        const words = phrase.text.split(" ");
        return (
          <span key={p} className={phrase.italic ? "font-serif italic font-normal text-white" : ""}>
            {words.map((word) => {
              const i = wordIndex++;
              return (
                <span
                  key={`${p}-${i}`}
                  className="inline-block mr-[0.22em]"
                  style={{
                    animation: `wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.08}s both`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
