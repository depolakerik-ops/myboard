import Link from "next/link";

const apps = [
  {
    slug: "habit-tracker",
    name: "Habit Tracker",
    emoji: "🔥",
    desc: "Buduj návyky",
    accent: "#FF6B35",
    bg: "#FFF3EE",
    bgDark: "#2D1A10",
    span: "col-span-2",
    tall: true,
  },
  {
    slug: "budget",
    name: "Budget",
    emoji: "💸",
    desc: "Príjmy & výdavky",
    accent: "#34C759",
    bg: "#EDFAF1",
    bgDark: "#0D2116",
    span: "col-span-1",
    tall: false,
  },
  {
    slug: "notes",
    name: "Notes",
    emoji: "📝",
    desc: "Rýchle myšlienky",
    accent: "#FF9F0A",
    bg: "#FFF8EC",
    bgDark: "#2B1D00",
    span: "col-span-1",
    tall: false,
  },
  {
    slug: "mood",
    name: "Mood",
    emoji: "🌙",
    desc: "Ako sa cítim",
    accent: "#BF5AF2",
    bg: "#F5EEFF",
    bgDark: "#1E0B2E",
    span: "col-span-1",
    tall: false,
  },
  {
    slug: "focus",
    name: "Focus",
    emoji: "⏱️",
    desc: "Pomodoro timer",
    accent: "#FF375F",
    bg: "#FFEEF1",
    bgDark: "#2D0A10",
    span: "col-span-1",
    tall: false,
  },
  {
    slug: "bookmarks",
    name: "Bookmarks",
    emoji: "🔖",
    desc: "Uložené linky",
    accent: "#0A84FF",
    bg: "#EAF4FF",
    bgDark: "#001D35",
    span: "col-span-2",
    tall: false,
  },
];

export default function Home() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 5 ? "Dobrú noc" : hour < 12 ? "Dobré ráno" : hour < 18 ? "Dobrý deň" : "Dobrý večer";

  return (
    <main style={{ minHeight: "100vh", padding: "0 0 40px 0" }}>
      {/* Header */}
      <div style={{ padding: "60px 20px 24px" }}>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6, fontWeight: 500 }}>
          {now.toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
          {greeting} 👋
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 6 }}>Tvoja osobná nástenka</p>
      </div>

      {/* Bento Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        padding: "0 16px",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}`}
            className="card"
            style={{
              gridColumn: app.span,
              minHeight: app.tall ? 200 : 160,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Color tint bg */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${app.accent}15 0%, transparent 60%)`,
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 14,
                background: `${app.accent}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
                marginBottom: 12,
              }}>
                {app.emoji}
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.2px" }}>{app.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{app.desc}</div>
            </div>

            <div style={{
              position: "relative",
              fontSize: 13,
              fontWeight: 600,
              color: app.accent,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Otvoriť <span style={{ fontSize: 16 }}>›</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "var(--muted)" }}>
        myboard · built with Claude 🤖
      </div>
    </main>
  );
}
