import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";
import { Section, Container } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { SampleContentNotice } from "@/components/ui/sample-content-notice";
import { lifeInterests } from "@/data/between-roads";

export const metadata: Metadata = {
  title: "Between Roads — Saraswat Mishra",
  description: "The interests, rituals, and small joys around the journeys.",
};

export default function BetweenRoadsPage() {
  return (
    <>
      <AtmosphereLayer variant="sunray" />
      <ImmersivePageHero
        kicker="LIFE BETWEEN JOURNEYS"
        title="Between Roads"
        description="The people, rituals, music, and small pleasures that make a life larger than its miles."
        imageSrc="/images/placeholders/archive_trail.jpg"
        imageAlt="A forest path lit by the first light of morning"
        actionLabel="Explore the quieter side"
        actionHref="#life-notes"
      />
      <Section id="life-notes" spacing="default">
        <Container size="wide">
          <FadeIn>
            <div className="mb-8 flex flex-col gap-5 border-b border-[#26221d] pb-7 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#c4a482]">A LIFE IN MANY REGISTERS</span>
                <h2 className="mt-3 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">The things that make room for a fuller life.</h2>
              </div>
              <Link href="/machines" className="inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#d0b18f] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a482]">
                See the machines <span aria-hidden="true">→</span>
              </Link>
            </div>

            <SampleContentNotice className="mb-10 max-w-3xl" />

            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {lifeInterests.map((interest) => (
                <article key={interest.id} className="group">
                  <figure className="relative mb-5 aspect-[4/3] overflow-hidden border border-white/10 bg-[#141210]">
                    <Image src={interest.image} alt={interest.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span className="absolute bottom-3 right-3 border border-white/15 bg-black/70 px-2 py-1 text-xs font-mono uppercase tracking-wider text-white/80">AI image · sample</span>
                  </figure>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#c4a482]">{interest.theme}</span>
                    <span aria-hidden="true" className="font-mono text-xs text-[#aba59c]">{interest.number}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-[#f5f3ef] transition-colors group-hover:text-[#d0b18f]">{interest.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#c6c0b6]">{interest.text}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
