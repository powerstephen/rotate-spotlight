import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AGENTS } from "./agents-data";
import { AgentCard } from "./AgentCard";
import { AgentMenu } from "./AgentMenu";

export function AgentsSection() {
  const [active, setActive] = useState(1);
  const total = AGENTS.length;

  const go = (delta: number) =>
    setActive((prev) => (prev + delta + total) % total);

  // 3 visible cards: prev, current, next
  const positions = [-1, 0, 1];

  return (
    <section
      className="w-full px-6 py-24 md:py-32"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <h2
            className="font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
            style={{ color: "var(--ink)", fontFamily: "Georgia, serif" }}
          >
            Power your business with 24/7 AI-driven insights.
          </h2>
          <div className="flex md:items-end md:justify-end">
            <p
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.02 260)" }}
            >
              Breeze Agents deliver real-time, actionable signals for sales and
              service teams.
            </p>
          </div>
        </div>

        {/* Carousel + Menu */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Menu */}
          <div className="hidden lg:block">
            <AgentMenu
              agents={AGENTS}
              activeIndex={active}
              onSelect={setActive}
            />
          </div>

          {/* Carousel stage */}
          <div className="relative">
            <div
              className="relative mx-auto"
              style={{ height: "640px", perspective: "1600px" }}
            >
              {positions.map((offset) => {
                const index = (active + offset + total) % total;
                const agent = AGENTS[index];
                const isCenter = offset === 0;

                const translateX = offset * 58; // %
                const scale = isCenter ? 1 : 0.82;
                const rotateY = offset * -14;
                const z = isCenter ? 30 : 10;
                const opacity = isCenter ? 1 : 0.55;

                return (
                  <div
                    key={`${agent.id}-${offset}`}
                    className="absolute left-1/2 top-0 transition-all duration-700"
                    style={{
                      width: "min(380px, 80vw)",
                      height: "100%",
                      transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale}) rotateY(${rotateY}deg)`,
                      transformStyle: "preserve-3d",
                      zIndex: z,
                      opacity,
                      filter: isCenter ? "none" : "blur(0.5px)",
                      transitionTimingFunction: "var(--transition-smooth)",
                    }}
                    onClick={() => !isCenter && setActive(index)}
                  >
                    <AgentCard agent={agent} active={isCenter} />
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{
                  borderColor: "oklch(0.18 0.02 260 / 0.2)",
                  color: "var(--ink)",
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {AGENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to agent ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "28px" : "8px",
                      background:
                        i === active
                          ? "var(--ink)"
                          : "oklch(0.18 0.02 260 / 0.2)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{
                  borderColor: "oklch(0.18 0.02 260 / 0.2)",
                  color: "var(--ink)",
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
