"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export type AtmosphereVariant = "blossom" | "lightning" | "dew" | "rain" | "sunray";

const PARTICLE_COUNTS: Record<AtmosphereVariant, number> = {
  blossom: 30,
  lightning: 0,
  dew: 14,
  rain: 22,
  sunray: 10,
};

// Tailored positions for each variant for optimal distribution and composition
const VARIANT_POSITIONS: Record<AtmosphereVariant, number[][]> = {
  blossom: [
    [10, 14], [25, 26], [42, 12], [58, 22], [72, 15],
    [85, 30], [18, 42], [65, 48], [82, 54], [36, 32],
  ],
  lightning: [],
  dew: [
    [12, 18], [24, 62], [38, 30], [48, 75], [56, 22],
    [68, 54], [78, 25], [88, 70], [16, 45], [92, 38],
  ],
  rain: [
    [6, 10], [15, 42], [24, 18], [33, 65], [42, 8],
    [50, 52], [59, 22], [67, 72], [76, 15], [84, 58],
    [91, 28], [97, 78], [28, 85], [70, 88],
  ],
  sunray: [
    [14, 22], [26, 38], [36, 18], [48, 55],
    [60, 28], [72, 48], [84, 35], [42, 70],
  ],
};

export function AtmosphereLayer({ variant }: { variant: AtmosphereVariant }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (variant !== "lightning") return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let subTimer: ReturnType<typeof setTimeout>;
    let active = true;

    const triggerDoubleFlash = () => {
      // First pulse
      setFlash(true);
      subTimer = setTimeout(() => {
        setFlash(false);
        // Second pulse shortly after for realistic distant sheet illumination
        subTimer = setTimeout(() => {
          if (!active) return;
          setFlash(true);
          subTimer = setTimeout(() => {
            setFlash(false);
            if (active) scheduleNext();
          }, 380);
        }, 130);
      }, 340);
    };

    const scheduleNext = () => {
      timer = setTimeout(() => {
        if (!active || document.hidden) {
          if (active) scheduleNext();
          return;
        }
        triggerDoubleFlash();
      }, 8500 + Math.random() * 6500);
    };

    // A first soft flash shortly after entry makes the page atmosphere clear.
    timer = setTimeout(() => {
      if (active && !document.hidden) triggerDoubleFlash();
      else if (active) scheduleNext();
    }, 900);

    return () => {
      active = false;
      clearTimeout(timer);
      clearTimeout(subTimer);
    };
  }, [variant]);

  const particleCount = PARTICLE_COUNTS[variant];
  const positions = VARIANT_POSITIONS[variant] || [];

  return (
    <div
      className="atmosphere-layer"
      data-atmosphere={variant}
      aria-hidden="true"
    >
      {variant === "lightning" && (
        <span className={`atmosphere-flash${flash ? " is-active" : ""}`} />
      )}
      {variant === "dew" && <span className="atmosphere-mist" />}
      {variant === "sunray" && <span className="atmosphere-sunrays" />}
      {Array.from({ length: particleCount }, (_, index) => {
        // Extend each tuned seed set with deterministic coordinates so the
        // denser mobile/desktop fields stay evenly spread without clustering.
        const generatedPosition: [number, number] = [
          4 + ((index * 37 + 19) % 92),
          6 + ((index * 53 + 11) % 70),
        ];
        const [left, top] = positions[index] || generatedPosition;
        return (
          <span
            key={`${variant}-${index}`}
            className="atmosphere-particle"
            style={{
              "--particle-index": index,
              "--particle-left": `${left}%`,
              "--particle-top": `${top}%`,
            } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
