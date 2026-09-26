import React, { Suspense } from "react";
import { Metadata } from "next";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { archiveItems } from "@/data/archive";
import { AtmosphereLayer } from "@/components/atmosphere/atmosphere-layer";
import { ImmersivePageHero } from "@/components/layout/immersive-page-hero";
import { AtlasView } from "@/components/archive/atlas-view";

export const metadata: Metadata = {
  title: "Atlas — Saraswat Mishra",
  description: "Follow the photographs by country and place, or wander the visual archive one frame at a time.",
  openGraph: {
    title: "Atlas — Saraswat Mishra",
    description: "Follow the photographs by country and place, or wander the visual archive one frame at a time.",
    type: "website",
  },
};

export default function AtlasPage() {
  return (
    <>
      <AtmosphereLayer variant="dew" />
      <ImmersivePageHero
        kicker="VISUAL MEMORY"
        title="Atlas"
        description="Follow the photographs by country and place, or wander the visual archive one frame at a time."
        imageSrc="/images/placeholders/archive-ridge.webp"
        imageAlt="A ridge road above a valley filled with cloud"
        actionLabel="Explore by place"
        actionHref="#atlas-explorer"
      />
      <Section id="atlas-content" spacing="default" className="min-h-screen">
        <Container size="wide">
          <FadeIn>
            <Suspense fallback={<div className="min-h-96" />}>
              <AtlasView items={archiveItems} />
            </Suspense>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
