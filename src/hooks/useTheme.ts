"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light" | "midnight" | "rgb";

const THEMES: Theme[] = ["dark", "light", "midnight", "rgb"];
const STORAGE_KEY = "homelab_theme";
const DEFAULT: Theme = "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored && THEMES.includes(stored) ? stored : DEFAULT;
    applyTheme(initial);
    setThemeState(initial);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t);
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  return { theme, setTheme, themes: THEMES };
}

function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
}
