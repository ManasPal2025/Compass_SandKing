import React from "react";
import { siteConfig } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1c1a18] bg-[#090807] text-[#8e8981] mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 space-y-10 sm:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Identity & Closing Thought */}
          <div className="space-y-4 max-w-lg">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#f5f3ef] font-medium block">
              {siteConfig.name}
            </span>
            <p className="text-base font-serif italic text-[#aba59c] leading-relaxed">
              &ldquo;Don&apos;t explain who you are — let them find out, one road at a time.&rdquo;
            </p>
          </div>

          {/* Direct channels: Instagram · Email */}
          <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase text-[#857f76]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f3ef] transition-colors py-2.5 -my-2.5"
            >
              Instagram ↗
            </a>
            <span className="text-[#33302b]">·</span>
            <a
              href="mailto:contact@saraswatmishra.com"
              className="hover:text-[#f5f3ef] transition-colors py-2.5 -my-2.5"
            >
              Email ↗
            </a>
          </div>
        </div>

        {/* Quiet Bottom Line */}
        <div className="pt-8 border-t border-[#161513] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#545049]">
          <span>© {new Date().getFullYear()} Saraswat Mishra. All rights reserved.</span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    </footer>
  );
}
