import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { EditorialImage } from "@/components/ui/editorial-image";
import { garageMachines } from "@/data/garage";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const machine = garageMachines.find((item) => item.slug === slug || item.legacySlugs?.includes(slug));
  return machine
    ? { title: `${machine.name} — Machines · Saraswat Mishra`, description: machine.story }
    : { title: "Machine not found — Saraswat Mishra" };
}

export async function generateStaticParams() {
  const paramsList: Array<{ slug: string }> = [];
  for (const machine of garageMachines) {
    paramsList.push({ slug: machine.slug });
    if (machine.legacySlugs) {
      for (const legacy of machine.legacySlugs) {
        paramsList.push({ slug: legacy });
      }
    }
  }
  return paramsList;
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const machine = garageMachines.find((m) => m.slug === slug || m.legacySlugs?.includes(slug));

  if (!machine) {
    notFound();
  }

  return (
    <Section spacing="default">
      <Container size="narrow">
        <FadeIn>
          {/* Back link */}
          <div className="mb-12">
            <Link
              href="/garage"
              className="text-xs font-mono tracking-widest uppercase text-[#736e65] hover:text-[#f5f3ef] transition-colors"
            >
              ← Back to Garage
            </Link>
          </div>

          <SampleContentNotice className="mb-8 max-w-2xl" />

          <article className="space-y-12">
            {/* Header */}
            <div className="space-y-2 border-b border-[#201e1b] pb-8">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8c867c]">
                {machine.type}{machine.year ? ` · ${machine.year}` : ""} · {machine.role}
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif text-[#f5f3ef] tracking-tight">
                {machine.name}
              </h1>
              {machine.model && <p className="text-xs font-mono uppercase tracking-wider text-[#69645c]">{machine.model}</p>}
            </div>

            {/* Hero Visual Frame */}
            <EditorialImage
              src={machine.heroImage.src}
              alt={machine.heroImage.alt}
              aspectRatio="landscape"
              caption={machine.heroImage.caption}
            />

            {/* Narrative: Story First */}
            <div className="space-y-6 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#736e65] block">
                THE STORY & LORE
              </span>
              <p className="text-base sm:text-lg text-[#cbc5bb] font-light leading-relaxed">
                {machine.story}
              </p>
            </div>

            <div className="grid gap-6 border-l border-[#8f7155] py-2 pl-5 sm:grid-cols-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#81766b]">Sample motto</span>
                <p className="mt-2 font-serif text-xl italic text-[#e0d4c7]">“{machine.sampleMotto}”</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#81766b]">Sample role</span>
                <p className="mt-2 text-sm leading-relaxed text-[#aaa398]">{machine.sampleUse}</p>
              </div>
            </div>

            {/* Character Notes */}
            <div className="border-t border-[#1f1d1b] pt-8 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#736e65] block">
                CHARACTERISTICS & TRAITS
              </span>
              <ul className="space-y-2 text-xs font-mono text-[#8a847b]">
                {machine.keyNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="text-[#b08968]">―</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Second */}
            {machine.specs && (
              <div className="border-t border-[#1f1d1b] pt-8 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#736e65] block">
                  MECHANICAL NOTES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono">
                  {machine.specs.displacement && (
                    <div>
                      <span className="block text-[10px] uppercase text-[#545049]">Engine</span>
                      <span className="text-[#f5f3ef] mt-0.5 block">{machine.specs.displacement}</span>
                    </div>
                  )}
                  {machine.specs.power && (
                    <div>
                      <span className="block text-[10px] uppercase text-[#545049]">Output</span>
                      <span className="text-[#f5f3ef] mt-0.5 block">{machine.specs.power}</span>
                    </div>
                  )}
                  {machine.specs.range && (
                    <div>
                      <span className="block text-[10px] uppercase text-[#545049]">Range</span>
                      <span className="text-[#f5f3ef] mt-0.5 block">{machine.specs.range}</span>
                    </div>
                  )}
                  {machine.specs.characterTrait && (
                    <div className="col-span-2">
                      <span className="block text-[10px] uppercase text-[#545049]">Temperament</span>
                      <span className="text-[#f5f3ef] mt-0.5 block">{machine.specs.characterTrait}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        </FadeIn>
      </Container>
    </Section>
  );
}
