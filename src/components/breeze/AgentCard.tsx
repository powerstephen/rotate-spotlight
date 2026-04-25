import type { Agent } from "./agents-data";
import { cn } from "@/lib/utils";

type Props = { agent: Agent; active?: boolean; };

export function AgentCard({ agent, active = false }: Props) {
  const Icon = agent.icon;
  return (
    <div
      className={cn("group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-[2px] transition-all duration-500")}
      style={{
        background: active
          ? "linear-gradient(145deg, oklch(0.75 0.005 235) 0%, oklch(0.45 0.008 235) 40%, oklch(0.65 0.005 235) 60%, oklch(0.38 0.008 235) 100%)"
          : "linear-gradient(145deg, oklch(0.55 0.005 235) 0%, oklch(0.32 0.008 235) 50%, oklch(0.48 0.005 235) 100%)",
        boxShadow: active
          ? "0 0 40px oklch(0.82 0.14 175 / 0.2), 0 20px 60px oklch(0 0 0 / 0.6)"
          : "0 8px 32px oklch(0 0 0 / 0.4)",
      }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[26px]"
        style={{
          background: "linear-gradient(160deg, oklch(0.26 0.012 235) 0%, oklch(0.2 0.01 235) 100%)",
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08), inset 0 -1px 0 oklch(0 0 0 / 0.4)",
        }}
      >
        {active && (
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--agent-mint) 0%, transparent 70%)" }} />
        )}

        {/* Header — icon bare, no box */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-4">
            {/* Icon: no background box, bigger, brighter */}
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "48px", height: "48px" }}>
              {agent.iconImg
                ? <img src={agent.iconImg} alt={agent.name} className="object-contain" style={{ width: "44px", height: "44px", filter: "drop-shadow(0 0 10px oklch(0.82 0.14 175 / 0.75)) brightness(1.2)" }} />
                : <Icon className="h-7 w-7" strokeWidth={1.5} style={{ color: "var(--agent-mint)", filter: "drop-shadow(0 0 8px oklch(0.82 0.14 175 / 0.65))" }} />
              }
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--agent-mint-dim)" }}>{agent.label}</div>
              <div className="font-mono text-2xl font-bold tracking-[0.1em]" style={{ color: "var(--agent-mint)", textShadow: "0 0 12px oklch(0.82 0.14 175 / 0.5)" }}>{agent.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "oklch(0.18 0.03 200 / 0.8)", boxShadow: "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.4)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--agent-mint)", boxShadow: "0 0 6px var(--agent-mint)" }} />
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--agent-mint)" }}>Active</span>
          </div>
        </div>

        {/* Terminal screen */}
        <div className="mx-6 rounded-2xl p-[1.5px]"
          style={{ background: "var(--gradient-frame)", boxShadow: active ? "0 0 20px oklch(0.82 0.14 175 / 0.2)" : "none" }}>
          <div className="rounded-[14.5px] p-5" style={{ background: "var(--gradient-screen)", boxShadow: "var(--inset-screen)", minHeight: "180px" }}>
            <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
              {agent.logs.map((log, i) => (
                <div key={i} style={{
                  color: log.type === "alert" ? "var(--agent-coral)" : log.type === "queued" ? "var(--agent-mint-soft)" : "var(--agent-text-muted)",
                  filter: log.type === "alert" ? "drop-shadow(0 0 5px oklch(0.72 0.16 25 / 0.4))" : log.type === "queued" ? "drop-shadow(0 0 5px oklch(0.82 0.14 175 / 0.35))" : "none",
                }}>{log.text}</div>
              ))}
            </div>
            <button className="relative mt-5 w-full rounded-full py-2.5 font-mono text-xs font-medium transition-all hover:brightness-125"
              style={{ background: "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.18), oklch(0.82 0.14 175 / 0.06))", boxShadow: "inset 0 0 0 1px oklch(0.82 0.14 175 / 0.4)", color: "var(--agent-mint)" }}>
              {agent.cta}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
          <h3 className="text-[18px] font-bold leading-snug mb-3" style={{ color: "var(--agent-text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agent.heading}</h3>
          <p className="text-[14px] leading-relaxed flex-1" style={{ color: "var(--agent-text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agent.body}</p>
          <div className="mt-4 pt-3 flex items-center gap-2" style={{ borderTop: "1px solid oklch(0.82 0.14 175 / 0.12)" }}>
            <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--agent-mint)" }} />
            <span className="font-mono text-[11px] font-semibold" style={{ color: "oklch(0.82 0.14 175 / 0.8)" }}>
              {agent.id === "icp" ? "ICP built from real data, not assumptions"
                : agent.id === "ignite" ? "Every customer scored, ranked and actioned"
                : agent.id === "profit" ? "Every account classified by real profitability"
                : agent.id === "recover" ? "Dormant accounts ranked by re-engagement likelihood"
                : agent.id === "generate" ? "In-market prospects matched to your ICP in real time"
                : "Every stalling deal flagged with a next best action"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
