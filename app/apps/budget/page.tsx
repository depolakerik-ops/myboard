"use client";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES: Record<string, { label: string; emoji: string }> = {
  debt_payment:  { label: "Splátky",     emoji: "🏦" },
  food:          { label: "Jedlo",       emoji: "🍎" },
  tobacco:       { label: "Tabak",       emoji: "🚬" },
  subscriptions: { label: "Predplatné", emoji: "📱" },
  car:           { label: "Auto",        emoji: "🚗" },
  loans:         { label: "Pôžičky",    emoji: "🤝" },
  shopping:      { label: "Nákupy",     emoji: "🛍️" },
  other:         { label: "Ostatné",    emoji: "📦" },
};

interface Transaction { date: string; amount: number; category: string; description: string; }
interface MonthData { income: number; transactions: Transaction[]; }

const INITIAL_DATA: Record<string, MonthData> = {
  "2026-04": {
    income: 1901.99,
    transactions: [
      { date:"2026-04-15", amount:-88,     category:"debt_payment",  description:"BNP Paribas Consor Finance" },
      { date:"2026-04-15", amount:-8,      category:"tobacco",       description:"Marlboro cigarety" },
      { date:"2026-04-15", amount:-10,     category:"subscriptions", description:"Microsoft Office 365" },
      { date:"2026-04-15", amount:-30,     category:"loans",         description:"Benzín pre Sofinku (vráti ~30.04)" },
      { date:"2026-04-15", amount:-49.75,  category:"food",          description:"Nákup jedlo" },
      { date:"2026-04-15", amount:-114.03, category:"car",           description:"Tankovanie" },
      { date:"2026-04-15", amount:-200,    category:"loans",         description:"Pôžička pre Sofinku (vráti)" },
      { date:"2026-04-15", amount:-9.49,   category:"subscriptions", description:"Predplatné 1" },
      { date:"2026-04-15", amount:-9.49,   category:"subscriptions", description:"Predplatné 2" },
      { date:"2026-04-15", amount:-10.54,  category:"subscriptions", description:"Setapp predplatné" },
      { date:"2026-04-15", amount:-36.64,  category:"food",          description:"Nákup jedlo - obchod" },
      { date:"2026-04-15", amount:-140,    category:"tobacco",       description:"IQOS Delia" },
      { date:"2026-04-15", amount:-77.63,  category:"debt_payment",  description:"Majak 1 - splátka" },
      { date:"2026-04-15", amount:-56.89,  category:"debt_payment",  description:"Majak 2 - splátka" },
      { date:"2026-04-15", amount:-140.44, category:"debt_payment",  description:"Homecredit 1 - splátka" },
      { date:"2026-04-15", amount:-56.97,  category:"debt_payment",  description:"Homecredit 2 - splátka" },
      { date:"2026-04-15", amount:-39.63,  category:"debt_payment",  description:"Cetelem - splátka" },
      { date:"2026-04-15", amount:-48.06,  category:"debt_payment",  description:"Nuxo - splátka" },
      { date:"2026-04-15", amount:-29,     category:"debt_payment",  description:"Minipôžička - splátka" },
      { date:"2026-04-15", amount:-14.46,  category:"debt_payment",  description:"Tatra banka Credit - splátka" },
      { date:"2026-04-15", amount:-5.99,   category:"subscriptions", description:"Robux - sestra (Roblox)" },
      { date:"2026-04-15", amount:-25,     category:"debt_payment",  description:"Coeo inkaso" },
      { date:"2026-04-16", amount:-10.09,  category:"food",          description:"Bakery" },
      { date:"2026-04-16", amount:-20.62,  category:"subscriptions", description:"MiniMax Starter" },
      { date:"2026-04-16", amount:-9.99,   category:"subscriptions", description:"Discord Nitro" },
      { date:"2026-04-16", amount:-18.02,  category:"shopping",      description:"Action - obchod" },
      { date:"2026-04-17", amount:-4.3,    category:"food",          description:"Káva" },
      { date:"2026-04-17", amount:-3.19,   category:"food",          description:"Praclik so slaninou" },
      { date:"2026-04-17", amount:-10,     category:"tobacco",       description:"Marlboro cigarety" },
      { date:"2026-04-17", amount:-12.09,  category:"food",          description:"Nákup Edeka jedlo" },
      { date:"2026-04-17", amount:-5.82,   category:"food",          description:"Nákup Edeka jedlo" },
      { date:"2026-04-17", amount:-27.1,   category:"food",          description:"Nákup Lidl potraviny" },
      { date:"2026-04-17", amount:-12,     category:"shopping",      description:"Obal na mobil" },
      { date:"2026-04-17", amount:-7.99,   category:"car",           description:"Umytie auta" },
      { date:"2026-04-18", amount:-10,     category:"tobacco",       description:"Marlboro gold" },
      { date:"2026-04-18", amount:-37,     category:"shopping",      description:"Barber" },
      { date:"2026-04-18", amount:-8,      category:"car",           description:"Parkovanie" },
      { date:"2026-04-18", amount:-10,     category:"food",          description:"Slushy eating out" },
      { date:"2026-04-18", amount:-5.5,    category:"food",          description:"Perníkové srdiečko" },
      { date:"2026-04-18", amount:-7,      category:"food",          description:"Langos eating out" },
      { date:"2026-04-18", amount:-15.27,  category:"food",          description:"Nákup Edeka jedlo" },
      { date:"2026-04-19", amount:-13.99,  category:"shopping",      description:"Playstation extra" },
      { date:"2026-04-19", amount:-21.38,  category:"subscriptions", description:"Cursor predplatné" },
      { date:"2026-04-19", amount:-21.42,  category:"subscriptions", description:"Claude AI subscription" },
      { date:"2026-04-19", amount:-150,    category:"loans",         description:"Pôžička Laska" },
      { date:"2026-04-20", amount:-21.38,  category:"subscriptions", description:"Cursor predplatné" },
      { date:"2026-04-20", amount:-21.42,  category:"subscriptions", description:"Claude AI subscription" },
      { date:"2026-04-20", amount:-150,    category:"loans",         description:"Pôžička láska" },
      { date:"2026-04-20", amount:-6.97,   category:"food",          description:"Biomarkt potraviny" },
      { date:"2026-04-21", amount:-16.77,  category:"subscriptions", description:"Moonshot AI predplatné" },
    ],
  },
  "2026-05": { income: 0, transactions: [] },
  "2026-06": { income: 0, transactions: [] },
};

