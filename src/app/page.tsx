import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { FadeIn } from "@/components/layout/fade-in";
import { siteConfig } from "@/data/navigation";
import { currentlyData } from "@/data/currently";
import { journalEntries } from "@/data/journal";
import { archiveItems } from "@/data/archive";
import { garageMachines } from "@/data/garage";
import { upcomingDrift, driftManifesto } from "@/data/drift";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col selection:bg-[#2b2723] selection:text-[#f5f3ef]">
      <AtmosphereLayer variant="blossom" />
      {/* =========================================================================
          01 — HERO (CINEMATIC SCENE — 100SVH)
          A full-viewport cinematic frame where the landscape owns the screen.
          The photograph is clearly visible with natural contrast and highlights.
          Edge falloffs surround and dissolve the photograph without smothering it.
         ========================================================================= */}
      <section className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[700px] -mt-20 sm:-mt-24 md:-mt-28 overflow-hidden flex flex-col justify-end pb-10 sm:pb-16 md:pb-24">
        {/* Layer 0: High-Resolution Photographic Scene — Visible, Sharp, Rich */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/placeholders/hero_road.jpg"
            alt="Cinematic coastal road cutting through morning mist"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] md:object-center animate-slow-breathe"
          />
        </div>

        {/* Layer 1: Controlled Edge Falloffs into Deep Black (Surrounding, NOT Covering) */}
        {/* Top Edge Falloff: Provides contrast for fixed navigation at top edge */}
        <div className="absolute top-0 inset-x-0 h-28 md:h-36 bg-gradient-to-b from-[#0c0b0a]/90 via-[#0c0b0a]/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Edge Falloff: Dissolves bottom into Cold Open */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-36 md:h-48 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/60 to-transparent pointer-events-none z-10" />

        {/* Layer 2: Scene-Integrated Dominant Typography */}
        <Container size="wide" className="relative z-30">
          <FadeIn delay={0.1}>
            <div className="space-y-3 sm:space-y-4 max-w-5xl">
              <h1 className="text-[3.25rem] xs:text-6xl sm:text-8xl md:text-9xl lg:text-[11.5vw] font-serif font-normal tracking-tight text-[#FAF9F6] leading-[0.88] uppercase select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                {siteConfig.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 gap-y-1 text-[11px] sm:text-sm font-mono tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[#E2DDD5] pt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {siteConfig.descriptors.map((desc, i) => (
                  <React.Fragment key={desc}>
                    <span>{desc}</span>
                    {i < siteConfig.descriptors.length - 1 && (
                      <span className="text-[#8e887e]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================================
          02 — COLD OPEN
          A thought encountered in negative space.
          Strong visual statement, generous whitespace, reduced emptiness.
         ========================================================================= */}
      <Section spacing="default" className="bg-[#0c0b0a]">
        <Container size="narrow">
          <FadeIn>
            <div className="space-y-6 sm:space-y-8 py-4 sm:py-6 md:py-12">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                02 / COLD OPEN
              </span>

              <div className="space-y-4 sm:space-y-6 max-w-3xl">
                <p className="text-3xl sm:text-5xl md:text-7xl font-serif text-[#FAF9F6] font-normal leading-[1.15] tracking-tight">
                  Some people collect things.
                  <br />
                  <span className="text-[#c4a482] italic font-normal">Others collect roads.</span>
                </p>

                <p className="text-base sm:text-lg font-light text-[#A8A195] leading-relaxed max-w-xl font-sans">
                  Machines. Solitary dawns. Mechanical pauses. Unplanned turns. 
                  Stories that begin with an open fuel tank and no fixed deadline to turn around.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1917]">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#524d45] block">
                  [ Structural Editorial Open — Awaiting Saraswat&apos;s Voice ]
                </span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          03 — CURRENTLY
          Personal status note, NOT a software dashboard.
          A clean, understated editorial snapshot of Saraswat's current world.
         ========================================================================= */}
      <Section spacing="sm" className="border-t border-[#1a1917] bg-[#0c0b0a]">
        <Container>
          <FadeIn>
            <div className="py-6 sm:py-8 border-y border-[#1c1a18] flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 sm:gap-8">
              <div className="shrink-0">
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#c4a482] font-medium block">
                  CURRENTLY
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#635f58] block mt-0.5">
                  {currentlyData.lastUpdated}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10 flex-1 max-w-4xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#736e65] block">
                    Location
                  </span>
                  <p className="text-sm md:text-base font-serif text-[#FAF9F6]">
                    {currentlyData.location}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#736e65] block">
                    Machine
                  </span>
                  <p className="text-sm md:text-base font-serif text-[#FAF9F6]">
                    {currentlyData.currentMachine}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#736e65] block">
                    Obsession
                  </span>
                  <p className="text-sm md:text-base font-serif text-[#FAF9F6]">
                    {currentlyData.obsession}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#736e65] block">
                    Next
                  </span>
                  <p className="text-sm md:text-base font-serif text-[#FAF9F6]">
                    {currentlyData.nextDestination}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          04 — JOURNAL TEASER
          The heartbeat of the site. Personal notebook rhythm.
          Increased typography contrast, authentic readability.
         ========================================================================= */}
      <Section spacing="default" className="border-t border-[#1a1917]">
        <Container>
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#201e1b] pb-6 sm:pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                  04 / DISPATCHES & THOUGHTS
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight">
                  Journal
                </h2>
              </div>
              <Link
                href="/journal"
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#FAF9F6] transition-colors py-1"
              >
                <span>Read all entries</span>
                <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Editorial notebook entries */}
            <div className="divide-y divide-[#1c1a18]">
              {journalEntries.slice(0, 3).map((entry) => (
                <article
                  key={entry.id}
                  className="group py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors"
                >
                  <div className="md:col-span-4 space-y-1">
                    <time
                      dateTime={entry.date}
                      className="text-sm font-mono text-[#999388] block tracking-wider"
                    >
                      {entry.date}
                    </time>
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#666159]">
                      <span>{entry.type}</span>
                      {entry.location && <span>· {entry.location}</span>}
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors">
                      <Link href={`/journal/${entry.slug}`}>{entry.title}</Link>
                    </h3>
                    <p className="text-base text-[#CBC5BB] font-light leading-relaxed max-w-2xl">
                      {entry.content}
                    </p>
                  </div>

                  <div className="md:col-span-1 text-right hidden md:block">
                    <Link
                      href={`/journal/${entry.slug}`}
                      aria-label={`Read ${entry.title}`}
                      className="text-base font-mono text-[#666159] group-hover:text-[#FAF9F6] transition-colors"
                    >
                      →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          05 — ARCHIVE TEASER
          Asymmetric editorial image composition.
          Large imagery, rich highlights, photographic depth, clearly visible.
         ========================================================================= */}
      <Section id="archive" spacing="lg" className="border-t border-[#1a1917] bg-[#0a0a09]">
        <Container size="wide">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#201e1b] pb-6 sm:pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                  05 / VISUAL MEMORY
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight">
                  Archive
                </h2>
              </div>
              <Link
                href="/archive"
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#FAF9F6] transition-colors py-1"
              >
                <span>Explore the visual archive</span>
                <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Asymmetrical Editorial Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-start">
              {/* Item 1: Prominent wide landscape */}
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <EditorialImage
                  src={archiveItems[0].image.src}
                  alt={archiveItems[0].title}
                  aspectRatio="landscape"
                  caption={archiveItems[0].image.caption}
                  location={archiveItems[0].location}
                  date={archiveItems[0].date}
                />
                <div className="flex items-baseline justify-between pt-1 text-xs font-mono text-[#736e65]">
                  <Link
                    href={`/archive/${archiveItems[0].slug}`}
                    className="text-lg font-serif text-[#FAF9F6] hover:text-[#c4a482] transition-colors"
                  >
                    {archiveItems[0].title}
                  </Link>
                  <span className="text-[10px] uppercase tracking-widest text-[#666159]">
                    {archiveItems[0].category}
                  </span>
                </div>
              </div>

              {/* Item 2: Square format offset */}
              <div className="md:col-span-5 space-y-3 sm:space-y-4 md:pt-16">
                <EditorialImage
                  src={archiveItems[1].image.src}
                  alt={archiveItems[1].title}
                  aspectRatio="square"
                  caption={archiveItems[1].image.caption}
                  location={archiveItems[1].location}
                  date={archiveItems[1].date}
                />
                <div className="flex items-baseline justify-between pt-1 text-xs font-mono text-[#736e65]">
                  <Link
                    href={`/archive/${archiveItems[1].slug}`}
                    className="text-lg font-serif text-[#FAF9F6] hover:text-[#c4a482] transition-colors"
                  >
                    {archiveItems[1].title}
                  </Link>
                  <span className="text-[10px] uppercase tracking-widest text-[#666159]">
                    {archiveItems[1].category}
                  </span>
                </div>
              </div>

              {/* Item 3 & 4: Balanced lower pairing */}
              <div className="md:col-span-6 space-y-3 sm:space-y-4 md:-mt-8">
                <EditorialImage
                  src={archiveItems[2].image.src}
                  alt={archiveItems[2].title}
                  aspectRatio="landscape"
                  caption={archiveItems[2].image.caption}
                  location={archiveItems[2].location}
                  date={archiveItems[2].date}
                />
                <div className="flex items-baseline justify-between pt-1 text-xs font-mono text-[#736e65]">
                  <Link
                    href={`/archive/${archiveItems[2].slug}`}
                    className="text-lg font-serif text-[#FAF9F6] hover:text-[#c4a482] transition-colors"
                  >
                    {archiveItems[2].title}
                  </Link>
                  <span className="text-[10px] uppercase tracking-widest text-[#666159]">
                    {archiveItems[2].category}
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 space-y-3 sm:space-y-4">
                <EditorialImage
                  src={archiveItems[3].image.src}
                  alt={archiveItems[3].title}
                  aspectRatio="landscape"
                  caption={archiveItems[3].image.caption}
                  location={archiveItems[3].location}
                  date={archiveItems[3].date}
                />
                <div className="flex items-baseline justify-between pt-1 text-xs font-mono text-[#736e65]">
                  <Link
                    href={`/archive/${archiveItems[3].slug}`}
                    className="text-lg font-serif text-[#FAF9F6] hover:text-[#c4a482] transition-colors"
                  >
                    {archiveItems[3].title}
                  </Link>
                  <span className="text-[10px] uppercase tracking-widest text-[#666159]">
                    {archiveItems[3].category}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          06 — GARAGE TEASER
          Machines as companions in Saraswat's story, NOT vehicle catalogue.
          Story visually comes first. Large, rich photography.
         ========================================================================= */}
      <Section id="garage" spacing="default" className="border-t border-[#1a1917]">
        <Container>
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#201e1b] pb-6 sm:pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                  06 / THE MACHINES
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight">
                  Garage
                </h2>
              </div>
              <Link
                href="/garage"
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#FAF9F6] transition-colors py-1"
              >
                <span>View all companions</span>
                <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Machine character previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {garageMachines.slice(0, 2).map((machine) => (
                <article key={machine.id} className="space-y-4 sm:space-y-6 group">
                  <EditorialImage
                    src={machine.heroImage.src}
                    alt={`${machine.name} — ${machine.model}`}
                    aspectRatio="landscape"
                    caption={machine.heroImage.caption}
                  />

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#736e65]">
                      <span>{machine.type}</span>
                      <span>·</span>
                      <span className="text-[#c4a482]">{machine.role}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors">
                      <Link href={`/garage/${machine.slug}`}>{machine.name}</Link>
                    </h3>

                    <p className="text-base text-[#CBC5BB] font-light leading-relaxed">
                      {machine.story}
                    </p>

                    <div className="pt-1">
                      <Link
                        href={`/garage/${machine.slug}`}
                        className="inline-block py-1 text-xs font-mono uppercase tracking-wider text-[#c4a482] hover:text-[#FAF9F6] transition-colors"
                      >
                        Read machine lore →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          07 — DRIFT TEASER (PERSONAL INVITATION)
          NOT an event promo or booking product.
          An open door: Saraswat is heading out. Like-minded people can ask to join.
         ========================================================================= */}
      <Section id="drift" spacing="default" className="border-t border-[#1a1917] bg-[#0c0b0a]">
        <Container size="narrow">
          <FadeIn>
            <div className="space-y-8 sm:space-y-10 py-4 sm:py-6 md:py-12">
              {/* Intimate manifesto statement */}
              <div className="space-y-3 sm:space-y-4">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c4a482] block">
                  07 / DRIFT · AN INVITATION
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#FAF9F6] leading-[1.2] tracking-tight">
                  &ldquo;{driftManifesto.tagline}&rdquo;
                </h2>
                <p className="text-base text-[#A8A195] font-light leading-relaxed max-w-xl">
                  Drift is entirely non-commercial. Saraswat charts journeys for himself. 
                  When an upcoming route has an open passenger seat or space in the riding convoy, 
                  fellow wanderers can ask to come along.
                </p>
              </div>

              {/* Quiet upcoming route note */}
              {upcomingDrift && (
                <div className="py-6 border-y border-[#1c1a18] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#736e65] block">
                      Next Planned Route
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-[#FAF9F6]">
                      {upcomingDrift.destination}
                    </h3>
                    <p className="text-xs font-mono text-[#736e65]">
                      {upcomingDrift.dates}
                    </p>
                  </div>

                  <Link
                    href="/drift"
                    className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#c4a482] hover:text-[#FAF9F6] transition-colors pt-2 sm:pt-0"
                  >
                    I&apos;m Interested →
                  </Link>
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
