import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { OnboardingChecklist } from '@/components/layout/OnboardingChecklist'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')

  const orgId = (session.user as any).orgId
  const [toolCount, docCount, assignmentCount, wizardCount] = await Promise.all([
    db.aITool.count({ where: { orgId } }),
    db.document.count({ where: { orgId, status: 'final' } }),
    db.trainingAssignment.count({
      where: { user: { orgId }, completedAt: { not: null } },
    }),
    db.aITool.count({ where: { orgId, wizardCompleted: true } }),
  ])

  const checklistDone = {
    tool: toolCount > 0,
    wizard: wizardCount > 0,
    doc: docCount > 0,
    training: assignmentCount > 0,
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">Dashboard</h1>
        <p className="text-sm text-[#52525b] mt-1">Your AI compliance overview</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="AI tools" value={toolCount} icon="inventory" />
        <StatCard label="Final documents" value={docCount} icon="docs" />
        <StatCard label="Training completions" value={assignmentCount} icon="training" />
      </div>

      <OnboardingChecklist done={checklistDone} />
    </AppShell>
  )
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    inventory: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
    docs: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    training: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
  }
  return (
    <div className="border border-[#e4e4e7] rounded-xl p-5 hover:border-[#d4d4d8] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#52525b] font-medium uppercase tracking-wide">{label}</p>
        <span className="text-[#a1a1aa]">{icons[icon]}</span>
      </div>
      <p className="text-3xl font-semibold text-[#09090b] tabular-nums">{value}</p>
    </div>
  )
}
