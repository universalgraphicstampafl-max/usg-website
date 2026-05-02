"use client";

import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  attribution: string;
  tenure: string;
};

interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
}

export default function TestimonialMarquee({ testimonials }: TestimonialMarqueeProps) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-4 sm:gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.attribution}-${i}`}
            className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[380px] bg-white rounded-2xl border border-brand-navy/10 shadow-lg p-5 sm:p-6 lg:p-8"
          >
            <span
              className="text-brand-sky/25 text-8xl font-serif leading-none -mb-6 block"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="text-gray-600 italic text-base leading-relaxed mb-6">{t.quote}</p>
            <p className="font-bold text-brand-navy text-sm">{t.attribution}</p>
            <p className="text-gray-400 text-xs mt-1">{t.tenure}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
