"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Lock,
  Star,
  Check,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Info,
  Award,
} from "lucide-react";
import {
  SADDLEBAG_ITEMS,
  SADDLEBAG_TRIPS,
  type SaddlebagItem,
  type SaddlebagTrip,
  type SaddlebagEvent,
  type SaddlebagBadge,
  type PackerTitle,
} from "../../../data/games/saddlebag.ts";
import {
  drawTripEvents,
  calculateTripScore,
  getPackerTitle,
  evaluateBadges,
  type TripScoreResult,
  type SaddlebagCampaignState,
} from "../../../lib/games/saddlebag-engine.ts";
import { createRng, newSeed } from "../../../lib/games/random.ts";
import { readJSON, writeJSON, subscribeStorage, STORAGE_KEYS } from "../../../lib/games/storage.ts";
import { ItemIcon } from "./item-icon.tsx";

type GameScreen = "intro" | "trip-board" | "packing" | "riding" | "summary" | "campaign-end";

const INITIAL_CAMPAIGN_STATE: SaddlebagCampaignState = {
  completedTrips: {},
  unlockedTripNumber: 1,
};

export function SaddlebagGame() {
  const reducedMotion = useReducedMotion();

  // Storage and hydration via useSyncExternalStore
  const campaign = useSyncExternalStore(
    subscribeStorage,
    () => readJSON<SaddlebagCampaignState>(STORAGE_KEYS.SADDLEBAG, INITIAL_CAMPAIGN_STATE),
    () => INITIAL_CAMPAIGN_STATE
  );

  // Active game state
  const [screen, setScreen] = useState<GameScreen>("intro");
  const [currentTripIndex, setCurrentTripIndex] = useState<number>(0);
  const [packedItemIds, setPackedItemIds] = useState<string[]>([]);
  const [recentQuip, setRecentQuip] = useState<string>("");
  const [announcement, setAnnouncement] = useState<string>("");

  // Riding state
  const [drawnEvents, setDrawnEvents] = useState<SaddlebagEvent[]>([]);
  const [revealedEventCount, setRevealedEventCount] = useState<number>(1);
  const [tripResult, setTripResult] = useState<TripScoreResult | null>(null);

  // Focus management refs
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Save campaign state whenever it updates
  const saveCampaignState = (next: SaddlebagCampaignState) => {
    writeJSON(STORAGE_KEYS.SADDLEBAG, next);
  };

  // Move focus whenever the screen changes
  useEffect(() => {
    if (screen === "riding" || screen === "summary" || screen === "campaign-end") {
      resultRef.current?.focus();
    } else {
      headingRef.current?.focus();
    }
  }, [screen]);

  const currentTrip: SaddlebagTrip = SADDLEBAG_TRIPS[currentTripIndex] || SADDLEBAG_TRIPS[0];

  // Slot calculations
  const packedItems = packedItemIds
    .map((id) => SADDLEBAG_ITEMS.find((it) => it.id === id))
    .filter((it): it is SaddlebagItem => Boolean(it));
  const usedSlots = packedItems.reduce((acc, it) => acc + it.slots, 0);
  const freeSlots = currentTrip.slots - usedSlots;

  // Actions
  const handleStartPacking = (tripIndex?: number) => {
    const targetIdx = tripIndex ?? 0;
    setCurrentTripIndex(targetIdx);
    setPackedItemIds([]);
    setRecentQuip("");
    setScreen("packing");
    setAnnouncement(`Packing for Trip ${SADDLEBAG_TRIPS[targetIdx].number}: ${SADDLEBAG_TRIPS[targetIdx].title}`);
  };

  const handleSelectTripFromBoard = (idx: number) => {
    setCurrentTripIndex(idx);
    setPackedItemIds([]);
    setRecentQuip("");
    setScreen("packing");
    setAnnouncement(`Selected ${SADDLEBAG_TRIPS[idx].title}. You have ${SADDLEBAG_TRIPS[idx].slots} bag slots.`);
  };

  const handleToggleItem = (item: SaddlebagItem) => {
    if (packedItemIds.includes(item.id)) {
      // Unpack
      setPackedItemIds((prev) => prev.filter((id) => id !== item.id));
      setAnnouncement(`Unpacked ${item.name}. ${freeSlots + item.slots} of ${currentTrip.slots} slots now free.`);
    } else {
      // Pack if it fits
      if (item.slots <= freeSlots) {
        setPackedItemIds((prev) => [...prev, item.id]);
        setRecentQuip(item.quip);
        setAnnouncement(`Packed ${item.name}. "${item.quip}"`);
      } else {
        setAnnouncement(`Cannot pack ${item.name}. Needs ${item.slots} slots, but only ${freeSlots} free.`);
      }
    }
  };

  const handleUnpackAll = () => {
    setPackedItemIds([]);
    setRecentQuip("");
    setAnnouncement("Unpacked all items. Saddlebag is empty.");
  };

  const handleRide = () => {
    if (packedItemIds.length === 0) return;

    // Draw events using seeded PRNG created in event handler (Hydration compliant)
    const seed = newSeed();
    const rng = createRng(seed);
    const events = drawTripEvents(currentTrip, rng);

    setDrawnEvents(events);
    setRevealedEventCount(1);

    // Calculate score
    const result = calculateTripScore(events, packedItemIds);
    setTripResult(result);
    setScreen("riding");

    const firstEval = result.eventResults[0];
    const outcomeText = firstEval.handled
      ? `Handled with ${firstEval.solverItemId}`
      : "Missed";
    setAnnouncement(`Event 1: ${events[0].text} Result: ${outcomeText}`);
  };

  const handleNextEvent = () => {
    if (!tripResult) return;

    if (revealedEventCount < drawnEvents.length) {
      const nextCount = revealedEventCount + 1;
      setRevealedEventCount(nextCount);
      const nextEval = tripResult.eventResults[nextCount - 1];
      const outcomeText = nextEval.handled
        ? `Handled with ${nextEval.solverItemId}`
        : "Missed";
      setAnnouncement(`Event ${nextCount}: ${nextEval.event.text} Result: ${outcomeText}`);
    } else {
      // All events revealed, proceed to trip summary
      setScreen("summary");

      // Save trip progress
      const prevTripRecord = campaign.completedTrips[currentTrip.id];
      const bestStars = Math.max(prevTripRecord?.bestStars ?? 0, tripResult.stars);
      const bestPoints = Math.max(prevTripRecord?.bestPoints ?? 0, tripResult.points);

      const thirdJacketSaved =
        Boolean(prevTripRecord?.thirdJacketSavedCold) ||
        tripResult.eventResults.some(
          (r) => r.handled && r.solverItemId === "third-jacket"
        );

      const nextCompleted = {
        ...campaign.completedTrips,
        [currentTrip.id]: {
          tripId: currentTrip.id,
          packedItemIds: [...packedItemIds],
          bestStars,
          bestPoints,
          thirdJacketSavedCold: thirdJacketSaved,
        },
      };

      // Unlock next trip if not already unlocked
      const nextUnlocked = Math.max(
        campaign.unlockedTripNumber,
        Math.min(5, currentTrip.number + 1)
      );

      saveCampaignState({
        completedTrips: nextCompleted,
        unlockedTripNumber: nextUnlocked,
      });

      setAnnouncement(`Trip completed with ${tripResult.stars} stars. Score: ${tripResult.points} points.`);
    }
  };

  const handleStartOver = () => {
    const fresh = {
      completedTrips: {},
      unlockedTripNumber: 1,
    };
    saveCampaignState(fresh);
    setPackedItemIds([]);
    setTripResult(null);
    setScreen("intro");
    setAnnouncement("Progress reset. You can start the campaign afresh.");
  };

  // Overall Campaign stats
  const totalStars = SADDLEBAG_TRIPS.reduce((acc, trip) => {
    return acc + (campaign.completedTrips[trip.id]?.bestStars ?? 0);
  }, 0);

  const packerTitle: PackerTitle = getPackerTitle(totalStars);
  const earnedBadges: SaddlebagBadge[] = evaluateBadges(
    campaign.completedTrips,
    totalStars
  );

  const hasAnyProgress = Object.keys(campaign.completedTrips).length > 0;
  const isTrip5Finished = Boolean(campaign.completedTrips["trip-5"]);

  return (
    <section
      id="pack-the-saddlebag"
      className="border-t border-[#201e1b] bg-[#0c0b0a] py-16 sm:py-24 text-[#f5f3ef]"
      aria-label="Pack the Saddlebag game"
    >
      {/* Accessible live announcement region */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
        {/* =========================================================================
            SCREEN 1: INTRO
           ========================================================================= */}
        {screen === "intro" && (
          <div className="space-y-8 max-w-3xl">
            <header className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#c4a482] block">
                ROADSIDE STRATEGY GAME
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                Pack the Saddlebag
              </h2>
              <p className="text-base sm:text-lg text-[#c6c0b6] font-light leading-relaxed">
                Five trips. Limited space. The road will find out what you forgot.
              </p>
              <p className="text-xs font-mono uppercase tracking-wider text-[#aba59c]">
                Just for fun · fictional scenarios, not Saraswat&apos;s actual trips or kit.
              </p>
            </header>

            {/* How to play disclosure */}
            <details className="border border-[#262421] bg-[#141312] p-5 rounded-sm text-xs font-mono text-[#c6c0b6] group">
              <summary className="cursor-pointer font-medium uppercase tracking-wider text-[#c4a482] hover:text-[#f5f3ef] flex items-center justify-between min-h-[44px]">
                <span>How to play</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-[#aba59c]" />
              </summary>
              <div className="mt-4 space-y-2.5 pt-3 border-t border-[#22201e] text-xs text-[#aba59c] leading-relaxed">
                <p>1. Choose an unlocked trip to review its road forecast clues and bag slot capacity.</p>
                <p>2. Fill your saddlebag with essential tools to survive roadside surprises, or pack luxuries for mood bonuses.</p>
                <p>3. Ride the route: your equipment is tested against unexpected events revealed one by one.</p>
                <p>4. Earn up to 3 stars per trip. Complete all 5 trips to unlock your final packer title and secret badges.</p>
              </div>
            </details>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setScreen("trip-board")}
                className="min-h-[44px] px-6 py-3 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm"
              >
                {hasAnyProgress ? "Continue Campaign" : "Start Packing"}
              </button>

              {hasAnyProgress && (
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="min-h-[44px] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
                >
                  Start over
                </button>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 2: TRIP BOARD
           ========================================================================= */}
        {screen === "trip-board" && (
          <div className="space-y-8">
            <header className="space-y-2 border-b border-[#201e1b] pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482] block">
                CAMPAIGN ROADMAP · {totalStars} / 15 STARS
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl sm:text-4xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                Choose Your Next Trip
              </h2>
              <p className="text-xs sm:text-sm text-[#aba59c]">
                Complete each trip to unlock the next leg of the journey.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SADDLEBAG_TRIPS.map((trip, idx) => {
                const isUnlocked = trip.number <= campaign.unlockedTripNumber;
                const record = campaign.completedTrips[trip.id];
                const starsEarned = record?.bestStars ?? 0;

                return (
                  <div
                    key={trip.id}
                    className={`p-6 border rounded-sm flex flex-col justify-between space-y-4 transition-colors ${
                      isUnlocked
                        ? "bg-[#141312] border-[#262421] hover:border-[#38342f]"
                        : "bg-[#0f0e0d] border-[#1b1a18] opacity-60"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#c4a482] uppercase tracking-wider">
                          TRIP 0{trip.number}
                        </span>
                        {isUnlocked ? (
                          <span className="text-[#aba59c]">{trip.slots} slots</span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#aba59c]">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-serif text-[#f5f3ef]">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-[#aba59c] leading-relaxed">
                        {trip.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1e1c1a] flex items-center justify-between">
                      {isUnlocked ? (
                        <>
                          <div className="flex items-center gap-1" aria-label={`${starsEarned} of 3 stars`}>
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${
                                  s <= starsEarned
                                    ? "fill-[#c4a482] text-[#c4a482]"
                                    : "text-[#332f2a]"
                                }`}
                              />
                            ))}
                            <span className="text-xs font-mono text-[#aba59c] ml-1.5">
                              {starsEarned > 0 ? `${starsEarned} / 3` : "Unplayed"}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectTripFromBoard(idx)}
                            className="min-h-[44px] px-4 py-2 bg-[#22201e] text-[#f5f3ef] font-mono text-xs uppercase tracking-wider hover:bg-[#c4a482] hover:text-[#0c0b0a] transition-colors rounded-sm"
                          >
                            {starsEarned > 0 ? "Replay" : "Pack"}
                          </button>
                        </>
                      ) : (
                        <p className="text-xs font-mono text-[#aba59c]">
                          Complete Trip {trip.number - 1} to unlock
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setScreen("intro")}
                className="min-h-[44px] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
              >
                ← Back to Intro
              </button>

              {isTrip5Finished && (
                <button
                  type="button"
                  onClick={() => setScreen("campaign-end")}
                  className="min-h-[44px] px-5 py-2.5 bg-[#22201e] text-[#c4a482] font-mono text-xs uppercase tracking-wider hover:bg-[#c4a482] hover:text-[#0c0b0a] transition-colors rounded-sm flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>View Packer Title</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 3: PACKING
           ========================================================================= */}
        {screen === "packing" && (
          <div className="space-y-8">
            <header className="space-y-1.5 border-b border-[#201e1b] pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482]">
                  TRIP 0{currentTrip.number} · PACKING BENCH
                </span>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl sm:text-4xl font-serif text-[#f5f3ef] tracking-tight outline-none mt-1"
                >
                  {currentTrip.title}
                </h2>
              </div>
              <div className="text-xs font-mono text-[#aba59c]">
                Capacity: <strong className="text-[#f5f3ef]">{currentTrip.slots} slots</strong>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Road Report / Forecast */}
              <div className="lg:col-span-4 space-y-6 bg-[#141312] border border-[#22201e] p-6 rounded-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482] block flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Road Report Clues</span>
                  </span>
                  <p className="text-xs text-[#aba59c] leading-relaxed">
                    The forecast describes the full route pool. Pack for what hurts most to miss.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-[#c6c0b6] border-t border-[#1f1d1b] pt-4">
                  {currentTrip.roadReport.map((clue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c4a482] font-mono select-none">―</span>
                      <span className="leading-relaxed">{clue}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#1f1d1b]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block mb-1">
                    Route Packing Tip
                  </span>
                  <p className="text-xs italic text-[#c6c0b6]">
                    &ldquo;{currentTrip.packingTip}&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column: Saddlebag Visual & Item Selector */}
              <div className="lg:col-span-8 space-y-6">
                {/* Saddlebag Visual Representation */}
                <div className="p-6 bg-[#121110] border border-[#262421] rounded-sm space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase tracking-widest text-[#aba59c]">
                      Saddlebag Capacity
                    </span>
                    <span
                      className={`font-semibold ${
                        usedSlots === currentTrip.slots
                          ? "text-[#c4a482]"
                          : "text-[#f5f3ef]"
                      }`}
                    >
                      {usedSlots} / {currentTrip.slots} slots {usedSlots === currentTrip.slots && "· Full"}
                    </span>
                  </div>

                  {/* Visual Slot Grid */}
                  <div className="flex flex-wrap gap-2.5 p-3 bg-[#0c0b0a] border border-[#1e1c1a] rounded-sm min-h-[72px] items-center">
                    {packedItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleItem(item)}
                        className="group flex items-center gap-2 px-3 py-2 bg-[#22201e] border border-[#3a352f] text-xs font-mono text-[#f5f3ef] rounded-sm hover:border-[#c4a482] transition-colors min-h-[44px]"
                        title={`Click to unpack ${item.name}`}
                      >
                        <ItemIcon name={item.icon} className="w-4 h-4 text-[#c4a482]" />
                        <span className="max-w-[130px] truncate">{item.name}</span>
                        <span className="text-[10px] text-[#aba59c] group-hover:text-[#c4a482]">✕</span>
                      </button>
                    ))}

                    {/* Empty Slots Indicator */}
                    {Array.from({ length: freeSlots }).map((_, idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="h-10 w-12 border-2 border-dashed border-[#22201e] rounded-sm flex items-center justify-center text-xs font-mono text-[#3a352f]"
                        title="Empty slot"
                      >
                        ·
                      </div>
                    ))}
                  </div>

                  {/* Quip Callout */}
                  {recentQuip && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-[#181615] border-l-2 border-[#c4a482] text-xs text-[#c6c0b6] italic"
                    >
                      &ldquo;{recentQuip}&rdquo;
                    </motion.div>
                  )}
                </div>

                {/* Items Selection Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#aba59c]">
                    <span className="uppercase tracking-widest">Select Items to Pack</span>
                    <span>Essentials solve events · Luxuries add Mood</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SADDLEBAG_ITEMS.map((item) => {
                      const isPacked = packedItemIds.includes(item.id);
                      const fits = item.slots <= freeSlots;
                      const disabled = !isPacked && !fits;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={isPacked}
                          disabled={disabled}
                          onClick={() => handleToggleItem(item)}
                          className={`p-3 border rounded-sm text-left flex items-start justify-between gap-3 min-h-[52px] transition-all ${
                            isPacked
                              ? "bg-[#22201e] border-[#c4a482] text-[#f5f3ef]"
                              : disabled
                              ? "bg-[#0e0d0c] border-[#181716] opacity-40 cursor-not-allowed text-[#777169]"
                              : "bg-[#141312] border-[#22201e] hover:border-[#38342f] text-[#c6c0b6] hover:text-[#f5f3ef]"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 text-[#c4a482]">
                              <ItemIcon name={item.icon} className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-medium leading-snug">
                                {item.name}
                              </div>
                              <div className="text-[11px] font-mono text-[#aba59c] mt-0.5">
                                {item.kind === "luxury" ? "Luxury" : "Essential"} · {item.slots} {item.slots === 1 ? "slot" : "slots"}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            {isPacked ? (
                              <span className="text-[11px] font-mono uppercase text-[#c4a482] font-semibold">
                                Packed
                              </span>
                            ) : disabled ? (
                              <span className="text-[11px] font-mono text-[#777169]">
                                Needs {item.slots}
                              </span>
                            ) : (
                              <span className="text-[11px] font-mono text-[#aba59c]">
                                + Add
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ride & Control Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#201e1b]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setScreen("trip-board")}
                      className="min-h-[44px] px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
                    >
                      ← Back to Trips
                    </button>
                    {packedItemIds.length > 0 && (
                      <button
                        type="button"
                        onClick={handleUnpackAll}
                        className="min-h-[44px] px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
                      >
                        Unpack All
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={packedItemIds.length === 0}
                    onClick={handleRide}
                    className={`min-h-[44px] px-8 py-3 font-mono text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors ${
                      packedItemIds.length === 0
                        ? "bg-[#22201e] text-[#777169] cursor-not-allowed"
                        : "bg-[#c4a482] text-[#0c0b0a] hover:bg-[#d4b797]"
                    }`}
                  >
                    {packedItemIds.length === 0 ? "Pack at least one item" : "Ride →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 4: RIDING
           ========================================================================= */}
        {screen === "riding" && tripResult && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <header className="space-y-1.5 border-b border-[#201e1b] pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482] block">
                ON THE ROAD · EVENT {revealedEventCount} OF {drawnEvents.length}
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl sm:text-4xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                {currentTrip.title}
              </h2>
            </header>

            {/* Revealed Events Log */}
            <div className="space-y-5" ref={resultRef} tabIndex={-1}>
              {drawnEvents.slice(0, revealedEventCount).map((event, idx) => {
                const evalResult = tripResult.eventResults[idx];
                const isHandled = evalResult.handled;

                return (
                  <motion.div
                    key={event.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-6 border rounded-sm space-y-4 ${
                      isHandled
                        ? "bg-[#141513] border-[#2d3a2a]"
                        : "bg-[#171212] border-[#3f2525]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#aba59c] uppercase tracking-wider">
                        Event 0{idx + 1} {event.isBonus && "· Sunrise Bonus"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isHandled ? (
                          <span className="inline-flex items-center gap-1 text-[#86efac] font-medium">
                            <Check className="w-3.5 h-3.5" />
                            <span>Handled</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#fca5a5] font-medium">
                            <X className="w-3.5 h-3.5" />
                            <span>Missed</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-serif text-[#f5f3ef] leading-relaxed">
                      &ldquo;{event.text}&rdquo;
                    </p>

                    <div className="pt-3 border-t border-[#22201e]/60 text-xs font-mono text-[#c6c0b6] flex items-start gap-2">
                      <span className={isHandled ? "text-[#86efac]" : "text-[#fca5a5]"}>
                        {isHandled ? "✓" : "✕"}
                      </span>
                      <span className="leading-relaxed">{evalResult.line}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Step Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextEvent}
                className="min-h-[44px] px-8 py-3 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm flex items-center gap-2"
              >
                <span>
                  {revealedEventCount < drawnEvents.length ? "Ride on →" : "See how it went"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 5: SUMMARY
           ========================================================================= */}
        {screen === "summary" && tripResult && (
          <div className="space-y-8 max-w-2xl mx-auto" ref={resultRef} tabIndex={-1}>
            <header className="space-y-2 border-b border-[#201e1b] pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482] block">
                TRIP SUMMARY · {currentTrip.title}
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                {tripResult.stars === 3
                  ? "Flawless Run"
                  : tripResult.stars > 0
                  ? "Trip Complete"
                  : "Towed Home"}
              </h2>
            </header>

            {/* Stars & Core Metrics */}
            <div className="p-6 bg-[#141312] border border-[#262421] rounded-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#201e1b] pb-5">
                <div>
                  <div className="flex items-center gap-1.5" aria-label={`${tripResult.stars} of 3 stars`}>
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-6 h-6 ${
                          s <= tripResult.stars
                            ? "fill-[#c4a482] text-[#c4a482]"
                            : "text-[#332f2a]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-mono text-[#aba59c] mt-1">
                    {tripResult.stars > 0
                      ? `${tripResult.stars} of 3 stars`
                      : tripResult.starMessage}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-serif text-[#f5f3ef]">
                    {tripResult.points} <span className="text-xs font-mono text-[#aba59c]">pts</span>
                  </div>
                  <div className="text-xs font-mono text-[#aba59c]">
                    Mood: +{tripResult.mood} pts
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#aba59c] block uppercase">Events Handled</span>
                  <span className="text-base text-[#f5f3ef] font-serif">
                    {tripResult.handledCount} of {tripResult.essentialCount}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Packed Luxuries</span>
                  <span className="text-base text-[#f5f3ef] font-serif">
                    {packedItems.filter((i) => i.kind === "luxury").length} items
                  </span>
                </div>
              </div>
            </div>

            {/* Luxury Lines Callout */}
            {tripResult.luxuryLines.length > 0 && (
              <div className="p-5 bg-[#141312] border border-[#262421] rounded-sm space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#c4a482] block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Luxury Dispatches</span>
                </span>
                <ul className="space-y-2 text-xs text-[#c6c0b6] leading-relaxed">
                  {tripResult.luxuryLines.map((lineObj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c4a482] select-none font-mono">―</span>
                      <span>
                        <strong>{lineObj.item}:</strong> &ldquo;{lineObj.line}&rdquo;
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trip Packing Tip */}
            <div className="p-5 bg-[#0f0e0d] border border-[#1e1c1a] rounded-sm text-xs font-mono text-[#aba59c] space-y-1">
              <span className="text-[#c4a482] uppercase tracking-wider block">
                Road Note for Future
              </span>
              <p className="text-[#c6c0b6] italic leading-relaxed">
                &ldquo;{currentTrip.packingTip}&rdquo;
              </p>
            </div>

            {/* Summary Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#201e1b]">
              <button
                type="button"
                onClick={() => handleStartPacking(currentTripIndex)}
                className="min-h-[44px] px-5 py-2.5 bg-[#22201e] text-[#f5f3ef] font-mono text-xs uppercase tracking-wider hover:bg-[#332f2a] transition-colors rounded-sm flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try this trip again</span>
              </button>

              {currentTripIndex < SADDLEBAG_TRIPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => handleStartPacking(currentTripIndex + 1)}
                  className="min-h-[44px] px-6 py-2.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm flex items-center gap-2"
                >
                  <span>Next trip →</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setScreen("campaign-end")}
                  className="min-h-[44px] px-6 py-2.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm flex items-center gap-2"
                >
                  <span>See your packer title →</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 6: CAMPAIGN END
           ========================================================================= */}
        {screen === "campaign-end" && (
          <div className="space-y-8 max-w-2xl mx-auto" ref={resultRef} tabIndex={-1}>
            <header className="space-y-2 border-b border-[#201e1b] pb-6 text-center">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c4a482] block">
                CAMPAIGN CONCLUDED · {totalStars} / 15 STARS
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                {packerTitle.title}
              </h2>
              <p className="text-base sm:text-lg text-[#c6c0b6] italic max-w-xl mx-auto leading-relaxed pt-2">
                &ldquo;{packerTitle.line}&rdquo;
              </p>
            </header>

            {/* Badges Section */}
            <div className="p-6 bg-[#141312] border border-[#262421] rounded-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c4a482] block flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Earned Road Badges</span>
              </span>

              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-4 bg-[#1a1816] border border-[#2d2924] rounded-sm space-y-1.5"
                    >
                      <div className="text-xs font-mono uppercase text-[#f5f3ef] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c4a482]" />
                        <span>{badge.name}</span>
                      </div>
                      <p className="text-xs text-[#aba59c] leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#aba59c] italic">
                  No secret badges unlocked this time. Try packing unusual items like the golf bag or pizza across multiple journeys!
                </p>
              )}
            </div>

            {/* Trip Recap Table */}
            <div className="p-5 bg-[#121110] border border-[#201e1b] rounded-sm space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
                Five Trips Breakdown
              </span>
              <div className="divide-y divide-[#1e1c1a] text-xs font-mono">
                {SADDLEBAG_TRIPS.map((trip) => {
                  const stars = campaign.completedTrips[trip.id]?.bestStars ?? 0;
                  const pts = campaign.completedTrips[trip.id]?.bestPoints ?? 0;
                  return (
                    <div key={trip.id} className="py-2.5 flex items-center justify-between">
                      <span className="text-[#f5f3ef]">0{trip.number}. {trip.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#c4a482]">
                          {"★".repeat(stars)}{"☆".repeat(3 - stars)}
                        </span>
                        <span className="text-[#aba59c] w-12 text-right">{pts} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* End Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#201e1b]">
              <button
                type="button"
                onClick={handleStartOver}
                className="min-h-[44px] px-5 py-2.5 bg-[#22201e] text-[#f5f3ef] font-mono text-xs uppercase tracking-wider hover:bg-[#332f2a] transition-colors rounded-sm"
              >
                Start Over
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setScreen("trip-board")}
                  className="min-h-[44px] px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
                >
                  Trip Board
                </button>
                <a
                  href="#machines-collection"
                  className="min-h-[44px] px-6 py-2.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm inline-flex items-center gap-1.5"
                >
                  <span>See the machines ↑</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
