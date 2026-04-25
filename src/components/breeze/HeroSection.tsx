import { useEffect, useRef, useState } from "react";

type Signal = { type: "info" | "alert" | "queued"; agent: string; text: string; };

const SIGNALS: Signal[] = [
  { type: "alert",  agent: "Deal",     text: "no economic buyer engaged · 4 meetings in · stall risk" },
  { type: "alert",  agent: "Ignite",   text: "health score dropped to 31 · protect mode triggered" },
  { type: "queued", agent: "Generate", text: "Series A raised · $4.2m · strong in-market signal" },
  { type: "alert",  agent: "Deal",     text: "deal stalled · 47 days at proposal stage · act now" },
  { type: "queued", agent: "Generate", text: "new CRO hired · outreach window open · high intent" },
  { type: "info",   agent: "Recover",  text: "14 months dormant · re-engagement signal detected" },
  { type: "queued", agent: "ICP",      text: "strong ICP match · 94% fit · contact verified" },
  { type: "alert",  agent: "Ignite",   text: "champion gone dark · next best action needed now" },
  { type: "info",   agent: "Deal",     text: "competitor evaluation detected · immediate action needed" },
  { type: "queued", agent: "Generate", text: "VP Sales hired 3 days ago · buying signal confirmed" },
  { type: "alert",  agent: "Profit",   text: "cost exceeds revenue · margin risk flagged · review" },
  { type: "queued", agent: "Ignite",   text: "upsell ready · expansion signal fired · high score" },
  { type: "info",   agent: "Deal",     text: "no decision maker engaged · pipeline stall risk high" },
  { type: "alert",  agent: "Profit",   text: "MRR looks healthy · margin is negative · flagged" },
  { type: "queued", agent: "Recover",  text: "Series B announced · dormant account · re-engage now" },
];

