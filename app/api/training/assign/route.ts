import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const adminId = (session.user as any).id
  const { userIds, moduleId }: { userIds: string[]; moduleId: string } = await req.json()

  const assignments = await db.$transaction(
    userIds.map(userId =>
      db.trainingAssignment.upsert({
        where: { userId_moduleId: { userId, moduleId } },
        update: {},
        create: { userId, moduleId, assignedBy: adminId },
      })
    )
  )

  return NextResponse.json(assignments, { status: 201 })
}
