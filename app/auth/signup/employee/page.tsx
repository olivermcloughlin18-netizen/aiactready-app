'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function EmployeeSignUpForm() {
  const searchParams = useSearchParams()
  const orgId = searchParams.get('org')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!orgId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-sm text-center">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-7 h-7 rounded-lg bg-[#09090b] flex items-center justify-center">
              <span className="text-white text-xs font-extrabold">A</span>
            </div>
            <span className="text-[#09090b] font-semibold text-base tracking-tight">AIActReady</span>
          </div>
          <div className="border border-[#e4e4e7] rounded-2xl p-8">
            <h1 className="text-xl font-semibold text-[#09090b] mb-2">Invalid invite link</h1>
            <p className="text-sm text-[#52525b]">
              This link is missing the organisation ID. Ask your manager for a new invite link.
            </p>
          </div>
        </div>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        orgId,
        role: 'staff',
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/training',
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-7 h-7 rounded-lg bg-[#09090b] flex items-center justify-center">
            <span className="text-white text-xs font-extrabold">A</span>
          </div>
          <span className="text-[#09090b] font-semibold text-base tracking-tight">AIActReady</span>
        </div>

        <div className="border border-[#e4e4e7] rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-[#09090b] mb-1">Join your team</h1>
          <p className="text-sm text-[#52525b] mb-6">
            Create your account to access training and compliance tasks
          </p>

          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs text-[#52525b] mb-1.5 font-medium">Full name</label>
              <input
                className="w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
                placeholder="Jane Smith"
                value={form.name}
                autoComplete="name"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#52525b] mb-1.5 font-medium">Email</label>
              <input
                className="w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                autoComplete="email"
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#52525b] mb-1.5 font-medium">Password</label>
              <input
                className="w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all"
                type="password"
                placeholder="••••••••"
                value={form.password}
                autoComplete="new-password"
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-3 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer mt-1"
            >
              {loading ? 'Creating account…' : 'Join team'}
            </button>
          </form>
        </div>

        <p className="text-sm text-[#52525b] text-center mt-4">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-[#09090b] hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </main>
  )
}

export default function EmployeeSignUpPage() {
  return (
    <Suspense>
      <EmployeeSignUpForm />
    </Suspense>
  )
}
