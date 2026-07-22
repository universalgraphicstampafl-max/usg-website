"use client";

import Link from "next/link";

interface LogoProps {
  /** "light" = sits on a dark background, "dark" = sits on a light background. */
  variant?: "light" | "dark";
  /** Render the written-out company name beside the mark (used in the top nav). */
  showName?: boolean;
  className?: string;
}

export default function Logo({ variant = "dark", showName = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-brand-navy";
  return (
    <Link
      href="/"
      aria-label="USG — Universal Signage & Graphics, home"
      className={`inline-flex items-center gap-3 select-none ${className}`}
    >
      <img
        src="/images/usg-logo-mark.svg"
        alt="Universal Signage & Graphics"
        width={243}
        height={153}
        className={`h-14 w-auto shrink-0 ${variant === "light" ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" : ""}`}
      />
      {showName && (
        <span className={`flex flex-col leading-tight ${text}`}>
          <span className="font-black uppercase tracking-wide text-base">Retail Signage</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-70">
            Specialist
          </span>
        </span>
      )}
    </Link>
  );
}
