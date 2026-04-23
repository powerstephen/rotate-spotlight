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
        "relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border p-6 transition-all duration-500",
        "border-[var(--agent-border)]",
      )}
      style={{
        background: "var(--gradient-agent)",
        boxShadow: active ? "var(--shadow-card-active)" : "var(--shadow-card)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: "var(--agent-border)",
              background: "oklch(0.16 0.025 235)",
            }}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: "var(--agent-mint-soft)" }}
              strokeWidth={1.5}
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
              style={{ color: "var(--agent-mint)" }}
            >
              {agent.name}
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
          style={{
            borderColor: "var(--agent-border)",
            background: "oklch(0.16 0.025 235)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--agent-mint)",
              boxShadow: "0 0 8px var(--agent-mint)",
            }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--agent-mint)" }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Terminal */}
      <div
        className="mt-5 rounded-2xl border p-4"
        style={{
          borderColor: "var(--agent-border)",
          background: "oklch(0.11 0.02 240 / 0.7)",
        }}
      >
        <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
          {agent.logs.map((log, i) => (
            <div
              key={i}
              style={{
                color:
                  log.type === "alert"
                    ? "var(--agent-coral)"
                    : log.type === "queued"
                      ? "var(--agent-mint-soft)"
                      : "var(--agent-text-muted)",
              }}
            >
              {log.text}
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full rounded-full border py-2.5 font-mono text-xs font-medium transition-all hover:brightness-110"
          style={{
            borderColor: "var(--agent-mint-soft)",
            background:
              "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.18), oklch(0.82 0.14 175 / 0.08))",
            color: "var(--agent-mint)",
          }}
        >
          {agent.cta}
        </button>
      </div>

      {/* Body copy */}
      <div className="mt-6 flex flex-1 flex-col">
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
          style={{ color: "var(--agent-mint-soft)" }}
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
