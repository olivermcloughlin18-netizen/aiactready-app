import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import Link from 'next/link'

export default async function TrainingPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const userId = (session.user as any).id
  const orgId = (session.user as any).orgId
  const role = (session.user as any).role

  if (role === 'admin') {
    const staff = await db.user.findMany({
      where: { orgId, role: 'staff' },
      include: {
        assignments: { include: { module: true } },
      },
    })
    const modules = await db.trainingModule.findMany({ orderBy: { order: 'asc' } })

    return (
      <AppShell>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#09090b]">Training</h1>
          <p className="text-sm text-[#52525b] mt-1">AI literacy modules and team completion</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-3">
            Available modules ({modules.length})
          </h2>
          <div className="grid gap-2">
            {modules.map(m => (
              <div key={m.id} className="border border-[#e4e4e7] rounded-xl p-4 flex items-center justify-between hover:border-[#d4d4d8] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#09090b]">{m.title}</p>
                  <p className="text-xs text-[#52525b] mt-0.5">{m.estimatedMins} min</p>
                </div>
                <span className="text-xs text-[#a1a1aa] border border-[#e4e4e7] rounded-md px-2 py-0.5">Article 4</span>
              </div>
            ))}
          </div>
        </div>

        {staff.length === 0 ? (
          <div className="border border-[#e4e4e7] rounded-xl p-6 text-center">
            <p className="text-sm text-[#52525b]">
              No staff invited yet.{' '}
              <Link href="/settings/team" className="text-[#09090b] underline underline-offset-2 hover:no-underline font-medium">
                Invite your team
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-3">Staff completion</h2>
            <div className="border border-[#e4e4e7] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#e4e4e7] bg-[#fafafa]">
                  <tr>
                    {['Name', 'Email', 'Completed', 'Total assigned', 'Progress'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#52525b] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4f4f5]">
                  {staff.map(u => {
                    const completed = u.assignments.filter(a => a.completedAt).length
                    const total = u.assignments.length
                    const pct = total > 0 ? Math.round((completed / total) * 100) : 0
                    return (
                      <tr key={u.id} className="hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3 text-[#09090b]">{u.name ?? '—'}</td>
                        <td className="px-4 py-3 text-[#52525b]">{u.email}</td>
                        <td className="px-4 py-3 text-[#09090b] tabular-nums">{completed}</td>
                        <td className="px-4 py-3 text-[#52525b] tabular-nums">{total}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#f4f4f5] rounded-full h-1.5 max-w-20">
                              <div className="bg-[#09090b] h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-[#52525b] tabular-nums">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </AppShell>
    )
  }

  // Staff view
  const assignments = await db.trainingAssignment.findMany({
    where: { userId },
    include: { module: true },
    orderBy: { module: { order: 'asc' } },
  })

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">My Training</h1>
        <p className="text-sm text-[#52525b] mt-1">AI literacy modules assigned to you</p>
      </div>

      {assignments.length === 0 ? (
        <div className="border border-[#e4e4e7] rounded-xl p-8 text-center">
          <p className="text-sm text-[#52525b]">No modules assigned yet. Your admin will assign training shortly.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {assignments.map(a => (
            <div key={a.id} className="border border-[#e4e4e7] rounded-xl p-4 flex items-center justify-between hover:border-[#d4d4d8] transition-colors">
              <div>
                <p className="text-sm font-medium text-[#09090b]">{a.module.title}</p>
                <p className="text-xs text-[#52525b] mt-0.5">{a.module.estimatedMins} min</p>
              </div>
              <div className="flex items-center gap-3">
                {a.completedAt ? (
                  <>
                    <span className="text-xs text-[#059669] bg-emerald-50 border border-emerald-200 rounded-md px-2 py-0.5">Completed</span>
                    <a href={`/api/training/${a.moduleId}/cert`} className="text-xs text-[#52525b] hover:text-[#09090b] underline underline-offset-2 transition-colors">
                      Download cert
                    </a>
                  </>
                ) : (
                  <Link
                    href={`/training/${a.moduleId}`}
                    className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Start
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}
