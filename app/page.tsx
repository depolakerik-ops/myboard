import Link from "next/link";

const apps = [
  {
    slug: "habit-tracker",
    name: "Habit Tracker",
    emoji: "🔥",
    desc: "Buduj návyky deň po dni",
    color: "#7c6af7",
    glow: "#7c6af7",
    span: "col-span-2 row-span-2",
  },
  {
    slug: "budget",
    name: "Budget",
    emoji: "💸",
    desc: "Príjmy & výdavky",
    color: "#38d9a9",
    glow: "#38d9a9",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "notes",
    name: "Quick Notes",
    emoji: "📝",
    desc: "Rýchle myšlienky",
    color: "#e879a0",
    glow: "#e879a0",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "mood",
    name: "Mood Log",
    emoji: "🌙",
    desc: "Ako sa cítim každý deň",
    color: "#f59e0b",
    glow: "#f59e0b",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "bookmarks",
    name: "Bookmarks",
    emoji: "🔖",
    desc: "Linky ktoré nechcem stratiť",
    color: "#38bdf8",
    glow: "#38bdf8",
    span: "col-span-1 row-span-1",
  },
  {
    slug: "focus",
    name: "Focus Timer",
    emoji: "⏱️",
    desc: "Pomodoro & deep work",
    color: "#f87171",
    glow: "#f87171",
    span: "col-span-2 row-span-1",
  },
];

export default function Home() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Dobré ráno" : hour < 18 ? "Dobrý deň" : "Dobrý večer";

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>
          {now.toLocaleDateString("sk-SK", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          {greeting}, Erik 👋
        </h1>
        <p className="mt-2 text-base" style={{ color: "var(--muted)" }}>
          Tvoja osobná nástenka
        </p>
      </div>

      {/* Bento Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "180px",
        }}
      >
        {apps.map((app) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}`}
            className={`card card-link ${app.span}`}
            style={{ padding: "28px" }}
          >
            {/* Glow blob */}
            <div
              className="glow"
              style={{
                width: 200,
                height: 200,
                background: app.glow,
                top: -60,
                right: -60,
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span
                  className="inline-block text-3xl mb-3 p-3 rounded-2xl"
                  style={{ background: `${app.color}22` }}
                >
                  {app.emoji}
                </span>
                <h2 className="text-xl font-semibold">{app.name}</h2>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {app.desc}
                </p>
              </div>

              <div
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: app.color }}
              >
                Otvoriť →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-10 text-center text-xs"
        style={{ color: "var(--muted)" }}
      >
        myboard · built with Claude 🤖
      </div>
    </main>
  );
}
