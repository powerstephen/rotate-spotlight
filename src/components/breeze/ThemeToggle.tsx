import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "dark" | "light";

const STORAGE_KEY = "breeze-theme";

function applyTheme(mode: Mode) {
  const root = document.documentElement;
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? "dark";
    setMode(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  if (!mounted) return null;

  const isDark = mode === "dark";

  return (
    <div className="fixed right-5 top-5 z-50">
      <button
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="group relative flex h-11 w-[68px] items-center rounded-full border px-1 backdrop-blur-md transition-all"
        style={{
          borderColor: "var(--agent-border)",
          background: "var(--pill-bg-dim)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Track icons */}
        <Sun
          className="absolute left-2.5 h-4 w-4 transition-opacity"
          style={{
            color: "var(--agent-text-muted)",
            opacity: isDark ? 0.45 : 0,
          }}
        />
        <Moon
          className="absolute right-2.5 h-4 w-4 transition-opacity"
          style={{
            color: "var(--agent-text-muted)",
            opacity: isDark ? 0 : 0.45,
          }}
        />

        {/* Thumb */}
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500"
          style={{
            background: "var(--agent-mint)",
            transform: isDark ? "translateX(0)" : "translateX(28px)",
            transitionTimingFunction: "var(--transition-smooth)",
            boxShadow: "var(--shadow-mint-glow)",
          }}
        >
          {isDark ? (
            <Moon className="h-4 w-4" style={{ color: "var(--bg-deep)" }} />
          ) : (
            <Sun className="h-4 w-4" style={{ color: "var(--bg-deep)" }} />
          )}
        </span>
      </button>
    </div>
  );
}
