import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { ToolForm } from '@/components/inventory/ToolForm'
import Link from 'next/link'

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId
  const { id } = await params
  const tool = await db.aITool.findFirst({ where: { id, orgId } })
  if (!tool) notFound()

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-semibold text-[#09090b]">{tool.name}</h1>
            <RiskBadge riskClass={tool.riskClass} />
          </div>
          <Link href="/inventory" className="text-xs text-[#52525b] hover:text-[#09090b] transition-colors">
            ← Back to inventory
          </Link>
        </div>
        <Link
          href={`/inventory/${tool.id}/wizard`}
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
        >
          {tool.wizardCompleted ? 'Re-run wizard' : 'Run risk wizard'}
        </Link>
      </div>
      <ToolForm
        toolId={tool.id}
        initial={{
          name: tool.name,
          vendor: tool.vendor ?? '',
          purpose: tool.purpose ?? '',
          department: tool.department ?? '',
          usersAffected: tool.usersAffected ?? 'employees',
          dataProcessed: tool.dataProcessed ?? '',
          isProduct: tool.isProduct,
        }}
      />
    </AppShell>
  )
}
