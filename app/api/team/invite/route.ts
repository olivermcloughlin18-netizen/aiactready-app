import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { canAddStaff } from '@/lib/plan-limits'
import { sendInviteEmail } from '@/lib/email/invite'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId

  const org = await db.organisation.findUnique({ where: { id: orgId } })
  const staffCount = await db.user.count({ where: { orgId, role: 'staff' } })

  if (!canAddStaff(org!.plan, staffCount)) {
    return NextResponse.json({ error: 'Staff limit reached' }, { status: 403 })
  }

  const { email }: { email: string } = await req.json()
  const inviteUrl = `${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=/training&email=${encodeURIComponent(email)}`

  await sendInviteEmail({ to: email, orgName: org!.name, inviteUrl })
  return NextResponse.json({ sent: true })
}
