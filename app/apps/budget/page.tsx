"use client";
import Link from "next/link";
import { useState } from "react";

const ACCENT = "#34C759";

const CATEGORIES: Record<string, { label: string; emoji: string; color: string }> = {
  debt_payment: { label: "Splátky", emoji: "🏦", color: "#FF375F" },
  food:         { label: "Jedlo", emoji: "🍎", color: "#FF9F0A" },
  tobacco:      { label: "Tabak", emoji: "🚬", color: "#8E8E93" },
  subscriptions:{ label: "Predplatné", emoji: "📱", color: "#0A84FF" },
  car:          { label: "Auto", emoji: "🚗", color: "#FF6B35" },
  loans:        { label: "Pôžičky", emoji: "🤝", color: "#BF5AF2" },
  shopping:     { label: "Nákupy", emoji: "🛍️", color: "#30D158" },
  income:       { label: "Príjem", emoji: "💰", color: "#34C759" },
  other:        { label: "Ostatné", emoji: "📦", color: "#8E8E93" },
};

interface Transaction {
  date: string;
  amount: number;
  category: string;
  description: string;
}

interface MonthData {
  income: number;
  transactions: Transaction[];
}

const INITIAL_DATA: Record<string, MonthData> = {
  "2026-04": {
    income: 1901.99,
    transactions: [
      { date: "2026-04-15", amount: -88,    category: "debt_payment",  description: "BNP Paribas Consor Finance" },
      { date: "2026-04-15", amount: -8,     category: "tobacco",       description: "Marlboro cigarety" },
      { date: "2026-04-15", amount: -10,    category: "subscriptions", description: "Microsoft Office 365" },
      { date: "2026-04-15", amount: -30,    category: "loans",         description: "Benzín pre Sofinku (vráti ~30.04)" },
      { date: "2026-04-15", amount: -49.75, category: "food",          description: "Nákup jedlo" },
      { date: "2026-04-15", amount: -114.03,category: "car",           description: "Tankovanie" },
      { date: "2026-04-15", amount: -200,   category: "loans",         description: "Pôžička pre Sofinku (vráti)" },
      { date: "2026-04-15", amount: -9.49,  category: "subscriptions", description: "Predplatné 1" },
      { date: "2026-04-15", amount: -9.49,  category: "subscriptions", description: "Predplatné 2" },
      { date: "2026-04-15", amount: -10.54, category: "subscriptions", description: "Setapp predplatné" },
      { date: "2026-04-15", amount: -36.64, category: "food",          description: "Nákup jedlo - obchod" },
      { date: "2026-04-15", amount: -140,   category: "tobacco",       description: "IQOS Delia" },
      { date: "2026-04-15", amount: -77.63, category: "debt_payment",  description: "Majak 1 - splátka" },
      { date: "2026-04-15", amount: -56.89, category: "debt_payment",  description: "Majak 2 - splátka" },
      { date: "2026-04-15", amount: -140.44,category: "debt_payment",  description: "Homecredit 1 - splátka" },
      { date: "2026-04-15", amount: -56.97, category: "debt_payment",  description: "Homecredit 2 - splátka" },
      { date: "2026-04-15", amount: -39.63, category: "debt_payment",  description: "Cetelem - splátka" },
      { date: "2026-04-15", amount: -48.06, category: "debt_payment",  description: "Nuxo - splátka" },
      { date: "2026-04-15", amount: -29,    category: "debt_payment",  description: "Minipôžička - splátka" },
      { date: "2026-04-15", amount: -14.46, category: "debt_payment",  description: "Tatra banka Credit - splátka" },
      { date: "2026-04-15", amount: -5.99,  category: "subscriptions", description: "Robux - sestra (Roblox)" },
      { date: "2026-04-15", amount: -25,    category: "debt_payment",  description: "Coeo inkaso" },
      { date: "2026-04-16", amount: -10.09, category: "food",          description: "Bakery" },
      { date: "2026-04-16", amount: -20.62, category: "subscriptions", description: "MiniMax Starter" },
      { date: "2026-04-16", amount: -9.99,  category: "subscriptions", description: "Discord Nitro" },
      { date: "2026-04-16", amount: -18.02, category: "shopping",      description: "Action - obchod" },
      { date: "2026-04-17", amount: -4.3,   category: "food",          description: "Káva" },
      { date: "2026-04-17", amount: -3.19,  category: "food",          description: "Praclik so slaninou" },
      { date: "2026-04-17", amount: -10,    category: "tobacco",       description: "Marlboro cigarety" },
      { date: "2026-04-17", amount: -12.09, category: "food",          description: "Nákup Edeka jedlo" },
      { date: "2026-04-17", amount: -5.82,  category: "food",          description: "Nákup Edeka jedlo" },
      { date: "2026-04-17", amount: -27.1,  category: "food",          description: "Nákup Lidl potraviny" },
      { date: "2026-04-17", amount: -12,    category: "shopping",      description: "Obal na mobil" },
      { date: "2026-04-17", amount: -7.99,  category: "car",           description: "Umytie auta" },
      { date: "2026-04-18", amount: -10,    category: "tobacco",       description: "Marlboro gold" },
      { date: "2026-04-18", amount: -37,    category: "shopping",      description: "Barber" },
      { date: "2026-04-18", amount: -8,     category: "car",           description: "Parkovanie" },
      { date: "2026-04-18", amount: -10,    category: "food",          description: "Slushy eating out" },
      { date: "2026-04-18", amount: -5.5,   category: "food",          description: "Perníkové srdiečko" },
      { date: "2026-04-18", amount: -7,     category: "food",          description: "Langos eating out" },
      { date: "2026-04-18", amount: -15.27, category: "food",          description: "Nákup Edeka jedlo" },
      { date: "2026-04-19", amount: -13.99, category: "shopping",      description: "Playstation extra" },
    ],
  },
  "2026-05": {
    income: 0,
    transactions: [],
  },
};

