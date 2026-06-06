'use client'
import { useState } from 'react'

export function InviteForm() {
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generateLink() {
    setLoading(true)
    setInviteLink('')
    setError('')
    setCopied(false)
    const res = await fetch('/api/team/invite', { method: 'POST' })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error === 'Staff limit reached'
        ? "You've reached your staff limit. Upgrade to Growth to invite more."
        : 'Failed to generate invite link.')
    } else {
      const data = await res.json()
      setInviteLink(data.inviteUrl)
    }
    setLoading(false)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-1.5">Invite employees</h2>
      <p className="text-xs text-[#a1a1aa] mb-3">Generate a link and share it with your team — anyone with the link can sign up as an employee.</p>

      {!inviteLink ? (
        <button
          onClick={generateLink}
          disabled={loading}
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-50 whitespace-nowrap transition-colors cursor-pointer"
        >
          {loading ? 'Generating…' : 'Generate invite link'}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 border border-[#e4e4e7] rounded-lg px-3 py-2 text-xs text-[#52525b] bg-[#fafafa] truncate"
            />
            <button
              type="button"
              onClick={copyLink}
              className="shrink-0 border border-[#e4e4e7] hover:border-[#09090b] rounded-lg px-3 py-2 text-xs font-medium text-[#09090b] transition-colors cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={() => { setInviteLink(''); setCopied(false) }}
            className="text-xs text-[#52525b] hover:text-[#09090b] transition-colors cursor-pointer"
          >
            Generate new link
          </button>
        </div>
      )}
      {error && <p className="text-[#dc2626] text-xs mt-2">{error}</p>}
    </div>
  )
}
