"use client";
import Link from "next/link";
import { useState } from "react";

const HABITS = ["Cvičenie 💪", "Čítanie 📖", "Voda 💧", "Meditácia 🧘", "Bez cukru 🚫"];
const DAYS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export default function HabitTracker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const total = Object.values(checked).filter(Boolean).length;
  const max = HABITS.length * DAYS.length;
  const pct = Math.round((total / max) * 100);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 48 }}>
      <div style={{ padding: "60px 20px 20px" }}>
        <Link href="/" style={{ fontSize: 15, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 2, marginBottom: 20, fontWeight: 500 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.5px" }}>🔥 Habit Tracker</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>Tento týždeň: {total}/{max} · {pct}%</p>
        <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: "var(--surface-2)" }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: "var(--accent)", transition: "width 0.35s ease" }} />
        </div>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {HABITS.map((habit) => (
          <div key={habit} className="card" style={{ padding: "16px 16px 14px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: "var(--text)" }}>{habit}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
              {DAYS.map((day) => {
                const key = `${habit}-${day}`;
                return (
                  <button key={day} onClick={() => toggle(key)} style={{
                    flex: 1, height: 40, borderRadius: 10, border: "none", cursor: "pointer",
                    background: checked[key] ? "var(--accent)" : "var(--surface-2)",
                    color: checked[key] ? "#fff" : "var(--muted)",
                    fontSize: checked[key] ? 15 : 11,
                    fontWeight: 600,
                    transition: "all 0.15s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {checked[key] ? "✓" : day}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
