import test from "node:test";
import assert from "node:assert/strict";
import {
  SADDLEBAG_ITEMS,
  SADDLEBAG_EVENTS,
  SADDLEBAG_TRIPS,
} from "../../src/data/games/saddlebag.ts";
import {
  drawTripEvents,
  evaluateEvent,
  calculateTripScore,
  getPackerTitle,
  evaluateBadges,
} from "../../src/lib/games/saddlebag-engine.ts";
import { createRng } from "../../src/lib/games/random.ts";

test("Saddlebag data integrity: item references and pool references exist", () => {
  const itemIds = new Set(SADDLEBAG_ITEMS.map((item) => item.id));

  // Every event's needs must refer to existing item ids
  for (const [eventId, ev] of Object.entries(SADDLEBAG_EVENTS)) {
    for (const need of ev.needs) {
      assert.ok(
        itemIds.has(need),
        `Event '${eventId}' needs item '${need}' which does not exist in SADDLEBAG_ITEMS`
      );
    }
  }

  // Every trip pool must refer to existing event ids
  for (const trip of SADDLEBAG_TRIPS) {
    assert.ok(
      trip.drawCount <= trip.essentialPool.length,
      `Trip '${trip.id}' drawCount (${trip.drawCount}) exceeds essentialPool length (${trip.essentialPool.length})`
    );

    for (const eventId of trip.essentialPool) {
      assert.ok(
        Boolean(SADDLEBAG_EVENTS[eventId]),
        `Trip '${trip.id}' refers to event '${eventId}' which does not exist in SADDLEBAG_EVENTS`
      );
    }
  }
});

test("Saddlebag coverage: trips 1-4 cover entire essential pool within slot limits", () => {
  // Trip 1 (6 slots, 6 pool events):
  // rain (rain-jacket), puncture (puncture-kit), phone-dead (power-bank or paper-map),
  // fog-night (headlamp), closed-dhaba (snacks), loose-mirror (tool-roll or fuse-tape)
  // 6 1-slot items = 6 slots.
  const trip1Items = [
    "rain-jacket",
    "puncture-kit",
    "paper-map",
    "headlamp",
    "snacks",
    "tool-roll",
  ];
  assert.equal(trip1Items.length, 6);
  assert.ok(trip1Items.length <= SADDLEBAG_TRIPS[0].slots);
  for (const evId of SADDLEBAG_TRIPS[0].essentialPool) {
    const ev = SADDLEBAG_EVENTS[evId];
    assert.ok(
      ev.needs.some((need) => trip1Items.includes(need)),
      `Trip 1 item set does not cover event ${evId}`
    );
  }

  // Trip 2 (5 slots, 5 pool events):
  // harsh-sun (sunscreen), no-shops-water (water), dawn-chill (thermal or third-jacket),
  // puncture (puncture-kit), loose-mirror (tool-roll or fuse-tape)
  // 5 1-slot items = 5 slots.
  const trip2Items = [
    "sunscreen",
    "water",
    "thermal",
    "puncture-kit",
    "tool-roll",
  ];
  assert.equal(trip2Items.length, 5);
  assert.ok(trip2Items.length <= SADDLEBAG_TRIPS[1].slots);
  for (const evId of SADDLEBAG_TRIPS[1].essentialPool) {
    const ev = SADDLEBAG_EVENTS[evId];
    assert.ok(
      ev.needs.some((need) => trip2Items.includes(need)),
      `Trip 2 item set does not cover event ${evId}`
    );
  }

  // Trip 3 (7 slots, 7 pool events):
  // freezing-night (thermal), scrape (first-aid), no-signal (paper-map),
  // blown-fuse (fuse-tape), thin-air (water), dark-tunnel (headlamp), phone-dead (paper-map)
  // Paper map covers both no-signal and phone-dead! Total 6 items in 7 slots.
  const trip3Items = [
    "thermal",
    "first-aid",
    "paper-map",
    "fuse-tape",
    "water",
    "headlamp",
  ];
  assert.equal(trip3Items.length, 6);
  assert.ok(trip3Items.length <= SADDLEBAG_TRIPS[2].slots);
  for (const evId of SADDLEBAG_TRIPS[2].essentialPool) {
    const ev = SADDLEBAG_EVENTS[evId];
    assert.ok(
      ev.needs.some((need) => trip3Items.includes(need)),
      `Trip 3 item set does not cover event ${evId}`
    );
  }

  // Trip 4 (6 slots, 6 pool events):
  // desert-heat (water), harsh-sun (sunscreen), sand-chain (tool-roll),
  // phone-dead (power-bank or paper-map), cold-desert-night (thermal), empty-stretch (snacks)
  // 6 1-slot items = 6 slots.
  const trip4Items = [
    "water",
    "sunscreen",
    "tool-roll",
    "paper-map",
    "thermal",
    "snacks",
  ];
  assert.equal(trip4Items.length, 6);
  assert.ok(trip4Items.length <= SADDLEBAG_TRIPS[3].slots);
  for (const evId of SADDLEBAG_TRIPS[3].essentialPool) {
    const ev = SADDLEBAG_EVENTS[evId];
    assert.ok(
      ev.needs.some((need) => trip4Items.includes(need)),
      `Trip 4 item set does not cover event ${evId}`
    );
  }
});

