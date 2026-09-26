import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { FadeIn } from "@/components/layout/fade-in";
import { siteConfig } from "@/data/navigation";
import { journalEntries } from "@/data/journal";
import { archiveItems } from "@/data/archive";
import { garageMachines } from "@/data/garage";
import { driftManifesto } from "@/data/drift";
import { lifeInterests } from "@/data/between-roads";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { JourneyFilm } from "@/components/journey/journey-film";
import { CinematicFilmPlayer } from "@/components/journey/cinematic-film-player";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";

const journalPreviewImages = [
  {
    src: "/images/placeholders/journal-pass.webp",
    alt: "Empty mountain road appearing through dawn mist",
  },
  {
    src: "/images/placeholders/archive-ridge.webp",
    alt: "A narrow ridge track above a sea of clouds",
  },
  {
    src: "/images/placeholders/journal-repair.webp",
    alt: "Unbranded adventure motorcycle resting after rain",
  },
];

export default function HomePage() {
  return (
    <JourneyFilm>
    <div className="w-full flex flex-col selection:bg-[#2b2723] selection:text-[#f5f3ef]">
      <AtmosphereLayer variant="blossom" />
      {/* =========================================================================
          01 — HERO (CINEMATIC SCENE — 100SVH)
          A full-viewport cinematic frame where the landscape owns the screen.
          The photograph is clearly visible with natural contrast and highlights.
          Edge falloffs surround and dissolve the photograph without smothering it.
         ========================================================================= */}
      <section id="opening" className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[700px] -mt-20 sm:-mt-24 md:-mt-28 overflow-hidden flex flex-col justify-end pb-10 sm:pb-16 md:pb-24">
        {/* Layer 0: High-Resolution Photographic Scene — Visible, Sharp, Rich */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/placeholders/hero_road.jpg"
            alt="A winding mountain road emerging through morning mist"
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

        <span className="absolute bottom-4 right-5 z-20 text-[8px] font-mono uppercase tracking-[0.14em] text-white/55 sm:bottom-6 sm:right-8 sm:text-[9px]">
          AI-generated photo study · not original photography
        </span>

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

              <a
                href="#cold-open"
                className="mt-4 inline-flex min-h-11 items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#e2ddd5] hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a482]"
              >
                Scroll to explore <span className="text-[#c4a482]" aria-hidden="true">↓</span>
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================================
          02 — COLD OPEN
          A thought encountered in negative space.
          Strong visual statement, generous whitespace, reduced emptiness.
         ========================================================================= */}
      <Section id="cold-open" spacing="default">
        <Container size="narrow">
          <FadeIn>
            <div className="space-y-6 sm:space-y-8 py-4 sm:py-6 md:py-12">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                02 / COLD OPEN
              </span>

              <div className="space-y-4 sm:space-y-6 max-w-3xl">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif text-[#FAF9F6] font-normal leading-[1.15] tracking-tight">
                  Some people collect things.
                  <br />
                  <span className="text-[#c4a482] italic font-normal">Others collect roads.</span>
                </h2>

                <p className="text-base sm:text-lg font-light text-[#A8A195] leading-relaxed max-w-xl font-sans">
                  Machines. Solitary dawns. Mechanical pauses. Unplanned turns. 
                  Stories that begin with an open fuel tank and no fixed deadline to turn around.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1917]">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#524d45] block">
                  The best part is often the unplanned pause.
                </span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <CinematicFilmPlayer />

      {/* =========================================================================
          04 — JOURNAL TEASER
          The heartbeat of the site. Personal notebook rhythm.
          Increased typography contrast, authentic readability.
         ========================================================================= */}
      <Section id="journal" spacing="default" className="border-t border-[#1a1917]">
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
              {journalEntries.slice(0, 3).map((entry, index) => (
                <article
                  key={entry.id}
                  className="group py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start transition-colors"
                >
                  <div className="md:col-span-2 space-y-1">
                    {entry.date && (
                      <time
                        dateTime={entry.date}
                        className="text-sm font-mono text-[#999388] block tracking-wider"
                      >
                        {entry.date}
                      </time>
                    )}
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#666159]">
                      <span>{entry.type}</span>
                      {entry.location && <span>· {entry.location}</span>}
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <EditorialImage
                      src={journalPreviewImages[index].src}
                      alt={journalPreviewImages[index].alt}
                      aspectRatio="landscape"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      caption="AI-generated photo study · not original photography."
                    />
                  </div>

                  <div className="md:col-span-6 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors">
                      <Link href={`/journal/${entry.slug}`}>{entry.title}</Link>
                    </h3>
                    <p className="text-base text-[#CBC5BB] font-light leading-relaxed max-w-2xl">
                      {entry.content}
                    </p>
                  </div>

                  <div className="md:col-span-1 text-right hidden md:block">
                    <span
                      aria-hidden="true"
                      className="text-base font-mono text-[#666159] group-hover:text-[#FAF9F6] transition-colors"
                    >
                      →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          05 — ATLAS TEASER
          Asymmetric editorial image composition.
          Large imagery, rich highlights, photographic depth, clearly visible.
         ========================================================================= */}
      <Section id="atlas" spacing="lg" className="border-t border-[#1a1917]">
        <Container size="wide">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#201e1b] pb-6 sm:pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                  05 / VISUAL MEMORY
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight">
                  Atlas
                </h2>
              </div>
              <Link
                href="/atlas"
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
                    href={`/atlas/${archiveItems[0].slug}`}
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
                    href={`/atlas/${archiveItems[1].slug}`}
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
                    href={`/atlas/${archiveItems[2].slug}`}
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
                    href={`/atlas/${archiveItems[3].slug}`}
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

            <div className="mt-10 flex flex-col gap-4 border-t border-[#201e1b] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#a8a195]">Follow a place through its photographs—or try to recognize it from one frame.</p>
              <Link href="/atlas#photo-guessing-game" className="inline-flex min-h-11 items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#c4a482] hover:text-[#f5f3ef]">
                Play Where in the World? <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          06 — MACHINES TEASER
          Machines as companions in Saraswat's story, NOT vehicle catalogue.
          Story visually comes first. Large, rich photography.
         ========================================================================= */}
      <Section id="machines" spacing="default" className="border-t border-[#1a1917]">
        <Container>
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#201e1b] pb-6 sm:pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#736e65] block">
                  06 / MACHINES & GEAR
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight">
                  Machines
                </h2>
              </div>
              <Link
                href="/machines"
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#FAF9F6] transition-colors py-1"
              >
                <span>Explore the collection</span>
                <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Machine character previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {garageMachines.slice(0, 2).map((machine) => (
                <article key={machine.id} className="space-y-4 sm:space-y-6 group">
                  <EditorialImage
                    src={machine.heroImage.src}
                    alt={machine.heroImage.alt}
                    aspectRatio="landscape"
                    caption={machine.heroImage.caption}
                  />

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#aba59c]">
                      <span>{machine.type}</span>
                      <span>·</span>
                      <span className="text-[#c4a482]">{machine.role}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors">
                      <Link href={`/machines/${machine.slug}`}>{machine.name}</Link>
                    </h3>

                    <p className="text-base text-[#CBC5BB] font-light leading-relaxed">
                      {machine.story}
                    </p>

                    <div className="pt-1">
                      <span
                        aria-hidden="true"
                        className="inline-block py-1 text-xs font-mono uppercase tracking-wider text-[#c4a482] group-hover:text-[#FAF9F6] transition-colors"
                      >
                        Read machine lore →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section id="between-roads" spacing="default" className="border-t border-[#1a1917]">
        <Container size="wide">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-4 border-b border-[#201e1b] pb-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4a482]">07 / LIFE BETWEEN JOURNEYS</span>
                <h2 className="mt-2 font-serif text-3xl tracking-tight text-[#f5f3ef] sm:text-5xl">Between Roads</h2>
              </div>
              <Link href="/between-roads" className="group inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#aaa398] hover:text-white">
                <span>Explore what grounds him</span><span aria-hidden="true" className="text-[#c4a482] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <SampleContentNotice className="mb-8 max-w-3xl" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {lifeInterests.slice(0, 3).map((interest) => (
                <Link href="/between-roads" key={interest.id} className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a482]">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden border border-white/10 bg-[#141210]">
                    <Image src={interest.image} alt={interest.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-white/75">Sample image</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#c4a482]">{interest.theme}</span>
                  <h3 className="mt-1 font-serif text-xl text-[#f5f3ef] group-hover:text-[#d0b18f]">{interest.title}</h3>
                </Link>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* =========================================================================
                  08 — DRIFT TEASER (PERSONAL INVITATION)
          NOT an event promo or booking product.
          An open door: Saraswat is heading out. Like-minded people can ask to join.
         ========================================================================= */}
      <Section id="drift" spacing="default" className="border-t border-[#1a1917]">
        <Container size="wide">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-4 sm:py-6 md:py-12">
              <div className="md:col-span-5">
                <EditorialImage
                  src="/images/placeholders/drift-road.webp"
                  alt="A sunlit road winding through dry open hills"
                  aspectRatio="landscape"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  caption="AI-generated photo study · not original photography."
                />
              </div>

              <div className="md:col-span-7 space-y-8 sm:space-y-10">
                {/* Intimate manifesto statement */}
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c4a482] block">
                    08 / DRIFT · AN INVITATION
                  </span>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#FAF9F6] leading-[1.2] tracking-tight">
                    &ldquo;{driftManifesto.tagline}&rdquo;
                  </h2>
                  <p className="text-base text-[#A8A195] font-light leading-relaxed max-w-xl">
                    Drift is non-commercial: an invitation to share a stretch of road when the
                    route, timing, and company align.
                  </p>
                </div>

                <Link
                  href="/drift"
                  className="inline-flex min-h-11 items-center text-xs font-mono uppercase tracking-[0.25em] text-[#c4a482] hover:text-[#FAF9F6] transition-colors"
                >
                  Explore Drift →
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
    </JourneyFilm>
  );
}
