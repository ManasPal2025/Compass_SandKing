import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { DriftInterestForm } from "@/components/forms/drift-interest-form";
import { upcomingDrift } from "@/data/drift";

export async function generateStaticParams() {
  if (!upcomingDrift) return [];
  return [{ slug: upcomingDrift.slug }];
}

export default async function DriftTripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!upcomingDrift || upcomingDrift.slug !== slug) {
    notFound();
  }

  return (
    <Section spacing="default">
      <Container size="narrow">
        <FadeIn>
          {/* Back link */}
          <div className="mb-12">
            <Link
              href="/drift"
              className="text-xs font-mono tracking-widest uppercase text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
            >
              ← Back to Drift
            </Link>
          </div>

          <article className="space-y-12">
            {/* Header */}
            <div className="space-y-3 border-b border-[#201e1b] pb-8">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#aba59c]">
                <span className="text-[#c4a482] uppercase tracking-widest">
                  EXPEDITION PROFILE
                </span>
                <span>{upcomingDrift.duration} · {upcomingDrift.dates}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-serif text-[#f5f3ef] tracking-tight">
                {upcomingDrift.title}
              </h1>
              <p className="text-xs font-mono uppercase tracking-wider text-[#aba59c]">
                📍 {upcomingDrift.destination}
              </p>
            </div>

            {/* About */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#aba59c] block">
                WHAT THIS ROAD IS ABOUT
              </span>
              <p className="text-base sm:text-lg text-[#cbc5bb] font-light leading-relaxed">
                {upcomingDrift.about}
              </p>
            </div>

            {/* Route & Practicalities */}
            <div className="border-t border-[#1f1d1b] pt-8 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#aba59c] block mb-2">
                  ROUTE OUTLINE
                </span>
                <p className="text-xs font-mono text-[#f5f3ef] bg-[#141312] border border-[#22201e] p-4">
                  {upcomingDrift.generalRoute}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#aba59c] block">
                    WHO SHOULD COME
                  </span>
                  <ul className="space-y-1 text-xs text-[#aba59c]">
                    {upcomingDrift.suitableFor.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#c4a482]">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#aba59c] block">
                    PRACTICAL REALITY
                  </span>
                  <ul className="space-y-1 text-xs text-[#aba59c]">
                    {upcomingDrift.expectations.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#c4a482]">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Commercial Expression of Interest */}
            <div className="pt-8 border-t border-[#201e1b]">
              <DriftInterestForm />
            </div>
          </article>
        </FadeIn>
      </Container>
    </Section>
  );
}
