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
  tags: string[];
  logs: AgentLog[];
};

export const AGENTS: Agent[] = [
  {
    id: "icp", label: "AI Agent", name: "ICP", icon: Target, iconImg: "/agent-icp.png",
    cta: "Review ICP Profile",
    heading: "Know exactly who to sell to.",
    body: "Analyses your real revenue data — who expanded, who churned, who has the highest LTV — and builds a precise profile of your most profitable customer. Built from real data, not assumptions.",
    tags: ["ICP Accuracy", "Data Activation"],
    logs: [
      { type: "info", text: "→ analysing 312 closed accounts..." },
      { type: "alert", text: "★ ICP pattern identified · 6 traits" },
      { type: "queued", text: "↑ 14 lookalike prospects surfaced" },
      { type: "info", text: "→ ICP score updated across all accounts" },
      { type: "queued", text: "↑ 3 high-fit accounts · outreach ready" },
    ],
  },
  {
    id: "ignite", label: "AI Agent", name: "IGNITE", icon: Zap, iconImg: "/agent-ignite.png",
    cta: "Review Flagged Accounts",
    heading: "A live health score for every customer.",
    body: "Scores every active customer on a signal-driven health index. Low score triggers protect mode — re-engage before they leave. High score flags upsell potential before your team even thinks to ask. Every customer scored, ranked and actioned.",
    tags: ["Churn Prevention", "Account Health", "Expansion Revenue"],
    logs: [
      { type: "info", text: "→ scoring 47 active accounts..." },
      { type: "alert", text: "! 3 accounts · protect mode triggered" },
      { type: "queued", text: "↑ 2 accounts · upsell action queued" },
      { type: "info", text: "→ health index recalculated · 12 signals" },
      { type: "queued", text: "↑ 5 accounts · next action queued" },
    ],
  },
  {
    id: "profit", label: "AI Agent", name: "PROFIT", icon: TrendingUp, iconImg: "/agent-profit.png",
    cta: "Review Profit Matrix",
    heading: "See who's profitable and who's draining you.",
    body: "Classifies every customer by true cost to serve. Accounts that look healthy on MRR but are quietly destroying your margin get flagged before they put your best customers at risk. Every account classified by real profitability.",
    tags: ["Margin Protection", "ARR Growth"],
    logs: [
      { type: "info", text: "→ calculating margin per account..." },
      { type: "alert", text: "! Acme Ltd · cost exceeds revenue" },
      { type: "queued", text: "↑ 8 accounts · high-margin confirmed" },
      { type: "alert", text: "! 2 accounts · margin below threshold" },
      { type: "info", text: "→ profit report updated · review now" },
    ],
  },
  {
    id: "recover", label: "AI Agent", name: "RECOVER", icon: RefreshCcw, iconImg: "/agent-recover.png",
    cta: "Review Re-engagement Queue",
    heading: "Dormant and dead leads. Reactivated with purpose.",
    body: "Monitors your entire dormant and closed-lost database for renewed buying signals. When the moment is right, the right outreach is queued automatically. Ranked by re-engagement likelihood.",
    tags: ["CRM Reactivation", "Dormant Accounts"],
    logs: [
      { type: "info", text: "→ monitoring 89 dormant accounts..." },
      { type: "alert", text: "! TechCorp · Series B announced" },
      { type: "queued", text: "↑ re-engagement sequence queued" },
      { type: "info", text: "→ 3 accounts · buying signal detected" },
      { type: "queued", text: "↑ outreach sequence · 3 accounts queued" },
    ],
  },
  {
    id: "generate", label: "AI Agent", name: "GENERATE", icon: Rocket, iconImg: "/agent-generate.png",
    cta: "Review Prospects",
    heading: "Find your best-match customers. Already in-market.",
    body: "Continuously matches live market signals against your ICP — funding rounds, senior hires, product launches. Your best-match prospects, surfaced at exactly the right moment. Matched to your ICP in real time.",
    tags: ["Forecast Accuracy", "ICP Accuracy"],
    logs: [
      { type: "info", text: "→ scanning market signals..." },
      { type: "alert", text: "★ ScaleUp Co · ICP match · 94%" },
      { type: "queued", text: "↑ signal: VP Sales hired 3 days ago" },
      { type: "info", text: "→ 6 new prospects · matched to ICP" },
      { type: "queued", text: "↑ 2 prospects · high intent · act now" },
    ],
  },
  {
    id: "deal", label: "AI Agent", name: "DEAL", icon: Trophy, iconImg: "/agent-deal.png",
    cta: "Review Stalled Deals",
    heading: "Stop deals dying in your pipeline.",
    body: "Monitors every live opportunity for stall signals — no economic buyer after three meetings, champion gone dark, competitor mentioned. Next best action surfaced instantly. Every stall flagged before it costs you the deal.",
    tags: ["Deal Velocity", "Pipeline Health", "Forecast Accuracy"],
    logs: [
      { type: "info", text: "→ monitoring 23 live deals..." },
      { type: "alert", text: "! Globex · no EB · 4 meetings in" },
      { type: "queued", text: "↑ next action: exec intro recommended" },
      { type: "alert", text: "! Initech · 47 days at proposal stage" },
      { type: "queued", text: "↑ next action: pricing conversation" },
    ],
  },
];
