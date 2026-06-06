import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { canAddTool } from '@/lib/plan-limits'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const tools = await db.aITool.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(tools)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId

  const org = await db.organisation.findUnique({ where: { id: orgId } })
  const count = await db.aITool.count({ where: { orgId } })
  if (!canAddTool(org!.plan, count)) {
    return NextResponse.json({ error: 'Plan limit reached' }, { status: 403 })
  }

  const body = await req.json()
  const tool = await db.aITool.create({
    data: { ...body, orgId },
  })
  return NextResponse.json(tool, { status: 201 })
}
