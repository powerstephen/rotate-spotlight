import type { Agent } from "./agents-data";
import { cn } from "@/lib/utils";

type Props = {
  agent: Agent;
  active?: boolean;
};

export function AgentCard({ agent, active = false }: Props) {
  const Icon = agent.icon;

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-[1.5px] transition-all duration-500",
      )}
      style={{
        background: "var(--gradient-frame)",
        boxShadow: active ? "var(--shadow-card-active)" : "var(--shadow-card)",
      }}
    >
      {/* Inner card surface */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[26.5px] p-6"
        style={{
          background: "var(--gradient-agent)",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.04), inset 0 -1px 0 oklch(0 0 0 / 0.4)",
        }}
      >
        {/* Ambient glow halo */}
        {active && (
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--agent-mint) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Header */}
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="relative flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.22 0.025 230), oklch(0.13 0.022 240))",
                boxShadow:
                  "inset 0 1px 0 oklch(1 0 0 / 0.06), inset 0 0 0 1px var(--agent-border), 0 4px 12px -4px oklch(0 0 0 / 0.5)",
              }}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={1.5}
                style={{
                  color: "var(--agent-mint)",
                  filter:
                    "drop-shadow(0 0 6px oklch(0.82 0.14 175 / 0.6)) drop-shadow(0 0 12px oklch(0.82 0.14 175 / 0.3))",
                }}
              />
            </div>
            <div className="leading-tight">
              <div
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--agent-mint-dim)" }}
              >
                {agent.label}
              </div>
              <div
                className="font-mono text-xl font-bold tracking-[0.12em]"
                style={{
                  color: "var(--agent-mint)",
                  textShadow:
                    "0 0 10px oklch(0.82 0.14 175 / 0.5), 0 0 24px oklch(0.82 0.14 175 / 0.25)",
                }}
              >
                {agent.name}
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.22 0.04 200 / 0.5), oklch(0.14 0.025 235 / 0.6))",
              boxShadow:
                "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.05), 0 0 12px oklch(0.82 0.14 175 / 0.25)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--agent-mint)",
                boxShadow:
                  "0 0 6px var(--agent-mint), 0 0 12px var(--agent-mint)",
              }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{
                color: "var(--agent-mint)",
                textShadow: "0 0 8px oklch(0.82 0.14 175 / 0.6)",
              }}
            >
              Active
            </span>
          </div>
        </div>

        {/* Terminal — metallic monitor frame */}
        <div
          className="relative mt-5 rounded-2xl p-[1.5px]"
          style={{
            background: "var(--gradient-frame)",
            boxShadow: active
              ? "0 0 0 1px oklch(0.82 0.14 175 / 0.15), 0 12px 40px -12px oklch(0.82 0.14 175 / 0.35)"
              : "0 8px 24px -8px oklch(0 0 0 / 0.5)",
          }}
        >
          <div
            className="rounded-[14.5px] p-4"
            style={{
              background: "var(--gradient-screen)",
              boxShadow: "var(--inset-screen)",
            }}
          >
            <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
              {agent.logs.map((log, i) => {
                const color =
                  log.type === "alert"
                    ? "var(--agent-coral)"
                    : log.type === "queued"
                      ? "var(--agent-mint-soft)"
                      : "var(--agent-text-muted)";
                const glow =
                  log.type === "alert"
                    ? "drop-shadow(0 0 6px oklch(0.72 0.16 25 / 0.45))"
                    : log.type === "queued"
                      ? "drop-shadow(0 0 6px oklch(0.82 0.14 175 / 0.4))"
                      : "none";
                return (
                  <div key={i} style={{ color, filter: glow }}>
                    {log.text}
                  </div>
                );
              })}
            </div>

            <button
              className="relative mt-4 w-full overflow-hidden rounded-full py-2.5 font-mono text-xs font-medium transition-all hover:brightness-125"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.22), oklch(0.82 0.14 175 / 0.06))",
                boxShadow:
                  "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.08), 0 0 16px oklch(0.82 0.14 175 / 0.25), 0 0 32px oklch(0.82 0.14 175 / 0.12)",
                color: "var(--agent-mint)",
                textShadow: "0 0 8px oklch(0.82 0.14 175 / 0.5)",
              }}
            >
              {agent.cta}
            </button>
          </div>
        </div>

        {/* Body copy */}
        <div className="relative mt-6 flex flex-1 flex-col">
          <h3
            className="text-[22px] font-semibold leading-tight"
            style={{ color: "var(--agent-text)" }}
          >
            {agent.heading}
          </h3>
          <p
            className="mt-3 text-[13px] leading-relaxed"
            style={{ color: "var(--agent-text-muted)" }}
          >
            {agent.body}
          </p>
          <a
            href="#"
            className="mt-auto inline-block pt-5 text-[13px] underline-offset-4 hover:underline"
            style={{
              color: "var(--agent-mint-soft)",
              textShadow: active
                ? "0 0 12px oklch(0.82 0.14 175 / 0.35)"
                : "none",
            }}
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
