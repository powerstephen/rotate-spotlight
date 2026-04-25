import type { Agent } from "./agents-data";
import { cn } from "@/lib/utils";

type Props = { agents: Agent[]; activeIndex: number; onSelect: (index: number) => void; };

export function AgentMenu({ agents, activeIndex, onSelect }: Props) {
  return (
    <nav className="flex flex-col gap-1">
      {agents.map((agent, i) => {
        const Icon = agent.icon;
        const isActive = i === activeIndex;
        return (
          <button key={agent.id} onClick={() => onSelect(i)}
            className={cn("group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300", isActive ? "border-[var(--agent-mint-soft)]" : "border-transparent")}
            style={{ background: isActive ? "oklch(0.16 0.025 235)" : "transparent" }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border overflow-hidden transition-colors"
              style={{ borderColor: isActive ? "var(--agent-mint-soft)" : "var(--agent-border)", background: "oklch(0.14 0.025 235)" }}>
              {agent.iconImg ? (
                <img src={agent.iconImg} alt={agent.name} className="h-8 w-8 object-contain" />
              ) : (
                <Icon className="h-4 w-4 transition-colors" strokeWidth={1.5} style={{ color: isActive ? "var(--agent-mint)" : "var(--agent-mint-dim)" }} />
              )}
            </div>
            <span className="font-mono text-base font-bold tracking-[0.18em] transition-colors"
              style={{ color: isActive ? "var(--agent-mint)" : "var(--agent-mint-dim)" }}>{agent.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
