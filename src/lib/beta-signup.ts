import { createServerFn } from "@tanstack/react-start";

export type BetaSignupInput = {
  name: string;
  company: string;
  email: string;
  clients: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(input: unknown): BetaSignupInput {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid request body");
  }
  const { name, company, email, clients } = input as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof company !== "string" ||
    typeof email !== "string" ||
    typeof clients !== "string"
  ) {
    throw new Error("All fields are required");
  }
  const trimmed = {
    name: name.trim(),
    company: company.trim(),
    email: email.trim(),
    clients: clients.trim(),
  };
  if (!trimmed.name || trimmed.name.length > 200) throw new Error("Invalid name");
  if (!trimmed.company || trimmed.company.length > 200) throw new Error("Invalid company");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email) || trimmed.email.length > 320)
    throw new Error("Invalid email");
  if (!trimmed.clients || trimmed.clients.length > 50) throw new Error("Invalid client count");
  return trimmed;
}

export const submitBetaSignup = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const subject = `New beta signup: ${data.name}`;
    const html = `
      <h2>New SignalOps Beta Signup</h2>
      <p>A new beta access request has come in.</p>
      <table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="color:#666;"><strong>Full name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="color:#666;"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>
        <tr><td style="color:#666;"><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="color:#666;"><strong>No. of clients</strong></td><td>${escapeHtml(data.clients)}</td></tr>
      </table>
    `;

    const text = `New SignalOps Beta Signup

Full name: ${data.name}
Company: ${data.company}
Email: ${data.email}
No. of clients: ${data.clients}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "SignalOps <team@signal-ops.app>",
        to: ["power.stephen@gmail.com"],
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Resend API error", response.status, errBody);
      throw new Error("Failed to send signup email");
    }

    return { success: true as const };
  });
