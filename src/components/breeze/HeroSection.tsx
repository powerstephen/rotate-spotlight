import { useEffect, useRef, useState } from "react";

type Signal = {
  type: "info" | "alert" | "queued";
  text: string;
};

const SIGNALS: Signal[] = [
  { type: "info", text: "→ no economic buyer · 4 meetings in" },
  { type: "alert", text: "! health score dropped to 31 · protect mode" },
  { type: "queued", text: "★ Series A raised · $4.2m · in-market signal" },
  { type: "alert", text: "! deal stalled · 47 days at proposal stage" },
  { type: "queued", text: "★ new CRO hired · outreach window open" },
  { type: "info", text: "→ 14 months dormant · re-engagement signal" },
  { type: "queued", text: "★ ICP match · 94% · contact verified" },
  { type: "alert", text: "! champion gone dark · next action needed" },
  { type: "info", text: "→ competitor evaluation detected · act now" },
  { type: "queued", text: "★ VP Sales hired · buying signal confirmed" },
  { type: "alert", text: "! cost exceeds revenue · margin risk flagged" },
  { type: "queued", text: "★ upsell ready · expansion signal fired" },
  { type: "info", text: "→ no decision maker engaged · stall risk" },
  { type: "alert", text: "! MRR healthy · margin negative · flagged" },
  { type: "queued", text: "★ Series B announced · re-engage now" },
];

const MAX_LINES = 8;
const TYPE_SPEED = 35;
const LINE_PAUSE = 800;

type RenderedLine = Signal & { id: number };

export function HeroSection() {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [typing, setTyping] = useState<{ signal: Signal; chars: number; id: number } | null>(null);
  const idxRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const startNext = () => {
      if (cancelled) return;
      const signal = SIGNALS[idxRef.current % SIGNALS.length];
      const id = ++idRef.current;
      setTyping({ signal, chars: 0, id });

      let chars = 0;
      const tick = () => {
        if (cancelled) return;
        chars += 1;
        setTyping({ signal, chars, id });
        if (chars < signal.text.length) {
          timer = setTimeout(tick, TYPE_SPEED);
        } else {
          // commit completed line
          setTyping(null);
          setLines((prev) => {
            const next = [...prev, { ...signal, id }];
            return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
          });
          idxRef.current += 1;
          timer = setTimeout(startNext, LINE_PAUSE);
        }
      };
      timer = setTimeout(tick, TYPE_SPEED);
    };

    timer = setTimeout(startNext, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const colorFor = (type: Signal["type"]) =>
    type === "alert"
      ? "var(--agent-coral)"
      : type === "queued"
        ? "var(--agent-mint-soft)"
        : "var(--agent-text-muted)";

  const glowFor = (type: Signal["type"]) =>
    type === "alert"
      ? "drop-shadow(0 0 6px oklch(0.72 0.16 25 / 0.45))"
      : type === "queued"
        ? "drop-shadow(0 0 6px oklch(0.82 0.14 175 / 0.4))"
        : "none";

  // Visible lines: committed lines + currently typing line, capped at MAX_LINES
  const visible: Array<RenderedLine & { typing?: boolean; partialText?: string }> = [...lines];
  if (typing) {
    visible.push({
      id: typing.id,
      type: typing.signal.type,
      text: typing.signal.text,
      typing: true,
      partialText: typing.signal.text.slice(0, typing.chars),
    });
  }
  const trimmed = visible.length > MAX_LINES ? visible.slice(visible.length - MAX_LINES) : visible;

  return (
    <section
      className="w-full px-6 py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      <style>{`
        @keyframes hero-cursor-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes hero-rec-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--agent-mint)" }}
            >
              Revenue Intelligence Platform
            </div>

            <h1
              className="mt-6 text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
              style={{ color: "var(--ink)", fontFamily: "Georgia, serif" }}
            >
              Your best customers, your biggest risks, your next deal.{" "}
              <span style={{ color: "var(--agent-mint)" }}>
                It's all in your data. SignalOps unlocks it.
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--agent-text-muted)" }}
            >
              Six AI agents working 24/7 to protect your revenue, close your
              deals and find your next best customers.
            </p>

            <a
              href="#cta"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium transition-all hover:brightness-110"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.95), oklch(0.72 0.13 175 / 0.9))",
                color: "oklch(0.14 0.025 235)",
                boxShadow:
                  "inset 0 1px 0 oklch(1 0 0 / 0.2), 0 0 18px oklch(0.82 0.14 175 / 0.4), 0 0 36px oklch(0.82 0.14 175 / 0.18)",
              }}
            >
              Join the beta. 30 spots only →
            </a>
          </div>

          {/* RIGHT — terminal monitor */}
          <div className="relative flex flex-col items-center">
            {/* Webcam pill with pulsing green dot */}
            <div
              className="mb-1 flex h-3 w-10 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.32 0.012 235), oklch(0.22 0.012 235))",
                boxShadow:
                  "inset 0 1px 0 oklch(1 0 0 / 0.06), 0 1px 2px oklch(0 0 0 / 0.4)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "oklch(0.78 0.19 145)",
                  boxShadow:
                    "0 0 6px oklch(0.78 0.19 145 / 0.9), 0 0 12px oklch(0.78 0.19 145 / 0.5)",
                  animation: "hero-rec-pulse 1.4s ease-in-out infinite",
                }}
              />
            </div>

            {/* Monitor frame */}
            <div
              className="relative w-full max-w-md rounded-2xl p-[1.5px]"
              style={{
                background: "var(--gradient-frame)",
                boxShadow:
                  "0 0 0 1px oklch(0.82 0.14 175 / 0.15), 0 12px 40px -12px oklch(0.82 0.14 175 / 0.35)",
              }}
            >
              <div
                className="rounded-[14.5px] p-5"
                style={{
                  background: "var(--gradient-screen)",
                  boxShadow: "var(--inset-screen)",
                  minHeight: "280px",
                }}
              >
                <div className="flex flex-col-reverse">
                  <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
                    {trimmed.map((line) => (
                      <div
                        key={line.id}
                        style={{
                          color: colorFor(line.type),
                          filter: glowFor(line.type),
                        }}
                      >
                        {line.typing ? line.partialText : line.text}
                        {line.typing && (
                          <span
                            aria-hidden
                            style={{
                              display: "inline-block",
                              marginLeft: "2px",
                              animation: "hero-cursor-blink 1s steps(1) infinite",
                            }}
                          >
                            _
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor neck */}
            <div
              style={{
                width: "24px",
                height: "20px",
                background:
                  "linear-gradient(180deg, oklch(0.28 0.012 235), oklch(0.22 0.012 235))",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)",
              }}
            />

            {/* Monitor base */}
            <div
              style={{
                width: "120px",
                height: "6px",
                borderRadius: "3px",
                background:
                  "linear-gradient(180deg, oklch(0.3 0.012 235), oklch(0.2 0.012 235))",
                boxShadow:
                  "inset 0 1px 0 oklch(1 0 0 / 0.05), 0 4px 12px oklch(0 0 0 / 0.4)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
