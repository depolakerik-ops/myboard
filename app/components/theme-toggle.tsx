"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "myboard-theme";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    const attr = document.documentElement.dataset.theme;
    if (attr === "light" || attr === "dark") return attr;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return getSystemTheme();
  });

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Prepnúť na light mode" : "Prepnúť na dark mode"}
      onClick={toggle}
    >
      <span className="theme-toggle__icon">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
