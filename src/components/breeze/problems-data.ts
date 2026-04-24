export type Problem =
  | "Churn Prevention"
  | "Sustainable Revenue"
  | "ICP Accuracy"
  | "Margin Protection"
  | "Pipeline Health"
  | "Deal Velocity"
  | "Dormant Accounts"
  | "Upsell Potential"
  | "Revenue Leakage"
  | "Customer Quality"
  | "Pipeline Growth"
  | "Reactivation";

// Ordered to roughly fill 3 rows
export const PROBLEMS: Problem[] = [
  "Churn Prevention",
  "Sustainable Revenue",
  "ICP Accuracy",
  "Margin Protection",
  "Pipeline Health",
  "Deal Velocity",
  "Dormant Accounts",
  "Upsell Potential",
  "Revenue Leakage",
  "Customer Quality",
  "Pipeline Growth",
  "Reactivation",
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
    text: "A 5% increase in customer retention increases profits by 25% to 95%.",
    highlights: [
      "Churn Prevention",
      "Sustainable Revenue",
      "Revenue Leakage",
      "Upsell Potential",
    ],
  },
  {
    id: "hbr",
    source: "Harvard Business Review",
    text: "Acquiring a new customer is 5 to 25x more expensive than retaining an existing one.",
    highlights: [
      "ICP Accuracy",
      "Customer Quality",
      "Churn Prevention",
      "Reactivation",
    ],
  },
  {
    id: "mckinsey",
    source: "McKinsey & Company",
    text: "Revenue intelligence delivers 15% higher sales efficiency and 20% shorter sales cycles.",
    highlights: [
      "Deal Velocity",
      "Pipeline Health",
      "Pipeline Growth",
      "Sustainable Revenue",
    ],
  },
  {
    id: "forrester",
    source: "Forrester",
    text: "In most B2B companies, a significant share of customers cost more to serve than they generate in margin.",
    highlights: [
      "Margin Protection",
      "Customer Quality",
      "Revenue Leakage",
      "ICP Accuracy",
    ],
  },
];
