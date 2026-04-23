"use client";
import Link from "next/link";
import { useState } from "react";

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
    <main style={{ minHeight: "100vh", paddingBottom: 48 }}>
      <div style={{ padding: "60px 20px 20px" }}>
        <Link href="/" style={{ fontSize: 15, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 2, marginBottom: 20, fontWeight: 500 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.5px" }}>📝 Quick Notes</h1>
      </div>

      <div style={{ padding: "0 16px", display: "flex", gap: 10, marginBottom: 16 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Nová myšlienka..."
          style={{ flex: 1, padding: "14px 16px", fontSize: 15 }} />
        <button onClick={add} style={{
          padding: "14px 20px", borderRadius: 14, border: "none",
          background: "var(--accent)", color: "#fff", fontSize: 20, fontWeight: 600, cursor: "pointer",
        }}>+</button>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {notes.map((note) => (
          <div key={note.id} className="card" style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <p style={{ fontSize: 15 }}>{note.text}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{note.date}</p>
            </div>
            <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
              style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>
    </main>
  );
}
