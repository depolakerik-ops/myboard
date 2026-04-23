import Link from "next/link";

const META: Record<string, { emoji: string; name: string; desc: string }> = {
  mood:      { emoji: "🌙", name: "Mood Log",    desc: "Zaznamenávaj ako sa cítim každý deň." },
  bookmarks: { emoji: "🔖", name: "Bookmarks",   desc: "Ukladaj linky ktoré nechceš stratiť." },
  focus:     { emoji: "⏱️", name: "Focus Timer", desc: "Pomodoro timer pre deep work sessions." },
};

export default function Page() {
  const slug = "mood";
  const m = META[slug];
  return (
    <main style={{ minHeight:"100vh", display:"flex", flexDirection:"column", paddingBottom:48 }}>
      <div style={{ padding:"60px 20px 20px" }}>
        <Link href="/" style={{ fontSize:15, color:"var(--accent)", display:"inline-flex", alignItems:"center", gap:2, marginBottom:20, fontWeight:500 }}>
          ‹ Späť
        </Link>
        <h1 style={{ fontSize:30, fontWeight:700, letterSpacing:"-0.5px" }}>{m.emoji} {m.name}</h1>
        <p style={{ fontSize:15, color:"var(--muted)", marginTop:6 }}>{m.desc}</p>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 20px" }}>
        <div className="card" style={{ padding:"32px 24px", textAlign:"center", width:"100%", maxWidth:340 }}>
          <div style={{ fontSize:52, marginBottom:16 }}>{m.emoji}</div>
          <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.6 }}>
            Táto app je zatiaľ prázdna 🚧<br />Povedzme Claudovi čo tu chceš mať!
          </p>
        </div>
      </div>
    </main>
  );
}
