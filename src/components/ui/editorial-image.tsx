"use client";

import React, { useState } from "react";
import Image from "next/image";

export type AspectRatioType = 
  | "landscape"   // 16:10 or 3:2
  | "portrait"    // 3:4 or 4:5
  | "square"      // 1:1
  | "wide"        // 21:9
  | "full-bleed"  // viewport width
  | "natural";

interface EditorialImageProps {
  src?: string;
  alt: string;
  aspectRatio?: AspectRatioType;
  priority?: boolean;
  caption?: string;
  location?: string;
  date?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  isProvisional?: boolean;
}

const aspectRatios: Record<AspectRatioType, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  "full-bleed": "aspect-[16/9] md:aspect-[21/9] w-full",
  natural: "",
};

export function EditorialImage({
  src,
  alt,
  aspectRatio = "landscape",
  priority = false,
  caption,
  location,
  date,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1400px",
  isProvisional,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(!src);

  const ratioClass = aspectRatios[aspectRatio] || "aspect-[16/10]";
  const showProvisionalNotice = isProvisional || (src && src.includes("placeholders"));

  return (
    <figure className={`group relative w-full ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-[#141312] border border-[#262421] transition-colors duration-500 ${ratioClass}`}
      >
        {/* Placeholder RAW Frame: Only displayed if asset fails or is missing */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#161513] to-[#0e0d0c] select-none">
            {/* Photographic crosshair indicator */}
            <div className="relative mb-3 flex items-center justify-center w-10 h-10 border border-[#2d2a26] text-[#706a62]">
              <span className="text-xs font-mono tracking-widest uppercase">RAW</span>
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#8f887e]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#8f887e]" />
            </div>

            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8e8a83] max-w-xs line-clamp-1">
              {alt}
            </p>
            {location && (
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#5c5750] mt-1">
                📍 {location}
              </span>
            )}
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#47433d] mt-2">
              [ Awaiting Saraswat Asset ]
            </span>
          </div>
        ) : (
          src && (
            <>
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                onError={() => setHasError(true)}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] opacity-100"
              />

              {/* Discreet editorial placeholder indicator if provisional asset */}
              {showProvisionalNotice && (
                <div className="absolute bottom-2.5 right-2.5 pointer-events-none z-10">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#0c0b0a]/80 text-[#9e978c] border border-[#262421] backdrop-blur-xs">
                    Editorial Placeholder
                  </span>
                </div>
              )}
            </>
          )
        )}

        {/* Subtle border ring */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 z-10" />
      </div>

      {/* Editorial Caption & Metadata */}
      {(caption || location || date) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs">
          {caption && (
            <span className="text-[#a8a297] font-light leading-relaxed max-w-prose">
              {caption}
            </span>
          )}
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider uppercase text-[#736e65] ml-auto shrink-0">
            {location && <span>{location}</span>}
            {location && date && <span className="opacity-40">·</span>}
            {date && <span>{date}</span>}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
