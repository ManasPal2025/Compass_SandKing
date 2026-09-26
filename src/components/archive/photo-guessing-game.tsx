"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { photoQuizRounds, type PhotoQuizRound } from "@/data/photo-quiz";

type Screen = "intro" | "playing" | "finished";

function fisherYates<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleQuiz(data: PhotoQuizRound[]): PhotoQuizRound[] {
  return fisherYates(data).map((item) => ({
    ...item,
    options: fisherYates(item.options),
  }));
}

export function PhotoGuessingGame() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [rounds, setRounds] = useState<PhotoQuizRound[]>(() => shuffleQuiz(photoQuizRounds));
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState(0);

  const questionRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const finalScoreRef = useRef<HTMLParagraphElement>(null);

  const round = rounds[roundIndex] || rounds[0];
  const isCorrect = guess === round.answer;
  const maxScore = rounds.length * 3;

  const startGame = () => {
    setRounds(shuffleQuiz(photoQuizRounds));
    setRoundIndex(0);
    setScore(0);
    setGuess(null);
    setHintCount(0);
    setScreen("playing");
    requestAnimationFrame(() => {
      questionRef.current?.focus();
    });
  };

  const chooseAnswer = (choice: string) => {
    if (guess) return;
    setGuess(choice);
    if (choice === round.answer) {
      setScore((current) => current + Math.max(1, 3 - hintCount));
    }
    requestAnimationFrame(() => {
      resultRef.current?.focus();
    });
  };

  const nextRound = () => {
    if (roundIndex + 1 >= rounds.length) {
      setScreen("finished");
      requestAnimationFrame(() => {
        finalScoreRef.current?.focus();
      });
      return;
    }
    setRoundIndex((current) => current + 1);
    setGuess(null);
    setHintCount(0);
    requestAnimationFrame(() => {
      questionRef.current?.focus();
    });
  };

  return (
    <section id="photo-guessing-game" className="overflow-hidden border border-white/10 bg-[#11100f]">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482]">ATLAS FIELD GAME</span>
            <h2 className="mt-3 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">Where in the World?</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c6c0b6]">Five mystery frames. Choose a country, uncover up to two clues, then see how you did.</p>
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.13em] text-[#9a948a]">Demo mode · images and answers are illustrative, not verified travel history.</p>
          </div>
          {screen === "intro" && (
            <button
              type="button"
              onClick={startGame}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 self-start bg-[#eee7dc] px-5 text-xs font-mono uppercase tracking-[0.16em] text-[#171411] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c4a482]"
            >
              Start the game <span aria-hidden="true">→</span>
            </button>
          )}
          {screen === "finished" && (
            <div className="mt-7">
              <p className="font-serif text-2xl text-[#f5f3ef]">
                {score} <span className="text-lg text-[#aaa398]">/ {maxScore} points</span>
              </p>
              <button
                type="button"
                onClick={startGame}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#d0b18f] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482]"
              >
                Play another set <span aria-hidden="true">↻</span>
              </button>
            </div>
          )}
          <Link
            href="#atlas-explorer"
            className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-xs font-mono uppercase tracking-[0.15em] text-[#c4a482] hover:text-white"
          >
            Browse the Atlas <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="p-5 sm:p-8 md:p-10">
          {screen === "intro" ? (
            <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-white/15 px-5 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d0b18f]">No timer · Hints cost a point</span>
              <p className="mt-4 max-w-md font-serif text-xl leading-relaxed text-[#d8d2c8]">A little observation goes a long way. Every image in this prototype is a clearly labeled AI study.</p>
            </div>
          ) : screen === "finished" ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a482]">Set complete</span>
              <p
                ref={finalScoreRef}
                tabIndex={-1}
                className="mt-3 font-serif text-5xl text-[#f5f3ef] focus:outline-none"
              >
                {score}<span className="text-2xl text-[#c6c0b6]"> / {maxScore}</span>
              </p>
              <p className="mt-3 text-sm text-[#aaa398]">Every answer reveals the sample place and its illustrative collection.</p>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.14em] text-[#aba59c]">
                <span>Frame {roundIndex + 1} / {rounds.length}</span>
                <span>Score {score}</span>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
                <Image src={round.image} alt={round.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/85 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-[#f5f3ef]">AI sample image</span>
              </div>
              <p
                ref={questionRef}
                tabIndex={-1}
                className="mt-5 font-serif text-xl text-[#f5f3ef] sm:text-2xl focus:outline-none"
              >
                {round.question}
              </p>
              <fieldset className="mt-4">
                <legend className="sr-only">Choose one country</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {round.options.map((option, index) => {
                    const isOptionCorrect = guess && option === round.answer;
                    const isOptionUserChoice = guess === option;
                    const stateClass = isOptionCorrect
                      ? "border-[#97b99b]/80 bg-[#1e2f24] text-[#eff6ef]"
                      : isOptionUserChoice
                      ? "border-[#cf8984]/80 bg-[#392322] text-[#fff0ed]"
                      : "border-white/10 text-[#c6c0b6] hover:border-white/30";

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={Boolean(guess)}
                        onClick={() => chooseAnswer(option)}
                        className={`flex min-h-12 items-center justify-between gap-3 border px-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#c4a482] disabled:cursor-default ${stateClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#c4a482]">0{index + 1}</span>
                          <span>{option}</span>
                        </div>
                        {guess && (
                          <span className="font-mono text-xs tracking-wider">
                            {isOptionCorrect && (
                              <span className="text-[#a4cca8]">
                                ✓ Correct{isOptionUserChoice ? " (Your answer)" : ""}
                              </span>
                            )}
                            {!isOptionCorrect && isOptionUserChoice && (
                              <span className="text-[#e29c97]">✗ Your answer</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              {!guess && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {hintCount < 2 && (
                    <button
                      type="button"
                      onClick={() => setHintCount((count) => count + 1)}
                      className="min-h-11 border border-white/10 px-3 text-xs font-mono uppercase tracking-[0.12em] text-[#c6c0b6] hover:border-[#c4a482]/60 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482]"
                    >
                      Reveal clue {hintCount + 1} · −1 point
                    </button>
                  )}
                  {hintCount >= 1 && <p className="flex min-h-11 items-center text-xs text-[#d8d2c8]" role="status">{round.hintOne}</p>}
                  {hintCount >= 2 && <p className="flex min-h-11 items-center text-xs text-[#d8d2c8]" role="status">{round.hintTwo}</p>}
                </div>
              )}
              {guess && (
                <div
                  ref={resultRef}
                  tabIndex={-1}
                  className="mt-4 border-t border-white/10 pt-4 focus:outline-none"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-serif text-lg text-[#f5f3ef]">
                    {isCorrect ? "That’s the place." : `The sample answer is ${round.answer}.`}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#c6c0b6]">{round.reveal}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/atlas?place=${round.placeId}`}
                      className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-[#c4a482] underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482]"
                    >
                      See this place in the Atlas →
                    </Link>
                    <button
                      type="button"
                      onClick={nextRound}
                      className="inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#d0b18f] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[#c4a482]"
                    >
                      {roundIndex + 1 === rounds.length ? "See results" : "Next frame"}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
