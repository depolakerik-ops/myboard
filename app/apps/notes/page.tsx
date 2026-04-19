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

  const remove = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
        ← Späť na dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">📝 Quick Notes</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Nová myšlienka..."
          className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          onClick={add}
          className="px-5 py-3 rounded-2xl text-sm font-medium"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Pridať
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((note) => (
          <div key={note.id} className="card p-4 flex justify-between items-start gap-3">
            <div>
              <p className="text-sm">{note.text}</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{note.date}</p>
            </div>
            <button onClick={() => remove(note.id)} className="text-xs" style={{ color: "var(--muted)" }}>✕</button>
          </div>
        ))}
      </div>
    </main>
  );
}
