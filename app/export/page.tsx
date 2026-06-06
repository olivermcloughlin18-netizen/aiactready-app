'use client'
import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'

const FRAMEWORKS = ['EU AI Act', 'Texas TRAIGA', 'NYC LL 144', 'Colorado SB 26-189', 'ISO 42001']

export default function ExportPage() {
  const [selected, setSelected] = useState<string[]>(['EU AI Act'])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggle(fw: string) {
    setSelected(prev => prev.includes(fw) ? prev.filter(f => f !== fw) : [...prev, fw])
  }

  async function handleExport() {
    if (selected.length === 0) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedFrameworks: selected }),
    })
    if (!res.ok) {
      setError('Failed to generate audit pack. Make sure you have at least one final document.')
      setLoading(false)
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'AI-Audit-Pack.pdf'
    a.click()
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">Audit Export</h1>
        <p className="text-sm text-[#52525b] mt-1">
          Generate a one-click PDF audit pack. Only finalised documents are included.
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="max-w-lg space-y-6">
        <div>
          <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-3">Frameworks to cover</h2>
          <div className="space-y-2">
            {FRAMEWORKS.map(fw => (
              <label
                key={fw}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer text-sm transition-all ${
                  selected.includes(fw)
                    ? 'border-[#09090b] bg-[#fafafa] text-[#09090b]'
                    : 'border-[#e4e4e7] text-[#52525b] hover:border-[#d4d4d8] hover:text-[#09090b]'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  selected.includes(fw) ? 'bg-[#09090b] border-[#09090b]' : 'border-[#d4d4d8]'
                }`}>
                  {selected.includes(fw) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selected.includes(fw)}
                  onChange={() => toggle(fw)}
                  className="sr-only"
                />
                {fw}
              </label>
            ))}
          </div>
        </div>

        <div className="border border-[#e4e4e7] rounded-xl p-4">
          <p className="text-xs font-medium text-[#09090b] mb-2">What&apos;s included</p>
          <ul className="space-y-1.5 text-xs text-[#52525b]">
            {[
              'Cover page with organisation details',
              'AI inventory register (all tools)',
              'All finalised documents (FRIAs, policies, AUPs)',
              'AI literacy training records (Article 4)',
            ].map(item => (
              <li key={item} className="flex items-center gap-2">
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" className="text-[#059669] shrink-0">
                  <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleExport}
          disabled={loading || selected.length === 0}
          className="w-full bg-[#09090b] hover:bg-[#27272a] text-white rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:opacity-40 cursor-pointer"
        >
          {loading ? 'Generating PDF…' : `Generate audit pack${selected.length > 0 ? ` (${selected.length} framework${selected.length > 1 ? 's' : ''})` : ''}`}
        </button>
      </div>
    </AppShell>
  )
}
