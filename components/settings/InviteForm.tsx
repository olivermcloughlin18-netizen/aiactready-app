'use client'
import { useState } from 'react'

export function InviteForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    const res = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error === 'Staff limit reached'
        ? "You've reached your staff limit. Upgrade to Growth to invite more."
        : 'Failed to send invite.')
    } else {
      setMessage(`Invite sent to ${email}`)
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-3">Invite staff</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="colleague@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="flex-1 border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-50 whitespace-nowrap transition-colors cursor-pointer"
        >
          {loading ? 'Sending…' : 'Send invite'}
        </button>
      </form>
      {message && <p className="text-[#059669] text-xs mt-2">{message}</p>}
      {error && <p className="text-[#dc2626] text-xs mt-2">{error}</p>}
    </div>
  )
}
