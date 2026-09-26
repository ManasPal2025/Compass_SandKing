"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArchiveItem, ArchiveCategory } from "@/types";
import { EditorialImage } from "@/components/ui/editorial-image";

interface ArchiveStreamProps {
  items: ArchiveItem[];
  countryFilter?: string | null;
  onClearCountryFilter?: () => void;
}

const CATEGORIES: Array<"All" | ArchiveCategory> = [
  "All",
  "Roads",
  "Machines",
  "Places",
  "Nature",
  "Moments",
];

export function ArchiveStream({
  items,
  countryFilter,
  onClearCountryFilter,
}: ArchiveStreamProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | ArchiveCategory>("All");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesCountry = !countryFilter || item.country === countryFilter;
      return matchesCategory && matchesCountry;
    });
  }, [items, activeCategory, countryFilter]);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Understated Filter Navigation — Single-Line Horizontal Swipe on Mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24211d] pb-4 sm:pb-6">
        <nav
          aria-label="Archive category filter"
          className="flex items-center gap-x-2 sm:gap-x-6 overflow-x-auto no-scrollbar scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0 text-xs font-mono tracking-widest uppercase"
        >
          <span className="text-[#8a847b] select-none text-xs mr-1 shrink-0">Filter:</span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors py-2 px-3 cursor-pointer relative select-none rounded-sm shrink-0 active:bg-[#1a1816] ${
                  isActive
                    ? "text-[#FAF9F6] font-medium"
                    : "text-[#aba59c] hover:text-[#FAF9F6]"
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-[#c4a482]" />
                )}
              </button>
            );
          })}
        </nav>

        {countryFilter && (
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c4a482] shrink-0">
            <span>Place: {countryFilter}</span>
            {onClearCountryFilter && (
              <button
                type="button"
                onClick={onClearCountryFilter}
                className="underline underline-offset-4 text-white hover:text-[#c4a482] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482]"
              >
                Show all
              </button>
            )}
          </div>
        )}
      </div>

      <p aria-live="polite" className="-mt-8 text-xs font-mono uppercase tracking-[0.16em] text-[#aba59c]">
        {countryFilter
          ? `Showing ${filteredItems.length} ${filteredItems.length === 1 ? "frame" : "frames"} from ${countryFilter}${
              activeCategory !== "All" ? ` · ${activeCategory}` : ""
            }`
          : `Showing ${filteredItems.length} ${filteredItems.length === 1 ? "frame" : "frames"}${
              activeCategory !== "All" ? ` · ${activeCategory}` : " · All categories"
            }`}
      </p>

      {/* Asymmetric Editorial Photographic Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-14 items-start">
          {filteredItems.map((item, index) => {
            let colSpan = "md:col-span-6";
            let offsetClass = "";

            if (item.gridSpan === "wide" || index % 5 === 0) {
              colSpan = "md:col-span-7";
            } else if (index % 5 === 1) {
              colSpan = "md:col-span-5";
              offsetClass = "md:pt-12";
            } else if (index % 5 === 4) {
              colSpan = "md:col-span-8";
            } else if (index % 5 === 2) {
              colSpan = "md:col-span-6 md:-mt-6";
            } else {
              colSpan = "md:col-span-6";
            }

            return (
              <article
                key={item.id}
                className={`${colSpan} ${offsetClass} space-y-4 group`}
              >
                <Link
                  href={`/atlas/${item.slug}`}
                  className="block space-y-3 cursor-pointer"
                >
                  <div className="overflow-hidden bg-[#121110]">
                    <EditorialImage
                      src={item.image.src}
                      alt={item.image.alt}
                      aspectRatio={item.image.aspectRatio || "landscape"}
                      caption={item.image.caption}
                      location={item.location}
                      date={item.date}
                    />
                  </div>

                  {/* Quiet Editorial Caption Bar */}
                  <div className="pt-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs font-mono text-[#aba59c]">
                    <div className="space-y-0.5">
                      {/* Frame title uses h3 per requirements */}
                      <h3 className="text-xl sm:text-2xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      {item.note && (
                        <p className="text-xs text-[#c6c0b6] font-light line-clamp-1 max-w-md">
                          {item.note}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#9a948a] shrink-0 pt-1 sm:pt-0">
                      <span className="text-[#c4a482]">{item.category}</span>
                      {item.date && (
                        <>
                          <span>·</span>
                          <time dateTime={item.date}>{item.date}</time>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 border border-dashed border-white/10 p-8">
          <p className="font-serif text-xl text-[#f5f3ef]">
            No sample frames for this place yet.
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-[#aba59c]">
            The current demo collection includes sample frames from Australia, Japan, Switzerland, Czechia, and New Zealand.
          </p>
          {onClearCountryFilter && (
            <button
              type="button"
              onClick={onClearCountryFilter}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#eee7dc] px-5 text-xs font-mono uppercase tracking-[0.16em] text-[#171411] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482]"
            >
              Show all frames →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
