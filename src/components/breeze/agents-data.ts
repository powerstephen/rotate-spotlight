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
  iconImg?: string;
  cta: string;
  heading: string;
  body: string;
  logs: AgentLog[];
};

export const AGENTS: Agent[] = [
  {
    id: "icp", label: "AI Agent", name: "ICP", icon: Target, iconImg: "/agent-icp.png",
    cta: "Review ICP Profile",
    heading: "Know exactly who to sell to.",
    body: "Analyses your real revenue data — who expanded, who churned, who has the highest LTV — and builds a precise profile of your most profitable customer.",
    logs: [
      { type: "info", text: "→ analysing 312 closed accounts..." },
      { type: "alert", text: "★ ICP pattern identified · 6 traits" },
      { type: "queued", text: "↑ 14 lookalike prospects surfaced" },
    ],
  },
  {
    id: "ignite", label: "AI Agent", name: "IGNITE", icon: Zap, iconImg: "/agent-ignite.png",
    cta: "Take Action on Flags",
    heading: "A live health score for every customer.",
    body: "Scores every active customer on a signal-driven health index. Low score triggers protect mode — re-engage before they leave. High score flags upsell potential before your team even thinks to ask.",
    logs: [
      { type: "info", text: "→ scoring 47 active accounts..." },
      { type: "alert", text: "! 3 accounts · protect mode triggered" },
      { type: "queued", text: "↑ 2 accounts · upsell action queued" },
    ],
  },
  {
    id: "profit", label: "AI Agent", name: "PROFIT", icon: TrendingUp, iconImg: "/agent-profit.png",
    cta: "Review Profit Matrix",
    heading: "See who's profitable and who's draining you.",
    body: "Classifies every customer by true cost to serve. Accounts that look healthy on MRR but are quietly destroying your margin get flagged before they put your best customers at risk.",
    logs: [
      { type: "info", text: "→ calculating margin per account..." },
      { type: "alert", text: "! Acme Ltd · cost exceeds revenue" },
      { type: "queued", text: "↑ 8 accounts · high-margin confirmed" },
    ],
  },
  {
    id: "recover", label: "AI Agent", name: "RECOVER", icon: RefreshCcw, iconImg: "/agent-recover.png",
    cta: "Review Re-engagement Queue",
    heading: "Win back accounts before they're gone for good.",
    body: "Watches every dormant and closed-lost account for renewed buying signals — hiring changes, funding events, product launches.",
    logs: [
      { type: "info", text: "→ monitoring 89 dormant accounts..." },
      { type: "alert", text: "! TechCorp · Series B announced" },
      { type: "queued", text: "↑ re-engagement sequence queued" },
    ],
  },
  {
    id: "generate", label: "AI Agent", name: "GENERATE", icon: Rocket, iconImg: "/agent-generate.png",
    cta: "Review Prospects",
    heading: "Find your next best customers before they find you.",
    body: "Continuously matches live buying signals against your ICP — funding rounds, senior hires, product launches. Surfaces the right companies at exactly the right moment.",
    logs: [
      { type: "info", text: "→ scanning market signals..." },
      { type: "alert", text: "★ ScaleUp Co · ICP match · 94%" },
      { type: "queued", text: "↑ signal: VP Sales hired 3 days ago" },
    ],
  },
  {
    id: "deal", label: "AI Agent", name: "DEAL", icon: Trophy, iconImg: "/agent-deal.png",
    cta: "Review Stalled Deals",
    heading: "Stop deals dying in your pipeline.",
    body: "Monitors every live opportunity for stall signals — no economic buyer after three meetings, champion gone dark, competitor mentioned. Next best action surfaced instantly.",
    logs: [
      { type: "info", text: "→ monitoring 23 live deals..." },
      { type: "alert", text: "! Globex · no EB · 4 meetings in" },
      { type: "queued", text: "↑ next action: exec intro recommended" },
    ],
  },
];
