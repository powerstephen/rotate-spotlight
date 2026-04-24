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

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <section
      className="w-full px-6 py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--agent-mint-soft)" }}
          >
            The problems we solve
          </p>
          <h2
            className="mt-5 text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
            style={{ color: "var(--agent-text)", fontFamily: "Georgia, serif" }}
          >
            Tackling the{" "}
            <span style={{ color: "var(--agent-mint)" }}>real problems</span>{" "}
            of growing businesses.
          </h2>
        </div>

        {/* Pills cloud */}
        <div className="mt-14 flex flex-wrap justify-center gap-3 md:gap-3.5">
          {PROBLEMS.map((p) => {
            const lit = activeHighlights.has(p);
            return (
              <span
                key={p}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-700",
                )}
                style={{
                  borderColor: lit
                    ? "var(--agent-mint-soft)"
                    : "var(--agent-border)",
                  background: lit
                    ? "var(--pill-bg-lit)"
                    : "var(--pill-bg-dim)",
                  color: lit ? "var(--agent-mint)" : "var(--agent-text-muted)",
                  boxShadow: lit
                    ? "0 0 24px -4px var(--agent-mint-soft)"
                    : "none",
                  transitionTimingFunction: "var(--transition-smooth)",
                }}
              >
                {p}
              </span>
            );
          })}
        </div>

        {/* Quotes carousel */}
        <div className="mx-auto mt-20 max-w-4xl md:mt-24">
          <div className="relative min-h-[200px] overflow-hidden md:min-h-[240px]">
            {QUOTES.map((q, i) => {
              const isActive = i === active;
              const offset = i - active;
              return (
                <blockquote
                  key={q.id}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700"
                  style={{
                    transform: isActive
                      ? "translateX(0)"
                      : `translateX(${offset > 0 || (offset < 0 && direction === -1) ? "40px" : "-40px"})`,
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                    transitionTimingFunction: "var(--transition-smooth)",
                  }}
                >
                  <p
                    className="text-2xl leading-snug md:text-[32px] md:leading-[1.25]"
                    style={{
                      color: "var(--agent-text)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    “{q.text}”
                  </p>
                  <footer
                    className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]"
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
