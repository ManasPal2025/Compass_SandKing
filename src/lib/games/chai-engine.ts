/**
 * Pure Game Engine for "Chai Stop or Keep Riding?"
 * No React, no JSX, relative imports only.
 */

import {
  CHAI_SCENES_MORNING,
  CHAI_SCENES_MIDDAY,
  CHAI_SCENES_AFTERNOON,
  CHAI_SCENES_EVENING,
  CHAI_WILDCARDS,
  RIDER_ARCHETYPES,
  type ChaiScene,
  type ChaiOption,
  type RiderArchetype,
  type TraitPoints,
} from "../../data/games/chai-stop.ts";
import { pickN } from "./random.ts";

export const START_TIME_MINUTES = 360; // 6:00 AM
export const SUNSET_TIME_MINUTES = 1110; // 6:30 PM
export const EARLY_ARRIVAL_MINUTES = 840; // 2:00 PM
export const GOAL_DISTANCE_KM = 280;

export interface ChaiState {
  distance: number;
  timeMinutes: number;
  chai: number;
  wrongTurns: number;
  views: number;
  stops: number;
  detours: number;
  traits: {
    grit: number;
    chill: number;
    wanderlust: number;
    chaos: number;
  };
}

export interface ChoiceResult {
  nextState: ChaiState;
  distanceDelta: number;
  timeDelta: number;
  chaiDelta: number;
  wrongTurnsDelta: number;
  viewsDelta: number;
  outcomeLine: string;
}

export interface ChaiEndingResult {
  id: string;
  title: string;
  line: string;
  archetype: RiderArchetype;
  stats: {
    distance: number;
    timeMinutes: number;
    arrivalClock: string;
    hasArrived: boolean;
    chai: number;
    wrongTurns: number;
    views: number;
    stops: number;
  };
}

/**
 * Formats minutes from midnight into 12-hour clock string (e.g., "6:00 AM", "2:00 PM").
 */
export function formatClock(totalMinutes: number): string {
  const normalized = Math.max(0, totalMinutes);
  const hours24 = Math.floor(normalized / 60) % 24;
  const mins = normalized % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minsPadded = String(mins).padStart(2, "0");
  return `${hours12}:${minsPadded} ${period}`;
}

/**
 * Creates initial clean ChaiState at 6:00 AM.
 */
export function createInitialChaiState(): ChaiState {
  return {
    distance: 0,
    timeMinutes: START_TIME_MINUTES,
    chai: 0,
    wrongTurns: 0,
    views: 0,
    stops: 0,
    detours: 0,
    traits: {
      grit: 0,
      chill: 0,
      wanderlust: 0,
      chaos: 0,
    },
  };
}

/**
 * Generates a 14-decision run: 12 scenes (3 morning, 3 midday, 3 afternoon, 3 evening)
 * with 2 wildcards inserted after scene 4 and after scene 8 (at 1-based positions 5 and 10).
 */
export function generateChaiRun(rng: () => number): ChaiScene[] {
  const morning = pickN(CHAI_SCENES_MORNING, 3, rng);
  const midday = pickN(CHAI_SCENES_MIDDAY, 3, rng);
  const afternoon = pickN(CHAI_SCENES_AFTERNOON, 3, rng);
  const evening = pickN(CHAI_SCENES_EVENING, 3, rng);

  const wildcards = pickN(CHAI_WILDCARDS, 2, rng);

  // 12 scenes ordered chronologically
  const baseScenes: ChaiScene[] = [
    ...morning,
    ...midday,
    ...afternoon,
    ...evening,
  ];

  // Insert wildcards after scene 4 and after scene 8
  const run: ChaiScene[] = [
    baseScenes[0],
    baseScenes[1],
    baseScenes[2],
    baseScenes[3],
    wildcards[0], // 1-based position 5
    baseScenes[4],
    baseScenes[5],
    baseScenes[6],
    baseScenes[7],
    wildcards[1], // 1-based position 10
    baseScenes[8],
    baseScenes[9],
    baseScenes[10],
    baseScenes[11],
  ];

  return run;
}

/**
 * Resolves an option choice and returns the resulting state and diffs.
 */
