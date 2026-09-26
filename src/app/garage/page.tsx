import React from "react";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { EditorialImage } from "@/components/ui/editorial-image";
import { garageMachines } from "@/data/garage";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";

export const metadata = {
  title: "GARAGE — Saraswat Mishra",
  description: "Machines treated as characters in Saraswat's journey.",
};

export default function GaragePage() {
  return (
    <Section spacing="default">
      <AtmosphereLayer variant="rain" />
      <Container>
        <FadeIn>
          {/* Header */}
          <div className="space-y-4 mb-16 md:mb-24 border-b border-[#201e1b] pb-12">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#736e66] block">
              SECTION 06 / MACHINES
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#f5f3ef] tracking-tight">
              Garage
            </h1>
            <p className="text-sm font-mono text-[#8a847b] max-w-lg leading-relaxed">
              These are not trophies or spec sheets. They are companions that turned perfectly ordinary weekends into thousands of kilometres of road.
            </p>
          </div>

          {/* Machine Profiles */}
          <div className="space-y-24 md:space-y-36">
            {garageMachines.map((machine, index) => (
              <article
                key={machine.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
              >
                {/* Visual Frame */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <EditorialImage
                    alt={`${machine.name} — ${machine.model}`}
                    aspectRatio="landscape"
                    caption={machine.heroImage.caption}
                  />
                </div>

                {/* Narrative Lore */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8c867c]">
                      {machine.type} · {machine.year}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#f5f3ef]">
                      {machine.name}
                    </h2>
                    <p className="text-xs font-mono text-[#615c54] uppercase tracking-wider">
                      {machine.model}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-[#a8a399] leading-relaxed font-light">
                    {machine.story}
                  </p>

                  {/* Character Notes */}
                  <div className="border-t border-[#1f1d1b] pt-6 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#736e65] block">
                      CHARACTERISTICS
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

                  {/* Minimal Specs */}
                  {machine.specs && (
                    <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#666159] border-t border-[#1c1a18]">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#4a4742]">Displacement</span>
                        <span className="text-[#c4beb4]">{machine.specs.displacement}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#4a4742]">Character</span>
                        <span className="text-[#c4beb4]">{machine.specs.characterTrait}</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
