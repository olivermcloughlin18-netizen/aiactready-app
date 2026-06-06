'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function SignInPage() {
  const [mode, setMode] = useState<'pick' | 'form'>('pick')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/dashboard',
      redirect: false,
    })
    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    }
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

        {mode === 'pick' ? (
          <>
            <div className="border border-[#e4e4e7] rounded-2xl p-8">
              <h1 className="text-xl font-semibold text-[#09090b] mb-1">Welcome</h1>
              <p className="text-sm text-[#52525b] mb-6">How would you like to sign in?</p>

              <div className="space-y-3">
                <button
                  onClick={() => setMode('form')}
                  className="w-full border border-[#e4e4e7] rounded-xl p-4 text-left hover:border-[#09090b] transition-all group cursor-pointer"
                >
                  <p className="font-semibold text-[#09090b] text-sm group-hover:text-[#09090b]">Manager</p>
                  <p className="text-xs text-[#52525b] mt-0.5">Sign in to manage your team and compliance workspace</p>
                </button>

                <button
                  onClick={() => setMode('form')}
                  className="w-full border border-[#e4e4e7] rounded-xl p-4 text-left hover:border-[#09090b] transition-all group cursor-pointer"
                >
                  <p className="font-semibold text-[#09090b] text-sm group-hover:text-[#09090b]">Employee</p>
                  <p className="text-xs text-[#52525b] mt-0.5">Sign in to access your training and compliance tasks</p>
                </button>
              </div>
            </div>

            <p className="text-sm text-[#52525b] text-center mt-4">
              No account?{' '}
              <Link href="/auth/signup" className="text-[#09090b] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="border border-[#e4e4e7] rounded-2xl p-8">
              <button
                onClick={() => setMode('pick')}
                className="text-xs text-[#52525b] hover:text-[#09090b] transition-colors mb-4 cursor-pointer"
              >
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-[#09090b] mb-1">Sign in</h1>
              <p className="text-sm text-[#52525b] mb-6">Enter your credentials</p>

              {error && (
                <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
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
                    autoComplete="current-password"
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-3 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer mt-1"
                >
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
            </div>

            <p className="text-sm text-[#52525b] text-center mt-4">
              No account?{' '}
              <Link href="/auth/signup" className="text-[#09090b] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  )
}
