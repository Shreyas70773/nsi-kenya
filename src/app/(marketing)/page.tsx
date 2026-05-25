// Phase 0 placeholder homepage. Replaced in Task 0.14 with the marketing scaffold,
// then again in Phase 1 with the real homepage per spec Section 4 (Crywan above the fold,
// product matrix, industries strip, TCO teaser, trust strip, CTA hierarchy).
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-24">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">
        North Star Impex Kenya · scaffold
      </p>
      <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight">
        Industrial tanks, silos, and instruments. Made in Kenya. Trusted by{" "}
        <span className="text-accent">Crywan Industries</span>.
      </h1>
      <p className="max-w-prose text-base text-muted">
        Phase 0 scaffold. Real homepage lands in Task 0.14.
      </p>
    </main>
  );
}
