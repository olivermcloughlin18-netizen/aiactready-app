import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { RiskBadge } from '@/components/ui/RiskBadge'
import Link from 'next/link'

export default async function InventoryPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId
  const tools = await db.aITool.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } })

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090b]">AI Inventory</h1>
          <p className="text-sm text-[#52525b] mt-1">{tools.length} tool{tools.length !== 1 ? 's' : ''} registered</p>
        </div>
        <Link
          href="/inventory/new"
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
        >
          Add tool
        </Link>
      </div>

      {tools.length === 0 ? (
        <div className="border border-[#e4e4e7] rounded-xl flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center mb-4">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#a1a1aa]">
              <path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
          </div>
          <p className="text-[#09090b] text-sm font-medium mb-1">No AI tools yet</p>
          <p className="text-[#52525b] text-xs mb-5">Register your first AI system to start your compliance assessment.</p>
          <Link href="/inventory/new" className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer">
            Add your first tool
          </Link>
        </div>
      ) : (
        <div className="border border-[#e4e4e7] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#e4e4e7] bg-[#fafafa]">
              <tr>
                {['Tool', 'Vendor', 'Department', 'Risk class', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#52525b] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f4f5]">
              {tools.map(tool => (
                <tr key={tool.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-4 py-3 font-medium text-[#09090b]">{tool.name}</td>
                  <td className="px-4 py-3 text-[#52525b]">{tool.vendor ?? '—'}</td>
                  <td className="px-4 py-3 text-[#52525b]">{tool.department ?? '—'}</td>
                  <td className="px-4 py-3"><RiskBadge riskClass={tool.riskClass} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/inventory/${tool.id}`} className="text-[#52525b] hover:text-[#09090b] text-xs transition-colors">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  )
}
