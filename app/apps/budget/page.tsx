"use client";
import Link from "next/link";
import { useState } from "react";

interface Entry { id: number; label: string; amount: number; type: "in" | "out"; }

export default function Budget() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, label: "Výplata", amount: 2000, type: "in" },
    { id: 2, label: "Nájom", amount: 600, type: "out" },
    { id: 3, label: "Potraviny", amount: 150, type: "out" },
  ]);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"in" | "out">("out");

  const income = entries.filter((e) => e.type === "in").reduce((s, e) => s + e.amount, 0);
  const expense = entries.filter((e) => e.type === "out").reduce((s, e) => s + e.amount, 0);
  const balance = income - expense;

  const add = () => {
    if (!label || !amount) return;
    setEntries([{ id: Date.now(), label, amount: Number(amount), type }, ...entries]);
    setLabel(""); setAmount("");
  };

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
        ← Späť na dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">💸 Budget</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Príjmy", val: income, color: "#38d9a9" },
          { label: "Výdavky", val: expense, color: "#f87171" },
          { label: "Zostatok", val: balance, color: balance >= 0 ? "#38d9a9" : "#f87171" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.val} €</p>
          </div>
        ))}
      </div>

      {/* Add form */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Popis..."
          className="flex-1 min-w-[120px] px-3 py-2 rounded-xl text-sm outline-none"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Suma €" type="number"
          className="w-24 px-3 py-2 rounded-xl text-sm outline-none"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        <select value={type} onChange={(e) => setType(e.target.value as "in" | "out")}
          className="px-3 py-2 rounded-xl text-sm outline-none"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}>
          <option value="out">Výdavok</option>
          <option value="in">Príjem</option>
        </select>
        <button onClick={add} className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "var(--accent)", color: "#fff" }}>Pridať</button>
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-2">
        {entries.map((e) => (
          <div key={e.id} className="card p-4 flex justify-between items-center">
            <span className="text-sm">{e.label}</span>
            <span className="font-semibold text-sm" style={{ color: e.type === "in" ? "#38d9a9" : "#f87171" }}>
              {e.type === "in" ? "+" : "-"}{e.amount} €
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
