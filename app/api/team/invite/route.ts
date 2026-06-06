import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { canAddStaff } from '@/lib/plan-limits'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId

  const org = await db.organisation.findUnique({ where: { id: orgId } })
  const staffCount = await db.user.count({ where: { orgId, role: 'staff' } })

  if (!canAddStaff(org!.plan, staffCount)) {
    return NextResponse.json({ error: 'Staff limit reached' }, { status: 403 })
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'https://aiactready-app.vercel.app'
  const inviteUrl = `${baseUrl}/auth/signup/employee?org=${orgId}`

  return NextResponse.json({ inviteUrl })
}
