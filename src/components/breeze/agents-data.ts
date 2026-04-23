import { Target, Zap, TrendingUp, RefreshCcw, Rocket, Trophy } from "lucide-react";

export type AgentLog = {
  type: "info" | "alert" | "queued";
  text: string;
};

export type Agent = {
  id: string;
  label: string;
  name: string;
  icon: typeof Target;
  cta: string;
  heading: string;
  body: string;
  logs: AgentLog[];
};

export const AGENTS: Agent[] = [
  {
    id: "icp",
    label: "AI Agent",
    name: "ICP",
    icon: Target,
    cta: "Refine ICP Targets",
    heading: "Pinpoint your perfect customer.",
    body: "Continuously scores your market against your ideal customer profile, surfacing the accounts most likely to convert before your competitors notice.",
    logs: [
      { type: "info", text: "→ scanning 12,400 companies..." },
      { type: "alert", text: "★ 84 high-fit accounts found" },
      { type: "queued", text: "↑ 32 accounts queued for outreach" },
    ],
  },
  {
    id: "ignite",
    label: "AI Agent",
    name: "IGNITE",
    icon: Zap,
    cta: "Take Action on Flags",
    heading: "A live health score for every customer.",
    body: "Scores every active customer on a signal-driven health index. Low score protect mode — re-engage before they leave. High score flags upsell potential before your team even thinks to ask.",
    logs: [
      { type: "info", text: "→ scoring 47 active accounts..." },
      { type: "alert", text: "! 3 accounts • protect mode triggered" },
      { type: "queued", text: "↑ 2 accounts • upsell action queued" },
    ],
  },
  {
    id: "profit",
    label: "Analysis Agent",
    name: "PROFIT",
    icon: TrendingUp,
    cta: "Review Margin Plays",
    heading: "Maximise margin on every deal.",
    body: "Analyses pricing, discounting and product mix in real time. Recommends the highest-margin path on every opportunity without slowing the deal down.",
    logs: [
      { type: "info", text: "→ analysing 28 open deals..." },
      { type: "alert", text: "! 4 deals • margin below target" },
      { type: "queued", text: "↑ 6 pricing plays recommended" },
    ],
  },
  {
    id: "recover",
    label: "AI Agent",
    name: "RECOVER",
    icon: RefreshCcw,
    cta: "Launch Win-Back Plays",
    heading: "Win back churned revenue automatically.",
    body: "Detects churn signals across product usage, support and billing. Triggers personalised win-back sequences the moment a customer goes quiet.",
    logs: [
      { type: "info", text: "→ monitoring 312 customers..." },
      { type: "alert", text: "! 9 churn signals detected" },
      { type: "queued", text: "↑ 9 win-back plays queued" },
    ],
  },
  {
    id: "generate",
    label: "AI Agent",
    name: "GENERATE",
    icon: Rocket,
    cta: "Open Pipeline Plays",
    heading: "Pipeline that builds itself.",
    body: "Continuously generates net-new pipeline by matching market signals to your offer. Hands sellers warm, ready-to-act opportunities every morning.",
    logs: [
      { type: "info", text: "→ scanning intent signals..." },
      { type: "alert", text: "★ 21 new opportunities surfaced" },
      { type: "queued", text: "↑ 21 plays ready for sellers" },
    ],
  },
  {
    id: "deal",
    label: "AI Agent",
    name: "DEAL",
    icon: Trophy,
    cta: "Advance Open Deals",
    heading: "Close more of what you start.",
    body: "Tracks every open deal against the next best action. Spots stalls, suggests the unlock and helps reps move opportunities forward — faster.",
    logs: [
      { type: "info", text: "→ tracking 64 open deals..." },
      { type: "alert", text: "! 7 deals stalled > 14 days" },
      { type: "queued", text: "↑ 7 next-best actions queued" },
    ],
  },
];
