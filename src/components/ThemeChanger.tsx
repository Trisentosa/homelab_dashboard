"use client";

import { useState } from "react";
import { useTheme, Theme } from "@/hooks/useTheme";

const THEME_META: Record<Theme, { label: string; icon: string; desc: string }> = {
  dark: { label: "Dark", icon: "🌙", desc: "Navy dark" },
  light: { label: "Light", icon: "☀️", desc: "Clean light" },
  midnight: { label: "Midnight", icon: "🔮", desc: "Deep purple" },
  rgb: { label: "RGB", icon: "🌈", desc: "Animated glow" },
};

export default function ThemeChanger() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover */}
      {open && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-14 right-0 w-48 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-2xl overflow-hidden">
            {themes.map((t) => {
              const meta = THEME_META[t];
              return (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setOpen(false); }}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                    "hover:bg-[var(--color-surface-3)]",
                    theme === t
                      ? "text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-text)]",
                  ].join(" ")}
                >
                  <span className="text-lg">{meta.icon}</span>
                  <div>
                    <div>{meta.label}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">{meta.desc}</div>
                  </div>
                  {theme === t && (
                    <svg className="ml-auto w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-11 h-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform"
        aria-label="Change theme"
        title="Change theme"
      >
        {THEME_META[theme].icon}
      </button>
    </div>
  );
}
