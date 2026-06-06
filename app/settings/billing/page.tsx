import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { getFrameworks } from '@/lib/plan-limits'

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  pro: 'Pro',
}

const PLAN_PRICES: Record<string, string> = {
  starter: '$199/mo',
  growth: '$499/mo',
  pro: '$1,499/mo',
}

const PLAN_LIMITS: Record<string, { tools: number | string; staff: number | string }> = {
  starter: { tools: 5, staff: 5 },
  growth: { tools: 'Unlimited', staff: 25 },
  pro: { tools: 'Unlimited', staff: 100 },
}

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId

  const [org, toolCount, staffCount] = await Promise.all([
    db.organisation.findUnique({ where: { id: orgId } }),
    db.aITool.count({ where: { orgId } }),
    db.user.count({ where: { orgId, role: 'staff' } }),
  ])

  if (!org) redirect('/auth/signin')

  const limits = PLAN_LIMITS[org.plan] ?? PLAN_LIMITS.starter
  const frameworks = getFrameworks(org.plan)

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">Billing</h1>
        <p className="text-sm text-[#52525b] mt-1">Manage your subscription and usage</p>
      </div>

      <div className="max-w-lg space-y-5">
        <div className="border border-[#e4e4e7] rounded-xl p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs text-[#52525b] uppercase tracking-widest mb-1">Current plan</p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-semibold text-[#09090b]">{PLAN_LABELS[org.plan] ?? org.plan}</p>
                <p className="text-sm text-[#52525b]">{PLAN_PRICES[org.plan]}</p>
              </div>
            </div>
            <form action="/api/billing/portal" method="POST">
              <button
                type="submit"
                className="border border-[#e4e4e7] rounded-lg px-4 py-2 text-sm text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] transition-all cursor-pointer"
              >
                Manage billing
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#e4e4e7]">
            <div>
              <p className="text-xs text-[#a1a1aa] mb-1">AI tools</p>
              <p className="text-sm font-medium text-[#09090b] tabular-nums">{toolCount} / {limits.tools}</p>
            </div>
            <div>
              <p className="text-xs text-[#a1a1aa] mb-1">Staff users</p>
              <p className="text-sm font-medium text-[#09090b] tabular-nums">{staffCount} / {limits.staff}</p>
            </div>
            <div>
              <p className="text-xs text-[#a1a1aa] mb-1">Frameworks</p>
              <p className="text-sm font-medium text-[#09090b] tabular-nums">{frameworks.length}</p>
            </div>
          </div>
        </div>

        {org.plan === 'starter' && (
          <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#09090b] mb-1">Upgrade to Growth</p>
                <p className="text-xs text-[#52525b] mb-4">
                  Unlimited tools, all 5 frameworks, 25 staff users.
                </p>
                <a
                  href="https://buy.stripe.com/aFadR2fyGamGanB6725c400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-xs font-medium transition-colors cursor-pointer"
                >
                  Upgrade for $499/mo
                </a>
              </div>
              <span className="text-xs text-[#09090b] border border-[#e4e4e7] rounded-md px-2 py-0.5 shrink-0 font-medium">Growth</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
