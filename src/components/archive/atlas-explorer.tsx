"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { MapPin } from "lucide-react";
import { travelDestinations, type TravelDestination } from "@/data/travel-destinations";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";

interface AtlasExplorerProps {
  selectedId: string;
  onSelectPlace: (id: string) => void;
}

export function AtlasExplorer({ selectedId, onSelectPlace }: AtlasExplorerProps) {
  const [view, setView] = useState<"places" | "map">("places");
  const selectedCardRef = useRef<HTMLDivElement>(null);

  const selected: TravelDestination =
    travelDestinations.find((place) => place.id === selectedId) ?? travelDestinations[0];

  const handleSelect = (id: string) => {
    onSelectPlace(id);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      selectedCardRef.current?.scrollIntoView({
        block: "nearest",
        behavior: prefersReduced ? "instant" : "smooth",
      });
    });
  };

  return (
    <section id="atlas-explorer" className="space-y-8">
      <div className="flex flex-col gap-5 border-b border-[#24211d] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482]">ATLAS / SAMPLE INDEX</span>
          <h2 className="mt-2 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">Browse by place</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c6c0b6]">A location directory first, with a map as another way to explore.</p>
        </div>
        <div className="inline-flex rounded-full border border-white/10 p-1" role="group" aria-label="Choose place or map view">
          {(["places", "map"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`min-h-10 rounded-full px-4 text-xs font-mono uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482] ${
                view === mode ? "bg-[#eee7dc] text-[#171411]" : "text-[#c6c0b6] hover:text-white"
              }`}
            >
              {mode === "places" ? "Places" : "Map"}
            </button>
          ))}
        </div>
      </div>

      <SampleContentNotice />

      {view === "places" ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {travelDestinations.map((place, index) => (
            <button
              key={place.id}
              type="button"
              aria-pressed={selected.id === place.id}
              onClick={() => handleSelect(place.id)}
              className={`flex min-h-[5.5rem] items-center gap-4 border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[#c4a482] ${
                selected.id === place.id
                  ? "border-[#c4a482]/70 bg-[#c4a482]/[0.12]"
                  : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
              }`}
            >
              <span className="font-mono text-xs text-[#c4a482]">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-lg text-[#f1ede7]">{place.country}</span>
                <span className="mt-0.5 block text-xs font-mono uppercase tracking-[0.12em] text-[#aba59c]">
                  {place.examplePlace} · {place.region}
                </span>
              </span>
              <MapPin aria-hidden="true" size={16} className="shrink-0 text-[#c4a482]" />
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[1.55/1] overflow-hidden border border-white/10 bg-[#101514]">
            <div className="absolute inset-0 p-3 sm:p-6">
              <div className="relative h-full w-full">
                <svg
                  viewBox="0 0 1000 600"
                  role="img"
                  aria-label="Illustrative world map with twelve sample destination markers"
                  className="h-full w-full"
                >
                  <defs>
                    <pattern id="atlas-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(220,220,210,.08)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="600" fill="url(#atlas-grid)" />
                  <g fill="rgba(133,153,137,.32)" stroke="rgba(205,211,191,.28)" strokeWidth="2" strokeLinejoin="round">
                    <path d="M91 139 131 104 185 82 235 95 273 126 267 158 239 171 220 205 193 219 178 255 148 260 130 231 102 218 82 187Z" />
                    <path d="M223 273 255 282 269 315 258 351 247 386 230 420 220 461 202 501 184 469 193 432 181 393 188 355 174 323 194 292Z" />
                    <path d="M444 141 470 122 501 127 516 146 503 164 479 167 460 159Z" />
                    <path d="M452 184 480 170 514 183 531 222 521 257 505 294 489 328 470 316 463 278 449 243 438 211Z" />
                    <path d="M516 134 550 109 608 105 652 119 694 109 745 128 786 150 808 180 792 202 758 193 738 216 706 211 688 236 657 225 637 205 607 211 581 193 553 193 533 172Z" />
                    <path d="M749 343 782 332 817 344 835 369 817 390 785 389 761 372Z" />
                    <path d="M849 235 862 225 875 238 869 260 855 264Z" />
                    <path d="M870 282 883 272 894 289 887 313 875 309Z" />
                  </g>
                  <g fill="none" stroke="rgba(230,213,185,.16)" strokeDasharray="4 8" strokeWidth="1">
                    <path d="M0 300H1000" /><path d="M0 200H1000" /><path d="M0 400H1000" />
                  </g>
                </svg>
                {travelDestinations.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    aria-label={`Select sample destination ${place.country}, ${place.examplePlace}`}
                    aria-pressed={selected.id === place.id}
                    onClick={() => handleSelect(place.id)}
                    style={{ left: `${place.mapX}%`, top: `${place.mapY}%` }}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f3ef] ${
                      selected.id === place.id ? "bg-[#f5f3ef] text-[#15130f]" : "bg-[#c4a482] text-[#171411]"
                    }`}
                  >
                    <MapPin aria-hidden="true" size={13} />
                  </button>
                ))}
              </div>
            </div>
            <span className="absolute bottom-3 left-4 bg-black/65 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-white/80">
              Illustrative map · sample places only
            </span>
          </div>
          <div className="grid max-h-[28rem] grid-cols-2 gap-1 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
            {travelDestinations.map((place) => (
              <button
                key={place.id}
                type="button"
                aria-pressed={selected.id === place.id}
                onClick={() => handleSelect(place.id)}
                className={`min-h-12 px-3 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482] ${
                  selected.id === place.id ? "bg-[#c4a482]/20 font-medium text-white" : "bg-white/[0.025] text-[#c6c0b6] hover:bg-white/[0.07]"
                }`}
              >
                {place.country}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected place card (no coordinates displayed) */}
      <div
        ref={selectedCardRef}
        aria-live="polite"
        className="grid overflow-hidden border border-white/10 bg-[#100f0e] md:grid-cols-2"
      >
        <div className="relative min-h-64 aspect-[16/10] md:aspect-auto">
          <Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          <span className="absolute bottom-3 right-3 bg-black/85 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-[#f5f3ef]">
            AI sample frame
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-9 md:p-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482]">{selected.region} / SAMPLE COLLECTION</span>
          <h3 className="mt-3 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">{selected.country}</h3>
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.14em] text-[#c4a482]">{selected.examplePlace}</p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#c6c0b6]">
            {selected.note} This card demonstrates how verified photos for a confirmed location could be grouped here.
          </p>
        </div>
      </div>
    </section>
  );
}
