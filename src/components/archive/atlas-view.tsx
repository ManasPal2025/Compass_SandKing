"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArchiveItem } from "@/types";
import { travelDestinations } from "@/data/travel-destinations";
import { AtlasExplorer } from "@/components/archive/atlas-explorer";
import { ArchiveStream } from "@/components/archive/archive-stream";
import { PhotoGuessingGame } from "@/components/archive/photo-guessing-game";

export function AtlasView({ items }: { items: ArchiveItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeParam = searchParams.get("place");

  // Initial place selection
  const initialPlace = travelDestinations.find((d) => d.id === placeParam) ?? travelDestinations[0];
  const [selectedPlaceId, setSelectedPlaceId] = useState(initialPlace.id);
  const [countryFilter, setCountryFilter] = useState<string | null>(
    placeParam ? initialPlace.country : null
  );

  useEffect(() => {
    if (placeParam) {
      const match = travelDestinations.find((d) => d.id === placeParam);
      if (match) {
        setSelectedPlaceId(match.id);
        setCountryFilter(match.country);
      }
    }
  }, [placeParam]);

  const handleSelectPlace = (id: string) => {
    setSelectedPlaceId(id);
    const dest = travelDestinations.find((d) => d.id === id);
    if (dest) {
      setCountryFilter(dest.country);
      router.replace(`/atlas?place=${id}`, { scroll: false });
    }
  };

  const handleClearCountryFilter = () => {
    setCountryFilter(null);
    router.replace("/atlas", { scroll: false });
  };

  return (
    <>
      <AtlasExplorer
        selectedId={selectedPlaceId}
        onSelectPlace={handleSelectPlace}
      />

      <div id="frame-library" className="mt-20 border-t border-[#24211d] pt-12 sm:mt-28 sm:pt-16">
        <header className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#c4a482] block">
              THE FRAME LIBRARY
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">
              Browse sample frames
            </h2>
            <p className="mt-2 text-sm text-[#c6c0b6]">
              Filter by subject and open any frame for its accompanying note.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#aba59c]">
            {items.length} sample frames in collection
          </span>
        </header>

        <ArchiveStream
          items={items}
          countryFilter={countryFilter}
          onClearCountryFilter={countryFilter ? handleClearCountryFilter : undefined}
        />
      </div>

      <div className="mt-20 border-t border-[#24211d] pt-12 sm:mt-28 sm:pt-16">
        <PhotoGuessingGame />
      </div>
    </>
  );
}