test("Saddlebag coverage: trip 5 covers entire essential pool with 7 items leaving 1 slot free", () => {
  // Trip 5 pool: rain, puncture, phone-dead, freezing-night, no-signal, blown-fuse, harsh-sun, closed-dhaba
  // paper-map covers both no-signal and phone-dead -> 7 items for 8 essential events
  const trip5Items = [
    "rain-jacket",
    "puncture-kit",
    "paper-map",
    "thermal",
    "fuse-tape",
    "sunscreen",
    "snacks",
  ];
  assert.equal(trip5Items.length, 7);
  assert.equal(SADDLEBAG_TRIPS[4].slots, 8);
  for (const evId of SADDLEBAG_TRIPS[4].essentialPool) {
    const ev = SADDLEBAG_EVENTS[evId];
    assert.ok(
      ev.needs.some((need) => trip5Items.includes(need)),
      `Trip 5 item set does not cover event ${evId}`
    );
  }
});

test("Saddlebag scoring and star thresholds", () => {
  const events = [
    SADDLEBAG_EVENTS["rain"],
    SADDLEBAG_EVENTS["puncture"],
    SADDLEBAG_EVENTS["fog-night"],
    SADDLEBAG_EVENTS["closed-dhaba"],
  ];

  // 1. All handled -> 3 stars
  const scoreAll = calculateTripScore(events, [
    "rain-jacket",
    "puncture-kit",
    "headlamp",
    "snacks",
  ]);
  assert.equal(scoreAll.stars, 3);
  assert.equal(scoreAll.handledCount, 4);
  assert.equal(scoreAll.missedCount, 0);
  assert.equal(scoreAll.points, 40);

  // 2. Missed 1 -> 2 stars
  const scoreMiss1 = calculateTripScore(events, [
    "rain-jacket",
    "puncture-kit",
    "headlamp",
  ]);
  assert.equal(scoreMiss1.stars, 2);
  assert.equal(scoreMiss1.handledCount, 3);
  assert.equal(scoreMiss1.missedCount, 1);
  assert.equal(scoreMiss1.points, 30);

  // 3. Missed 2 -> 1 star
  const scoreMiss2 = calculateTripScore(events, [
    "rain-jacket",
    "puncture-kit",
  ]);
  assert.equal(scoreMiss2.stars, 1);
  assert.equal(scoreMiss2.handledCount, 2);
  assert.equal(scoreMiss2.missedCount, 2);
  assert.equal(scoreMiss2.points, 20);

  // 4. Missed 3 or more -> 0 stars with towed home message
  const scoreMiss3 = calculateTripScore(events, ["rain-jacket"]);
  assert.equal(scoreMiss3.stars, 0);
  assert.equal(scoreMiss3.starMessage, "Towed home. Legendary story, though.");
  assert.equal(scoreMiss3.points, 10);

  // 5. Mood caps at 6 (+3 per luxury, max 6)
  const scoreMood = calculateTripScore(events, [
    "rain-jacket",
    "pizza", // 2 slots luxury (+3)
    "speaker", // 1 slot luxury (+3)
    "pillow", // 2 slots luxury (+3, but capped at 6)
  ]);
  assert.equal(scoreMood.mood, 6);
  assert.equal(scoreMood.points, 10 + 6); // 1 handled event (10) + 6 mood

  // 6. Sunrise bonus never affects stars
  const eventsWithSunrise = [...events, SADDLEBAG_EVENTS["sunrise-bonus"]];
  const scoreSunriseMissed = calculateTripScore(eventsWithSunrise, [
    "rain-jacket",
    "puncture-kit",
    "headlamp",
    "snacks",
  ]);
  // All 4 essential handled, sunrise missed -> still 3 stars!
  assert.equal(scoreSunriseMissed.stars, 3);
  assert.equal(scoreSunriseMissed.points, 40);

  // When sunrise handled -> +5 points, still 3 stars
  const scoreSunriseHandled = calculateTripScore(eventsWithSunrise, [
    "rain-jacket",
    "puncture-kit",
    "headlamp",
    "snacks",
    "camera",
  ]);
  assert.equal(scoreSunriseHandled.stars, 3);
  // 4 essential (40) + sunrise (5) + luxury camera (+3 mood) = 48
  assert.equal(scoreSunriseHandled.points, 48);
});

