"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems, siteConfig } from "@/data/navigation";

export function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track if user has scrolled beyond top threshold
      if (currentScrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out pt-[max(0.75rem,env(safe-area-inset-top))] ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        hasScrolled
          ? "bg-[#0c0b0a]/90 backdrop-blur-md border-b border-[#22201e]/70 pb-3 sm:pb-4"
          : "bg-transparent pb-3 sm:pb-4 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-y-2 sm:gap-y-3">
        {/* Brand / Name links to Home */}
        <Link
          href="/"
          className="group transition-opacity hover:opacity-80 py-1"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] font-medium text-[#f5f3ef] uppercase">
            {siteConfig.name}
          </span>
        </Link>

        {/* Minimal Navigation Stream: JOURNAL · ARCHIVE · GARAGE · DRIFT */}
        <nav
          aria-label="Main Navigation"
          className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 text-[11px] md:text-xs font-mono tracking-[0.18em] uppercase text-[#aba59c]"
        >
          {mainNavItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <React.Fragment key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 relative py-2 px-1 sm:px-1.5 hover:text-[#f5f3ef] active:text-[#c4a482] ${
                    isActive ? "text-[#f5f3ef] font-medium" : "text-[#8a847b]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1 right-1 sm:left-1.5 sm:right-1.5 h-[1px] bg-[#c4a482]" />
                  )}
                </Link>
                {index < mainNavItems.length - 1 && (
                  <span className="text-[#3a3733] select-none text-[10px]">·</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
