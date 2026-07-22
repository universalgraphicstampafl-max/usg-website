"use client";

type Phrase = { text: string; italic?: boolean };

const PHRASES: Phrase[] = [
  { text: "We Handle the" },
  { text: "Signage.", italic: true },
  { text: "You Run the" },
  { text: "Business.", italic: true },
];

export default function HeroHeadline() {
  let wordIndex = 0;

  return (
    <h1
      className="text-[1.95rem] leading-[1.12] md:text-6xl md:leading-tight font-extrabold tracking-brand-tight mb-4 md:mb-6 text-brand-navy"
      style={{ perspective: "1000px" }}
    >
      {PHRASES.map((phrase, p) => {
        const words = phrase.text.split(" ");
        return (
          <span key={p} className={phrase.italic ? "font-serif italic font-normal text-brand-navy" : ""}>
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
