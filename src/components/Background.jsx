/**
 * Fixed, decorative background: a soft gradient mesh, a masked grid and grain.
 * Pure CSS — no canvas, no particles, no layout cost.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />
      <div className="absolute inset-0 grid-overlay opacity-80" />

      <div className="glow-cyan absolute -left-[12%] -top-[18%] h-[520px] w-[520px] rounded-full sm:h-[640px] sm:w-[640px]" />
      <div className="glow-violet absolute -right-[18%] top-[28%] h-[560px] w-[560px] rounded-full sm:h-[720px] sm:w-[720px]" />
      <div className="glow-cyan absolute bottom-[-24%] left-[28%] hidden h-[420px] w-[420px] rounded-full opacity-50 md:block" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent" />
    </div>
  );
}
