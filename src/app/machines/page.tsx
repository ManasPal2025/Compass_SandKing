import type { Metadata } from "next";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";
import { Section, Container } from "@/components/layout/container";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { MachineCollection } from "@/components/garage/machine-collection";
import { garageMachines } from "@/data/garage";
import { SaddlebagGame } from "@/components/games/saddlebag/saddlebag-game";

export const metadata: Metadata = {
  title: "Machines — Saraswat Mishra",
  description: "A sample collection of road machines, camera equipment, and riding gear.",
};

export default function GaragePage() {
  return (
    <>
      <AtmosphereLayer variant="rain" />
      <ImmersivePageHero
        kicker="MACHINES & GEAR"
        title="Machines"
        description="Cars, motorcycles, cameras, and the gear that gives each kind of day its own character."
        imageSrc="/images/placeholders/garage_bike.jpg"
        imageAlt="An illustrative adventure motorcycle resting on a mountain road"
        actionLabel="Explore the collection"
        actionHref="#machines-collection"
      />
      <Section id="machines-collection" spacing="default">
        <Container size="wide">
          <header className="mb-9 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#c4a482]">ONE COLLECTION, FOUR SHELVES</span>
            <h2 className="mt-3 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">The character matters as much as the machine.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#c6c0b6]">Filter the sample profiles by what moves, what captures, and what helps prepare for the ride.</p>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.14em] text-[#aba59c]">Vehicles and equipment in this collection are presented under mythical editorial names.</p>
          </header>
          <MachineCollection items={garageMachines.map((machine) => {
            const { privateReference, ...rest } = machine;
            void privateReference;
            return rest;
          })} />
        </Container>
      </Section>
      <SaddlebagGame />
    </>
  );
}
