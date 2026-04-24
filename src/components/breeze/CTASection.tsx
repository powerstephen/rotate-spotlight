import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitBetaSignup } from "@/lib/beta-signup";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useServerFn(submitBetaSignup);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      clients: String(formData.get("clients") ?? ""),
    };
    setSubmitting(true);
    try {
      await submit({ data: payload });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Decorative grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--agent-mint) 1px, transparent 1px), linear-gradient(90deg, var(--agent-mint) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Mint glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "var(--agent-mint)", opacity: 0.08 }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
            style={{
              color: "var(--agent-text)",
              fontFamily: "Georgia, serif",
            }}
          >
            Join the beta.{" "}
            <span style={{ color: "var(--agent-mint)" }}>
              Stop guessing. Start closing.
            </span>
          </h2>

          <div className="mt-7 flex justify-center">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{
                borderColor: "var(--agent-coral)",
                background: "var(--agent-coral-soft)",
                color: "var(--agent-coral)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--agent-coral)" }}
              />
              Limited to 30 companies · Launching June 2026
            </span>
          </div>
        </div>

        {/* Body grid */}
        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {/* Copy */}
          <div className="space-y-5">
            <p
              className="text-base leading-relaxed md:text-[17px] md:leading-[1.7]"
              style={{ color: "var(--agent-text-muted)" }}
            >
              Most B2B companies are sitting on a goldmine of customer data but
              extract very little value from it. SignalOps changes that by turning
              historical interactions into actionable intelligence — helping
              revenue teams protect their best customers, close more deals, and
              identify more of the right prospects.
            </p>
            <p
              className="text-base leading-relaxed md:text-[17px] md:leading-[1.7]"
              style={{ color: "var(--agent-text-muted)" }}
            >
              We're opening just 30 founding partner spots in June 2026.
              Partners get full platform access free for 90 days, locked-in
              founding pricing for life, direct access to the product team, and
              the opportunity to shape the roadmap from day one.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: "var(--agent-border)",
              background: "var(--gradient-agent)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "var(--agent-mint)",
                    boxShadow: "var(--shadow-mint-glow)",
                  }}
                >
                  <ArrowRight
                    className="h-6 w-6"
                    style={{ color: "var(--bg-deep)" }}
                  />
                </div>
                <h3
                  className="text-2xl"
                  style={{
                    color: "var(--agent-text)",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  You're on the list.
                </h3>
                <p
                  className="mt-3 max-w-xs text-sm"
                  style={{ color: "var(--agent-text-muted)" }}
                >
                  We'll be in touch within 48 hours with next steps.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Jane Smith" />
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Acme Inc."
                  />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="jane@acme.com"
                  />
                  <Field
                    label="No. of clients"
                    name="clients"
                    type="text"
                    placeholder="e.g. 120"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-mono text-[13px] uppercase tracking-[0.18em] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  style={{
                    background: "var(--agent-mint)",
                    color: "var(--bg-deep)",
                    boxShadow: "var(--shadow-mint-glow)",
                    transitionTimingFunction: "var(--transition-smooth)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request beta access
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {error && (
                  <p
                    className="mt-3 text-center text-xs"
                    style={{ color: "var(--agent-coral)" }}
                  >
                    {error}
                  </p>
                )}

                <p
                  className="mt-4 text-center text-xs"
                  style={{ color: "var(--agent-text-muted)" }}
                >
                  We'll be in touch within 48 hours
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "var(--agent-text-muted)" }}
      >
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-b bg-transparent py-2.5 text-base outline-none transition-colors focus:border-current"
        style={{
          borderColor: "var(--agent-border)",
          color: "var(--agent-text)",
        }}
      />
    </label>
  );
}
