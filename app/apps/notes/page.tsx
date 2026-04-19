"use client";
import Link from "next/link";
import { useState } from "react";

const ACCENT = "#FF9F0A";
interface Note { id: number; text: string; date: string; }

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "Prvá poznámka 🎉", date: new Date().toLocaleDateString("sk-SK") },
  ]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setNotes([{ id: Date.now(), text: input, date: new Date().toLocaleDateString("sk-SK") }, ...notes]);
    setInput("");
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <div style={{ padding: "60px 20px 20px" }}>
        <Link href="/" style={{ fontSize: 15, color: ACCENT, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px" }}>📝 Quick Notes</h1>
      </div>

      <div style={{ padding: "0 16px", display: "flex", gap: 10, marginBottom: 16 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Nová myšlienka..." style={{
            flex: 1, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)",
            background: "var(--surface)", color: "var(--text)", fontSize: 15, outline: "none",
          }} />
        <button onClick={add} style={{
          padding: "14px 20px", borderRadius: 14, border: "none", background: ACCENT,
          color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>+</button>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {notes.map((note) => (
          <div key={note.id} className="card" style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <p style={{ fontSize: 15 }}>{note.text}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{note.date}</p>
            </div>
            <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
              style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 18, cursor: "pointer", padding: "0 4px" }}>×</button>
          </div>
        ))}
      </div>
    </main>
  );
}
