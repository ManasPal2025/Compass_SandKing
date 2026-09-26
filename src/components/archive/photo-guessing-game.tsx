"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { photoQuizRounds } from "@/data/photo-quiz";

type Screen = "intro" | "playing" | "finished";

function shuffleRounds() {
  return [...photoQuizRounds].sort(() => Math.random() - 0.5);
}

export function PhotoGuessingGame() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [rounds, setRounds] = useState(photoQuizRounds);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState(0);
  const round = rounds[roundIndex];
  const isCorrect = guess === round.answer;

  const startGame = () => {
    setRounds(shuffleRounds());
    setRoundIndex(0);
    setScore(0);
    setGuess(null);
    setHintCount(0);
    setScreen("playing");
  };

  const chooseAnswer = (choice: string) => {
    if (guess) return;
    setGuess(choice);
    if (choice === round.answer) setScore((current) => current + Math.max(1, 3 - hintCount));
  };

  const nextRound = () => {
    if (roundIndex + 1 >= rounds.length) {
      setScreen("finished");
      return;
    }
    setRoundIndex((current) => current + 1);
    setGuess(null);
    setHintCount(0);
  };

  return (
    <section id="photo-guessing-game" className="overflow-hidden border border-white/10 bg-[#11100f]">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c4a482]">ATLAS FIELD GAME</span>
            <h2 className="mt-3 font-serif text-3xl text-[#f5f3ef] sm:text-4xl">Where in the World?</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#aaa398]">Five mystery frames. Choose a country, uncover up to two clues, then see how you did.</p>
            <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.13em] text-[#777168]">Demo mode · images and answers are illustrative, not verified travel history.</p>
          </div>
          {screen === "intro" && <button type="button" onClick={startGame} className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 self-start bg-[#eee7dc] px-5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#171411] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c4a482]">Start the game <span aria-hidden="true">→</span></button>}
          {screen === "finished" && <div className="mt-7"><p className="font-serif text-2xl text-[#f5f3ef]">{score} <span className="text-lg text-[#aaa398]">/ 15 points</span></p><button type="button" onClick={startGame} className="mt-3 inline-flex min-h-11 items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#d0b18f] hover:text-white">Play another set <span aria-hidden="true">↻</span></button></div>}
          <Link href="#atlas-explorer" className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-[10px] font-mono uppercase tracking-[0.15em] text-[#8c867c] hover:text-white">Browse the Atlas <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="p-5 sm:p-8 md:p-10">
          {screen === "intro" ? (
            <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-white/15 px-5 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8b725d]">No timer · Hints cost a point</span>
              <p className="mt-4 max-w-md font-serif text-xl leading-relaxed text-[#d8d2c8]">A little observation goes a long way. Every image in this prototype is a clearly labeled AI study.</p>
            </div>
          ) : screen === "finished" ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c4a482]">Set complete</span>
              <p className="mt-3 font-serif text-5xl text-[#f5f3ef]">{score}<span className="text-2xl text-[#8b847a]"> / 15</span></p>
              <p className="mt-3 text-sm text-[#aaa398]">Every answer reveals the sample place and its illustrative collection.</p>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-[#817b72]">
                <span>Frame {roundIndex + 1} / {rounds.length}</span><span>Score {score}</span>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
                <Image src={round.image} alt={round.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-white/75">AI sample image</span>
              </div>
              <p className="mt-5 font-serif text-xl text-[#f5f3ef] sm:text-2xl">{round.question}</p>
              <fieldset className="mt-4">
                <legend className="sr-only">Choose one country</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {round.options.map((option, index) => {
                    const stateClass = guess && option === round.answer ? "border-[#97b99b]/70 bg-[#26352c] text-[#eff6ef]" : guess === option ? "border-[#cf8984]/70 bg-[#392322] text-[#fff0ed]" : "border-white/10 text-[#c6c0b6] hover:border-white/30";
                    return <button key={option} type="button" disabled={Boolean(guess)} onClick={() => chooseAnswer(option)} className={`flex min-h-12 items-center gap-3 border px-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#c4a482] disabled:cursor-default ${stateClass}`}><span className="font-mono text-[10px] text-[#9a795c]">0{index + 1}</span>{option}</button>;
                  })}
                </div>
              </fieldset>
              {!guess && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {hintCount < 2 && <button type="button" onClick={() => setHintCount((count) => count + 1)} className="min-h-11 border border-white/10 px-3 text-[10px] font-mono uppercase tracking-[0.12em] text-[#aaa398] hover:border-[#c4a482]/60 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c4a482]">Reveal clue {hintCount + 1} · −1 point</button>}
                  {hintCount >= 1 && <p className="flex min-h-11 items-center text-xs text-[#c5b7a5]" role="status">{round.hintOne}</p>}
                  {hintCount >= 2 && <p className="flex min-h-11 items-center text-xs text-[#c5b7a5]" role="status">{round.hintTwo}</p>}
                </div>
              )}
              {guess && (
                <div className="mt-4 border-t border-white/10 pt-4" role="status" aria-live="polite">
                  <p className="font-serif text-lg text-[#f5f3ef]">{isCorrect ? "That’s the place." : `The sample answer is ${round.answer}.`}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#aaa398]">{round.reveal}</p>
                  <button type="button" onClick={nextRound} className="mt-3 inline-flex min-h-11 items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#d0b18f] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-[#c4a482]">{roundIndex + 1 === rounds.length ? "See results" : "Next frame"}<span aria-hidden="true">→</span></button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
