import React from "react";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { ArchiveStream } from "@/components/archive/archive-stream";
import { archiveItems } from "@/data/archive";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";
import { AtlasExplorer } from "@/components/archive/atlas-explorer";
import { PhotoGuessingGame } from "@/components/archive/photo-guessing-game";

export const metadata: Metadata = {
  title: "Archive — Saraswat Mishra",
  description: "Visual memory: roads, machines, places, moments, and landscapes from Saraswat Mishra's journeys.",
  openGraph: {
    title: "Archive — Saraswat Mishra",
    description: "Visual memory: roads, machines, places, moments, and landscapes.",
    type: "website",
  },
};

export default function ArchivePage() {
  return (
    <>
      <AtmosphereLayer variant="dew" />
      <ImmersivePageHero
        kicker="05 / VISUAL MEMORY"
        title="Atlas"
        description="Follow the photographs by country and place, or wander the visual archive one frame at a time."
        imageSrc="/images/placeholders/archive-ridge.webp"
        imageAlt="A ridge road above a valley filled with cloud"
        actionLabel="Explore by place"
        actionHref="#atlas-explorer"
      />
      <Section id="archive-frames" spacing="default" className="min-h-screen">
        <Container size="wide">
        <FadeIn>
          <AtlasExplorer />

          <div id="archive-frames" className="mt-20 border-t border-[#24211d] pt-12 sm:mt-28 sm:pt-16">
            <header className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c4a482] block">THE FRAME LIBRARY</span>
                <h2 className="mt-2 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">Browse every sample frame</h2>
                <p className="mt-2 text-sm text-[#9e988e]">Filter by subject and open any frame for its accompanying note.</p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#777168]">{archiveItems.length} sample frames</span>
            </header>
            <ArchiveStream items={archiveItems} />
          </div>

          <div className="mt-20 border-t border-[#24211d] pt-12 sm:mt-28 sm:pt-16">
            <PhotoGuessingGame />
          </div>
        </FadeIn>
        </Container>
      </Section>
    </>
  );
}
