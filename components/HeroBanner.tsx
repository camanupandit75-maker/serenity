export default function HeroBanner() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6">
      <p className="mb-4 font-body text-[0.7rem] uppercase tracking-[0.35em] text-fog sm:text-xs">
        Breathe. Be still. Be present.
      </p>
      <h1 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-normal leading-[1.1] text-mist">
        Nature plays for you,{" "}
        <em className="italic text-amber">right on time</em>.
      </h1>
      <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-fog sm:text-base">
        Eight ambient scenes, scheduled across your day — open when the moment
        arrives, or play any scene whenever you need stillness.
      </p>
    </section>
  );
}