export function applyOptionChoice(
  state: ChaiState,
  option: ChaiOption,
  rng: () => number
): ChoiceResult {
  let distanceDelta = 0;
  let timeDelta = 0;
  let stopsDelta = 0;
  let detoursDelta = 0;
  let wrongTurnsDelta = 0;
  const chaiDelta = option.chai || 0;
  const viewsDelta = option.views || 0;
  let outcomeLine = option.outcomeLine || "";

  if (option.kind === "ride") {
    distanceDelta = option.distanceDelta ?? 36;
    timeDelta = option.timeDelta ?? 50;
  } else if (option.kind === "stop") {
    distanceDelta = option.distanceDelta ?? 0;
    timeDelta = option.timeDelta ?? 35;
    stopsDelta = 1;
  } else if (option.kind === "detour") {
    distanceDelta = option.distanceDelta ?? 12;
    timeDelta = option.timeDelta ?? 70;
    detoursDelta = 1;
  } else if (option.kind === "risky") {
    if (option.riskyOutcomes && option.riskyOutcomes.length > 0) {
      const roll = rng();
      let cumulative = 0;
      let chosen = option.riskyOutcomes[option.riskyOutcomes.length - 1];

      for (const candidate of option.riskyOutcomes) {
        cumulative += candidate.p;
        if (roll < cumulative) {
          chosen = candidate;
          break;
        }
      }

      distanceDelta = chosen.distance;
      timeDelta = chosen.timeDelta;
      wrongTurnsDelta = chosen.wrongTurns || 0;
      outcomeLine = chosen.line;
    }
  }

  // Apply traits
  const traitChanges: TraitPoints = option.traits || {};
  const nextTraits = {
    grit: state.traits.grit + (traitChanges.grit || 0),
    chill: state.traits.chill + (traitChanges.chill || 0),
    wanderlust: state.traits.wanderlust + (traitChanges.wanderlust || 0),
    chaos: state.traits.chaos + (traitChanges.chaos || 0),
  };

  const nextState: ChaiState = {
    distance: Math.min(GOAL_DISTANCE_KM, state.distance + distanceDelta),
    timeMinutes: state.timeMinutes + timeDelta,
    chai: state.chai + chaiDelta,
    wrongTurns: state.wrongTurns + (wrongTurnsDelta + (option.wrongTurns || 0)),
    views: state.views + viewsDelta,
    stops: state.stops + stopsDelta,
    detours: state.detours + detoursDelta,
    traits: nextTraits,
  };

  return {
    nextState,
    distanceDelta,
    timeDelta,
    chaiDelta,
    wrongTurnsDelta,
    viewsDelta,
    outcomeLine,
  };
}

/**
 * Determines the rider archetype based on final state.
 */
export function determineArchetype(state: ChaiState): RiderArchetype {
  // 1. If chai >= 5 -> The Chai Connoisseur
  if (state.chai >= 5) {
    return RIDER_ARCHETYPES["chai-connoisseur"];
  }

  const { grit, chill, wanderlust, chaos } = state.traits;
  const traits = [grit, chill, wanderlust, chaos];
  const maxVal = Math.max(...traits);
  const minVal = Math.min(...traits);

  // 2. Otherwise, if difference between highest and lowest trait <= 1 -> The Balanced Rider
  if (maxVal - minVal <= 1) {
    return RIDER_ARCHETYPES["balanced-rider"];
  }

  // 3. Otherwise highest trait decides (ties broken in order: Chill, Wanderlust, Grit, Chaos)
  if (chill === maxVal) {
    return RIDER_ARCHETYPES["unplanned-pauser"];
  }
  if (wanderlust === maxVal) {
    return RIDER_ARCHETYPES["sunset-chaser"];
  }
  if (grit === maxVal) {
    return RIDER_ARCHETYPES["iron-butt"];
  }
  return RIDER_ARCHETYPES["shortcut-believer"];
}

/**
 * Evaluates the final run ending based on arrival status and traits.
 */
export function evaluateEnding(state: ChaiState): ChaiEndingResult {
  const hasArrived = state.distance >= GOAL_DISTANCE_KM;
  const arrivalClock = formatClock(state.timeMinutes);
  const archetype = determineArchetype(state);

  let id = "";
  let title = "";
  let line = "";

  if (hasArrived) {
    if (state.timeMinutes < EARLY_ARRIVAL_MINUTES) {
      id = "absurdly-early";
      title = "Arrived Absurdly Early";
      line = `You reached the lake at ${arrivalClock}. It looked surprised to see you. You have hours and nothing to do.`;
    } else if (state.timeMinutes <= SUNSET_TIME_MINUTES) {
      if (state.stops >= 3) {
        id = "perfect-day";
        title = "The Perfect Day";
        line = "Golden light on the water, chai in your system, stories in your pocket.";
      } else {
        id = "made-it-didnt-stop";
        title = "Made It, Didn't Stop";
        line = `You reached the lake at ${arrivalClock}. Efficient. Slightly suspicious.`;
      }
    } else {
      id = "arrived-by-starlight";
      title = "Arrived by Starlight";
      line = "The lake was dark and silver. Worth it.";
    }
  } else {
    id = "so-close-so-chai";
    title = "So Close, So Chai";
    const kmShort = GOAL_DISTANCE_KM - state.distance;
    line = `You stopped ${kmShort} km short and spent the night at a dhaba. Honestly? A great night.`;
  }

  return {
    id,
    title,
    line,
    archetype,
    stats: {
      distance: state.distance,
      timeMinutes: state.timeMinutes,
      arrivalClock: hasArrived ? arrivalClock : "didn't arrive",
      hasArrived,
      chai: state.chai,
      wrongTurns: state.wrongTurns,
      views: state.views,
      stops: state.stops,
    },
  };
}

/**
 * Pure arithmetic simulation check independent of scenes, verifying base physics.
 */
export function simulateRideStopSequence(
  rides: number,
  stops: number
): { distance: number; timeMinutes: number; reached: boolean } {
  let distance = 0;
  let time = START_TIME_MINUTES;

  for (let i = 0; i < rides; i++) {
    distance += 36;
    time += 50;
  }

  for (let j = 0; j < stops; j++) {
    time += 35;
  }

  return {
    distance,
    timeMinutes: time,
    reached: distance >= GOAL_DISTANCE_KM && time <= SUNSET_TIME_MINUTES,
  };
}
