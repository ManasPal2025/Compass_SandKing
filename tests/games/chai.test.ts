import test from "node:test";
import assert from "node:assert/strict";
import {
  CHAI_SCENES_MORNING,
  CHAI_SCENES_MIDDAY,
  CHAI_SCENES_AFTERNOON,
  CHAI_SCENES_EVENING,
  CHAI_WILDCARDS,
  RIDER_ARCHETYPES,
} from "../../src/data/games/chai-stop.ts";
import {
  generateChaiRun,
  createInitialChaiState,
  applyOptionChoice,
  evaluateEnding,
  simulateRideStopSequence,
  determineArchetype,
  simulateFullRun,
  createBonusNightScene,
  GOAL_DISTANCE_KM,
  EARLY_ARRIVAL_MINUTES,
  formatClock,
} from "../../src/lib/games/chai-engine.ts";
import { createRng } from "../../src/lib/games/random.ts";

test("Chai run structure: exactly 14 decisions, 12 scenes in time-of-day order with 2 wildcards at 1-based positions 5 and 10", () => {
  const rng = createRng(42);
  const run = generateChaiRun(rng);

  assert.equal(run.length, 14);

  // Wildcards at 1-based positions 5 and 10 (0-based indices 4 and 9)
  assert.equal(run[4].isWildcard, true, "Position 5 must be a wildcard");
  assert.equal(run[9].isWildcard, true, "Position 10 must be a wildcard");

  // Non-wildcard scenes in time-of-day order
  const nonWildcards = run.filter((s) => !s.isWildcard);
  assert.equal(nonWildcards.length, 12);

  const times = nonWildcards.map((s) => s.timeOfDay);
  assert.deepEqual(times.slice(0, 3), ["morning", "morning", "morning"]);
  assert.deepEqual(times.slice(3, 6), ["midday", "midday", "midday"]);
  assert.deepEqual(times.slice(6, 9), ["afternoon", "afternoon", "afternoon"]);
  assert.deepEqual(times.slice(9, 12), ["evening", "evening", "evening"]);
});

test("Arithmetic check (independent of scenes): 8 default rides + 4 default stops reaches 280km before 6:30 PM; 6 rides + 6 stops does not", () => {
  const result8_4 = simulateRideStopSequence(8, 4);
  assert.ok(result8_4.distance >= GOAL_DISTANCE_KM);
  assert.ok(result8_4.reached, "8 rides and 4 stops should reach goal before sunset");

  const result6_6 = simulateRideStopSequence(6, 6);
  assert.ok(result6_6.distance < GOAL_DISTANCE_KM);
  assert.ok(!result6_6.reached, "6 rides and 6 stops should not reach goal");
});

test("Ride-leaning path always reaches 280 km before all 14 decisions and before 2:00 PM across many seeds", () => {
  const seeds = [101, 202, 303, 404, 505, 999, 12345, 987654];

  for (const seed of seeds) {
    const rng = createRng(seed);
    const run = generateChaiRun(rng);
    let state = createInitialChaiState();
    let arrivedEarly = false;
    let decisionsMade = 0;

    for (const scene of run) {
      decisionsMade++;
      // Pick 'ride' if one exists, otherwise 'stop', never 'risky'
      let chosenOpt = scene.options.find((o) => o.kind === "ride");
      if (!chosenOpt) {
        chosenOpt = scene.options.find((o) => o.kind === "stop");
      }
      assert.ok(chosenOpt, "Must find a ride or stop option");

      const result = applyOptionChoice(state, chosenOpt, rng);
      state = result.nextState;

      if (state.distance >= GOAL_DISTANCE_KM) {
        arrivedEarly = true;
        break;
      }
    }

    assert.ok(arrivedEarly, `Seed ${seed} must reach 280km`);
    assert.ok(
      decisionsMade < 14,
      `Seed ${seed} must reach 280km before all 14 decisions (took ${decisionsMade})`
    );
    assert.ok(
      state.timeMinutes < EARLY_ARRIVAL_MINUTES,
      `Seed ${seed} must arrive before 2:00 PM (${formatClock(state.timeMinutes)})`
    );

    const ending = evaluateEnding(state);
    assert.equal(ending.title, "Arrived Absurdly Early");
  }
});

