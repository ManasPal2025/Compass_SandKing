"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArchiveItem, ArchiveCategory } from "@/types";
import { EditorialImage } from "@/components/ui/editorial-image";

interface ArchiveStreamProps {
  items: ArchiveItem[];
}

const CATEGORIES: Array<"All" | ArchiveCategory> = [
  "All",
  "Roads",
  "Machines",
  "Places",
  "Nature",
  "Moments",
];

export function ArchiveStream({ items }: ArchiveStreamProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | ArchiveCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Understated Filter Navigation — Single-Line Horizontal Swipe on Mobile */}
      <nav
        aria-label="Archive category filter"
        className="flex items-center gap-x-2 sm:gap-x-6 overflow-x-auto no-scrollbar scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0 pb-4 sm:pb-8 border-b border-[#1c1a18] text-xs font-mono tracking-widest uppercase"
      >
        <span className="text-[#545049] select-none text-[10px] mr-1 shrink-0">Filter:</span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-colors py-2.5 px-3 -my-1 cursor-pointer relative select-none rounded-sm shrink-0 active:bg-[#1a1816] ${
                isActive
                  ? "text-[#FAF9F6] font-medium"
                  : "text-[#736e65] hover:text-[#CBC5BB]"
              }`}
            >
              <span>{cat}</span>
              {isActive && (
                <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-[#c4a482]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Asymmetric Editorial Photographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-14 items-start">
        {filteredItems.map((item, index) => {
          // Asymmetric column span logic based on index or gridSpan
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
                href={`/archive/${item.slug}`}
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
                <div className="pt-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs font-mono text-[#736e65]">
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors leading-tight">
                      {item.title}
                    </h2>
                    {item.note && (
                      <p className="text-xs text-[#8a847b] font-light line-clamp-1 max-w-md">
                        {item.note}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#5c574f] shrink-0 pt-1 sm:pt-0">
                    <span className="text-[#8c867c]">{item.category}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center text-sm font-mono text-[#666159]">
          No frames found in this category.
        </div>
      )}
    </div>
  );
}
