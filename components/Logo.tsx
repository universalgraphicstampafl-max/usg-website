"use client";

import Link from "next/link";

interface LogoProps {
  /** "light" = sits on a dark background, "dark" = sits on a light background. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Official USG monogram (Olivia 2026 final). Single source of truth:
 * /public/images/usg-logo-mark.svg — gold "USG" + orbital swoosh on a
 * transparent field, so it reads on both light (nav) and dark (footer) surfaces.
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="USG — Universal Signage & Graphics, home"
      className={`inline-flex items-center select-none ${className}`}
    >
      <img
        src="/images/usg-logo-mark.svg"
        alt="Universal Signage & Graphics"
        width={238}
        height={181}
        className={`h-12 w-auto ${variant === "light" ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" : ""}`}
      />
    </Link>
  );
}
