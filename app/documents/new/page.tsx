'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'

const DOC_TYPES = [
  { value: 'FRIA', label: 'Fundamental Rights Impact Assessment', needsTool: true },
  { value: 'INVENTORY', label: 'AI Inventory Register', needsTool: false },
  { value: 'AUP', label: 'Acceptable Use Policy', needsTool: false },
  { value: 'POLICY', label: 'AI Governance Policy', needsTool: false },
  { value: 'VDQ', label: 'Vendor Due-Diligence Questionnaire', needsTool: true },
]

function NewDocumentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [type, setType] = useState(searchParams.get('type') ?? 'INVENTORY')
  const [toolId, setToolId] = useState(searchParams.get('toolId') ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selected = DOC_TYPES.find(d => d.value === type)

  async function handleGenerate() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/documents/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, toolId: toolId || undefined }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to generate document')
      setLoading(false)
      return
    }
    const doc = await res.json()
    router.push(`/documents/${doc.id}`)
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">New document</h1>
        <p className="text-sm text-[#52525b] mt-1">Generate a compliance document from a template</p>
      </div>

      <div className="max-w-lg space-y-4">
        {error && (
          <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#52525b] mb-1.5">Document type</label>
          <select
            className="w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] bg-white focus:outline-none focus:border-[#09090b] transition-all cursor-pointer"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {DOC_TYPES.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {selected?.needsTool && (
          <div>
            <label className="block text-xs font-medium text-[#52525b] mb-1.5">Tool ID</label>
            <input
              className="w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
              placeholder="Paste tool ID from inventory"
              value={toolId}
              onChange={e => setToolId(e.target.value)}
            />
            <p className="text-xs text-[#a1a1aa] mt-1.5">Find the tool ID in the URL when viewing a tool: /inventory/[id]</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || (selected?.needsTool && !toolId)}
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-40 transition-colors cursor-pointer"
        >
          {loading ? 'Generating…' : 'Generate document'}
        </button>
      </div>
    </AppShell>
  )
}

export default function NewDocumentPage() {
  return (
    <Suspense>
      <NewDocumentForm />
    </Suspense>
  )
}