const MONTHS = ["2026-04", "2026-05", "2026-06"];
const MONTH_LABELS: Record<string, string> = {
  "2026-04": "Apríl 2026",
  "2026-05": "Máj 2026",
  "2026-06": "Jún 2026",
};

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function groupByDate(txns: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  [...txns].sort((a, b) => b.date.localeCompare(a.date)).forEach(t => {
    if (!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });
  return groups;
}

export default function Budget() {
  const [monthKey, setMonthKey] = useState("2026-04");
  const [data, setData] = useState<Record<string, MonthData>>(INITIAL_DATA);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ desc: "", amount: "", category: "food" });
  const [activeTab, setActiveTab] = useState<"overview" | "transactions">("overview");

  const month = data[monthKey] ?? { income: 0, transactions: [] };
  const expenses = month.transactions.reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = month.income - expenses;
  const spentPct = month.income > 0 ? Math.min((expenses / month.income) * 100, 100) : 0;

  // Category breakdown
  const catTotals: Record<string, number> = {};
  month.transactions.forEach(t => {
    catTotals[t.category] = (catTotals[t.category] || 0) + Math.abs(t.amount);
  });
  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  const addTransaction = () => {
    if (!form.desc || !form.amount) return;
    const t: Transaction = {
      date: new Date().toISOString().split("T")[0],
      amount: -Math.abs(parseFloat(form.amount)),
      category: form.category,
      description: form.desc,
    };
    setData(prev => ({
      ...prev,
      [monthKey]: { ...prev[monthKey], transactions: [...(prev[monthKey]?.transactions ?? []), t] },
    }));
    setForm({ desc: "", amount: "", category: "food" });
    setShowAdd(false);
  };

  const monthIdx = MONTHS.indexOf(monthKey);
  const dateGroups = groupByDate(month.transactions);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: "60px 20px 16px" }}>
        <Link href="/" style={{ fontSize: 15, color: ACCENT, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
          ‹ Späť
        </Link>

        {/* Month switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={() => monthIdx > 0 && setMonthKey(MONTHS[monthIdx - 1])}
            disabled={monthIdx === 0}
            style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: monthIdx === 0 ? "var(--muted)" : "var(--text)", fontSize: 18, cursor: monthIdx === 0 ? "default" : "pointer" }}>
            ‹
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px" }}>{MONTH_LABELS[monthKey]}</h1>
          <button onClick={() => monthIdx < MONTHS.length - 1 && setMonthKey(MONTHS[monthIdx + 1])}
            disabled={monthIdx === MONTHS.length - 1}
            style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: monthIdx === MONTHS.length - 1 ? "var(--muted)" : "var(--text)", fontSize: 18, cursor: monthIdx === MONTHS.length - 1 ? "default" : "pointer" }}>
            ›
          </button>
        </div>

        {/* Balance card */}
        <div style={{ background: balance >= 0 ? "#34C75918" : "#FF375F18", borderRadius: 20, border: `1px solid ${balance >= 0 ? "#34C75930" : "#FF375F30"}`, padding: "20px 20px 16px" }}>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Zostatok</p>
          <p style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-1px", color: balance >= 0 ? "#34C759" : "#FF375F" }}>
            {balance >= 0 ? "+" : ""}{fmt(balance)}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Príjem</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: "#34C759" }}>{fmt(month.income)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Výdavky</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: "#FF375F" }}>{fmt(expenses)}</p>
            </div>
          </div>
          {/* Spent bar */}
          <div style={{ marginTop: 12, height: 5, borderRadius: 3, background: "var(--surface-2)" }}>
            <div style={{ height: "100%", width: `${spentPct}%`, borderRadius: 3, background: spentPct > 90 ? "#FF375F" : "#34C759", transition: "width 0.4s ease" }} />
          </div>
          <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 5 }}>{spentPct.toFixed(0)}% výplaty minuté</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 16px 12px", display: "flex", gap: 8 }}>
        {(["overview", "transactions"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, background: activeTab === tab ? ACCENT : "var(--surface)", color: activeTab === tab ? "#fff" : "var(--muted)", transition: "all 0.15s ease" }}>
            {tab === "overview" ? "📊 Prehľad" : "📋 Transakcie"}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {sortedCats.length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 15 }}>
              Žiadne transakcie v tomto mesiaci
            </div>
          )}
          {sortedCats.map(([cat, total]) => {
            const meta = CATEGORIES[cat] ?? CATEGORIES.other;
            const pct = expenses > 0 ? (total / expenses) * 100 : 0;
            return (
              <div key={cat} style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "14px 16px", boxShadow: "var(--shadow)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{meta.emoji}</span>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{meta.label}</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: meta.color }}>{fmt(total)}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "var(--surface-2)" }}>
                  <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: meta.color }} />
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{pct.toFixed(0)}% z výdavkov</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Transactions tab */}
      {activeTab === "transactions" && (
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.keys(dateGroups).length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 15 }}>
              Žiadne transakcie
            </div>
          )}
          {Object.entries(dateGroups).map(([date, txns]) => (
            <div key={date}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {new Date(date).toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "short" })}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {txns.map((t, i) => {
                  const meta = CATEGORIES[t.category] ?? CATEGORIES.other;
                  return (
                    <div key={i} style={{ background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow)" }}>
                      <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 12, background: `${meta.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {meta.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</p>
                        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{meta.label}</p>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: t.amount < 0 ? "#FF375F" : "#34C759", flexShrink: 0 }}>
                        {t.amount < 0 ? "-" : "+"}{fmt(Math.abs(t.amount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add button */}
      <div style={{ position: "fixed", bottom: 32, right: 20, left: 20, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setShowAdd(true)}
          style={{ width: 56, height: 56, borderRadius: 18, border: "none", background: ACCENT, color: "#fff", fontSize: 28, cursor: "pointer", boxShadow: "0 4px 20px #34C75950", display: "flex", alignItems: "center", justifyContent: "center" }}>
          +
        </button>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 100 }}
          onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
          <div style={{ background: "var(--surface)", borderRadius: "24px 24px 0 0", padding: "24px 20px 40px", width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--muted)", margin: "0 auto 8px" }} />
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Pridať výdavok</h2>

            <input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
              placeholder="Popis..." autoFocus
              style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 16, outline: "none" }} />

            <div style={{ display: "flex", gap: 10 }}>
              <input value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                placeholder="Suma €" type="number" inputMode="decimal"
                style={{ flex: 1, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 16, outline: "none" }} />
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ flex: 1, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontSize: 15, outline: "none" }}>
                {Object.entries(CATEGORIES).filter(([k]) => k !== "income").map(([k, v]) => (
                  <option key={k} value={k}>{v.emoji} {v.label}</option>
                ))}
              </select>
            </div>

            <button onClick={addTransaction}
              style={{ padding: "16px", borderRadius: 14, border: "none", background: ACCENT, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
              Pridať
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
