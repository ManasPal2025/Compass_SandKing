"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, VolumeX } from "lucide-react";

const FILM_LENGTH = 30;
const FILM_SCENES = [
  { src: "/images/placeholders/journal-pass.webp", alt: "A mountain road appearing through morning mist", title: "Before the day begins" },
  { src: "/images/placeholders/garage_bike.jpg", alt: "A motorcycle paused on a high mountain road", title: "Choose the longer way" },
  { src: "/images/placeholders/archive-ridge.webp", alt: "A narrow track across a cloud-covered ridge", title: "Let the landscape lead" },
  { src: "/images/placeholders/journal-repair.webp", alt: "A motorcycle resting after a rainy ride", title: "Make room for the pause" },
  { src: "/images/placeholders/drift-road.webp", alt: "A quiet road crossing sunlit hills", title: "Keep a little road ahead" },
];

function formatTime(value: number) {
  const seconds = Math.min(FILM_LENGTH, Math.floor(value));
  return `0:${String(seconds).padStart(2, "0")}`;
}

export function CinematicFilmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const sceneIndex = Math.min(FILM_SCENES.length - 1, Math.floor(elapsed / (FILM_LENGTH / FILM_SCENES.length)));
  const scene = FILM_SCENES[sceneIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current + 0.25 >= FILM_LENGTH) {
          setIsPlaying(false);
          return FILM_LENGTH;
        }
        return current + 0.25;
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const restart = () => {
    setElapsed(0);
    setIsPlaying(true);
  };

  return (
    <section id="film" className="border-y border-white/[0.08] bg-[#100f0e] py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-6 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="space-y-5 md:col-span-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4a482]">03 / A SHORT ROAD FILM</span>
          <h2 className="font-serif text-4xl leading-tight text-[#f5f3ef] sm:text-5xl">Thirty seconds between departures.</h2>
          <p className="max-w-md text-sm leading-relaxed text-[#aaa398] sm:text-base">
            A visual sketch of the world this site is about. The final film will use Saraswat&apos;s own approved footage and voice.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.13em] text-[#777168]">Concept animatic · AI-generated images · no real footage or audio</p>
        </div>

        <div className="md:col-span-8">
          <div className="relative isolate aspect-video overflow-hidden border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
            {FILM_SCENES.map((frame, index) => (
              <div key={frame.src} className={`absolute inset-0 -z-10 transition-opacity duration-1000 motion-reduce:transition-none ${index === sceneIndex ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                <Image src={frame.src} alt="" fill sizes="(max-width: 768px) 100vw, 65vw" className="object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 -z-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
            <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-4 sm:inset-x-7 sm:top-7">
              <span aria-live="polite" className="max-w-[70%] text-[10px] font-mono uppercase tracking-[0.18em] text-white/80 sm:text-xs">{scene.title}</span>
              <span className="inline-flex items-center gap-1.5 border border-white/25 bg-black/30 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider text-white/75 backdrop-blur-sm"><VolumeX aria-hidden="true" size={12} /> Silent study</span>
            </div>
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
              <p className="max-w-xs text-xs leading-relaxed text-white/70 sm:text-sm">{scene.alt}</p>
              <button
                type="button"
                onClick={() => elapsed >= FILM_LENGTH ? restart() : setIsPlaying((playing) => !playing)}
                aria-label={elapsed >= FILM_LENGTH ? "Replay the 30-second concept film" : isPlaying ? "Pause the concept film" : "Play the 30-second concept film"}
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white text-[#141210] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-16 sm:w-16"
              >
                {elapsed >= FILM_LENGTH ? <RotateCcw aria-hidden="true" size={19} /> : isPlaying ? <Pause aria-hidden="true" size={21} /> : <Play aria-hidden="true" size={21} className="translate-x-0.5" />}
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/20" aria-hidden="true">
              <div className="h-full bg-[#d3b28f] transition-[width] duration-200" style={{ width: `${(elapsed / FILM_LENGTH) * 100}%` }} />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#827b71]" aria-label="Film time">
            <span>{formatTime(elapsed)}</span><span>0:30</span>
          </div>
        </div>
      </div>
    </section>
  );
}
