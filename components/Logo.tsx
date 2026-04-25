"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const mainColor = variant === "light" ? "text-white" : "text-brand-navy";
  const accentColor = variant === "light" ? "text-brand-gold" : "text-brand-gold";

  return (
    <Link href="/" className={`flex items-center gap-2 select-none ${className}`}>
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 bg-brand-navy rounded flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-brand-gold rounded-sm relative">
            <div className="absolute inset-0.5 bg-brand-sky/40 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold text-lg tracking-brand-logo uppercase ${accentColor}`}
        >
          USG
        </span>
        <span
          className={`text-[0.52rem] tracking-widest uppercase font-black ${mainColor}`}
        >
          UNIVERSAL
        </span>
        <span
          className={`text-[0.42rem] tracking-wide font-light ${mainColor} opacity-70`}
        >
          Signage &amp; Graphics
        </span>
      </div>
    </Link>
  );
}
