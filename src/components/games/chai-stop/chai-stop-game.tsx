"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Coffee,
  Clock,
  Compass,
  ChevronDown,
  RotateCcw,
  Share2,
  Check,
  Sparkles,
  Bike,
} from "lucide-react";
import {
  RIDER_ARCHETYPES,
  type ChaiScene,
  type ChaiOption,
} from "../../../data/games/chai-stop.ts";
import {
  generateChaiRun,
  createInitialChaiState,
  applyOptionChoice,
  evaluateEnding,
  formatClock,
  GOAL_DISTANCE_KM,
  type ChaiState,
  type ChoiceResult,
  type ChaiEndingResult,
} from "../../../lib/games/chai-engine.ts";
import { createRng, newSeed } from "../../../lib/games/random.ts";
import { readJSON, writeJSON, subscribeStorage, STORAGE_KEYS } from "../../../lib/games/storage.ts";
import { ChaiIcon } from "./chai-icon.tsx";

interface ChaiStorageData {
  runCount: number;
  foundArchetypeIds: string[];
}

const INITIAL_STORAGE: ChaiStorageData = {
  runCount: 0,
  foundArchetypeIds: [],
};

type GameScreen = "intro" | "playing" | "outcome" | "result";

export function ChaiStopGame() {
  const reducedMotion = useReducedMotion();

  // Storage state via useSyncExternalStore
  const history = useSyncExternalStore(
    subscribeStorage,
    () => readJSON<ChaiStorageData>(STORAGE_KEYS.CHAI, INITIAL_STORAGE),
    () => INITIAL_STORAGE
  );

  // Active game run state
  const [screen, setScreen] = useState<GameScreen>("intro");
  const [scenes, setScenes] = useState<ChaiScene[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [state, setState] = useState<ChaiState>(createInitialChaiState());
  const [lastChoice, setLastChoice] = useState<{
    option: ChaiOption;
    result: ChoiceResult;
  } | null>(null);
  const [finalEnding, setFinalEnding] = useState<ChaiEndingResult | null>(null);

  // Live region and copy feedback
  const [announcement, setAnnouncement] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Focus management
  const headingRef = useRef<HTMLHeadingElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Move focus on screen/outcome transition
  useEffect(() => {
    if (screen === "outcome") {
      outcomeRef.current?.focus();
    } else if (screen === "result") {
      resultRef.current?.focus();
    } else {
      headingRef.current?.focus();
    }
  }, [screen, currentIndex]);

  const handleStartRun = () => {
    const seed = newSeed();
    const rng = createRng(seed);
    const newRun = generateChaiRun(rng);

    setScenes(newRun);
    setCurrentIndex(0);
    setState(createInitialChaiState());
    setLastChoice(null);
    setFinalEnding(null);
    setScreen("playing");
    setAnnouncement("Started the day at 6:00 AM. 280 kilometres to reach the lake.");
  };

  const handleSelectOption = (option: ChaiOption) => {
    const seed = newSeed();
    const rng = createRng(seed);
    const result = applyOptionChoice(state, option, rng);

    setState(result.nextState);
    setLastChoice({ option, result });
    setScreen("outcome");

    // Format announcement
    const diffs: string[] = [];
    if (result.distanceDelta > 0) diffs.push(`+${result.distanceDelta} km`);
    if (result.timeDelta > 0) diffs.push(`+${result.timeDelta} min`);
    if (result.chaiDelta > 0) diffs.push(`+${result.chaiDelta} chai`);
    if (result.wrongTurnsDelta > 0) diffs.push(`+${result.wrongTurnsDelta} wrong turn`);

    setAnnouncement(`You chose ${option.label}. ${result.outcomeLine} (${diffs.join(", ")})`);
  };

  const handleAdvance = () => {
    // Check for early arrival (distance >= 280) or end of run
    const hasArrived = state.distance >= GOAL_DISTANCE_KM;
    const isLastScene = currentIndex >= scenes.length - 1;

    if (hasArrived || isLastScene) {
      // Conclude run
      const ending = evaluateEnding(state);
      setFinalEnding(ending);
      setScreen("result");

      // Save to storage
      const nextArchetypes = Array.from(
        new Set([...history.foundArchetypeIds, ending.archetype.id])
      );
      const nextHistory: ChaiStorageData = {
        runCount: history.runCount + 1,
        foundArchetypeIds: nextArchetypes,
      };
      writeJSON(STORAGE_KEYS.CHAI, nextHistory);

      setAnnouncement(`Arrived! Result: ${ending.title}. You are ${ending.archetype.name}.`);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setLastChoice(null);
      setScreen("playing");
      const nextScene = scenes[currentIndex + 1];
      const timeStr = formatClock(state.timeMinutes);
      const formattedPrompt = nextScene.prompt.replace("{time}", timeStr);
      setAnnouncement(`Scene ${currentIndex + 2}: ${formattedPrompt}`);
    }
  };

  const handleShare = async () => {
    if (!finalEnding) return;
    const { archetype, stats } = finalEnding;
    const arrivalPhrase = stats.hasArrived
      ? `reached the lake at ${stats.arrivalClock}`
      : `stopped ${GOAL_DISTANCE_KM - stats.distance} km short`;

    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}#chai-stop-or-keep-riding`
      : "";

    const textToShare = `I'm ${archetype.name} 🍵 — ${stats.chai} chai, ${stats.wrongTurns} wrong turns, ${arrivalPhrase}. Play 'Chai Stop or Keep Riding?' on Saraswat Mishra's site: ${shareUrl}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Chai Stop or Keep Riding?",
          text: textToShare,
          url: shareUrl,
        });
        setCopied(true);
        setAnnouncement("Shared result.");
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setAnnouncement("Copied result text to clipboard.");
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Failed
      }
    }
  };

  const currentScene: ChaiScene | undefined = scenes[currentIndex];
  const clockString = formatClock(state.timeMinutes);
  const formattedPrompt = currentScene?.prompt.replace("{time}", clockString);

  // Time of day background subtle tint
  const currentTimeOfDay = currentScene?.timeOfDay || "morning";
  const bgTintClass =
    screen === "intro" || screen === "result"
      ? "bg-[#0c0b0a]"
      : currentTimeOfDay === "morning"
      ? "bg-[#0c0d0f]"
      : currentTimeOfDay === "midday"
      ? "bg-[#0e0d0c]"
      : currentTimeOfDay === "afternoon"
      ? "bg-[#0f0d0b]"
      : "bg-[#0d0b10]";

  const progressPercent = Math.min(100, (state.distance / GOAL_DISTANCE_KM) * 100);

  return (
    <section
      id="chai-stop-or-keep-riding"
      className={`border-t border-[#201e1b] py-16 sm:py-24 text-[#f5f3ef] transition-colors duration-500 ${bgTintClass}`}
      aria-label="Chai Stop or Keep Riding game"
    >
      {/* Live announcement region */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        {/* =========================================================================
            SCREEN 1: INTRO
           ========================================================================= */}
        {screen === "intro" && (
          <div className="space-y-8 max-w-3xl">
            <header className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#c4a482] block">
                ROADSIDE STORY GAME
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                Chai Stop or Keep Riding?
              </h2>
              <p className="text-base sm:text-lg text-[#c6c0b6] font-light leading-relaxed">
                One day, one road, one lake to reach by sunset. How many chais is too many?
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
                <p>1. Start at 6:00 AM with 280 km of highway and mountain passes ahead. Sunset is 6:30 PM.</p>
                <p>2. Make 14 roadside decisions (12 scenic waypoints plus 2 surprise wildcards).</p>
                <p>3. Every choice balances progress against warm roadside moments: stop for tea and stories, or push forward through the wind.</p>
                <p>4. Reach the lake before dark to unlock your unique rider archetype and compare with friends.</p>
              </div>
            </details>

            {/* Archetypes found tracker */}
            {history.runCount > 0 && (
              <div className="p-5 bg-[#141312] border border-[#22201e] rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#c4a482] uppercase tracking-wider">
                    Archetypes Found: {history.foundArchetypeIds.length} of 6
                  </span>
                  <span className="text-[#aba59c]">{history.runCount} runs completed</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Object.values(RIDER_ARCHETYPES).map((arch) => {
                    const found = history.foundArchetypeIds.includes(arch.id);
                    return (
                      <span
                        key={arch.id}
                        className={`text-xs font-mono px-2.5 py-1 rounded-sm border ${
                          found
                            ? "bg-[#22201e] border-[#c4a482] text-[#f5f3ef]"
                            : "bg-[#0e0d0c] border-[#1a1918] text-[#555048]"
                        }`}
                      >
                        {found ? `✓ ${arch.name}` : `? ${arch.name}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartRun}
                className="min-h-[44px] px-8 py-3.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm inline-flex items-center gap-2"
              >
                <span>Start the day →</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 2 & 3: PLAYING & OUTCOME
           ========================================================================= */}
        {(screen === "playing" || screen === "outcome") && currentScene && (
          <div className="space-y-8">
            {/* Sticky HUD Bar */}
            <div className="sticky top-16 z-30 bg-[#0c0b0a]/95 backdrop-blur-md border border-[#262421] p-4 rounded-sm shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#f5f3ef]">
                  <Clock className="w-4 h-4 text-[#c4a482]" />
                  <span className="font-semibold">{clockString}</span>
                  <span className="text-[#aba59c] hidden sm:inline">(Sunset 6:30 PM)</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#f5f3ef]">
                    <Coffee className="w-4 h-4 text-[#c4a482]" />
                    <span>{state.chai} chai</span>
                  </div>

                  {state.wrongTurns > 0 && (
                    <div className="flex items-center gap-1.5 text-[#aba59c]">
                      <Compass className="w-4 h-4 text-[#aba59c]" />
                      <span>{state.wrongTurns} wrong {state.wrongTurns === 1 ? "turn" : "turns"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Distance Bar */}
              <div className="space-y-1">
                <div className="relative h-2 w-full bg-[#1b1a18] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 bg-[#c4a482]"
                    style={{ width: `${progressPercent}%` }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-[#aba59c]">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-[#c4a482]" />
                    <span>{state.distance} / {GOAL_DISTANCE_KM} km</span>
                  </span>
                  <span>The Lake (Goal)</span>
                </div>
              </div>
            </div>

            {/* Scene Container */}
            <div className="p-6 sm:p-8 bg-[#141312] border border-[#262421] rounded-sm space-y-6">
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#201e1b] pb-4">
                <span className="text-[#c4a482] uppercase tracking-[0.2em]">
                  {currentScene.isWildcard
                    ? `WILDCARD · DECISION ${currentIndex + 1} OF ${scenes.length}`
                    : `${currentScene.timeOfDay.toUpperCase()} · DECISION ${currentIndex + 1} OF ${scenes.length}`}
                </span>
                <ChaiIcon name={currentScene.icon} className="w-5 h-5 text-[#c4a482]" />
              </div>

              <div className="space-y-2">
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-2xl sm:text-3xl font-serif text-[#f5f3ef] leading-relaxed outline-none"
                >
                  &ldquo;{formattedPrompt}&rdquo;
                </h3>
              </div>

              {/* Option Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentScene.options.map((opt, idx) => {
                  const isChosen = lastChoice?.option === opt;
                  const isResolved = screen === "outcome";

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isResolved}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 sm:p-5 border rounded-sm text-left flex flex-col justify-between gap-3 min-h-[56px] transition-all ${
                        isChosen
                          ? "bg-[#22201e] border-[#c4a482] text-[#f5f3ef]"
                          : isResolved
                          ? "bg-[#11100f] border-[#1e1c1a] opacity-50 cursor-not-allowed text-[#aba59c]"
                          : "bg-[#161514] border-[#262421] hover:border-[#c4a482] hover:bg-[#1c1a18] text-[#f5f3ef]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-serif font-medium">
                        {opt.label}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#aba59c]">
                        <span className="uppercase tracking-wider">
                          {opt.kind === "ride"
                            ? "Ride on"
                            : opt.kind === "stop"
                            ? "Pause"
                            : opt.kind === "detour"
                            ? "Detour"
                            : "Risk it"}
                        </span>
                        {isChosen && (
                          <span className="text-[#c4a482] font-semibold">You chose</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Outcome Reveal Box */}
              {screen === "outcome" && lastChoice && (
                <motion.div
                  ref={outcomeRef}
                  tabIndex={-1}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-[#181615] border-l-2 border-[#c4a482] rounded-sm space-y-3 outline-none"
                >
                  <p className="text-base font-serif italic text-[#f5f3ef]">
                    &ldquo;{lastChoice.result.outcomeLine}&rdquo;
                  </p>

                  {/* Effect Chips */}
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#aba59c]">
                    {lastChoice.result.distanceDelta > 0 && (
                      <span className="px-2 py-0.5 bg-[#22201e] rounded-sm text-[#f5f3ef]">
                        +{lastChoice.result.distanceDelta} km
                      </span>
                    )}
                    {lastChoice.result.timeDelta > 0 && (
                      <span className="px-2 py-0.5 bg-[#22201e] rounded-sm text-[#aba59c]">
                        +{lastChoice.result.timeDelta} min
                      </span>
                    )}
                    {lastChoice.result.chaiDelta > 0 && (
                      <span className="px-2 py-0.5 bg-[#22201e] rounded-sm text-[#c4a482]">
                        +{lastChoice.result.chaiDelta} chai
                      </span>
                    )}
                    {lastChoice.result.wrongTurnsDelta > 0 && (
                      <span className="px-2 py-0.5 bg-[#22201e] rounded-sm text-[#e0a96d]">
                        +{lastChoice.result.wrongTurnsDelta} wrong turn
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleAdvance}
                      className="min-h-[44px] px-6 py-2.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm"
                    >
                      <span>
                        {state.distance >= GOAL_DISTANCE_KM || currentIndex >= scenes.length - 1
                          ? "See your arrival →"
                          : "Next →"}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 4: RESULT
           ========================================================================= */}
        {screen === "result" && finalEnding && (
          <div className="space-y-8 max-w-2xl mx-auto" ref={resultRef} tabIndex={-1}>
            <header className="space-y-2 border-b border-[#201e1b] pb-6">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#c4a482] block">
                JOURNEY&apos;S END · FINAL VERDICT
              </span>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-serif text-[#f5f3ef] tracking-tight outline-none"
              >
                {finalEnding.title}
              </h2>
              <p className="text-base sm:text-lg text-[#c6c0b6] font-light leading-relaxed pt-1">
                {finalEnding.line}
              </p>
            </header>

            {/* Rider Archetype Card */}
            <div className="p-6 sm:p-8 bg-[#141312] border border-[#262421] rounded-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482] block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your Rider Archetype</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f5f3ef]">
                  {finalEnding.archetype.name}
                </h3>
                <p className="text-sm text-[#c6c0b6] leading-relaxed italic">
                  &ldquo;{finalEnding.archetype.description}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f1d1b] text-xs font-mono">
                <div>
                  <span className="text-[#aba59c] block uppercase">Best Riding Buddy</span>
                  <span className="text-[#f5f3ef] font-serif text-base mt-0.5 block">
                    {finalEnding.archetype.bestBuddy}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Watch Out For</span>
                  <span className="text-[#f5f3ef] font-serif text-base mt-0.5 block">
                    {finalEnding.archetype.watchOut}
                  </span>
                </div>
              </div>
            </div>

            {/* Run Stats Row */}
            <div className="p-6 bg-[#121110] border border-[#201e1b] rounded-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block mb-4">
                Run Statistics
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#aba59c] block uppercase">Distance</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.distance} km
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Arrival Time</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.arrivalClock}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Chai Consumed</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.chai} {finalEnding.stats.chai === 1 ? "cup" : "cups"}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Wrong Turns</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.wrongTurns}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Views Savor&apos;d</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.views}
                  </span>
                </div>
                <div>
                  <span className="text-[#aba59c] block uppercase">Planned Stops</span>
                  <span className="text-lg text-[#f5f3ef] font-serif">
                    {finalEnding.stats.stops}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#201e1b]">
              <button
                type="button"
                onClick={handleStartRun}
                className="min-h-[44px] px-5 py-2.5 bg-[#22201e] text-[#f5f3ef] font-mono text-xs uppercase tracking-wider hover:bg-[#332f2a] transition-colors rounded-sm flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ride again</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="min-h-[44px] px-6 py-2.5 bg-[#c4a482] text-[#0c0b0a] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#d4b797] transition-colors rounded-sm flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy my result</span>
                  </>
                )}
              </button>
            </div>

            {/* Soft Link to Drift Form */}
            <div className="pt-4 text-center">
              <a
                href="#drift-interest-form"
                className="inline-block py-2 px-3 text-xs font-mono uppercase tracking-wider text-[#aba59c] hover:text-[#f5f3ef] transition-colors"
              >
                Sounds like your kind of road? Leave a note ↓
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
