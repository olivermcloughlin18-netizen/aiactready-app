import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { WaitlistForm } from './waitlist-form'

export default async function RootPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="font-[family-name:var(--font-inter)] bg-white text-[#09090b] min-h-screen" style={{ WebkitFontSmoothing: 'antialiased' }}>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl backdrop-saturate-[180%] border-b border-[#f4f4f5]">
        <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-[9px] font-bold tracking-tight">
            <span className="w-[26px] h-[26px] bg-[#09090b] text-white rounded-md inline-flex items-center justify-center text-xs font-extrabold">A</span>
            AIActReady
          </a>
          <div className="hidden md:inline-flex items-center gap-1">
            <a href="#problem" className="px-3 py-2 rounded-md text-sm text-[#52525b] hover:text-[#09090b] transition-colors">The wave</a>
            <a href="#product" className="px-3 py-2 rounded-md text-sm text-[#52525b] hover:text-[#09090b] transition-colors">Product</a>
            <a href="#pricing" className="px-3 py-2 rounded-md text-sm text-[#52525b] hover:text-[#09090b] transition-colors">Pricing</a>
            <a href="#faq" className="px-3 py-2 rounded-md text-sm text-[#52525b] hover:text-[#09090b] transition-colors">FAQ</a>
          </div>
          <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-[7px] text-[13px] font-semibold bg-[#09090b] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-8px_rgba(9,9,11,0.25)] hover:-translate-y-px transition-all">
            Join waitlist
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-[100px] pb-[90px]">
        <div className="absolute top-[-240px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />
        <div className="max-w-[1180px] mx-auto px-7 text-center">
          <h1 className="text-[clamp(40px,6vw,76px)] font-extrabold tracking-[-0.04em] leading-[1.04] mb-[22px]">
            Get AI Act ready<br />
            <span className="font-[family-name:var(--font-instrument)] italic font-normal tracking-[-0.02em]">in ninety days.</span>
          </h1>

          <p className="text-[clamp(17px,1.6vw,21px)] text-[#52525b] max-w-[620px] mx-auto leading-[1.5] mb-3.5">
            One platform. Every AI regulation. From inventory to audit-ready documentation, without a Big Four invoice.
          </p>
          <p className="text-[13px] text-[#a1a1aa] mb-9">
            EU AI Act · Colorado AI Act · NYC LL 144 · Texas TRAIGA · ISO 42001
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-5">
            <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-[22px] py-3.5 rounded-lg text-[14.5px] font-semibold bg-[#09090b] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-8px_rgba(9,9,11,0.25)] hover:-translate-y-px hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_14px_32px_-10px_rgba(9,9,11,0.35)] transition-all">
              Join the waitlist
            </a>
            <a href="#product" className="inline-flex items-center justify-center gap-2 px-[22px] py-3.5 rounded-lg text-[14.5px] font-semibold bg-white text-[#09090b] border border-[#e4e4e7] hover:border-[#09090b] hover:-translate-y-px transition-all">
              See the product →
            </a>
          </div>
          <p className="text-xs text-[#a1a1aa]">First 25 customers lock founder pricing for life · Launching Q3 2026</p>

          {/* Product mock */}
          <div className="hidden md:block mt-[60px] max-w-[920px] mx-auto border border-[#e4e4e7] rounded-2xl overflow-hidden bg-white shadow-[0_30px_80px_-30px_rgba(9,9,11,0.18),0_2px_0_0_rgba(9,9,11,0.02)]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#f4f4f5] bg-[#fafafa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
              <span className="ml-3 px-2.5 py-1 bg-white border border-[#e4e4e7] rounded-md text-xs text-[#52525b]">app.aiactready.com / dashboard</span>
            </div>
            <div className="p-7 pb-8">
              <h3 className="text-sm font-semibold mb-3.5">AI Inventory · Q3 2026 audit</h3>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Systems tracked', value: '47', delta: '+6 this month', color: '#059669' },
                  { label: 'High-risk', value: '8', delta: '2 needs FRIA', color: '#dc2626' },
                  { label: 'Audit readiness', value: '92%', delta: '+4% this week', color: '#059669' },
                  { label: 'Frameworks', value: '5', delta: 'EU · CO · NYC · TX · ISO', color: '#059669' },
                ].map(s => (
                  <div key={s.label} className="border border-[#e4e4e7] rounded-[10px] p-3.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#52525b]">{s.label}</p>
                    <p className="text-[22px] font-bold tracking-[-0.02em] mt-1">{s.value}</p>
                    <p className="text-[11px] font-semibold mt-0.5" style={{ color: s.color }}>{s.delta}</p>
                  </div>
                ))}
              </div>
              <div className="border border-[#e4e4e7] rounded-[10px] overflow-hidden">
                {[
                  { icon: 'G', name: 'Greenhouse + AI sourcing', meta: 'HR automated decisioning · EU AI Act Annex III', risk: 'High-risk', riskClass: 'bg-[rgba(220,38,38,0.08)] text-[#dc2626]' },
                  { icon: 'M', name: 'Microsoft Copilot — Sales team', meta: 'Productivity assistant · transparency req.', risk: 'Limited risk', riskClass: 'bg-[rgba(217,119,6,0.08)] text-[#d97706]' },
                  { icon: 'J', name: 'Jasper — Marketing copy', meta: 'Content generation · minimal obligations', risk: 'Minimal', riskClass: 'bg-[rgba(5,150,105,0.08)] text-[#059669]' },
                ].map(r => (
                  <div key={r.name} className="flex items-center justify-between px-3.5 py-3 border-b border-[#f4f4f5] last:border-b-0 text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-[22px] h-[22px] rounded-md bg-[#f4f4f5] inline-flex items-center justify-center text-[10px] font-bold">{r.icon}</span>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-[11px] text-[#52525b]">{r.meta}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ${r.riskClass}`}>{r.risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 border-y border-[#f4f4f5]">
        <div className="max-w-[1180px] mx-auto px-7 text-center">
          <p className="text-[13px] uppercase tracking-[0.06em] font-medium text-[#52525b] mb-7">Built for compliance teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-[42px] gap-y-4 opacity-55">
            {['Series A HR tech', 'EdTech platforms', 'Fintech & insurtech', 'B2B SaaS', 'Marketing agencies'].map(name => (
              <span key={name} className="text-[22px] font-bold tracking-[-0.02em] text-[#27272a]">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATION TIMELINE */}
      <section className="py-[120px] pb-0 max-md:py-20 max-md:pb-0">
        <div className="max-w-[760px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">The countdown</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">The wave is already here.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">The big deadline is August 2026, but four laws have already gone live. Each one adds documentation a regulator can ask for tomorrow.</p>
          </div>

          <div className="relative ml-0">
            <div className="absolute left-[28px] top-3.5 bottom-3.5 w-0.5 bg-[#e4e4e7] rounded-sm" />
            {[
              { date: '2 Feb 2025', title: 'EU AI Act — prohibited practices + AI literacy', desc: 'Social scoring banned. Article 4 makes AI literacy mandatory for every company deploying AI in the EU. Penalties up to €35M.', live: true },
              { date: '2 Aug 2025', title: 'GPAI provider obligations', desc: 'OpenAI, Anthropic, Mistral and others must publish transparency reports — which flows downstream into every deployer\'s documentation.', live: true },
              { date: 'Jan 2026', title: 'Korea AI Basic Act + Illinois HB 3773 + California AB 2013', desc: 'First Asian comprehensive AI law live. US states fill the federal vacuum with hiring AI disclosure and training-data transparency rules.', live: true },
              { date: '1 Feb 2026', title: 'Colorado AI Act in force', desc: 'High-risk AI deployers must run impact assessments, risk-management programs, and public disclosures. $20k per violation.', live: true },
              { date: '2 Aug 2026', title: 'EU AI Act — the main wave', desc: 'Most provisions apply. High-risk system rules, governance bodies, conformity assessments, penalty regime fully active. €35M / 7% of global revenue.', live: false },
              { date: 'Late 2026', title: 'Australia mandatory guardrails + Texas TRAIGA phased', desc: 'Voluntary AI Safety Standard becomes binding for high-risk Aus deployments. TRAIGA $200k/violation civil penalty regime engages.', live: false },
              { date: '2 Aug 2027', title: 'Full EU AI Act enforcement', desc: 'High-risk AI in regulated products (medical devices, machinery, toys) — full conformity assessment regime.', live: false },
            ].map(item => (
              <div key={item.date} className="grid grid-cols-[60px_140px_1fr] gap-7 py-[18px] items-start relative max-md:grid-cols-[60px_1fr] max-md:gap-3.5">
                <span className={`w-3.5 h-3.5 rounded-full border-2 bg-white relative z-10 justify-self-start ml-[21px] mt-2 ${item.live ? 'bg-[#09090b] border-[#09090b] scale-[1.15]' : 'border-[#a1a1aa]'}`} />
                <span className={`text-[13px] font-semibold pt-1 max-md:col-span-full max-md:pl-[60px] max-md:text-xs max-md:-mt-2 ${item.live ? 'text-[#09090b]' : 'text-[#27272a]'}`}>{item.date}</span>
                <div className="pt-1">
                  <p className="text-[#09090b] font-semibold mb-1">
                    {item.title}
                    {item.live && <span className="inline-block ml-2 bg-[#059669] text-white text-[10px] font-bold uppercase tracking-[0.08em] px-[7px] py-0.5 rounded-full align-[2px]">Live</span>}
                  </p>
                  <p className="text-[14.5px] text-[#52525b] leading-[1.55]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM — PENALTY TABLE */}
      <section id="problem" className="py-[120px] max-md:py-20">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">The 2026 wave</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">If your company uses AI, you're already in scope.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">ChatGPT for support. Copilot for engineering. AI tools that screen CVs. Each one triggers documentation, risk classification, and disclosure under at least one law that's already in force.</p>
          </div>

          <div className="border border-[#e4e4e7] rounded-[14px] overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-[#e4e4e7]">
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b]">Regulation</th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b]">Effective</th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b]">Max penalty</th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b]">Triggers for SMEs</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'EU AI Act', meta: 'Regulation 2024/1689 — phased rollout', date: '2 Aug 2026 (main)', fine: '€35M / 7%', trigger: 'Any AI output reaching the EU' },
                    { name: 'Colorado AI Act', meta: 'SB24-205 — algorithmic discrimination', date: '1 Feb 2026', fine: '$20k / violation', trigger: 'High-risk AI used on Colorado residents' },
                    { name: 'NYC Local Law 144', meta: 'Automated employment decisions', date: 'In force', fine: '$1,500 / day', trigger: 'Hiring AI on NYC candidates' },
                    { name: 'Texas TRAIGA', meta: 'Responsible AI Governance Act', date: 'Phased 2026', fine: '$200k / violation', trigger: 'High-risk AI affecting Texans' },
                    { name: 'Korea AI Basic Act', meta: 'First Asian comprehensive AI law', date: 'Jan 2026', fine: '₩30M+', trigger: 'Selling AI into Korean market' },
                    { name: 'ISO/IEC 42001', meta: 'AI Management System standard', date: 'Customer demand', fine: 'Lost deals', trigger: 'Anyone selling B2B with AI in product' },
                  ].map(r => (
                    <tr key={r.name} className="border-b border-[#f4f4f5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-5 py-[18px] align-middle">
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-xs text-[#52525b] mt-0.5">{r.meta}</p>
                      </td>
                      <td className="px-5 py-[18px] align-middle">{r.date}</td>
                      <td className="px-5 py-[18px] align-middle font-semibold text-[#dc2626] whitespace-nowrap">{r.fine}</td>
                      <td className="px-5 py-[18px] align-middle">{r.trigger}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT — FEATURES */}
      <section id="product" className="py-[120px] pt-0 max-md:py-20 max-md:pt-0">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">The product</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">Five tools that turn AI chaos into audit-ready docs.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">No consultants. No PhDs. One platform that maps every AI tool you use to every law you have to follow.</p>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-px bg-[#e4e4e7] border border-[#e4e4e7] rounded-2xl overflow-hidden">
            {[
              { title: 'AI inventory dashboard', desc: 'Every AI tool your team uses — auto-discovered from SSO logs, tagged with purpose, data, vendor, risk class.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
              { title: 'Risk classification wizard', desc: 'Answer eight questions. Get the exact AI Act risk class plus the obligations triggered under every other framework.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> },
              { title: 'Auto-generated documentation', desc: 'FRIAs, inventories, governance docs, vendor questionnaires — pre-populated templates dated and ready for review.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13l2 2 4-4"/></svg> },
              { title: 'AI-literacy tracker', desc: 'Mandatory under EU AI Act Article 4. Short training modules, attestation tracking, audit-ready completion records.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
            ].map(f => (
              <div key={f.title} className="bg-white p-9 max-sm:p-7 hover:bg-[#fafafa] transition-colors">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-[#09090b] text-white inline-flex items-center justify-center mb-[22px]">{f.icon}</div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-2">{f.title}</h3>
                <p className="text-[14.5px] text-[#52525b] leading-[1.55]">{f.desc}</p>
              </div>
            ))}
            <div className="bg-white p-9 max-sm:p-7 hover:bg-[#fafafa] transition-colors col-span-full">
              <div className="w-[38px] h-[38px] rounded-[9px] bg-[#09090b] text-white inline-flex items-center justify-center mb-[22px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
              <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-2">One-click audit-ready export</h3>
              <p className="text-[14.5px] text-[#52525b] leading-[1.55] max-w-[620px]">When a regulator, insurance broker, or enterprise customer asks for your AI governance documentation, you press a button. Out comes a signed, dated PDF pack covering every framework you're subject to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE TABLE */}
      <section className="py-[120px] max-md:py-20 bg-[#fafafa] border-y border-[#f4f4f5]">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">Why us</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">Built for the gap nobody is serving.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">Enterprise suites cost more than a junior compliance officer. DIY templates cost weeks of legal time. We're the missing middle.</p>
          </div>

          <div className="overflow-x-auto rounded-[14px]">
            <table className="w-full border-collapse text-sm bg-white border border-[#e4e4e7] rounded-[14px] overflow-hidden">
              <thead>
                <tr>
                  <th className="px-[18px] py-4 text-left text-xs font-semibold uppercase tracking-[0.06em] text-[#52525b] bg-[#fafafa] border-b border-[#e4e4e7]">&nbsp;</th>
                  <th className="px-[18px] py-4 text-xs font-semibold uppercase tracking-[0.06em] text-[#52525b] bg-[#fafafa] border-b border-[#e4e4e7]">Big 4 audit</th>
                  <th className="px-[18px] py-4 text-xs font-semibold uppercase tracking-[0.06em] text-[#52525b] bg-[#fafafa] border-b border-[#e4e4e7]">Enterprise GRC</th>
                  <th className="px-[18px] py-4 text-xs font-semibold uppercase tracking-[0.06em] text-[#52525b] bg-[#fafafa] border-b border-[#e4e4e7]">DIY templates</th>
                  <th className="px-[18px] py-4 text-xs font-semibold uppercase tracking-[0.06em] text-white bg-[#09090b] border-b border-[#e4e4e7]">AIActReady</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Annual cost', '$30–80k', '$50k+', 'Free', 'From $2,400'],
                  ['Time to audit-ready', '6 months', '3–6 months', 'Weeks of legal time', '90 days'],
                  ['Self-serve', '—', '—', '✓', '✓'],
                  ['Multi-framework', 'Per engagement', 'Limited', '—', '✓'],
                  ['Auto-updates as laws change', '—', 'Per release', '—', '✓'],
                ].map(([label, ...cols]) => (
                  <tr key={label} className="border-b border-[#f4f4f5] last:border-b-0">
                    <td className="px-[18px] py-4 text-left font-medium">{label}</td>
                    {cols.map((val, i) => (
                      <td key={i} className={`px-[18px] py-4 text-center ${i === 3 ? 'bg-[#fafafa] font-semibold text-[#09090b]' : ''} ${val === '✓' ? 'text-[#059669] font-bold' : val === '—' ? 'text-[#a1a1aa]' : ''}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-[120px] max-md:py-20">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">How it works</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">Ninety days from signup to audit-prepared.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">Three steps. No consultants. No blank templates.</p>
          </div>

          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6">
            {[
              { num: 'i.', title: 'Connect your stack', desc: 'Plug in Google Workspace or Microsoft 365 SSO. We auto-discover every AI tool your team is using — including the ones nobody told compliance about.', time: 'Day 1 · 20 minutes' },
              { num: 'ii.', title: 'Classify and document', desc: 'Run each system through the eight-question risk wizard. We generate the FRIA, AI inventory, transparency notice and vendor due-diligence pack — populated, not blank.', time: 'Days 2–30' },
              { num: 'iii.', title: 'Stay audit-ready', desc: 'Quarterly reviews. Auto-updates when laws change. One-click export when your insurer, biggest customer, or a regulator asks.', time: 'Day 90 onward' },
            ].map(s => (
              <div key={s.num} className="border border-[#e4e4e7] rounded-2xl p-[30px] bg-white relative hover:border-[#09090b] hover:-translate-y-0.5 transition-all">
                <span className="absolute top-6 right-6 font-[family-name:var(--font-instrument)] text-[44px] leading-none text-[#a1a1aa] italic">{s.num}</span>
                <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-2.5 max-w-[200px]">{s.title}</h3>
                <p className="text-[14.5px] text-[#52525b] leading-[1.55]">{s.desc}</p>
                <span className="inline-block mt-3.5 text-[11px] font-semibold text-[#52525b] uppercase tracking-[0.08em]">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-[120px] max-md:py-20">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">Pricing</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1] mb-3.5">Built for one-person compliance teams.</h2>
            <p className="text-[17px] text-[#52525b] max-w-[620px] mx-auto">First 25 customers lock founder pricing for life.</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-[7px] bg-[rgba(5,150,105,0.08)] text-[#059669] border border-[rgba(5,150,105,0.2)] rounded-full px-3.5 py-1.5 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                23 of 25 founding seats remaining
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
            {[
              {
                name: 'Starter', sub: '≤ 50 employees · 1 framework', price: '$199', features: ['AI inventory (up to 25 systems)', 'Risk-class wizard', 'FRIA + inventory templates', 'Slack & Google Workspace', 'Email support'], featured: false,
              },
              {
                name: 'Growth', sub: '≤ 250 employees · all frameworks', price: '$499', features: ['Everything in Starter', 'Unlimited AI systems', 'All 8 frameworks tracked & updated', 'AI literacy tracker (Article 4)', 'Vendor due-diligence library', 'Priority support, 4hr SLA'], featured: true,
              },
              {
                name: 'Pro', sub: '≤ 500 employees · audit prep', price: '$1,499', features: ['Everything in Growth', 'Regulator-ready audit pack', 'Quarterly review call', 'SSO + SCIM', 'Insurance-broker handoff', 'Slack Connect support'], featured: false,
              },
            ].map(p => (
              <div key={p.name} className={`border rounded-2xl p-8 flex flex-col relative transition-all hover:-translate-y-0.5 ${
                p.featured
                  ? 'bg-[#09090b] text-white border-[#09090b] scale-[1.02] shadow-[0_24px_48px_-16px_rgba(9,9,11,0.4)]'
                  : 'bg-white border-[#e4e4e7] hover:shadow-[0_12px_36px_-16px_rgba(9,9,11,0.2)]'
              }`}>
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#09090b] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] border border-[#e4e4e7]">Most popular</span>
                )}
                <p className="font-bold text-[15px] mb-1">{p.name}</p>
                <p className={`text-[13px] mb-[26px] ${p.featured ? 'text-white/65' : 'text-[#52525b]'}`}>{p.sub}</p>
                <p className="text-[44px] font-extrabold tracking-[-0.04em] mb-6">{p.price}<span className={`text-sm font-medium ml-1 ${p.featured ? 'text-white/60' : 'text-[#52525b]'}`}>/ month</span></p>
                <ul className="flex-1 flex flex-col gap-2.5 mb-[30px]">
                  {p.features.map(f => (
                    <li key={f} className={`text-sm flex items-start gap-[9px] ${p.featured ? 'text-white/85' : 'text-[#27272a]'}`}>
                      <span className="w-3.5 h-3.5 mt-0.5 shrink-0 rounded-full bg-[#059669] flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center py-3.5 rounded-lg text-[14.5px] font-semibold transition-all ${
                    p.featured
                      ? 'bg-white text-[#09090b] hover:bg-[#fafafa]'
                      : 'border border-[#09090b] text-[#09090b] hover:-translate-y-px'
                  }`}
                >
                  Join waitlist
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="bg-[#09090b] text-white py-[110px] max-md:py-[72px]">
        <div className="max-w-[760px] mx-auto px-7">
          <h2 className="text-[clamp(30px,4vw,46px)] text-center font-extrabold tracking-[-0.035em] leading-[1.1] mb-[18px]">
            Join the <span className="font-[family-name:var(--font-instrument)] italic font-normal">founding customer</span> waitlist.
          </h2>
          <p className="text-center text-white/70 max-w-[540px] mx-auto text-base leading-[1.55] mb-11">
            Twenty-five seats. Founder pricing locks for life. We'll prioritise teams whose use cases shape the product.
          </p>

          <WaitlistForm />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[120px] max-md:py-20">
        <div className="max-w-[760px] mx-auto px-7">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52525b] inline-block mb-4">FAQ</span>
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.1]">Common questions.</h2>
          </div>

          {[
            { q: 'Is this a Big 4 audit replacement?', a: 'No. AIActReady produces the documentation and structured evidence a regulator, insurer or enterprise customer typically asks for. For sectors where a formal third-party conformity assessment is legally required, that must still be conducted by a qualified auditor. We help you prepare everything they need, which reduces audit time and cost.' },
            { q: "We don't build AI — we just use ChatGPT and Copilot. Are we really in scope?", a: "Yes. Under the AI Act you're a deployer the moment you put AI output in front of staff, customers, or candidates. Article 4 — AI literacy — has applied since February 2025 to every deployer regardless of size." },
            { q: 'What if my customers ask for ISO 42001 before the AI Act bites?', a: "Growth plan maps your inventory, risk assessments and governance docs to the ISO 42001 clause structure (clauses 4–10). This gives you the evidence pack an external auditor needs for certification — but you'll still need an accredited certification body for the formal certificate itself." },
            { q: "Who's behind this?", a: "A solo founder who's shipped multiple production AI systems and kept running into the same problem: every compliance question triggered a $40k consultant quote or a 200-page framework document nobody could action. AIActReady is the tool I wished existed." },
            { q: 'What about data security?', a: "We never train on your data. Infrastructure is being designed with EU data residency in mind for launch. A data processing agreement will be provided at onboarding." },
          ].map(({ q, a }) => (
            <details key={q} className="border-t border-[#e4e4e7] py-[22px] group last:border-b last:border-b-[#e4e4e7]">
              <summary className="flex items-center justify-between gap-5 cursor-pointer font-semibold text-[16.5px] tracking-[-0.005em] text-[#09090b] list-none [&::-webkit-details-marker]:hidden">
                {q}
                <span className="w-5 h-5 shrink-0 inline-flex items-center justify-center text-[#52525b] group-open:rotate-45 transition-transform duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </summary>
              <p className="pt-3.5 text-[#52525b] text-[15px] leading-[1.65] max-w-[680px]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e4e7] py-[50px]">
        <div className="max-w-[1180px] mx-auto px-7 flex justify-between gap-6 flex-wrap items-start max-sm:flex-col max-sm:gap-5">
          <div>
            <a href="#" className="flex items-center gap-[9px] font-bold tracking-tight mb-2.5">
              <span className="w-[26px] h-[26px] bg-[#09090b] text-white rounded-md inline-flex items-center justify-center text-xs font-extrabold">A</span>
              AIActReady
            </a>
            <p className="text-[13px] text-[#52525b] max-w-[380px] mt-2.5">Compliance tooling for AI regulation. Built for teams of one.</p>
            <p className="text-xs text-[#a1a1aa] max-w-[380px] mt-2 leading-[1.5]">Not legal advice. Documentation generated by this software has not been reviewed by a licensed legal professional.</p>
          </div>
          <p className="text-xs text-[#a1a1aa]">© 2026 AIActReady · Privacy · Terms</p>
        </div>
      </footer>

    </div>
  )
}
