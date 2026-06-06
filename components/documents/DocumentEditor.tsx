'use client'
import { useState } from 'react'

type Section = { id: string; heading: string; content: string }

export function DocumentEditor({
  docId, initialSections, status,
}: {
  docId: string
  initialSections: Section[]
  status: string
}) {
  const [sections, setSections] = useState(initialSections)
  const [activeIdx, setActiveIdx] = useState(0)
  const [saving, setSaving] = useState(false)
  const [docStatus, setDocStatus] = useState(status)

  function updateContent(value: string) {
    setSections(prev => prev.map((s, i) => i === activeIdx ? { ...s, content: value } : s))
  }

  async function save(newStatus?: string) {
    setSaving(true)
    await fetch(`/api/documents/${docId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: { sections }, status: newStatus ?? docStatus }),
    })
    if (newStatus) setDocStatus(newStatus)
    setSaving(false)
  }

  return (
    <div className="flex gap-5">
      <aside className="w-44 shrink-0">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            className={`block w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors cursor-pointer ${
              i === activeIdx
                ? 'bg-[#09090b] text-white font-medium'
                : 'text-[#52525b] hover:text-[#09090b] hover:bg-[#f4f4f5]'
            }`}
          >
            {s.heading}
          </button>
        ))}
      </aside>

      <div className="flex-1">
        <h3 className="font-medium text-[#09090b] mb-3 text-sm">{sections[activeIdx]?.heading}</h3>
        <textarea
          className="w-full border border-[#e4e4e7] rounded-xl p-4 text-sm text-[#09090b] placeholder:text-[#a1a1aa] min-h-64 font-mono leading-relaxed resize-y focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
          value={sections[activeIdx]?.content ?? ''}
          onChange={e => updateContent(e.target.value)}
        />
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => save()}
            disabled={saving}
            className="text-sm px-4 py-2 border border-[#e4e4e7] rounded-lg text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] disabled:opacity-50 transition-all cursor-pointer"
          >
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          {docStatus !== 'final' && (
            <button
              onClick={() => save('final')}
              className="text-sm px-4 py-2 bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg transition-colors cursor-pointer"
            >
              Mark as final
            </button>
          )}
          {docStatus === 'final' && (
            <span className="text-sm px-3 py-2 bg-emerald-50 text-[#059669] border border-emerald-200 rounded-lg">
              Final
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
