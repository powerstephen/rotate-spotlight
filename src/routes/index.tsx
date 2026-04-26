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
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "oklch(0.11 0.018 245 / 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid oklch(0.32 0.04 200 / 0.15)" }}>
      <div className="mx-auto max-w-7xl px-6" style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="SignalOps" style={{ height: "36px", objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        {/* Centre: tagline — hidden on mobile */}
        <span className="hidden md:block font-mono uppercase tracking-[0.22em]"
          style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, opacity: 0.9, letterSpacing: "0.22em", textAlign: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          Revenue Intelligence Platform
        </span>
        {/* Right: CTA */}
        <a href="#cta" className="font-mono text-xs font-medium transition-all hover:brightness-110"
          style={{ background: "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.95), oklch(0.72 0.13 175 / 0.9))", color: "oklch(0.14 0.025 235)", padding: "8px 20px", borderRadius: "100px", boxShadow: "0 0 14px oklch(0.82 0.14 175 / 0.3)", whiteSpace: "nowrap" }}>
          Join beta
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer id="cta-anchor" style={{ borderTop: "1px solid oklch(0.32 0.04 200 / 0.15)", padding: "24px 0", background: "var(--bg-deep)" }}>
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

function SectionDivider() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "0", lineHeight: 0 }}>
      <div style={{
        width: "280px",
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, oklch(0.82 0.14 175 / 0.55) 35%, oklch(0.82 0.14 175 / 0.95) 50%, oklch(0.82 0.14 175 / 0.55) 65%, transparent 100%)",
        boxShadow: "0 0 10px oklch(0.82 0.14 175 / 0.28)",
      }} />
    </div>
  );
}

function Index() {
  return (
    <main style={{ background: "var(--bg-deep)", fontFamily: "'Montserrat', sans-serif" }}>
      <Nav />
      <HeroSection />
      <SectionDivider />
      <ProblemsSection />
      <SectionDivider />
      <AgentsSection />
      <SectionDivider />
      <div id="cta"><CTASection /></div>
      <Footer />
    </main>
  );
}
