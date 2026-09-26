import React from "react";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { DriftInterestForm } from "@/components/forms/drift-interest-form";
import { driftManifesto, upcomingDrift } from "@/data/drift";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";

export const metadata = {
  title: "DRIFT — Saraswat Mishra",
  description:
    "Drift is an invitation for like-minded people to discover Saraswat's upcoming escapes and express interest in joining him.",
};

export default function DriftPage() {
  return (
    <>
      <AtmosphereLayer variant="sunray" />
      <ImmersivePageHero
        kicker="08 / AN OPEN INVITATION"
        title="Drift"
        description="A slower invitation to share a stretch of road when route, timing, and company come together."
        imageSrc="/images/placeholders/drift-road.webp"
        imageAlt="A sunlit road winding through dry open hills"
        actionLabel="Leave a note"
        actionHref="#drift-interest"
      />
      <Section id="drift-invitation" spacing="default">
        <Container size="narrow">
        <FadeIn>
          <header className="mb-12 border-b border-[#201e1b] pb-8 sm:mb-16 sm:pb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4a482]">
              THE TERMS OF THE ROAD
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#f5f3ef] sm:text-4xl">
              An open invitation, plainly put.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a8a399] sm:text-base">
              {driftManifesto.tagline}
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-px border border-[#25221e] bg-[#25221e] sm:grid-cols-2">
              {driftManifesto.principles.map((principle, index) => (
                <li key={principle} className="flex min-h-24 gap-4 bg-[#100f0e] p-5 sm:p-6">
                  <span className="pt-0.5 font-mono text-[10px] tracking-widest text-[#b08968]">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-[#c4beb4]">{principle}</span>
                </li>
              ))}
            </ul>
          </header>

          {/* Upcoming Drift Card */}
          {upcomingDrift ? (
            <div className="space-y-12 mb-20">
              <div className="border border-[#262421] bg-[#121110] p-6 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#201e1b] pb-4 text-xs font-mono text-[#8c867c]">
                  <span className="uppercase tracking-widest text-[#b08968]">
                    NEXT SCHEDULED ESCAPE
                  </span>
                  <span>{upcomingDrift.duration} · {upcomingDrift.dates}</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#f5f3ef]">
                    {upcomingDrift.title}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#69645c]">
                    📍 {upcomingDrift.destination}
                  </p>
                </div>

                <p className="text-sm md:text-base text-[#a8a399] leading-relaxed font-light">
                  {upcomingDrift.about}
                </p>

                <div className="border-t border-[#1b1a18] pt-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e5a53] block mb-1">
                      GENERAL ROUTE
                    </span>
                    <p className="text-xs font-mono text-[#c4beb4]">
                      {upcomingDrift.generalRoute}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e5a53] block mb-1">
                        SUITABLE FOR
                      </span>
                      <ul className="space-y-1 text-xs text-[#8a847b]">
                        {upcomingDrift.suitableFor.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5e5a53] block mb-1">
                        PRACTICAL REALITY
                      </span>
                      <ul className="space-y-1 text-xs text-[#8a847b]">
                        {upcomingDrift.expectations.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expression of Interest */}
              <DriftInterestForm />
            </div>
          ) : (
            <div className="space-y-8 mb-20">
              <div className="mb-12 border-y border-[#1f1d1a] py-7 sm:py-9">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b08968]">
                  WHEN A ROUTE IS SET
                </span>
                <p className="mt-3 max-w-2xl font-serif text-xl leading-relaxed text-[#e0dbd3] sm:text-2xl">
                  The next journey will appear here once its route and timing are confirmed.
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#918b82]">
                  Until then, you can leave a note about the kind of road you would like to share.
                </p>
              </div>
              <DriftInterestForm />
            </div>
          )}
        </FadeIn>
        </Container>
      </Section>
    </>
  );
}
