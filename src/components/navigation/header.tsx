"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Bike, BookOpen, Compass, HeartHandshake, Menu, Orbit, X } from "lucide-react";
import { mainNavItems, siteConfig } from "@/data/navigation";

const navIcons = [BookOpen, Aperture, Bike, HeartHandshake, Orbit];

export function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle focus when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      // Focus first link on open
      requestAnimationFrame(() => {
        firstMobileLinkRef.current?.focus();
      });
    }
  }, [isMenuOpen]);

  // Close on Escape or click/tap outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Do NOT hide the header while mobile menu is open
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      // Track if user has scrolled beyond top threshold
      if (currentScrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out pt-[max(0.75rem,env(safe-area-inset-top))] ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        hasScrolled
          ? "bg-[#0c0b0a]/90 backdrop-blur-md border-b border-[#22201e]/70 pb-3 sm:pb-4"
          : "bg-transparent pb-3 sm:pb-4 md:py-8"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        {/* Brand / Name links to Home */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          title="Home"
          className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80 py-1"
        >
          <Compass
            aria-hidden="true"
            className="h-3.5 w-3.5 text-[#c4a482] transition-transform duration-500 group-hover:rotate-45"
            strokeWidth={1.4}
          />
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] font-medium text-[#f5f3ef] uppercase">
            {siteConfig.name}
          </span>
        </Link>

        <button
          ref={toggleButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#f5f3ef] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482] lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-main-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
        </button>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-3 xl:gap-5 text-xs font-mono tracking-[0.14em] uppercase text-[#aba59c] lg:flex"
        >
          {mainNavItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = navIcons[index];
            return (
              <React.Fragment key={item.href}>
                  <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                    className={`group inline-flex items-center gap-1.5 transition-colors duration-200 relative min-h-11 px-1.5 hover:text-[#f5f3ef] active:text-[#c4a482] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482] ${
                    isActive ? "text-[#f5f3ef] font-medium" : "text-[#aba59c]"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#c4a482] ${
                      isActive ? "text-[#c4a482]" : "text-current"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1 right-1 sm:left-1.5 sm:right-1.5 h-[1px] bg-[#c4a482]" />
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        <nav
          ref={mobileNavRef}
          id="mobile-main-navigation"
          aria-label="Mobile main navigation"
          hidden={!isMenuOpen}
          className="absolute inset-x-0 top-full border-y border-[#302a24] bg-[#0c0b0a]/98 px-5 py-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
            {mainNavItems.map((item, index) => {
              const Icon = navIcons[index];
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex min-h-12 items-center gap-3 border-b border-white/[0.06] last:border-0 text-xs font-mono uppercase tracking-[0.16em] ${isActive ? "text-[#f5f3ef]" : "text-[#aba59c]"}`}
                >
                  <span aria-hidden="true" className="w-5 text-xs text-[#c4a482]">0{index + 1}</span>
                  <Icon aria-hidden="true" className="h-4 w-4 text-[#c4a482]" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </nav>
      </div>
    </header>
  );
}
