"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GarageMachine, MachineCategory } from "@/types";
import { EditorialImage } from "@/components/ui/editorial-image";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";

const categories: Array<"All" | MachineCategory> = ["All", "Cars", "Motorcycles", "Capture", "Ride kit"];

export function MachineCollection({ items }: { items: GarageMachine[] }) {
  const [activeCategory, setActiveCategory] = useState<"All" | MachineCategory>("All");
  const filtered = useMemo(() => activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory), [activeCategory, items]);

  return (
    <div>
      <SampleContentNotice className="mb-9 max-w-3xl" />
      <div className="mb-8 flex flex-wrap gap-2 border-b border-[#26221d] pb-5" role="group" aria-label="Filter the collection by type">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`min-h-11 rounded-full border px-4 text-xs font-mono uppercase tracking-[0.15em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482] ${
              activeCategory === category
                ? "border-[#c4a482]/70 bg-[#c4a482]/10 text-[#f5f3ef]"
                : "border-white/10 text-[#c6c0b6] hover:border-white/25 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mb-7 text-xs font-mono uppercase tracking-[0.15em] text-[#aba59c]">
        {filtered.length} {filtered.length === 1 ? "profile" : "profiles"} · {activeCategory}
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:gap-x-12 xl:gap-y-20">
        {filtered.map((item, index) => (
          <article key={item.id} className="group">
            <EditorialImage
              src={item.heroImage.src}
              alt={item.heroImage.alt}
              aspectRatio="landscape"
              caption={item.heroImage.caption}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 620px"
            />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#aba59c]">
              <span>{item.category} <span className="text-[#8f7155]">·</span> {item.role}</span>
              <span className="text-[#c4a482]">{item.contentStatus === "sample" ? "Illustrative profile" : "Verified profile"}</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">{item.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c6c0b6]">{item.story}</p>
            <div className="mt-5 grid gap-4 border-l border-[#8f7155] pl-4 sm:grid-cols-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#aba59c]">
                  {item.contentStatus === "sample" ? "Sample motto" : "Motto"}
                </span>
                <p className="mt-1 font-serif text-lg italic text-[#ded3c6]">“{item.motto}”</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#aba59c]">
                  {item.contentStatus === "sample" ? "Sample role" : "Role"}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-[#c6c0b6]">{item.use}</p>
              </div>
            </div>
            <Link
              href={`/machines/${item.slug}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#c4a482] transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a482]"
            >
              Open profile <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            {index < filtered.length - 1 && <div className="mt-10 border-b border-white/[0.06] md:hidden" />}
          </article>
        ))}
      </div>
    </div>
  );
}
