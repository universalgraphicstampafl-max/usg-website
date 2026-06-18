"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* EasyCard: photo card with colored bottom strip (Superside-style).
   Image shrinks on hover; copy panel hugs its content via grid-rows 0fr->1fr. */
export default function EasyCard({
  image, alt, title, body, strip, delay,
}: {
  image: string; alt: string; title: string; body: string;
  strip: "navy" | "marigold" | "sky"; delay: number;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !firedRef.current) {
        firedRef.current = true;
        setTimeout(() => setVisible(true), delay * 1000);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const stripStyles = {
    navy:     { bg: "bg-brand-navy-dark", title: "text-white",      body: "text-white/70" },
    marigold: { bg: "bg-brand-gold",      title: "text-brand-navy", body: "text-brand-navy/80" },
    sky:      { bg: "bg-brand-sky",       title: "text-brand-navy", body: "text-brand-navy/80" },
  }[strip];

  return (
    <div
      ref={ref}
      className="group rounded-2xl overflow-hidden bg-brand-navy-dark flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* image: shrinks a little on hover to make room; panel below grows only as much as the copy needs */}
      <div className="relative w-full overflow-hidden flex-shrink-0 h-[300px] group-hover:h-[226px] transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      {/* copy panel: hugs its content — title always shown, body expands to exactly its height on hover */}
      <div className={`${stripStyles.bg} px-6 py-5`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className={`font-bold text-lg ${stripStyles.title}`}>{title}</h3>
          <span
            className={`flex-shrink-0 text-xl leading-none ${stripStyles.title} opacity-50 transition-transform duration-500 group-hover:rotate-45`}
            aria-hidden="true"
          >
            +
          </span>
        </div>
        {/* grid-rows 0fr->1fr expands the panel to exactly the copy's height — no extra dead space */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2">
          <p className={`overflow-hidden text-sm leading-relaxed ${stripStyles.body}`}>{body}</p>
        </div>
      </div>
    </div>
  );
}