const MONTHS = ["2026-04","2026-05","2026-06"];
const MONTH_LABELS: Record<string,string> = { "2026-04":"Apríl 2026","2026-05":"Máj 2026","2026-06":"Jún 2026" };

const fmt = (n: number) => n.toFixed(2).replace(".",",") + " €";

export default function Budget() {
  const [monthKey, setMonthKey] = useState("2026-04");
  const [data, setData] = useState<Record<string,MonthData>>(INITIAL_DATA);
  const [tab, setTab] = useState<"overview"|"transactions">("overview");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ desc:"", amount:"", category:"food" });

  const month = data[monthKey] ?? { income:0, transactions:[] };
  const expenses = month.transactions.reduce((s,t) => s + Math.abs(t.amount), 0);
  const balance = month.income - expenses;
  const spentPct = month.income > 0 ? Math.min((expenses/month.income)*100,100) : 0;

  const catTotals: Record<string,number> = {};
  month.transactions.forEach(t => { catTotals[t.category] = (catTotals[t.category]||0) + Math.abs(t.amount); });
  const sortedCats = Object.entries(catTotals).sort((a,b) => b[1]-a[1]);

  const grouped = [...month.transactions]
    .sort((a,b) => b.date.localeCompare(a.date))
    .reduce<Record<string,Transaction[]>>((acc,t) => { (acc[t.date]??=[]).push(t); return acc; }, {});

  const addTx = () => {
    if (!form.desc || !form.amount) return;
    const t: Transaction = { date: new Date().toISOString().split("T")[0], amount: -Math.abs(parseFloat(form.amount)), category: form.category, description: form.desc };
    setData(p => ({ ...p, [monthKey]: { ...p[monthKey], transactions: [...(p[monthKey]?.transactions??[]),t] } }));
    setForm({ desc:"", amount:"", category:"food" });
    setShowAdd(false);
  };

  const idx = MONTHS.indexOf(monthKey);

  const balanceColor = balance >= 0 ? "#6B9E6B" : "#C15F3C";

  return (
    <main style={{ minHeight:"100vh", paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:"60px 20px 16px" }}>
        <Link href="/" style={{ fontSize:15, color:"var(--accent)", display:"inline-flex", alignItems:"center", gap:2, marginBottom:16, fontWeight:500 }}>
          ‹ Späť
        </Link>

        {/* Month switcher */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <button onClick={() => idx>0 && setMonthKey(MONTHS[idx-1])} disabled={idx===0}
            style={{ width:36, height:36, borderRadius:10, border:"1px solid var(--border)", background:"var(--surface)", color:idx===0?"var(--muted)":"var(--text)", fontSize:20, cursor:idx===0?"default":"pointer" }}>‹</button>
          <span style={{ fontSize:18, fontWeight:700 }}>{MONTH_LABELS[monthKey]}</span>
          <button onClick={() => idx<MONTHS.length-1 && setMonthKey(MONTHS[idx+1])} disabled={idx===MONTHS.length-1}
            style={{ width:36, height:36, borderRadius:10, border:"1px solid var(--border)", background:"var(--surface)", color:idx===MONTHS.length-1?"var(--muted)":"var(--text)", fontSize:20, cursor:idx===MONTHS.length-1?"default":"pointer" }}>›</button>
        </div>

        {/* Balance card */}
        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:"20px 20px 16px", boxShadow:"var(--shadow)" }}>
          <div style={{ width:"100%", height:3, borderRadius:2, background:"var(--surface-2)", marginBottom:16, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${spentPct}%`, background:spentPct>90?"var(--accent-2)":"var(--accent)", borderRadius:2, transition:"width 0.4s ease" }} />
          </div>
          <p style={{ fontSize:12, color:"var(--muted)", marginBottom:4 }}>Zostatok mesiaca</p>
          <p style={{ fontSize:42, fontWeight:700, letterSpacing:"-1.5px", color:balanceColor, lineHeight:1 }}>
            {balance >= 0 ? "+" : ""}{fmt(balance)}
          </p>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16, paddingTop:14, borderTop:"1px solid var(--border-2)" }}>
            <div>
              <p style={{ fontSize:12, color:"var(--muted)", marginBottom:2 }}>Príjem</p>
              <p style={{ fontSize:17, fontWeight:700, color:"#6B9E6B" }}>{fmt(month.income)}</p>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:12, color:"var(--muted)", marginBottom:2 }}>Výdavky</p>
              <p style={{ fontSize:17, fontWeight:700, color:"var(--accent-2)" }}>{fmt(expenses)}</p>
            </div>
          </div>
          <p style={{ fontSize:11, color:"var(--muted)", marginTop:10 }}>{spentPct.toFixed(0)}% výplaty minuté</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding:"0 16px 14px", display:"flex", gap:8 }}>
        {(["overview","transactions"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex:1, padding:"10px 0", borderRadius:12, border:"none", cursor:"pointer",
            fontSize:14, fontWeight:600,
            background: tab===t ? "var(--accent)" : "var(--surface)",
            color: tab===t ? "#fff" : "var(--muted)",
            boxShadow: tab===t ? "var(--shadow)" : "none",
            transition:"all 0.15s ease",
          }}>
            {t==="overview" ? "📊 Prehľad" : "📋 Transakcie"}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab==="overview" && (
        <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:8 }}>
          {sortedCats.length===0 && <p style={{ textAlign:"center", padding:40, color:"var(--muted)" }}>Žiadne transakcie</p>}
          {sortedCats.map(([cat,total]) => {
            const meta = CATEGORIES[cat]??CATEGORIES.other;
            const pct = expenses>0 ? (total/expenses)*100 : 0;
            return (
              <div key={cat} className="card" style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:20 }}>{meta.emoji}</span>
                    <span style={{ fontSize:15, fontWeight:600 }}>{meta.label}</span>
                  </div>
                  <span style={{ fontSize:15, fontWeight:700, color:"var(--accent-2)" }}>{fmt(total)}</span>
                </div>
                <div style={{ height:4, borderRadius:2, background:"var(--surface-2)" }}>
                  <div style={{ height:"100%", width:`${pct}%`, borderRadius:2, background:"var(--accent)" }} />
                </div>
                <p style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>{pct.toFixed(0)}% z výdavkov</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Transactions */}
      {tab==="transactions" && (
        <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:14 }}>
          {Object.keys(grouped).length===0 && <p style={{ textAlign:"center", padding:40, color:"var(--muted)" }}>Žiadne transakcie</p>}
          {Object.entries(grouped).map(([date,txns]) => (
            <div key={date}>
              <p style={{ fontSize:12, fontWeight:600, color:"var(--muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                {new Date(date).toLocaleDateString("sk-SK",{weekday:"long",day:"numeric",month:"short"})}
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {txns.map((t,i) => {
                  const meta = CATEGORIES[t.category]??CATEGORIES.other;
                  return (
                    <div key={i} className="card" style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:38, height:38, flexShrink:0, borderRadius:11, background:"var(--accent-soft)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                        {meta.emoji}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:14, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.description}</p>
                        <p style={{ fontSize:12, color:"var(--muted)", marginTop:1 }}>{meta.label}</p>
                      </div>
                      <span style={{ fontSize:15, fontWeight:700, color:"var(--accent-2)", flexShrink:0 }}>
                        {fmt(Math.abs(t.amount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setShowAdd(true)} style={{
        position:"fixed", bottom:32, right:20,
        width:56, height:56, borderRadius:18, border:"none",
        background:"var(--accent)", color:"#fff", fontSize:28,
        cursor:"pointer", boxShadow:"0 6px 24px rgba(222,115,86,0.45)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>+</button>

      {/* Add modal */}
      {showAdd && (
        <div onClick={e => e.target===e.currentTarget && setShowAdd(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"flex-end", zIndex:100 }}>
          <div style={{ background:"var(--surface)", borderRadius:"24px 24px 0 0", padding:"20px 20px 44px", width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ width:36, height:4, borderRadius:2, background:"var(--border)", margin:"0 auto 8px" }} />
            <h2 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>Pridať výdavok</h2>
            <input value={form.desc} onChange={e => setForm(f=>({...f,desc:e.target.value}))} placeholder="Popis..." autoFocus style={{ padding:"14px 16px", fontSize:16 }} />
            <div style={{ display:"flex", gap:10 }}>
              <input value={form.amount} onChange={e => setForm(f=>({...f,amount:e.target.value}))} placeholder="Suma €" type="number" inputMode="decimal" style={{ flex:1, padding:"14px 16px", fontSize:16 }} />
              <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} style={{ flex:1, padding:"14px 16px", fontSize:14 }}>
                {Object.entries(CATEGORIES).map(([k,v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
              </select>
            </div>
            <button onClick={addTx} style={{ padding:"16px", borderRadius:14, border:"none", background:"var(--accent)", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", marginTop:4 }}>
              Pridať
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
