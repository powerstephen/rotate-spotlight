import { createFileRoute } from "@tanstack/react-router";
import { AgentsSection } from "@/components/breeze/AgentsSection";
import { ProblemsSection } from "@/components/breeze/ProblemsSection";
import { CTASection } from "@/components/breeze/CTASection";
import { ThemeToggle } from "@/components/breeze/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Breeze Agents — 24/7 AI-driven insights" },
      {
        name: "description",
        content:
          "Power your business with Breeze Agents — real-time, actionable AI signals for sales and service teams.",
      },
    ],
  }),
});

function Index() {
  return (
    <main style={{ background: "var(--bg-deep)" }}>
      <ThemeToggle />
      <ProblemsSection />
      <AgentsSection />
      <CTASection />
    </main>
  );
}
