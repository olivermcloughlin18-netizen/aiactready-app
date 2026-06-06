'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ToolFormData = {
  name: string; vendor: string; purpose: string; department: string;
  usersAffected: string; dataProcessed: string; isProduct: boolean
}

const EMPTY: ToolFormData = {
  name: '', vendor: '', purpose: '', department: '',
  usersAffected: 'employees', dataProcessed: '', isProduct: false,
}

const inputClass = 'w-full border border-[#e4e4e7] rounded-lg px-3 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:shadow-[0_0_0_4px_rgba(9,9,11,0.06)] transition-all'
const labelClass = 'block text-xs font-medium text-[#52525b] mb-1.5'

export function ToolForm({ initial, toolId }: { initial?: Partial<ToolFormData>; toolId?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<ToolFormData>({ ...EMPTY, ...initial })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: keyof ToolFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const url = toolId ? `/api/tools/${toolId}` : '/api/tools'
    const method = toolId ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error === 'Plan limit reached'
        ? "You've reached your tool limit. Upgrade to Growth to add more."
        : 'Something went wrong.')
      setLoading(false)
      return
    }
    const tool = await res.json()
    router.push(`/inventory/${tool.id}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && (
        <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {[
        { key: 'name', label: 'Tool name', placeholder: 'e.g. ChatGPT, HireVue' },
        { key: 'vendor', label: 'Vendor', placeholder: 'e.g. OpenAI' },
        { key: 'department', label: 'Department', placeholder: 'e.g. HR, Marketing' },
      ].map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className={labelClass}>{label}</label>
          <input
            className={inputClass}
            placeholder={placeholder}
            value={form[key as keyof ToolFormData] as string}
            onChange={set(key as keyof ToolFormData)}
            required={key === 'name'}
          />
        </div>
      ))}

      <div>
        <label className={labelClass}>Purpose / use case</label>
        <textarea
          className={inputClass}
          rows={3}
          placeholder="What does this tool do and why does the company use it?"
          value={form.purpose}
          onChange={set('purpose')}
        />
      </div>

      <div>
        <label className={labelClass}>Who does it affect?</label>
        <select
          className={inputClass + ' cursor-pointer bg-white'}
          value={form.usersAffected}
          onChange={set('usersAffected')}
        >
          <option value="employees">Employees only</option>
          <option value="customers">Customers only</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Data processed</label>
        <textarea
          className={inputClass}
          rows={2}
          placeholder="What personal or sensitive data does this tool process?"
          value={form.dataProcessed}
          onChange={set('dataProcessed')}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
          form.isProduct ? 'bg-[#09090b] border-[#09090b]' : 'border-[#d4d4d8] group-hover:border-[#a1a1aa]'
        }`}>
          {form.isProduct && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          id="isProduct"
          checked={form.isProduct}
          onChange={e => setForm(f => ({ ...f, isProduct: e.target.checked }))}
          className="sr-only"
        />
        <span className="text-sm text-[#52525b] group-hover:text-[#09090b] transition-colors">
          This is a product we sell to customers (not internal-only)
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-50 transition-colors cursor-pointer"
      >
        {loading ? 'Saving…' : toolId ? 'Save changes' : 'Add tool'}
      </button>
    </form>
  )
}
