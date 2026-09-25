import React from "react";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { DriftInterestForm } from "@/components/forms/drift-interest-form";
import { driftManifesto, upcomingDrift } from "@/data/drift";

export const metadata = {
  title: "DRIFT — Saraswat Mishra",
  description:
    "Drift is an invitation for like-minded people to discover Saraswat's upcoming escapes and express interest in joining him.",
};

export default function DriftPage() {
  return (
    <Section spacing="default">
      <Container size="narrow">
        <FadeIn>
          {/* Header & Manifesto */}
          <div className="space-y-6 mb-16 md:mb-20 border-b border-[#201e1b] pb-12">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#736e66] block">
              SECTION 07 / INVITATION
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#f5f3ef] tracking-tight">
              Drift
            </h1>
            <p className="text-base sm:text-lg font-serif italic text-[#c4beb4] leading-relaxed">
              &ldquo;{driftManifesto.tagline}&rdquo;
            </p>

            {/* Non-Commercial Manifesto Principles */}
            <div className="pt-6 space-y-3 border-t border-[#1b1917]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#635f57] block">
                WHAT THIS IS (AND IS NOT)
              </span>
              <ul className="space-y-2 text-xs font-mono text-[#8a847b]">
                {driftManifesto.principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-2">
                    <span className="text-[#b08968]">―</span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
            <div className="border border-[#1f1d1a] bg-[#121110] p-12 text-center space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#706b62]">
                STATUS
              </span>
              <p className="text-sm font-mono text-[#a39e94]">
                No scheduled group drift currently open. Routes are charted as the seasons change.
              </p>
            </div>
          )}
        </FadeIn>
      </Container>
    </Section>
  );
}
