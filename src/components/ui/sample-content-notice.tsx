export function SampleContentNotice({ className = "" }: { className?: string }) {
  return (
    <aside className={`border-l border-[#c4a482]/70 pl-4 text-xs leading-relaxed text-[#aaa398] ${className}`}>
      <span className="mr-2 font-mono text-xs uppercase tracking-[0.16em] text-[#c4a482]">Illustrative sample</span>
      Names follow the supplied list; images and descriptions are illustrative, not verified depictions or Saraswat&apos;s own words.
    </aside>
  );
}
