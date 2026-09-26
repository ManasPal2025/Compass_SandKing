import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { EditorialImage } from "@/components/ui/editorial-image";
import { journalEntries } from "@/data/journal";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";

export const metadata: Metadata = {
  title: "Journal — Saraswat Mishra",
  description: "Road notes, roadside observations, thoughts, and mechanical fragments from Saraswat Mishra's personal notebook.",
  openGraph: {
    title: "Journal — Saraswat Mishra",
    description: "Road notes, roadside observations, thoughts, and mechanical fragments.",
    type: "website",
  },
};

export default function JournalPage() {
  return (
    <>
      <AtmosphereLayer variant="lightning" />
      <ImmersivePageHero
        kicker="04 / NOTEBOOK & DISPATCHES"
        title="Journal"
        description="Roadside observations, mechanical pauses, and small thoughts from the moments when the engine is off."
        imageSrc="/images/placeholders/journal-pass.webp"
        imageAlt="An empty mountain road emerging through morning mist"
        actionLabel="Open the notebook"
        actionHref="#journal-entries"
      />
      <Section id="journal-entries" spacing="default" className="min-h-screen">
        <Container size="default">
        <FadeIn>
          <header className="mb-8 flex flex-col gap-3 border-b border-[#201e1b] pb-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c4a482] block">
                FROM THE NOTEBOOK
              </span>
              <p className="mt-2 text-sm text-[#9e988e]">A few thoughts, kept in order of their arrival.</p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#777168]">
              {journalEntries.length} notes
            </span>
          </header>

          {/* Chronological Stream of Entries with Varied Editorial Rhythm */}
          <div className="divide-y divide-[#1a1917]">
            {journalEntries.map((entry, index) => {
              const variant = entry.layoutVariant || (index % 2 === 0 ? "prominent" : "compact");

              // VARIANT: PROMINENT (Title + Excerpt + Optional Visual Preview)
              if (variant === "prominent") {
                return (
                  <article key={entry.id} className="group py-8 sm:py-12 md:py-16">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-10 items-start"
                    >
                      {/* Meta Column */}
                      <div className="md:col-span-3 space-y-1 sm:space-y-2">
                        {entry.date && (
                          <time
                            dateTime={entry.date}
                            className="text-xs font-mono text-[#999388] tracking-wider block"
                          >
                            {entry.date}
                          </time>
                        )}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#666159]">
                          <span>{entry.type}</span>
                          {entry.location && <span>· {entry.location}</span>}
                        </div>
                        {entry.readingTime && (
                          <span className="text-[10px] font-mono text-[#545049] block">
                            {entry.readingTime}
                          </span>
                        )}
                      </div>

                      {/* Editorial Content Column */}
                      <div className={`space-y-3 sm:space-y-4 ${entry.image ? "md:col-span-5" : "md:col-span-8"}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors leading-[1.2]">
                          {entry.title}
                        </h2>
                        <p className="text-base text-[#CBC5BB] font-light leading-relaxed">
                          {entry.excerpt || entry.content}
                        </p>
                        {entry.tags && (
                          <div className="flex items-center gap-2 pt-1 text-[10px] font-mono uppercase tracking-wider text-[#545049]">
                            {entry.tags.map((tag) => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Optional Thumbnail Frame */}
                      {entry.image && (
                        <div className="md:col-span-4 mt-2 md:mt-0">
                          <EditorialImage
                            src={entry.image.src}
                            alt={entry.image.alt}
                            aspectRatio="landscape"
                            caption={entry.image.caption}
                          />
                        </div>
                      )}
                    </Link>
                  </article>
                );
              }

              // VARIANT: FEATURED (Bold Typography + Machine Lore / Dual Context)
              if (variant === "featured") {
                return (
                  <article key={entry.id} className="group py-10 sm:py-14 md:py-20 bg-[#0d0c0b]/50 -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-sm">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="block space-y-5 sm:space-y-6"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3 sm:gap-4 border-b border-[#201e1b] pb-3 sm:pb-4">
                        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#736e65]">
                          <span className="text-[#c4a482]">{entry.type}</span>
                          {entry.location && <span>· {entry.location}</span>}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-[#8a847b]">
                          {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
                          {entry.readingTime && (
                            <span>{entry.date ? "· " : ""}{entry.readingTime}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors leading-[1.15]">
                            {entry.title}
                          </h2>
                          <p className="text-base sm:text-lg text-[#CBC5BB] font-light leading-relaxed max-w-xl">
                            {entry.excerpt || entry.content}
                          </p>
                          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c4a482] pt-2">
                            <span>Read note</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>

                        {entry.image && (
                          <div className="lg:col-span-5">
                            <EditorialImage
                              src={entry.image.src}
                              alt={entry.image.alt}
                              aspectRatio="landscape"
                              caption={entry.image.caption}
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                );
              }

              // VARIANT: FRAGMENT (Minimal reflective thought / quote rhythm)
              if (variant === "fragment") {
                return (
                  <article key={entry.id} className="group py-8 sm:py-12 md:py-16">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="block space-y-3 sm:space-y-4 max-w-2xl mx-auto text-center md:text-left md:mx-0"
                    >
                      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-[#666159] justify-center md:justify-start">
                        <span>{entry.type}</span>
                        {entry.date && (
                          <>
                            <span>·</span>
                            <time dateTime={entry.date}>{entry.date}</time>
                          </>
                        )}
                      </div>

                      <blockquote className="text-xl sm:text-3xl md:text-4xl font-serif text-[#FAF9F6] italic group-hover:text-[#c4a482] transition-colors leading-[1.25]">
                        &ldquo;{entry.excerpt || entry.title}&rdquo;
                      </blockquote>

                      <p className="text-sm text-[#8a847b] font-light max-w-xl mx-auto md:mx-0">
                        {entry.content}
                      </p>
                    </Link>
                  </article>
                );
              }

              // VARIANT: COMPACT (Lean Horizontal Row)
              return (
                <article key={entry.id} className="group py-6 sm:py-8 md:py-10">
                  <Link
                    href={`/journal/${entry.slug}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
                  >
                    <div className="md:col-span-3 text-xs font-mono text-[#736e65] tracking-wider">
                      <span className="uppercase">{entry.type}</span>
                      {entry.date && <time dateTime={entry.date} className="block">{entry.date}</time>}
                    </div>

                    <div className="md:col-span-8 space-y-1">
                      <h2 className="text-xl sm:text-2xl font-serif text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors">
                        {entry.title}
                      </h2>
                      <p className="text-sm text-[#999388] font-light line-clamp-2">
                        {entry.excerpt || entry.content}
                      </p>
                    </div>

                    <div className="md:col-span-1 text-right hidden md:block">
                      <span className="text-sm font-mono text-[#545049] group-hover:text-[#FAF9F6] group-hover:translate-x-1 inline-block transition-all">
                        →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </FadeIn>
        </Container>
      </Section>
    </>
  );
}
