import type { Agent } from "./agents-data";
import { cn } from "@/lib/utils";

type Props = { agent: Agent; active?: boolean; };

export function AgentCard({ agent, active = false }: Props) {
  const Icon = agent.icon;
  return (
    <div className={cn("group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-[1.5px] transition-all duration-500")}
      style={{ background: "var(--gradient-frame)", boxShadow: active ? "var(--shadow-card-active)" : "var(--shadow-card)" }}>
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[26.5px] p-5"
        style={{ background: "linear-gradient(160deg, oklch(0.22 0.012 235) 0%, oklch(0.18 0.01 235) 100%)", boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04), inset 0 -1px 0 oklch(0 0 0 / 0.4)" }}>
        {active && (
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--agent-mint) 0%, transparent 70%)" }} />
        )}

        {/* Header */}
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden flex-shrink-0"
              style={{ background: "linear-gradient(145deg, oklch(0.22 0.025 230), oklch(0.13 0.022 240))", boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06), inset 0 0 0 1px var(--agent-border)" }}>
              {agent.iconImg ? (
                <img src={agent.iconImg} alt={agent.name} className="h-9 w-9 object-contain"
                  style={{ filter: "drop-shadow(0 0 5px oklch(0.82 0.14 175 / 0.5))" }} />
              ) : (
                <Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: "var(--agent-mint)" }} />
              )}
            </div>
            <div className="leading-tight">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--agent-mint-dim)" }}>{agent.label}</div>
              <div className="font-mono text-lg font-bold tracking-[0.1em]"
                style={{ color: "var(--agent-mint)", textShadow: "0 0 10px oklch(0.82 0.14 175 / 0.4)" }}>{agent.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ background: "linear-gradient(180deg, oklch(0.22 0.04 200 / 0.5), oklch(0.14 0.025 235 / 0.6))", boxShadow: "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.35)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--agent-mint)", boxShadow: "0 0 6px var(--agent-mint)" }} />
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--agent-mint)" }}>Active</span>
          </div>
        </div>

        {/* Terminal screen — taller */}
        <div className="relative mt-4 rounded-2xl p-[1.5px]"
          style={{ background: "var(--gradient-frame)", boxShadow: active ? "0 0 0 1px oklch(0.82 0.14 175 / 0.15), 0 12px 40px -12px oklch(0.82 0.14 175 / 0.35)" : "0 8px 24px -8px oklch(0 0 0 / 0.5)" }}>
          <div className="rounded-[14.5px] p-4" style={{ background: "var(--gradient-screen)", boxShadow: "var(--inset-screen)", minHeight: "160px" }}>
            <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
              {agent.logs.map((log, i) => (
                <div key={i} style={{
                  color: log.type === "alert" ? "var(--agent-coral)" : log.type === "queued" ? "var(--agent-mint-soft)" : "var(--agent-text-muted)",
                  filter: log.type === "alert" ? "drop-shadow(0 0 5px oklch(0.72 0.16 25 / 0.4))" : log.type === "queued" ? "drop-shadow(0 0 5px oklch(0.82 0.14 175 / 0.35))" : "none",
                }}>{log.text}</div>
              ))}
            </div>
            <button className="relative mt-4 w-full overflow-hidden rounded-full py-2 font-mono text-xs font-medium transition-all hover:brightness-125"
              style={{ background: "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.2), oklch(0.82 0.14 175 / 0.06))", boxShadow: "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.4)", color: "var(--agent-mint)" }}>
              {agent.cta}
            </button>
          </div>
        </div>

        {/* Body — with horizontal padding */}
        <div className="relative mt-5 flex flex-col px-4 pb-2">
          <h3 className="text-lg font-semibold leading-snug" style={{ color: "var(--agent-text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agent.heading}</h3>
          <p className="mt-2.5 text-[12px] leading-relaxed" style={{ color: "var(--agent-text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agent.body}</p>
        </div>
      </div>
    </div>
  );
}
