import { createFileRoute } from "@tanstack/react-router";
import { AgentsSection } from "@/components/breeze/AgentsSection";
import { ProblemsSection } from "@/components/breeze/ProblemsSection";
import { CTASection } from "@/components/breeze/CTASection";
import { HeroSection } from "@/components/breeze/HeroSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SignalOps — Revenue Intelligence Platform" },
      { name: "description", content: "Six AI agents working 24/7 to protect your revenue, close your deals and find your next best customers." },
    ],
  }),
});

function Nav() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "oklch(0.11 0.018 245 / 0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid oklch(0.32 0.04 200 / 0.15)",
    }}>
      <div className="mx-auto max-w-7xl px-6" style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="SignalOps" style={{ height: "36px", objectFit: "contain" }}
               onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--agent-mint-dim)", borderLeft: "1px solid var(--agent-border)", paddingLeft: "10px" }}>
            Revenue Intelligence
          </span>
        </div>
        <a href="#cta" className="font-mono text-xs font-medium transition-all hover:brightness-110" style={{
          background: "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.95), oklch(0.72 0.13 175 / 0.9))",
          color: "oklch(0.14 0.025 235)",
          padding: "8px 20px",
          borderRadius: "100px",
          boxShadow: "0 0 14px oklch(0.82 0.14 175 / 0.3)",
        }}>
          Join beta
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid oklch(0.32 0.04 200 / 0.15)", padding: "24px 0", background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-6" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="SignalOps" style={{ height: "24px", objectFit: "contain", opacity: 0.5 }}
               onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span className="font-mono text-sm font-bold" style={{ color: "var(--agent-mint)" }}>SignalOps</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--agent-text-muted)" }}>© 2026 SignalOps</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main style={{ background: "var(--bg-deep)" }}>
      <Nav />
      <HeroSection />
      <ProblemsSection />
      <AgentsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
