"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Logo from "./Logo";

interface DropdownItem {
  label: string;
  href: string;
}

const industries: DropdownItem[] = [
  { label: "Convenience Retail", href: "/industries/convenience-retail" },
  { label: "Tobacco & Nicotine", href: "/industries/tobacco-nicotine" },
  { label: "QSR", href: "/industries/qsr" },
  { label: "Grocery", href: "/industries/grocery" },
  { label: "Beverage", href: "/industries/beverage" },
];

const services: DropdownItem[] = [
  { label: "Signage Programs", href: "/services/signage-programs" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "Custom Print Production", href: "/services/custom-print-production" },
  { label: "Store Surveys", href: "/services/store-surveys" },
  { label: "Direct Store Delivery", href: "/services/direct-store-delivery" },
  { label: "Product Photography", href: "/services/product-photography" },
];

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  columns?: 1 | 2;
  onClose: () => void;
  light?: boolean;
}

function DropdownMenu({ label, items, columns = 1, onClose, light = false }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scheduleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 200);
  };

  const scheduleClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onClose();
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    },
    [onClose]
  );

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const linkClass = light
    ? "flex items-center gap-1 text-sm font-semibold tracking-brand-tight text-white hover:text-brand-gold transition-colors px-1 py-2 rounded focus-visible:outline-2 focus-visible:outline-brand-sky"
    : "flex items-center gap-1 text-sm font-semibold tracking-brand-tight text-brand-navy hover:text-brand-gold transition-colors px-1 py-2 rounded focus-visible:outline-2 focus-visible:outline-brand-sky";

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        className={linkClass}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={handleKeyDown}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 min-w-[200px] ${
            columns === 2 ? "grid grid-cols-2 gap-x-2 min-w-[380px]" : ""
          }`}
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-offwhite hover:text-brand-gold font-medium tracking-brand-tight transition-colors focus-visible:outline-2 focus-visible:outline-brand-sky"
              onClick={() => setOpen(false)}
              onFocus={scheduleOpen}
              onBlur={scheduleClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustries, setMobileIndustries] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler(); // set initial state
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileIndustries(false);
    setMobileServices(false);
  };

  const navHeight = scrolled ? "h-[52px]" : "h-[64px]";

  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
    : "bg-transparent";

  const linkClass = scrolled
    ? "text-sm font-semibold tracking-brand-tight text-brand-navy hover:text-brand-gold transition-colors px-3 py-2"
    : "text-sm font-semibold tracking-brand-tight text-white hover:text-brand-gold transition-colors px-3 py-2";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navHeight} ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo variant={scrolled ? "dark" : "light"} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <DropdownMenu
              label="Industries"
              items={industries}
              onClose={() => {}}
              light={!scrolled}
            />
            <DropdownMenu
              label="Services"
              items={services}
              columns={2}
              onClose={() => {}}
              light={!scrolled}
            />
            <Link href="/success-stories" className={linkClass}>
              Success Stories
            </Link>
            <Link href="/about" className={linkClass}>
              About
            </Link>
            <Link href="/gallery" className={linkClass}>
              Gallery
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/client-login"
              className={
                scrolled
                  ? "btn-outline text-sm !px-4 !py-1.5"
                  : "text-sm font-semibold tracking-brand-tight text-white border-2 border-white/70 px-4 py-1.5 rounded hover:bg-white hover:text-brand-navy transition-colors duration-200"
              }
            >
              Client Login
            </Link>
            <Link
              href="/book"
              className={scrolled ? "btn-navy text-sm !px-4 !py-1.5" : "btn-gold text-sm !px-4 !py-1.5"}
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded focus-visible:outline-2 focus-visible:outline-brand-sky ${
              scrolled ? "text-brand-navy" : "text-white"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer so content isn't under fixed nav */}
      <div className={`${scrolled ? "h-[52px]" : "h-[64px]"} transition-all duration-200`} />

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-hidden="true"
            onClick={closeMobile}
          />
          <nav
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl flex flex-col lg:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Logo variant="dark" />
              <button
                className="p-2 rounded text-brand-navy"
                aria-label="Close menu"
                onClick={closeMobile}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col p-5 gap-1 flex-1">
              <Link href="/book" className="btn-gold text-center mb-2" onClick={closeMobile}>
                Book a Call
              </Link>
              <Link href="/client-login" className="btn-outline text-center mb-4" onClick={closeMobile}>
                Client Login
              </Link>

              {/* Industries accordion */}
              <button
                className="flex items-center justify-between w-full py-2 text-sm font-semibold tracking-brand-tight text-brand-navy border-b border-gray-100"
                onClick={() => setMobileIndustries((v) => !v)}
                aria-expanded={mobileIndustries}
              >
                Industries
                <svg
                  className={`w-4 h-4 transition-transform ${mobileIndustries ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileIndustries && (
                <div className="pl-3 flex flex-col gap-1 mb-1">
                  {industries.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-1.5 text-sm text-brand-navy/80 hover:text-brand-gold"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Services accordion */}
              <button
                className="flex items-center justify-between w-full py-2 text-sm font-semibold tracking-brand-tight text-brand-navy border-b border-gray-100"
                onClick={() => setMobileServices((v) => !v)}
                aria-expanded={mobileServices}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${mobileServices ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServices && (
                <div className="pl-3 flex flex-col gap-1 mb-1">
                  {services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-1.5 text-sm text-brand-navy/80 hover:text-brand-gold"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/success-stories" className="py-2 text-sm font-semibold text-brand-navy hover:text-brand-gold border-b border-gray-100" onClick={closeMobile}>
                Success Stories
              </Link>
              <Link href="/about" className="py-2 text-sm font-semibold text-brand-navy hover:text-brand-gold border-b border-gray-100" onClick={closeMobile}>
                About
              </Link>
              <Link href="/gallery" className="py-2 text-sm font-semibold text-brand-navy hover:text-brand-gold border-b border-gray-100" onClick={closeMobile}>
                Gallery
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
