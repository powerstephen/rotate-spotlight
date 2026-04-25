export type Problem =
  | "Churn Prevention"
  | "ARR Growth"
  | "ICP Accuracy"
  | "Margin Protection"
  | "Deal Velocity"
  | "Account Health"
  | "Data Activation"
  | "Forecast Accuracy"
  | "Pipeline Health"
  | "Dormant Accounts"
  | "Expansion Revenue"
  | "CRM Reactivation";

// Row 1: Churn Prevention · Margin Protection · Forecast Accuracy · Deal Velocity · Account Health · Data Activation
// Row 2: ARR Growth · ICP Accuracy · Expansion Revenue · Pipeline Health · Dormant Accounts · CRM Reactivation
export const PROBLEMS: Problem[] = [
  "Churn Prevention",
  "Margin Protection",
  "Forecast Accuracy",
  "Deal Velocity",
  "Account Health",
  "Data Activation",
  "ARR Growth",
  "ICP Accuracy",
  "Expansion Revenue",
  "Pipeline Health",
  "Dormant Accounts",
  "CRM Reactivation",
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
      "ARR Growth",
      "Account Health",
      "Expansion Revenue",
    ],
  },
  {
    id: "hbr",
    source: "Harvard Business Review",
    text: "Acquiring a new customer is 5 to 25x more expensive than retaining an existing one.",
    highlights: [
      "ICP Accuracy",
      "Account Health",
      "Churn Prevention",
      "CRM Reactivation",
    ],
  },
  {
    id: "mckinsey",
    source: "McKinsey & Company",
    text: "Revenue intelligence delivers 15% higher sales efficiency and 20% shorter sales cycles.",
    highlights: [
      "Deal Velocity",
      "Pipeline Health",
      "Forecast Accuracy",
      "ARR Growth",
    ],
  },
  {
    id: "forrester",
    source: "Forrester",
    text: "In most B2B companies, a significant share of customers cost more to serve than they generate in margin.",
    highlights: [
      "Margin Protection",
      "Account Health",
      "Data Activation",
      "ICP Accuracy",
    ],
  },
];
