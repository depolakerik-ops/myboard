"use client";
import Link from "next/link";
import { useState } from "react";

const HABITS = ["Cvičenie 💪", "Čítanie 📖", "Voda 💧", "Meditácia 🧘", "Bez cukru 🚫"];
const DAYS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

export default function HabitTracker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const total = Object.values(checked).filter(Boolean).length;
  const max = HABITS.length * DAYS.length;

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-3xl mx-auto">
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
        ← Späť na dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">🔥 Habit Tracker</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Tento týždeň: {total}/{max} splnených
        </p>
        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full" style={{ background: "var(--surface-2)" }}>
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${(total / max) * 100}%`, background: "var(--accent)" }}
          />
        </div>
      </div>

      <div className="card p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-4 text-sm font-medium" style={{ color: "var(--muted)" }}>Návyk</th>
              {DAYS.map((d) => (
                <th key={d} className="pb-4 text-sm font-medium" style={{ color: "var(--muted)" }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HABITS.map((habit) => (
              <tr key={habit} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-3 pr-4 text-sm">{habit}</td>
                {DAYS.map((day) => {
                  const key = `${habit}-${day}`;
                  return (
                    <td key={day} className="py-3 text-center">
                      <button
                        onClick={() => toggle(key)}
                        className="w-8 h-8 rounded-xl transition-all text-sm"
                        style={{
                          background: checked[key] ? "var(--accent)" : "var(--surface-2)",
                          border: checked[key] ? "none" : "1px solid var(--border)",
                        }}
                      >
                        {checked[key] ? "✓" : ""}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
