import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard", active: true },
  { href: "/laws", label: "Laws & Articles" },
  { href: "#", label: "AI Inventory", disabled: true },
  { href: "#", label: "Risk Assessment", disabled: true },
  { href: "#", label: "Documents", disabled: true },
  { href: "#", label: "Training", disabled: true },
  { href: "#", label: "Settings", disabled: true },
];

const stats = [
  { label: "Key Articles", value: "14", description: "Covering all risk tiers" },
  { label: "Already Effective", value: "3", description: "Articles 5, 71 + penalties" },
  { label: "Due Aug 2026", value: "9", description: "High-risk system requirements" },
  { label: "Max Fine", value: "€35M", description: "Or 7% global turnover" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r border-[#e5e7eb] bg-[#fafafa] p-5 flex flex-col shrink-0">
        <div className="mb-8">
          <h1 className="text-lg font-bold tracking-tight text-[#111]">AIActReady</h1>
          <p className="text-xs text-[#9ca3af] mt-0.5">Compliance Platform</p>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.disabled ? "#" : item.href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-[#6366f1] text-white font-medium"
                  : item.disabled
                  ? "text-[#d1d5db] cursor-not-allowed"
                  : "text-[#4b5563] hover:bg-[#f3f4f6] hover:text-[#111]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#111] mb-1">Dashboard</h2>
          <p className="text-[#6b7280] text-sm">
            Your EU AI Act compliance overview
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-4"
            >
              <p className="text-2xl font-bold text-[#111]">{stat.value}</p>
              <p className="text-sm font-medium text-[#374151] mt-1">{stat.label}</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/laws"
            className="group bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-6 hover:border-[#6366f1] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#111] mb-1 group-hover:text-[#6366f1] transition-colors">
              Laws & Articles
            </h3>
            <p className="text-sm text-[#6b7280]">
              Browse all 14 key EU AI Act articles with requirements, risk levels, and official sources.
            </p>
            <span className="inline-block mt-3 text-sm text-[#6366f1] font-medium">
              View articles &rarr;
            </span>
          </Link>

          <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-6 opacity-50">
            <h3 className="text-base font-semibold text-[#111] mb-1">AI Inventory</h3>
            <p className="text-sm text-[#6b7280]">
              Register and classify your AI systems by risk level.
            </p>
            <span className="inline-block mt-3 text-xs text-[#9ca3af] font-medium">Coming soon</span>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-6 opacity-50">
            <h3 className="text-base font-semibold text-[#111] mb-1">Risk Assessment</h3>
            <p className="text-sm text-[#6b7280]">
              Run the 8-question wizard to classify your AI systems.
            </p>
            <span className="inline-block mt-3 text-xs text-[#9ca3af] font-medium">Coming soon</span>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-6 opacity-50">
            <h3 className="text-base font-semibold text-[#111] mb-1">Documents & Export</h3>
            <p className="text-sm text-[#6b7280]">
              Generate compliance docs and PDF audit packs.
            </p>
            <span className="inline-block mt-3 text-xs text-[#9ca3af] font-medium">Coming soon</span>
          </div>
        </div>
      </main>
    </div>
  );
}
