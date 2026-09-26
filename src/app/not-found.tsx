import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page not found — Saraswat Mishra",
};

export default function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden border-b border-white/10">
      <Image
        src="/images/placeholders/archive-ridge.webp"
        alt="A quiet ridge road disappearing into the clouds"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/70 to-[#0c0b0a]/30" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-6 md:px-12 md:pb-24">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#d0b18f]">A TURN OFF THE MAP</span>
        <h1 className="mt-4 font-serif text-6xl tracking-tight text-[#f5f3ef] sm:text-7xl">This road ends here.</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d0cbc2]">The page may have moved, but there is still plenty of road left to explore.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center border border-white/30 px-5 text-xs font-mono uppercase tracking-[0.18em] text-[#f5f3ef] hover:border-[#c4a482]">Return home</Link>
          <Link href="/atlas" className="inline-flex min-h-11 items-center border border-white/15 px-5 text-xs font-mono uppercase tracking-[0.18em] text-[#c4a482] hover:border-white/40">Explore the Atlas</Link>
        </div>
        <p className="mt-5 text-[9px] font-mono uppercase tracking-[0.15em] text-white/50">AI-generated photo study · not original photography</p>
      </div>
    </section>
  );
}
