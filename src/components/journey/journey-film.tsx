"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface JourneyFilmProps {
  children: React.ReactNode;
}

const journeyStops = [
  { id: "opening", number: "01", label: "Opening", image: "/images/placeholders/hero_road.jpg" },
  { id: "cold-open", number: "02", label: "Cold Open", image: "/images/placeholders/hero_road.jpg" },
  { id: "film", number: "03", label: "Road Film", image: "/images/placeholders/journal-pass.webp" },
  { id: "journal", number: "04", label: "Journal", image: "/images/placeholders/journal-pass.webp" },
  { id: "atlas", number: "05", label: "Atlas", image: "/images/placeholders/archive-ridge.webp" },
  { id: "machines", number: "06", label: "Machines", image: "/images/placeholders/garage_bike.jpg" },
  { id: "between-roads", number: "07", label: "Between Roads", image: "/images/placeholders/archive_trail.jpg" },
  { id: "drift", number: "08", label: "Drift", image: "/images/placeholders/drift-road.webp" },
];

export function JourneyFilm({ children }: JourneyFilmProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "-2.5%"]);

  useEffect(() => {
    const sections = journeyStops
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          );

        const visibleId = visibleSections[0]?.target.id;
        const nextIndex = journeyStops.findIndex((stop) => stop.id === visibleId);
        if (nextIndex >= 0) setActiveStop(nextIndex);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sceneStop = journeyStops[shouldReduceMotion ? 0 : activeStop];

  return (
    <div ref={pageRef} className="journey-film-shell">
      <div className="journey-film-backdrop" aria-hidden="true">
        <motion.div
          className="journey-film-camera"
          style={shouldReduceMotion ? undefined : { scale: sceneScale, y: sceneY }}
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={sceneStop.id}
              className="journey-film-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.84 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.15, ease: "easeInOut" }}
            >
              <Image
                src={sceneStop.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                loading="lazy"
                className="journey-film-image"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="journey-film-shade" />
      </div>

      <div className="journey-film-content">{children}</div>

      <nav
        className="journey-film-nav"
        aria-label="Explore homepage chapters"
        data-visible={activeStop > 0}
      >
        <span className="journey-film-track" aria-hidden="true">
          <motion.span
            className="journey-film-track-progress"
            style={{ scaleX: shouldReduceMotion ? 0 : scrollYProgress }}
          />
        </span>
        <button
          type="button"
          className="journey-film-toggle"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="journey-film-toggle-title">Explore chapters</span>
          <span className="journey-film-current-stop">{journeyStops[activeStop].number} · {journeyStops[activeStop].label}</span>
          <span className="journey-film-toggle-symbol" aria-hidden="true">{isMenuOpen ? "−" : "+"}</span>
        </button>
        {isMenuOpen && (
          <div className="journey-film-menu">
            {journeyStops.map((stop, index) => (
              <a
                key={stop.id}
                href={`#${stop.id}`}
                aria-current={activeStop === index ? "location" : undefined}
                className={`journey-film-menu-link${activeStop === index ? " is-active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{stop.number}</span>
                <span>{stop.label}</span>
                {activeStop === index && <span aria-hidden="true">CURRENT</span>}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
