/**
 * Pure Game Engine for "Pack the Saddlebag"
 * No React, no JSX, relative imports only.
 */

import {
  SADDLEBAG_ITEMS,
  SADDLEBAG_EVENTS,
  PACKER_TITLES,
  SADDLEBAG_BADGES,
  type SaddlebagItem,
  type SaddlebagEvent,
  type SaddlebagTrip,
  type PackerTitle,
  type SaddlebagBadge,
} from "../../data/games/saddlebag.ts";
import { pickN, chance } from "./random.ts";

export interface EventEvaluation {
  event: SaddlebagEvent;
  handled: boolean;
  line: string;
  solverItemId?: string;
}

export interface TripScoreResult {
  points: number;
  mood: number;
  stars: number;
  handledCount: number;
  essentialCount: number;
  missedCount: number;
  luxuryLines: { item: string; line: string }[];
  eventResults: EventEvaluation[];
  starMessage?: string;
}

export interface TripCompletionRecord {
  tripId: string;
  packedItemIds: readonly string[];
  bestStars: number;
  bestPoints: number;
  thirdJacketSavedCold?: boolean;
}

export interface SaddlebagCampaignState {
  completedTrips: Record<string, TripCompletionRecord>;
  unlockedTripNumber: number; // 1 to 5
}

export const COLD_EVENTS = ["dawn-chill", "freezing-night", "cold-desert-night"] as const;

/**
 * Draws the events for a trip using a seeded RNG.
 */
export function drawTripEvents(
  trip: SaddlebagTrip,
  rng: () => number
): SaddlebagEvent[] {
  const essentialEvents = trip.essentialPool.map((id) => {
    const ev = SADDLEBAG_EVENTS[id];
    if (!ev) {
      throw new Error(`Event not found in SADDLEBAG_EVENTS: ${id}`);
    }
    return ev;
  });

  const drawn = pickN(essentialEvents, trip.drawCount, rng);

  if (trip.hasSunriseBonus === "always") {
    drawn.push(SADDLEBAG_EVENTS["sunrise-bonus"]);
  } else if (trip.hasSunriseBonus === "chance50") {
    if (chance(0.5, rng)) {
      drawn.push(SADDLEBAG_EVENTS["sunrise-bonus"]);
    }
  }

  return drawn;
}

/**
 * Evaluates whether an event is handled given the player's packed item IDs.
 */
export function evaluateEvent(
  event: SaddlebagEvent,
  packedItemIds: readonly string[]
): EventEvaluation {
  const packedSet = new Set(packedItemIds);

  // Determine solver item
  let solverItemId: string | undefined;

  if (event.id === "sunrise-bonus") {
    // If both camera and drone are packed, camera handles it
    if (packedSet.has("camera")) {
      solverItemId = "camera";
    } else if (packedSet.has("drone")) {
      solverItemId = "drone";
    }
  } else {
    for (const need of event.needs) {
      if (packedSet.has(need)) {
        solverItemId = need;
        break;
      }
    }
  }

  if (solverItemId) {
    let line = event.handled || "";
    if (event.handledByItem && event.handledByItem[solverItemId]) {
      line = event.handledByItem[solverItemId];
    }
    return {
      event,
      handled: true,
      line,
      solverItemId,
    };
  }

  return {
    event,
    handled: false,
    line: event.missed,
  };
}

/**
 * Calculates the score, stars, mood, and luxury quips for a completed trip.
 */
