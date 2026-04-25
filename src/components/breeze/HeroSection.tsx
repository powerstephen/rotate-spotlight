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

const MAX_LINES = 10;
const TYPE_SPEED = 32;
const LINE_PAUSE = 700;

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
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  const colorFor = (type: Signal["type"]) =>
    type === "alert" ? "var(--agent-coral)"
      : type === "queued" ? "var(--agent-mint-soft)"
      : "var(--agent-text-muted)";

  const glowFor = (type: Signal["type"]) =>
    type === "alert" ? "drop-shadow(0 0 6px oklch(0.72 0.16 25 / 0.45))"
      : type === "queued" ? "drop-shadow(0 0 6px oklch(0.82 0.14 175 / 0.4))"
      : "none";

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
    <section className="w-full px-6 py-20 md:py-28" style={{ background: "var(--bg-deep)" }}>
      <style>{`
        @keyframes hero-cursor-blink { 0%,49%{opacity:1}50%,100%{opacity:0} }
        @keyframes hero-rec-pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.82)} }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-6"
              style={{ color: "var(--agent-mint)" }}>
              Revenue Intelligence Platform
            </div>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl"
              style={{ color: "var(--ink)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your best customers, your biggest risks, your next deal.{" "}
              <span style={{ color: "var(--agent-mint)" }}>
                It's all in your data. SignalOps unlocks it.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--agent-text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Six AI agents working 24/7 to protect your revenue, close your deals and find your next best customers.
            </p>
            <a href="#cta"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(180deg, oklch(0.82 0.14 175 / 0.95), oklch(0.72 0.13 175 / 0.9))",
                color: "oklch(0.14 0.025 235)",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.2), 0 0 18px oklch(0.82 0.14 175 / 0.4), 0 0 36px oklch(0.82 0.14 175 / 0.18)",
              }}>
              Join the beta. 30 spots only →
            </a>
          </div>

          {/* RIGHT — premium metallic monitor */}
          <div className="relative flex flex-col items-center">

            {/* Webcam pill */}
            <div className="mb-1.5 flex h-4 w-14 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(180deg, oklch(0.36 0.015 235), oklch(0.24 0.012 235))",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.1), 0 2px 6px oklch(0 0 0 / 0.6)",
              }}>
              <span className="h-2 w-2 rounded-full"
                style={{
                  background: "oklch(0.78 0.19 145)",
                  boxShadow: "0 0 8px oklch(0.78 0.19 145 / 0.9), 0 0 16px oklch(0.78 0.19 145 / 0.5)",
                  animation: "hero-rec-pulse 1.4s ease-in-out infinite",
                }} />
            </div>

            {/* Outer metallic frame */}
            <div className="relative w-full rounded-2xl p-[2px]"
              style={{
                background: "var(--gradient-frame)",
                boxShadow: "0 0 0 1px oklch(0.82 0.14 175 / 0.1), 0 0 50px oklch(0.82 0.14 175 / 0.18), 0 30px 80px oklch(0 0 0 / 0.7)",
              }}>

              {/* Inner bezel */}
              <div className="rounded-[14px] p-3"
                style={{
                  background: "linear-gradient(180deg, oklch(0.26 0.015 235) 0%, oklch(0.19 0.012 235) 100%)",
                  boxShadow: "inset 0 2px 6px oklch(0 0 0 / 0.5), inset 0 0 0 1px oklch(1 0 0 / 0.04)",
                }}>

                {/* Screen surface */}
                <div className="rounded-xl overflow-hidden"
                  style={{
                    background: "var(--gradient-screen)",
                    boxShadow: "var(--inset-screen)",
                    minHeight: "360px",
                    padding: "20px 24px",
                  }}>

                  {/* macOS-style dots + label */}
                  <div className="flex items-center gap-2 mb-5 pb-4"
                    style={{ borderBottom: "1px solid oklch(0.32 0.04 200 / 0.2)" }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.72 0.16 25 / 0.7)" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.82 0.14 85 / 0.7)" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.78 0.19 145 / 0.7)" }} />
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "var(--agent-mint-dim)" }}>
                      SignalOps · Live Signal Feed
                    </span>
                  </div>

                  {/* Typing terminal */}
                  <div className="space-y-2.5 font-mono text-[12px] leading-relaxed">
                    {trimmed.map((line) => (
                      <div key={line.id} style={{ color: colorFor(line.type), filter: glowFor(line.type) }}>
                        {line.typing ? line.partialText : line.text}
                        {line.typing && (
                          <span aria-hidden style={{
                            display: "inline-block", marginLeft: "2px",
                            animation: "hero-cursor-blink 1s steps(1) infinite",
                          }}>_</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor neck */}
            <div style={{
              width: "28px", height: "22px",
              background: "linear-gradient(180deg, oklch(0.32 0.012 235), oklch(0.22 0.012 235))",
              boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06)",
            }} />

            {/* Monitor base */}
            <div style={{
              width: "160px", height: "8px", borderRadius: "4px",
              background: "linear-gradient(180deg, oklch(0.34 0.012 235), oklch(0.22 0.012 235))",
              boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08), 0 6px 20px oklch(0 0 0 / 0.6)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
