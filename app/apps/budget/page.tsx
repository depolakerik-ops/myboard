"use client";
import Link from "next/link";
import { useState } from "react";

const ACCENT = "#34C759";
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

  const income = entries.filter(e => e.type === "in").reduce((s, e) => s + e.amount, 0);
  const expense = entries.filter(e => e.type === "out").reduce((s, e) => s + e.amount, 0);
  const balance = income - expense;

  const add = () => {
    if (!label || !amount) return;
    setEntries([{ id: Date.now(), label, amount: Number(amount), type }, ...entries]);
    setLabel(""); setAmount("");
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <div style={{ padding: "60px 20px 20px" }}>
        <Link href="/" style={{ fontSize: 15, color: ACCENT, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px" }}>💸 Budget</h1>
      </div>

      {/* Summary */}
      <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Príjmy", val: income, color: "#34C759" },
          { label: "Výdavky", val: expense, color: "#FF375F" },
          { label: "Zostatok", val: balance, color: balance >= 0 ? "#34C759" : "#FF375F" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 12px", textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}€</p>
          </div>
        ))}
      </div>

      {/* Add form */}
      <div style={{ padding: "0 16px", marginBottom: 16 }}>
        <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Popis transakcie..."
            style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 15, outline: "none" }} />
          <div style={{ display: "flex", gap: 10 }}>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Suma €" type="number"
              style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 15, outline: "none" }} />
            <select value={type} onChange={e => setType(e.target.value as "in" | "out")}
              style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 15, outline: "none" }}>
              <option value="out">Výdavok</option>
              <option value="in">Príjem</option>
            </select>
          </div>
          <button onClick={add} style={{ padding: "14px", borderRadius: 12, border: "none", background: ACCENT, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Pridať
          </button>
        </div>
      </div>

      {/* Entries */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map(e => (
          <div key={e.id} className="card" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15 }}>{e.label}</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: e.type === "in" ? "#34C759" : "#FF375F" }}>
              {e.type === "in" ? "+" : "-"}{e.amount}€
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
