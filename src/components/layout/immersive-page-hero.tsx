import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

interface ImmersivePageHeroProps {
  kicker: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  actionLabel: string;
  actionHref: string;
}

/** A shared cinematic entry frame for the site's editorial sections. */
export function ImmersivePageHero({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  actionLabel,
  actionHref,
}: ImmersivePageHeroProps) {
  return (
    <section className="relative isolate -mt-24 md:-mt-28 min-h-[76svh] md:min-h-[82svh] flex items-end overflow-hidden border-b border-white/10">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/45 to-[#0c0b0a]/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c0b0a]/45 via-transparent to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-12 pt-36 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-4xl">
          <span className="mb-4 block text-xs font-mono uppercase tracking-[0.3em] text-[#d0b18f] sm:mb-5">
            {kicker}
          </span>
          <h1 className="font-serif text-6xl leading-[0.95] tracking-tight text-[#FAF9F6] drop-shadow-[0_3px_24px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-[#e0dbd3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:mt-6 sm:text-lg">
            {description}
          </p>
          <Link
            href={actionHref}
            className="group mt-7 inline-flex min-h-11 items-center gap-3 border border-white/25 bg-[#0c0b0a]/25 px-4 text-xs font-mono uppercase tracking-[0.2em] text-[#FAF9F6] backdrop-blur-sm transition-colors hover:border-[#c4a482] hover:bg-[#0c0b0a]/55 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c4a482] sm:mt-9"
          >
            {actionLabel}
            <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#d0b18f] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.4} />
          </Link>
        </div>
        <span className="mt-7 block text-xs font-mono uppercase tracking-[0.18em] text-white/75 sm:mt-9">
          AI-generated photo study · not original photography
        </span>
      </div>
    </section>
  );
}