test("Stop-leaning path never reaches 280 km across many seeds", () => {
  const seeds = [101, 202, 303, 404, 505, 999, 12345, 987654];

  for (const seed of seeds) {
    const rng = createRng(seed);
    const run = generateChaiRun(rng);
    let state = createInitialChaiState();

    for (const scene of run) {
      // Pick 'stop' if one exists, otherwise 'ride', never 'risky'
      let chosenOpt = scene.options.find((o) => o.kind === "stop");
      if (!chosenOpt) {
        chosenOpt = scene.options.find((o) => o.kind === "ride");
      }
      assert.ok(chosenOpt, "Must find a stop or ride option");

      const result = applyOptionChoice(state, chosenOpt, rng);
      state = result.nextState;

      if (state.distance >= GOAL_DISTANCE_KM) {
        break;
      }
    }

    assert.ok(state.distance < GOAL_DISTANCE_KM, `Seed ${seed} must not reach 280km`);
    const ending = evaluateEnding(state);
    assert.equal(ending.title, "So Close, So Chai");
  }
});

test("Each of the 6 archetypes is reachable via deterministic state", () => {
  assert.equal(Object.keys(RIDER_ARCHETYPES).length, 6);
  // 1. The Chai Connoisseur (chai >= 5)
  const chaiConnoisseurState = {
    ...createInitialChaiState(),
    chai: 5,
    traits: { grit: 2, chill: 1, wanderlust: 1, chaos: 1 },
  };
  assert.equal(determineArchetype(chaiConnoisseurState).id, "chai-connoisseur");

  // 2. The Balanced Rider (chai < 5, diff between highest and lowest weighted trait <= 1.5)
  const balancedState = {
    ...createInitialChaiState(),
    chai: 2,
    traits: { grit: 4, chill: 2, wanderlust: 3, chaos: 2 },
  };
  assert.equal(determineArchetype(balancedState).id, "balanced-rider");

  // 3. The Iron Butt (highest weighted trait is Grit)
  const ironButtState = {
    ...createInitialChaiState(),
    chai: 1,
    traits: { grit: 10, chill: 1, wanderlust: 2, chaos: 0 },
  };
  assert.equal(determineArchetype(ironButtState).id, "iron-butt");

  // 4. The Unplanned Pauser (highest is Chill)
  const unplannedPauserState = {
    ...createInitialChaiState(),
    chai: 3,
    traits: { grit: 1, chill: 6, wanderlust: 2, chaos: 1 },
  };
  assert.equal(determineArchetype(unplannedPauserState).id, "unplanned-pauser");

  // 5. The Sunset Chaser (highest is Wanderlust)
  const sunsetChaserState = {
    ...createInitialChaiState(),
    chai: 2,
    traits: { grit: 1, chill: 1, wanderlust: 6, chaos: 0 },
  };
  assert.equal(determineArchetype(sunsetChaserState).id, "sunset-chaser");

  // 6. The Shortcut Believer (highest is Chaos)
  const shortcutBelieverState = {
    ...createInitialChaiState(),
    chai: 1,
    traits: { grit: 1, chill: 1, wanderlust: 2, chaos: 7 },
  };
  assert.equal(determineArchetype(shortcutBelieverState).id, "shortcut-believer");
});

test("Determinism: same seed + same choices yields identical outcome", () => {
  const seed = 555;
  const rng1 = createRng(seed);
  const run1 = generateChaiRun(rng1);

  const rng2 = createRng(seed);
  const run2 = generateChaiRun(rng2);

  assert.deepEqual(
    run1.map((s) => s.id),
    run2.map((s) => s.id)
  );

  let state1 = createInitialChaiState();
  let state2 = createInitialChaiState();

  for (let i = 0; i < run1.length; i++) {
    // Pick first option
    const opt1 = run1[i].options[0];
    const opt2 = run2[i].options[0];

    const res1 = applyOptionChoice(state1, opt1, rng1);
    const res2 = applyOptionChoice(state2, opt2, rng2);

    assert.deepEqual(res1.nextState, res2.nextState);
    state1 = res1.nextState;
    state2 = res2.nextState;

    if (state1.distance >= GOAL_DISTANCE_KM) break;
  }
});

