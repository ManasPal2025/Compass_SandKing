"use client";

import React from "react";
import Link from "next/link";
import { Camera, Package, Coffee, ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";

const ROADSIDE_GAMES = [
  {
    id: "where-in-the-world",
    title: "Where in the World?",
    tagline: "Guess the country from one frame.",
    duration: "~2 min",
    href: "/atlas#photo-guessing-game",
    icon: Camera,
  },
  {
    id: "pack-the-saddlebag",
    title: "Pack the Saddlebag",
    tagline: "Five trips, limited space, no mercy.",
    duration: "~8 min",
    href: "/machines#pack-the-saddlebag",
    icon: Package,
  },
  {
    id: "chai-stop-or-keep-riding",
    title: "Chai Stop or Keep Riding?",
    tagline: "Reach the lake by sunset. Or don't.",
    duration: "~4 min",
    href: "/drift#chai-stop-or-keep-riding",
    icon: Coffee,
  },
];

export function RoadsideGamesStrip() {
  return (
    <Section id="roadside-games" spacing="default" className="border-t border-[#201e1b] bg-[#0c0b0a]">
      <Container size="wide">
        <FadeIn>
          <header className="mb-8 md:mb-12 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#c4a482] block">
              BETWEEN THE MILES
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#f5f3ef] tracking-tight">
              Three roadside games
            </h2>
            <p className="mt-2 text-sm text-[#aba59c] leading-relaxed">
              Quiet diversions for the fuel stops, the roadside pauses, and the hours when the road stays in your mind.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ROADSIDE_GAMES.map((game) => {
              const Icon = game.icon;
              return (
                <Link
                  key={game.id}
                  href={game.href}
                  className="group p-6 bg-[#141312] border border-[#22201e] hover:border-[#c4a482] rounded-sm flex flex-col justify-between space-y-6 transition-all min-h-[160px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-[#1b1a18] rounded-sm text-[#c4a482] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-mono text-[#aba59c]">
                        {game.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif text-[#f5f3ef] group-hover:text-[#c4a482] transition-colors flex items-center gap-1.5">
                        <span>{game.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#c4a482]" />
                      </h3>
                      <p className="mt-1.5 text-xs text-[#aba59c] leading-relaxed">
                        {game.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1e1c1a] text-xs font-mono text-[#c4a482] uppercase tracking-wider flex items-center justify-between">
                    <span>Play game</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
