import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-4">AIActReady</h1>
      <p className="text-[#6b7280] text-lg mb-8">
        EU AI Act Compliance Platform
      </p>
      <Link
        href="/laws"
        className="px-6 py-3 bg-[#6366f1] text-white rounded-lg font-medium hover:bg-[#5558e6] transition-colors"
      >
        Browse EU AI Act Laws
      </Link>
    </main>
  );
}
