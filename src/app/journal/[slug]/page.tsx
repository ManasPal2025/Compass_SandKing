import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { EditorialImage } from "@/components/ui/editorial-image";
import { journalEntries } from "@/data/journal";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);

  if (!entry) {
    return {
      title: "Entry Not Found — Saraswat Mishra",
    };
  }

  return {
    title: `${entry.title} — Journal · Saraswat Mishra`,
    description: entry.excerpt || entry.content,
    openGraph: {
      title: `${entry.title} — Saraswat Mishra`,
      description: entry.excerpt || entry.content,
      type: "article",
    },
  };
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entryIndex = journalEntries.findIndex((e) => e.slug === slug);

  if (entryIndex === -1) {
    notFound();
  }

  const entry = journalEntries[entryIndex];
  const prevEntry = entryIndex > 0 ? journalEntries[entryIndex - 1] : null;
  const nextEntry = entryIndex < journalEntries.length - 1 ? journalEntries[entryIndex + 1] : null;

  // Determine photography layout: multiple images vs single image vs none
  const hasMultipleImages = entry.images && entry.images.length > 1;
  const hasSingleImage = !hasMultipleImages && Boolean(entry.image);

  return (
    <Section spacing="default" className="min-h-screen">
      <Container size="narrow">
        <FadeIn>
          {/* Quiet Top Navigation */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <Link
              href="/journal"
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#736e65] hover:text-[#FAF9F6] transition-colors py-2 -ml-2 px-2"
            >
              <span className="text-[#c4a482] group-hover:-translate-x-1 transition-transform">←</span>
              <span>All Journal Entries</span>
            </Link>
          </div>

          <SampleContentNotice className="mb-8 max-w-2xl" />

          <article className="space-y-8 sm:space-y-10 md:space-y-14">
            {/* Entry Header */}
            <header className="space-y-4 sm:space-y-6 border-b border-[#201e1b] pb-6 sm:pb-8 md:pb-12">
              <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs font-mono text-[#736e65] tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <span className="text-[#c4a482]">{entry.type}</span>
                  {entry.location && <span>· {entry.location}</span>}
                </div>
                <div className="flex items-center gap-3">
                  {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
                  {entry.readingTime && (
                    <>
                      {entry.date && <span>·</span>}
                      <span className="text-[#545049]">{entry.readingTime}</span>
                    </>
                  )}
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight leading-[1.14]">
                {entry.title}
              </h1>

              {entry.excerpt && (
                <p className="text-base sm:text-lg md:text-xl font-serif italic text-[#CBC5BB] leading-relaxed pt-1 sm:pt-2">
                  &ldquo;{entry.excerpt}&rdquo;
                </p>
              )}
            </header>

            {/* Single Primary Photography (if present) */}
            {hasSingleImage && entry.image && (
              <figure className="space-y-3">
                <EditorialImage
                  src={entry.image.src}
                  alt={entry.image.alt}
                  aspectRatio={entry.image.aspectRatio || "landscape"}
                  caption={entry.image.caption}
                  location={entry.location}
                  date={entry.date}
                />
              </figure>
            )}

            {/* Main Editorial Text */}
            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-[#CBC5BB] font-light leading-relaxed">
              {entry.bodyParagraphs && entry.bodyParagraphs.length > 0 ? (
                entry.bodyParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-2xl first-letter:font-serif first-letter:text-[#FAF9F6]">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{entry.content}</p>
              )}
            </div>

            {/* Multiple Photography Gallery (if present) */}
            {hasMultipleImages && entry.images && (
              <div className="space-y-8 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {entry.images.map((img, i) => (
                    <div key={i} className="space-y-2">
                      <EditorialImage
                        src={img.src}
                        alt={img.alt}
                        aspectRatio={img.aspectRatio || "landscape"}
                        caption={img.caption}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Footer: Tags */}
            <footer className="pt-6 sm:pt-8 border-t border-[#1c1a18] space-y-4">
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#5c574f]">
                  <span className="text-[#736e65]">Context:</span>
                  {entry.tags.map((tag) => (
                    <span key={tag} className="text-[#8a847b]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </footer>
          </article>

          {/* Sequential Pagination: Previous / Next Entry Navigation */}
          <nav
            aria-label="Journal entry navigation"
            className="mt-12 sm:mt-16 md:mt-24 pt-8 sm:pt-10 border-t border-[#201e1b] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-xs font-mono tracking-wider uppercase"
          >
            {prevEntry ? (
              <Link
                href={`/journal/${prevEntry.slug}`}
                className="group flex flex-col space-y-1.5 p-4 rounded-sm border border-transparent hover:border-[#1e1c1a] hover:bg-[#0c0b0a] transition-all"
              >
                <div className="flex items-center gap-2 text-[10px] text-[#736e65]">
                  <span className="text-[#c4a482] group-hover:-translate-x-1 transition-transform">←</span>
                  <span>Previous Entry</span>
                </div>
                <span className="text-base font-serif normal-case text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors line-clamp-1">
                  {prevEntry.title}
                </span>
                {prevEntry.readingTime && <span className="text-[10px] text-[#545049]">{prevEntry.readingTime}</span>}
              </Link>
            ) : (
              <div />
            )}

            {nextEntry ? (
              <Link
                href={`/journal/${nextEntry.slug}`}
                className="group flex flex-col space-y-1.5 p-4 rounded-sm border border-transparent hover:border-[#1e1c1a] hover:bg-[#0c0b0a] transition-all sm:text-right sm:items-end"
              >
                <div className="flex items-center gap-2 text-[10px] text-[#736e65]">
                  <span>Next Entry</span>
                  <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <span className="text-base font-serif normal-case text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors line-clamp-1">
                  {nextEntry.title}
                </span>
                {nextEntry.readingTime && <span className="text-[10px] text-[#545049]">{nextEntry.readingTime}</span>}
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* Quiet Center Return */}
          <div className="mt-12 text-center">
            <Link
              href="/journal"
              className="text-xs font-mono uppercase tracking-widest text-[#736e65] hover:text-[#FAF9F6] transition-colors"
            >
              Back to Journal Overview
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