test("Third jacket handles cold events and still counts toward Mood", () => {
  const coldEvents = [SADDLEBAG_EVENTS["dawn-chill"]];
  const result = calculateTripScore(coldEvents, ["third-jacket"]);

  // Handled using third-jacket
  assert.equal(result.eventResults[0].handled, true);
  assert.equal(result.eventResults[0].solverItemId, "third-jacket");
  assert.equal(
    result.eventResults[0].line,
    "The third jacket was right all along. It will never let you forget it."
  );

  // Counts toward mood (+3)
  assert.equal(result.mood, 3);
  assert.equal(result.points, 10 + 3);

  // Luxury line matches cold event handling
  const jacketLine = result.luxuryLines.find(
    (l) => l.item === "A third 'just in case' jacket"
  );
  assert.equal(jacketLine?.line, "Three jackets. Zero regrets.");
});

test("Determinism: same seed and packing produces identical draw and results", () => {
  const seed = 123456789;
  const trip = SADDLEBAG_TRIPS[0];

  const rng1 = createRng(seed);
  const draw1 = drawTripEvents(trip, rng1);

  const rng2 = createRng(seed);
  const draw2 = drawTripEvents(trip, rng2);

  assert.deepEqual(
    draw1.map((e) => e.id),
    draw2.map((e) => e.id)
  );
});

test("evaluateEvent, getPackerTitle, and evaluateBadges work accurately", () => {
  const rainEv = SADDLEBAG_EVENTS["rain"];
  const handled = evaluateEvent(rainEv, ["rain-jacket"]);
  assert.equal(handled.handled, true);
  assert.equal(handled.solverItemId, "rain-jacket");

  const missed = evaluateEvent(rainEv, ["water"]);
  assert.equal(missed.handled, false);

  assert.equal(getPackerTitle(15).title, "The Unshakeable Packer");
  assert.equal(getPackerTitle(12).title, "Road-Ready Regular");
  assert.equal(getPackerTitle(8).title, "The Hopeful Improviser");
  assert.equal(getPackerTitle(3).title, "The Legend of the Passing Truck");

  const badges = evaluateBadges(
    {
      "trip-1": { tripId: "trip-1", bestStars: 3, bestPoints: 40, packedItemIds: ["golf-bag", "pizza"], thirdJacketSavedCold: true },
      "trip-2": { tripId: "trip-2", bestStars: 3, bestPoints: 40, packedItemIds: ["golf-bag", "pizza"], thirdJacketSavedCold: false },
      "trip-3": { tripId: "trip-3", bestStars: 3, bestPoints: 40, packedItemIds: ["golf-bag", "pizza"], thirdJacketSavedCold: false },
      "trip-4": { tripId: "trip-4", bestStars: 3, bestPoints: 40, packedItemIds: [], thirdJacketSavedCold: false },
      "trip-5": { tripId: "trip-5", bestStars: 3, bestPoints: 40, packedItemIds: [], thirdJacketSavedCold: false },
    },
    15
  );
  assert.equal(badges.length, 4);
});

