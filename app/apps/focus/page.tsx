import Link from "next/link";

const META: Record<string, { emoji: string; name: string; desc: string; color: string }> = {
  mood:      { emoji: "🌙", name: "Mood Log",    desc: "Zaznamenávaj ako sa cítim každý deň.",    color: "#BF5AF2" },
  bookmarks: { emoji: "🔖", name: "Bookmarks",   desc: "Ukladaj linky ktoré nechceš stratiť.",    color: "#0A84FF" },
  focus:     { emoji: "⏱️", name: "Focus Timer", desc: "Pomodoro timer pre deep work sessions.",  color: "#FF375F" },
};

export default function Page({ params }: { params: { app: string } }) {
  const slug = "focus";
  const m = META[slug];
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 40 }}>
      <div style={{ padding: "60px 20px 20px" }}>
        <Link href="/" style={{ fontSize: 15, color: m.color, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px" }}>{m.emoji} {m.name}</h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 6 }}>{m.desc}</p>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
        <div className="card" style={{ padding: "28px 24px", textAlign: "center", width: "100%", maxWidth: 340 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{m.emoji}</div>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.5 }}>
            Táto app je zatiaľ prázdna 🚧<br />Povedzme Claudovi čo tu chceš mať!
          </p>
        </div>
      </div>
    </main>
  );
}
