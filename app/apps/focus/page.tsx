import Link from "next/link";

export default function Page() {
  const meta: Record<string, { emoji: string; name: string; desc: string }> = {
    mood: { emoji: "🌙", name: "Mood Log", desc: "Tu si budeš zaznamenávať ako sa cítiš každý deň." },
    bookmarks: { emoji: "🔖", name: "Bookmarks", desc: "Tu si ukladáš linky ktoré nechceš stratiť." },
    focus: { emoji: "⏱️", name: "Focus Timer", desc: "Pomodoro timer a deep work sessions." },
  };
  const m = meta["focus"];
  return (
    <main className="min-h-screen p-6 md:p-10 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
      <Link href="/" className="text-sm mb-12 inline-flex items-center gap-1 self-start" style={{ color: "var(--muted)" }}>
        ← Späť na dashboard
      </Link>
      <div className="text-6xl mb-6">{m.emoji}</div>
      <h1 className="text-3xl font-bold mb-3">{m.name}</h1>
      <p className="text-base mb-8" style={{ color: "var(--muted)" }}>{m.desc}</p>
      <div className="card px-6 py-4 text-sm" style={{ color: "var(--muted)" }}>
        🚧 Táto app je zatiaľ prázdna — postavíme ju keď budeš chcieť
      </div>
    </main>
  );
}