test("Brand and alcohol check: no scene or wildcard contains forbidden terms", () => {
  const forbidden = [
    "mercedes",
    "benz",
    "land rover",
    "defender",
    "ford",
    "endeavour",
    "mahindra",
    "indian", // motorcycle brand check
    "gold wing",
    "honda",
    "harley",
    "davidson",
    "beer",
    "wine",
    "whiskey",
    "vodka",
    "rum",
    "alcohol",
    "liquor",
    "bar",
  ];

  const allScenes = [
    ...CHAI_SCENES_MORNING,
    ...CHAI_SCENES_MIDDAY,
    ...CHAI_SCENES_AFTERNOON,
    ...CHAI_SCENES_EVENING,
    ...CHAI_WILDCARDS,
  ];

  for (const scene of allScenes) {
    const textCorpus = [
      scene.prompt,
      ...scene.options.flatMap((o) => [
        o.label,
        o.outcomeLine || "",
        ...(o.riskyOutcomes?.map((ro) => ro.line) || []),
      ]),
    ].join(" ").toLowerCase();

    for (const term of forbidden) {
      // Check whole word match
      const regex = new RegExp(`\\b${term}\\b`, "i");
      assert.ok(
        !regex.test(textCorpus),
        `Scene ${scene.id} contains forbidden word "${term}": ${textCorpus}`
      );
    }
  }
});

test("Monte Carlo test: 3,000 runs with seeds 1..3000", () => {
  const archetypeCounts: Record<string, number> = {
    "chai-connoisseur": 0,
    "balanced-rider": 0,
    "iron-butt": 0,
    "unplanned-pauser": 0,
    "sunset-chaser": 0,
    "shortcut-believer": 0,
  };
  let starlightCount = 0;
  const totalRuns = 3000;

  for (let seed = 1; seed <= totalRuns; seed++) {
    const ending = simulateFullRun(seed);
    archetypeCounts[ending.archetype.id] = (archetypeCounts[ending.archetype.id] || 0) + 1;
    if (ending.id === "arrived-by-starlight") {
      starlightCount++;
    }
  }

  // Assert that each of the six archetypes appears in at least 3% of runs and none in more than 40%
  for (const [id, count] of Object.entries(archetypeCounts)) {
    const pct = count / totalRuns;
    assert.ok(
      pct >= 0.03,
      `Archetype '${id}' appeared in ${(pct * 100).toFixed(2)}% of runs (${count}/${totalRuns}), expected >= 3%`
    );
    assert.ok(
      pct <= 0.40,
      `Archetype '${id}' appeared in ${(pct * 100).toFixed(2)}% of runs (${count}/${totalRuns}), expected <= 40%`
    );
  }

  // Assert that 'Arrived by Starlight' appears in at least 3% of runs
  const starlightPct = starlightCount / totalRuns;
  assert.ok(
    starlightPct >= 0.03,
    `'Arrived by Starlight' appeared in ${(starlightPct * 100).toFixed(2)}% of runs (${starlightCount}/${totalRuns}), expected >= 3%`
  );
});

test("Bonus night ride scene structure, copy, and calculations", () => {
  const remainingKm = 40;
  const bonus = createBonusNightScene(remainingKm);

  assert.equal(bonus.kicker, "BONUS · LAST LIGHT");
  assert.equal(bonus.prompt, "{time}. The light is almost gone. The lake is {km} km away.");
  assert.equal(bonus.isBonus, true);
  assert.equal(bonus.options.length, 2);

  const optA = bonus.options[0];
  assert.equal(optA.label, "Ride on into the dark");
  assert.equal(optA.kind, "ride");
  assert.equal(optA.traits?.grit, 1);
  assert.equal(optA.distanceDelta, 40);
  assert.equal(optA.timeDelta, Math.ceil((40 / 36) * 50));
  assert.equal(optA.outcomeLine, "Headlight on, lake ahead. You're not stopping now.");

  const optB = bonus.options[1];
  assert.equal(optB.label, "Call it a night at the dhaba");
  assert.equal(optB.kind, "stop");
  assert.equal(optB.traits?.chill, 1);
  assert.equal(optB.chai, 1);
  assert.equal(optB.outcomeLine, "A cot, a blanket, a last chai. The lake can wait till morning.");
});