const MAX_LINES = 9;
const TYPE_SPEED = 30;
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
      const fullText = `${signal.agent} · ${signal.text}`;
      setTyping({ signal, chars: 0, id });
      let chars = 0;
      const tick = () => {
        if (cancelled) return;
        chars += 1;
        setTyping({ signal, chars, id });
        if (chars < fullText.length) {
          timer = setTimeout(tick, TYPE_SPEED);
        } else {
          setTyping(null);
          setLines(prev => {
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
    type === "alert" ? "drop-shadow(0 0 5px oklch(0.72 0.16 25 / 0.4))"
    : type === "queued" ? "drop-shadow(0 0 5px oklch(0.82 0.14 175 / 0.35))"
    : "none";

  const prefix = (s: Signal) => `${s.agent} · `;

  const visible: Array<RenderedLine & { typing?: boolean; partialText?: string }> = [...lines];
  if (typing) {
    const full = `${typing.signal.agent} · ${typing.signal.text}`;
    visible.push({ id: typing.id, type: typing.signal.type, agent: typing.signal.agent, text: typing.signal.text, typing: true, partialText: full.slice(0, typing.chars) });
  }
  const trimmed = visible.length > MAX_LINES ? visible.slice(visible.length - MAX_LINES) : visible;

  /* ── Shared signal line renderer ── */
  const SignalLine = ({ line }: { line: typeof trimmed[0] }) => (
    <div style={{ color: colorFor(line.type), filter: glowFor(line.type) }}>
      {line.typing ? line.partialText : `${prefix(line)}${line.text}`}
      {line.typing && <span aria-hidden style={{ display: "inline-block", marginLeft: "2px", animation: "hero-cursor-blink 1s steps(1) infinite" }}>_</span>}
    </div>
  );

  return (
    <section className="w-full px-6 py-16 md:py-20" style={{ background: "var(--bg-deep)" }}>
      <style>{`
        @keyframes hero-cursor-blink { 0%,49%{opacity:1}50%,100%{opacity:0} }
        @keyframes hero-rec-pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.75)} }
        @keyframes phone-beacon { 0%,100%{opacity:1;box-shadow:0 0 8px oklch(0.78 0.19 145/0.9),0 0 16px oklch(0.78 0.19 145/0.5)}50%{opacity:0.5;box-shadow:0 0 4px oklch(0.78 0.19 145/0.5)} }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT */}
          <div>
            <div className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: "var(--agent-mint)" }}>
              Revenue Intelligence Platform
            </div>
            <h1 style={{ color: "var(--ink)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Your best customers,<br />
              your biggest risks,<br />
              your next deal.<br />
              <span style={{ color: "var(--agent-mint)" }}>It's all in your data.</span><br />
              <span style={{ color: "var(--agent-mint)" }}>SignalOps unlocks it.</span>
            </h1>

            <a href="#cta" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: "linear-gradient(180deg, oklch(0.82 0.14 175/0.95), oklch(0.72 0.13 175/0.9))", color: "oklch(0.14 0.025 235)", boxShadow: "inset 0 1px 0 oklch(1 0 0/0.2), 0 0 18px oklch(0.82 0.14 175/0.4)" }}>
              Join the beta. 30 spots only →
            </a>
          </div>

          {/* RIGHT */}
          <div className="relative flex flex-col items-center">

            {/* ── DESKTOP MONITOR ── */}
            <div className="hidden lg:flex flex-col items-center w-full">
              {/* Webcam */}
              <div className="mb-1.5 flex h-3.5 w-12 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(180deg, oklch(0.55 0.01 235), oklch(0.4 0.01 235))", boxShadow: "inset 0 1px 0 oklch(1 0 0/0.2), 0 2px 6px oklch(0 0 0/0.5)" }}>
                <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.78 0.19 145)", animation: "hero-rec-pulse 1.4s ease-in-out infinite" }} />
              </div>
              {/* Metallic frame — wide 16:10 monitor matching reference */}
              <div className="relative w-full rounded-2xl p-[3px]" style={{
                background: "linear-gradient(145deg, oklch(0.75 0.005 235) 0%, oklch(0.45 0.008 235) 40%, oklch(0.65 0.005 235) 60%, oklch(0.38 0.008 235) 100%)",
                boxShadow: "0 0 40px oklch(0.82 0.14 175/0.15), 0 24px 60px oklch(0 0 0/0.6)",
              }}>
                <div className="rounded-[13px] p-2.5" style={{ background: "linear-gradient(180deg, oklch(0.42 0.008 235) 0%, oklch(0.32 0.008 235) 100%)", boxShadow: "inset 0 2px 4px oklch(0 0 0/0.3)" }}>
                  <div className="rounded-xl overflow-hidden" style={{ background: "var(--gradient-screen)", boxShadow: "var(--inset-screen)", aspectRatio: "16/10", padding: "16px 20px" }}>
                    <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid oklch(0.32 0.04 200/0.2)" }}>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.65 0.18 25/0.8)" }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.75 0.14 85/0.8)" }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.72 0.19 145/0.8)" }} />
                      <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--agent-mint-dim)" }}>SignalOps · Live Signal Feed</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                      {trimmed.map(line => <SignalLine key={line.id} line={line} />)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Neck */}
              <div style={{ width: "26px", height: "20px", background: "linear-gradient(180deg, oklch(0.45 0.008 235), oklch(0.32 0.008 235))" }} />
              {/* Base */}
              <div style={{ width: "140px", height: "7px", borderRadius: "4px", background: "linear-gradient(180deg, oklch(0.5 0.008 235), oklch(0.35 0.008 235))", boxShadow: "0 4px 16px oklch(0 0 0/0.5)" }} />
            </div>

            {/* ── MOBILE PHONE (iPhone 16 style) ── */}
            <div className="flex lg:hidden flex-col items-center w-full">
              <div className="relative mx-auto" style={{ width: "260px" }}>
                {/* Phone outer shell */}
                <div className="relative rounded-[48px] p-[2px]" style={{
                  background: "linear-gradient(145deg, oklch(0.72 0.005 235) 0%, oklch(0.42 0.008 235) 50%, oklch(0.62 0.005 235) 100%)",
                  boxShadow: "0 0 0 1px oklch(0.5 0.008 235), 0 20px 60px oklch(0 0 0/0.7), 0 0 30px oklch(0.82 0.14 175/0.12)",
                }}>
                  {/* Inner bezel */}
                  <div className="rounded-[46px] p-[6px]" style={{ background: "oklch(0.1 0.015 235)" }}>
                    {/* Screen area */}
                    <div className="relative rounded-[40px] overflow-hidden" style={{ background: "var(--gradient-screen)", boxShadow: "var(--inset-screen)", minHeight: "460px", padding: "48px 16px 24px" }}>
                      {/* Dynamic island with beacon */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
                        style={{ width: "80px", height: "22px", background: "oklch(0.06 0.01 235)", boxShadow: "inset 0 1px 0 oklch(1 0 0/0.04)" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "oklch(0.78 0.19 145)", animation: "phone-beacon 1.4s ease-in-out infinite", display: "inline-block" }} />
                      </div>
                      {/* Signal feed header */}
                      <div className="flex items-center gap-1.5 mb-4 pb-3" style={{ borderBottom: "1px solid oklch(0.32 0.04 200/0.2)" }}>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--agent-mint-dim)" }}>SignalOps · Live Feed</span>
                      </div>
                      {/* Signal lines */}
                      <div className="space-y-2.5 font-mono text-[10px] leading-relaxed">
                        {trimmed.map(line => <SignalLine key={line.id} line={line} />)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Side buttons */}
                <div className="absolute left-[-3px] top-[100px] w-[3px] h-8 rounded-l-full" style={{ background: "oklch(0.45 0.008 235)" }} />
                <div className="absolute left-[-3px] top-[148px] w-[3px] h-10 rounded-l-full" style={{ background: "oklch(0.45 0.008 235)" }} />
                <div className="absolute left-[-3px] top-[196px] w-[3px] h-10 rounded-l-full" style={{ background: "oklch(0.45 0.008 235)" }} />
                <div className="absolute right-[-3px] top-[140px] w-[3px] h-14 rounded-r-full" style={{ background: "oklch(0.45 0.008 235)" }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
