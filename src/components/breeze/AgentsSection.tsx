import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AGENTS } from "./agents-data";
import { AgentCard } from "./AgentCard";
import { AgentMenu } from "./AgentMenu";

export function AgentsSection() {
  const [active, setActive] = useState(1);
  const total = AGENTS.length;
  const go = (delta: number) => setActive((prev) => (prev + delta + total) % total);
  const positions = [-1, 0, 1];

  return (
    <section className="w-full px-6 py-24 md:py-32" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <h2
            className="font-serif text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span style={{ color: "var(--ink)" }}>Six AI Agents. </span>
            <span style={{ color: "var(--agent-mint)" }}>Built for profitable growth.</span>
          </h2>
          <div className="flex md:items-end md:justify-end">
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--agent-text-muted)" }}>
              Always on. Always protecting your sustainable revenues.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <AgentMenu agents={AGENTS} activeIndex={active} onSelect={setActive} />
          </div>
          <div className="relative">
            <div className="relative mx-auto" style={{ height: "640px", perspective: "1600px" }}>
              {positions.map((offset) => {
                const index = (active + offset + total) % total;
                const agent = AGENTS[index];
                const isCenter = offset === 0;
                return (
                  <div
                    key={`${agent.id}-${offset}`}
                    className="absolute left-1/2 top-0 transition-all duration-700"
                    style={{
                      width: "min(380px, 80vw)",
                      height: "100%",
                      transform: `translateX(calc(-50% + ${offset * 58}%)) scale(${isCenter ? 1 : 0.82}) rotateY(${offset * -14}deg)`,
                      transformStyle: "preserve-3d",
                      zIndex: isCenter ? 30 : 10,
                      opacity: isCenter ? 1 : 0.55,
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
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "var(--agent-border)", color: "var(--agent-mint)" }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {AGENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "28px" : "8px",
                      background: i === active ? "var(--agent-mint)" : "var(--agent-border)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "var(--agent-border)", color: "var(--agent-mint)" }}
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
