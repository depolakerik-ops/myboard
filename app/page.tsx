import Link from "next/link";

const APPS = [
  { slug: "habit-tracker", name: "Habit Tracker", emoji: "🔥", desc: "Rutina a streaky", accent: "#DE7356", tint: "rgba(222, 115, 86, 0.14)" },
  { slug: "budget", name: "Budget", emoji: "💸", desc: "Príjmy, výdavky, zostatok", accent: "#C15F3C", tint: "rgba(193, 95, 60, 0.14)" },
  { slug: "notes", name: "Notes", emoji: "📝", desc: "Rýchle myšlienky", accent: "#B1ADA1", tint: "rgba(177, 173, 161, 0.16)" },
  { slug: "mood", name: "Mood", emoji: "🌙", desc: "Ako sa dnes máš", accent: "#8F7B66", tint: "rgba(143, 123, 102, 0.16)" },
  { slug: "focus", name: "Focus", emoji: "⏱️", desc: "Pomodoro a deep work", accent: "#DE7356", tint: "rgba(222, 115, 86, 0.12)" },
  { slug: "bookmarks", name: "Bookmarks", emoji: "🔖", desc: "Uložené linky", accent: "#C15F3C", tint: "rgba(193, 95, 60, 0.12)" },
];

const STATS = [
  { label: "apps", value: "6", note: "mini dashboardy" },
  { label: "style", value: "Claude", note: "warm minimal" },
  { label: "mode", value: "light / dark", note: "prepínač vpravo hore" },
];

export default function Home() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 5 ? "Dobrú noc" : hour < 12 ? "Dobré ráno" : hour < 18 ? "Dobrý deň" : "Dobrý večer";

  return (
    <main className="app-shell">
      <section className="hero-panel panel" style={{ padding: "28px" }}>
        <div className="eyebrow">Claude palette · myboard</div>
        <h1 className="page-title">{greeting}, Erik 👋</h1>
        <p className="page-subtitle">
          Tvoja osobná nástenka pre rýchly prístup k budgetu, návykom, poznámkam a focus nástrojom —
          teraz v teplých Claude farbách pre light aj dark mode.
        </p>

        <div style={{ marginTop: 22 }} className="metric-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="metric">
              <div className="metric__label">{stat.label}</div>
              <div className="metric__value">{stat.value}</div>
              <div className="metric__caption">{stat.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <div className="topbar" style={{ marginBottom: 14 }}>
          <div>
            <div className="section-title" style={{ marginBottom: 6 }}>Rýchly vstup</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>Bento grid s jemnými Claude akcentmi.</div>
          </div>
          <span className="pill">Warm · minimal · clean</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
          {APPS.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="card"
              style={{
                minHeight: app.slug === "habit-tracker" ? 210 : 170,
                padding: 20,
                background: `linear-gradient(180deg, ${app.tint} 0%, var(--surface) 38%)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 18,
                    background: "var(--surface-strong)",
                    border: `1px solid ${app.accent}33`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 24,
                    boxShadow: "0 10px 18px rgba(0,0,0,0.04)",
                  }}
                >
                  {app.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em" }}>{app.name}</h2>
                    <span style={{ color: app.accent, fontWeight: 800, fontSize: 18 }}>›</span>
                  </div>
                  <p style={{ marginTop: 6, color: "var(--muted)", fontSize: 14, lineHeight: 1.5 }}>{app.desc}</p>
                </div>
              </div>

              <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <span className="pill" style={{ background: "rgba(255,255,255,0.3)" }}>
                  Open app
                </span>
                <span style={{ color: "var(--cloudy)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Claude
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: 28, padding: "0 4px" }}>
        <div className="surface" style={{ padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", fontWeight: 800 }}>
              myboard
            </div>
            <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 14 }}>
              built with Claude vibes 🤖
            </div>
          </div>
          <div className="pill">Warm palette · desktop + mobile</div>
        </div>
      </footer>
    </main>
  );
}