export function calculateTripScore(
  events: readonly SaddlebagEvent[],
  packedItemIds: readonly string[]
): TripScoreResult {
  const packedItems = packedItemIds
    .map((id) => SADDLEBAG_ITEMS.find((it) => it.id === id))
    .filter((it): it is SaddlebagItem => Boolean(it));

  const eventResults: EventEvaluation[] = events.map((ev) =>
    evaluateEvent(ev, packedItemIds)
  );

  let essentialHandled = 0;
  let essentialTotal = 0;
  let points = 0;

  for (const res of eventResults) {
    if (res.event.isBonus) {
      if (res.handled) {
        points += 5;
      }
    } else {
      essentialTotal += 1;
      if (res.handled) {
        essentialHandled += 1;
        points += 10;
      }
    }
  }

  const missedCount = essentialTotal - essentialHandled;

  // Stars calculation based on essential events missed
  let stars = 0;
  let starMessage: string | undefined;

  if (missedCount === 0) {
    stars = 3;
  } else if (missedCount === 1) {
    stars = 2;
  } else if (missedCount === 2) {
    stars = 1;
  } else {
    stars = 0;
    starMessage = "Towed home. Legendary story, though.";
  }

  // Mood calculation: +3 per luxury item packed, maximum 6
  // Note: third-jacket counts as luxury for Mood even when it also handles a cold event.
  const luxuryItems = packedItems.filter((it) => it.kind === "luxury");
  const mood = Math.min(6, luxuryItems.length * 3);
  points += mood;

  // Luxury lines
  const luxuryLines: { item: string; line: string }[] = [];

  // Track if sunrise event was drawn and who handled it
  const sunriseResult = eventResults.find((r) => r.event.id === "sunrise-bonus");

  // Track if third jacket handled a cold event
  const thirdJacketHandledCold = eventResults.some(
    (r) =>
      r.handled &&
      r.solverItemId === "third-jacket" &&
      COLD_EVENTS.includes(r.event.id as (typeof COLD_EVENTS)[number])
  );

  for (const item of luxuryItems) {
    if (item.id === "pizza") {
      luxuryLines.push({
        item: item.name,
        line: "Day one: the pizza was heroic. Day two: it was a frisbee.",
      });
    } else if (item.id === "golf-bag") {
      luxuryLines.push({
        item: item.name,
        line: "No fairway appeared. You carried a golf bag the whole way. Respect.",
      });
    } else if (item.id === "pillow") {
      luxuryLines.push({
        item: item.name,
        line: "You slept like royalty. Your luggage rack did not.",
      });
    } else if (item.id === "speaker") {
      luxuryLines.push({
        item: item.name,
        line: "The ghazals turned a traffic jam into a film scene.",
      });
    } else if (item.id === "extra-shoes") {
      luxuryLines.push({
        item: item.name,
        line: "Both pairs got wet. Symmetry.",
      });
    } else if (item.id === "camera") {
      if (sunriseResult && sunriseResult.handled && sunriseResult.solverItemId === "camera") {
        // No extra line; event handled line covers it
      } else {
        luxuryLines.push({
          item: item.name,
          line: "Four lenses, zero sunrises. The lenses enjoyed the trip.",
        });
      }
    } else if (item.id === "drone") {
      if (sunriseResult && sunriseResult.handled && sunriseResult.solverItemId === "drone") {
        // No extra line
      } else {
        luxuryLines.push({
          item: item.name,
          line: "The drone stayed in the bag. It's fine. It's resting.",
        });
      }
    } else if (item.id === "third-jacket") {
      if (thirdJacketHandledCold) {
        luxuryLines.push({
          item: item.name,
          line: "Three jackets. Zero regrets.",
        });
      } else {
        luxuryLines.push({
          item: item.name,
          line: "The third jacket saw nothing but the inside of the bag.",
        });
      }
    }
  }

  return {
    points,
    mood,
    stars,
    handledCount: essentialHandled,
    essentialCount: essentialTotal,
    missedCount,
    luxuryLines,
    eventResults,
    starMessage,
  };
}

/**
 * Gets packer title based on total best stars (out of 15).
 */
export function getPackerTitle(totalStars: number): PackerTitle {
  for (const title of PACKER_TITLES) {
    if (totalStars >= title.minStars && totalStars <= title.maxStars) {
      return title;
    }
  }
  return PACKER_TITLES[PACKER_TITLES.length - 1];
}

/**
 * Evaluates campaign badges across all completed trips.
 */
export function evaluateBadges(
  completedTrips: Record<string, TripCompletionRecord>,
  totalStars: number
): SaddlebagBadge[] {
  const badges: SaddlebagBadge[] = [];

  const trips = Object.values(completedTrips);

  // "Fairway Nomad" — packed the golf bag on 3 or more different trips
  const golfTrips = trips.filter((t) => t.packedItemIds?.includes("golf-bag")).length;
  if (golfTrips >= 3) {
    badges.push(SADDLEBAG_BADGES["fairway-nomad"]);
  }

  // "Carb-Loaded Legend" — packed the pizza on 3 or more different trips
  const pizzaTrips = trips.filter((t) => t.packedItemIds?.includes("pizza")).length;
  if (pizzaTrips >= 3) {
    badges.push(SADDLEBAG_BADGES["carb-loaded-legend"]);
  }

  // "The Jacket Was Right" — the third jacket handled a cold event at least once
  const jacketSaved = trips.some((t) => t.thirdJacketSavedCold);
  if (jacketSaved) {
    badges.push(SADDLEBAG_BADGES["the-jacket-was-right"]);
  }

  // "Nothing Rattled" — 15 of 15 stars
  if (totalStars === 15) {
    badges.push(SADDLEBAG_BADGES["nothing-rattled"]);
  }

  return badges;
}
