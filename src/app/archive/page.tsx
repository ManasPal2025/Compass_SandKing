import React from "react";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { ArchiveStream } from "@/components/archive/archive-stream";
import { archiveItems } from "@/data/archive";

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
    <Section spacing="default" className="min-h-screen">
      <Container size="wide">
        <FadeIn>
          {/* Quiet Editorial Header */}
          <header className="space-y-3 sm:space-y-4 mb-10 sm:mb-16 md:mb-20 border-b border-[#201e1b] pb-8 sm:pb-12 md:pb-16">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
              05 / VISUAL MEMORY
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FAF9F6] tracking-tight">
              Archive
            </h1>
            <p className="text-base sm:text-lg text-[#A8A195] font-light max-w-2xl leading-relaxed">
              Photographs, roads, machines, and places. An evolving photographic memory of Saraswat&apos;s world, captured one turn at a time.
            </p>
          </header>

          {/* Asymmetric Visual Archive Stream with Understated Filtering */}
          <ArchiveStream items={archiveItems} />
        </FadeIn>
      </Container>
    </Section>
  );
}
