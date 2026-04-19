import Link from "next/link";

const apps = [
  {
    slug: "habit-tracker",
    name: "Habit Tracker",
    emoji: "🔥",
    desc: "Buduj návyky deň po dni",
    accent: "#FF6B35",
    gridColumn: "span 2",
    minHeight: 180,
    gradient: "linear-gradient(135deg, #FF6B3522 0%, #FF9F0A11 100%)",
  },
  {
    slug: "budget",
    name: "Budget",
    emoji: "💸",
    desc: "Príjmy & výdavky",
    accent: "#34C759",
    gridColumn: "span 1",
    minHeight: 160,
    gradient: "linear-gradient(135deg, #34C75922 0%, #30D15811 100%)",
  },
  {
    slug: "notes",
    name: "Notes",
    emoji: "📝",
    desc: "Rýchle myšlienky",
    accent: "#FF9F0A",
    gridColumn: "span 1",
    minHeight: 160,
    gradient: "linear-gradient(135deg, #FF9F0A22 0%, #FF6B3511 100%)",
  },
  {
    slug: "mood",
    name: "Mood",
    emoji: "🌙",
    desc: "Ako sa cítim",
    accent: "#BF5AF2",
    gridColumn: "span 1",
    minHeight: 160,
    gradient: "linear-gradient(135deg, #BF5AF222 0%, #9B59B611 100%)",
  },
  {
    slug: "focus",
    name: "Focus",
    emoji: "⏱️",
    desc: "Pomodoro timer",
    accent: "#FF375F",
    gridColumn: "span 1",
    minHeight: 160,
    gradient: "linear-gradient(135deg, #FF375F22 0%, #FF6B3511 100%)",
  },
  {
    slug: "bookmarks",
    name: "Bookmarks",
    emoji: "🔖",
    desc: "Uložené linky",
    accent: "#0A84FF",
    gridColumn: "span 2",
    minHeight: 120,
    gradient: "linear-gradient(135deg, #0A84FF22 0%, #5AC8FA11 100%)",
  },
];

export default function Home() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 5 ? "Dobrú noc" : hour < 12 ? "Dobré ráno" : hour < 18 ? "Dobrý deň" : "Dobrý večer";

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 48 }}>
      {/* Header */}
      <div style={{ padding: "64px 20px 28px" }}>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4, fontWeight: 500 }}>
          {now.toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.1 }}>
          {greeting} 👋
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 6, fontWeight: 400 }}>
          Tvoja osobná nástenka
        </p>
      </div>

      {/* Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          padding: "0 16px",
        }}
      >
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}`}
            style={{
              gridColumn: app.gridColumn,
              minHeight: app.minHeight,
              background: "var(--surface)",
              borderRadius: 22,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              WebkitTapHighlightColor: "transparent",
              transition: "transform 0.15s ease",
            }}
          >
            {/* Gradient bg */}
            <div style={{
              position: "absolute", inset: 0,
              background: app.gradient,
              pointerEvents: "none",
            }} />

            {/* Top: emoji + text */}
            <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{
                width: 52, height: 52, flexShrink: 0,
                borderRadius: 16,
                background: `${app.accent}20`,
                border: `1px solid ${app.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26,
              }}>
                {app.emoji}
              </div>
              <div style={{ paddingTop: 2 }}>
                <div style={{ fontSize: 17, fontWeight: 650, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                  {app.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3, lineHeight: 1.3 }}>
                  {app.desc}
                </div>
              </div>
            </div>

            {/* Bottom: open arrow */}
            <div style={{
              position: "relative",
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: 10,
                background: `${app.accent}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
                color: app.accent,
                fontWeight: 700,
              }}>
                ›
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: "var(--muted)" }}>
        myboard · built with Claude 🤖
      </p>
    </main>
  );
}
