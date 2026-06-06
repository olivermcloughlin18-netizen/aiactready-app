import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { InviteForm } from '@/components/settings/InviteForm'
import Link from 'next/link'

export default async function TeamPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId

  const users = await db.user.findMany({
    where: { orgId },
    include: { assignments: { where: { completedAt: { not: null } } } },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090b]">Team</h1>
          <p className="text-sm text-[#52525b] mt-1">{users.length} member{users.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/settings/billing" className="text-xs text-[#52525b] hover:text-[#09090b] transition-colors underline underline-offset-2">
          Billing
        </Link>
      </div>

      <div className="max-w-lg space-y-8">
        <InviteForm />
        <div>
          <h2 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-3">
            Members ({users.length})
          </h2>
          <div className="border border-[#e4e4e7] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-[#e4e4e7] bg-[#fafafa]">
                <tr>
                  {['Email', 'Role', 'Training done'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#52525b] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4f4f5]">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-3 text-[#09090b]">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-md border capitalize ${
                        u.role === 'admin'
                          ? 'bg-[#f4f4f5] text-[#09090b] border-[#e4e4e7] font-medium'
                          : 'bg-white text-[#52525b] border-[#e4e4e7]'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#52525b] text-xs tabular-nums">{u.assignments.length} modules</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
