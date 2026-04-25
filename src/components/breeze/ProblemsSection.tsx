import { useEffect, useState } from "react";
import { PROBLEMS, QUOTES, type Problem } from "./problems-data";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;

export function ProblemsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % QUOTES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const activeHighlights = new Set<Problem>(QUOTES[active].highlights);

  return (
    <section className="w-full px-6 py-14 md:py-20" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl font-bold leading-none tracking-tight md:text-3xl lg:text-4xl text-center w-full whitespace-nowrap"
            style={{ color: "var(--agent-text)", fontFamily: "\'Plus Jakarta Sans\', sans-serif", textAlign: "center" }}
          >
            Tackling the <span style={{ color: "var(--agent-mint)" }}>real problems</span> of growing businesses.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-3.5">
          {PROBLEMS.map((p) => {
            const lit = activeHighlights.has(p);
            return (
              <span
                key={p}
                className={cn("rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-700")}
                style={{
                  borderColor: lit ? "var(--agent-mint-soft)" : "var(--agent-border)",
                  background: lit ? "var(--pill-bg-lit)" : "var(--pill-bg-dim)",
                  color: lit ? "var(--agent-mint)" : "var(--agent-text-muted)",
                  boxShadow: lit ? "0 0 24px -4px var(--agent-mint-soft)" : "none",
                  transitionTimingFunction: "var(--transition-smooth)",
                }}
              >
                {p}
              </span>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative min-h-[200px] overflow-hidden md:min-h-[220px]">
            {QUOTES.map((q, i) => {
              const isActive = i === active;
              const offset = i - active;
              return (
                <blockquote
                  key={q.id}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  style={{
                    transform: isActive ? "translateX(0)" : `translateX(${offset > 0 || (offset < 0 && direction === -1) ? "40px" : "-40px"})`,
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                    pointerEvents: isActive ? "auto" : "none",
                    transition: isActive
                      ? "opacity 500ms var(--transition-smooth) 350ms, transform 700ms var(--transition-smooth) 350ms, visibility 0s linear 350ms"
                      : "opacity 350ms var(--transition-smooth) 0ms, transform 700ms var(--transition-smooth) 0ms, visibility 0s linear 350ms",
                  }}
                >
                  <p
                    className="text-2xl font-semibold leading-snug md:text-3xl"
                    style={{ color: "var(--agent-text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    "{q.text}"
                  </p>
                  <footer
                    className="mt-5 font-mono text-[14px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "var(--agent-mint-soft)" }}
                  >
                    — {q.source}
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
