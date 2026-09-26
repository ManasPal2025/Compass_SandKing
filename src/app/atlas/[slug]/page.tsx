import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { EditorialImage } from "@/components/ui/editorial-image";
import { archiveItems } from "@/data/archive";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return archiveItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = archiveItems.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: "Frame Not Found — Saraswat Mishra",
    };
  }

  return {
    title: `${item.title} — Atlas · Saraswat Mishra`,
    description: item.note || item.image.caption || "Visual memory frame from Saraswat Mishra's atlas.",
    openGraph: {
      title: `${item.title} — Atlas · Saraswat Mishra`,
      description: item.note || item.image.caption,
      type: "article",
    },
  };
}

export default async function ArchiveStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const itemIndex = archiveItems.findIndex((i) => i.slug === slug);

  if (itemIndex === -1) {
    notFound();
  }

  const item = archiveItems[itemIndex];
  const prevItem = itemIndex > 0 ? archiveItems[itemIndex - 1] : null;
  const nextItem = itemIndex < archiveItems.length - 1 ? archiveItems[itemIndex + 1] : null;

  return (
    <Section spacing="default" className="min-h-screen">
      <Container size="default">
        <FadeIn>
          {/* Top Return Navigation */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <Link
              href="/atlas"
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#aba59c] hover:text-[#FAF9F6] transition-colors py-2 -ml-2 px-2"
            >
              <span className="text-[#c4a482] group-hover:-translate-x-1 transition-transform">←</span>
              <span>All Atlas Frames</span>
            </Link>
          </div>

          <SampleContentNotice className="mb-8 max-w-2xl" />

          <article className="space-y-8 sm:space-y-12 md:space-y-16">
            {/* Story Header */}
            <header className="space-y-4 sm:space-y-6 border-b border-[#201e1b] pb-6 sm:pb-8 md:pb-12">
              <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs font-mono text-[#aba59c] tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <span className="text-[#c4a482]">{item.category}</span>
                  {item.location && <span>· {item.location}</span>}
                </div>
                {item.date && (
                  <div>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF9F6] tracking-tight leading-[1.14]">
                {item.title}
              </h1>

              {item.note && (
                <p className="text-base sm:text-lg md:text-xl font-serif italic text-[#CBC5BB] leading-relaxed max-w-2xl">
                  &ldquo;{item.note}&rdquo;
                </p>
              )}
            </header>

            {/* Primary Hero Photograph */}
            <figure className="space-y-4">
              <div className="overflow-hidden bg-[#121110]">
                <EditorialImage
                  src={item.image.src}
                  alt={item.image.alt}
                  aspectRatio={item.image.aspectRatio || "landscape"}
                  caption={item.image.caption}
                  location={item.location}
                  date={item.date}
                />
              </div>
            </figure>

            {/* Contextual Narrative Text */}
            <div className="space-y-6 text-base sm:text-lg text-[#CBC5BB] font-light leading-relaxed max-w-2xl">
              {item.storyParagraphs && item.storyParagraphs.length > 0 ? (
                item.storyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                item.note && <p>{item.note}</p>
              )}
            </div>

            {/* Photo Series / Supporting Images (Editorial Sequence, NOT a carousel) */}
            {item.gallery && item.gallery.length > 0 && (
              <div className="space-y-12 pt-6 border-t border-[#1c1a18]">
                <div className="space-y-1">
                  <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#aba59c] block">
                    SERIES FRAMES
                  </span>
                  <h3 className="text-2xl font-serif text-[#FAF9F6]">
                    Supporting Sequence
                  </h3>
                </div>

                <div className="space-y-10">
                  {item.gallery.map((galleryImg, idx) => (
                    <figure key={idx} className="space-y-3">
                      <div className="overflow-hidden bg-[#121110]">
                        <EditorialImage
                          src={galleryImg.src}
                          alt={galleryImg.alt}
                          aspectRatio={galleryImg.aspectRatio || "landscape"}
                          caption={galleryImg.caption}
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Journal Loop Integration */}
            {item.relatedJournalSlug && (
              <div className="p-6 md:p-8 bg-[#0c0b0a] border border-[#1e1c1a] rounded-sm space-y-3">
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#c4a482] block">
                  FROM THE JOURNAL
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-serif text-[#FAF9F6]">
                      {item.relatedJournalTitle || "Related Dispatch"}
                    </h4>
                    <p className="text-xs text-[#aba59c] font-light">
                      Read the roadside observations and field notes written alongside this frame.
                    </p>
                  </div>
                  <Link
                    href={`/journal/${item.relatedJournalSlug}`}
                    className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c4a482] hover:text-[#FAF9F6] transition-colors shrink-0"
                  >
                    <span>Read dispatch</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Footer Metadata */}
            <footer className="pt-6 border-t border-[#1c1a18] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#aba59c] uppercase tracking-wider">
              <div>Filed under {item.category}</div>
            </footer>
          </article>

          {/* Sequential Navigation: Previous / Next Frame */}
          <nav
            aria-label="Atlas frames navigation"
            className="mt-12 sm:mt-16 md:mt-24 pt-8 sm:pt-10 border-t border-[#201e1b] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-xs font-mono tracking-wider uppercase"
          >
            {prevItem ? (
              <Link
                href={`/atlas/${prevItem.slug}`}
                className="group flex flex-col space-y-1.5 p-4 rounded-sm border border-transparent hover:border-[#1e1c1a] hover:bg-[#0c0b0a] transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-[#aba59c]">
                  <span className="text-[#c4a482] group-hover:-translate-x-1 transition-transform">←</span>
                  <span>Previous Frame</span>
                </div>
                <span className="text-base font-serif normal-case text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors line-clamp-1">
                  {prevItem.title}
                </span>
                <span className="text-xs text-[#aba59c]">{prevItem.category}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextItem ? (
              <Link
                href={`/atlas/${nextItem.slug}`}
                className="group flex flex-col space-y-1.5 p-4 rounded-sm border border-transparent hover:border-[#1e1c1a] hover:bg-[#0c0b0a] transition-all sm:text-right sm:items-end"
              >
                <div className="flex items-center gap-2 text-xs text-[#aba59c]">
                  <span>Next Frame</span>
                  <span className="text-[#c4a482] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <span className="text-base font-serif normal-case text-[#FAF9F6] group-hover:text-[#c4a482] transition-colors line-clamp-1">
                  {nextItem.title}
                </span>
                <span className="text-xs text-[#aba59c]">{nextItem.category}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* Quiet Center Return */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/atlas"
              className="inline-block py-2 px-3 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#FAF9F6] transition-colors"
            >
              Back to Atlas
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
