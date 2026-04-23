export type Problem =
  | "Revenue Protection"
  | "Deal Velocity"
  | "Pipeline Health"
  | "Margin Protection"
  | "Churn Prevention"
  | "ICP Accuracy"
  | "Pipeline Growth"
  | "Customer Quality"
  | "Customer Expansion"
  | "Revenue Growth"
  | "Pipeline Recovery"
  | "Reactivation"
  | "Revenue Leakage"
  | "Resource Allocation"
  | "Decision Making";

// Ordered to roughly fill 3 rows
export const PROBLEMS: Problem[] = [
  "Revenue Protection",
  "Deal Velocity",
  "Pipeline Health",
  "Margin Protection",
  "Churn Prevention",
  "ICP Accuracy",
  "Pipeline Growth",
  "Customer Quality",
  "Customer Expansion",
  "Revenue Growth",
  "Pipeline Recovery",
  "Reactivation",
  "Revenue Leakage",
  "Resource Allocation",
  "Decision Making",
];

export type Quote = {
  id: string;
  source: string;
  text: string;
  highlights: Problem[];
};

export const QUOTES: Quote[] = [
  {
    id: "bain",
    source: "Bain & Company",
    text: "A 5% increase in customer retention can boost profits by 25% to 95%.",
    highlights: [
      "Churn Prevention",
      "Customer Expansion",
      "Revenue Leakage",
      "Resource Allocation",
    ],
  },
  {
    id: "mckinsey",
    source: "McKinsey & Company",
    text: "Companies implementing revenue intelligence report 15% higher sales efficiency and 20% shorter sales cycles.",
    highlights: [
      "Deal Velocity",
      "Pipeline Health",
      "Pipeline Growth",
      "Decision Making",
    ],
  },
  {
    id: "hbr",
    source: "Harvard Business Review",
    text: "Acquiring a new customer is anywhere from five to 25 times more expensive than retaining an existing one.",
    highlights: [
      "Churn Prevention",
      "Customer Quality",
      "Reactivation",
      "Pipeline Recovery",
    ],
  },
  {
    id: "forrester",
    source: "Forrester",
    text: "49% faster profit growth by focusing on the high-value customers who drive margins.",
    highlights: [
      "Margin Protection",
      "Revenue Protection",
      "Revenue Growth",
      "ICP Accuracy",
    ],
  },
];
