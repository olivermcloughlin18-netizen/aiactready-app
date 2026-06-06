'use client'

import { useState, FormEvent } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvznovoj'

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    if (!email || !email.includes('@')) {
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong — please try again')
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white text-[#09090b] rounded-2xl p-14 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] text-center">
        <div className="w-[52px] h-[52px] bg-[rgba(5,150,105,0.1)] rounded-full inline-flex items-center justify-center mb-5 text-[#059669]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-2.5">You're on the list.</h3>
        <p className="text-[#52525b] text-[15px] leading-[1.6]">
          We'll reply within 48 hours to confirm your founding seat and walk through your specific compliance gaps.<br />Check spam if you don't hear from us.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white text-[#09090b] rounded-2xl p-8 max-sm:p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
      <div className="mb-[18px]">
        <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b] mb-[7px]">Work email</label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full px-3.5 py-3 border border-[#e4e4e7] rounded-lg text-[14.5px] text-[#09090b] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all" />
      </div>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-[18px]">
        <div>
          <label htmlFor="company" className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b] mb-[7px]">Company</label>
          <input id="company" name="company" type="text" placeholder="Acme HR" className="w-full px-3.5 py-3 border border-[#e4e4e7] rounded-lg text-[14.5px] text-[#09090b] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all" />
        </div>
        <div>
          <label htmlFor="role" className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b] mb-[7px]">Your role</label>
          <input id="role" name="role" type="text" placeholder="Head of Compliance" className="w-full px-3.5 py-3 border border-[#e4e4e7] rounded-lg text-[14.5px] text-[#09090b] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all" />
        </div>
      </div>

      <div className="mb-[18px]">
        <label htmlFor="size" className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b] mb-[7px]">Company size</label>
        <select id="size" name="size" className="w-full px-3.5 py-3 border border-[#e4e4e7] rounded-lg text-[14.5px] text-[#09090b] bg-white focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all">
          <option>1–10</option>
          <option>11–50</option>
          <option>51–250</option>
          <option>251–500</option>
          <option>500+</option>
        </select>
      </div>

      <div className="mb-[18px]">
        <label htmlFor="frameworks" className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525b] mb-[7px]">Which frameworks worry you most?</label>
        <textarea id="frameworks" name="frameworks" placeholder="e.g. EU AI Act + ISO 42001 — our biggest enterprise customer is asking for both by Q4." className="w-full px-3.5 py-3 border border-[#e4e4e7] rounded-lg text-[14.5px] text-[#09090b] min-h-[80px] resize-y focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-2 py-3.5 rounded-lg text-[14.5px] font-semibold bg-[#09090b] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-8px_rgba(9,9,11,0.25)] hover:-translate-y-px hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_14px_32px_-10px_rgba(9,9,11,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : 'Reserve my founding seat →'}
      </button>

      {error && <p className="text-center text-sm text-[#dc2626] mt-3">{error}</p>}
      <p className="text-center text-xs text-[#a1a1aa] mt-3.5">We'll reply within 48 hours · No spam · Unsubscribe one-click.</p>
    </form>
  )
}
