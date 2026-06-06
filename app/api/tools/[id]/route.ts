import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getOwnedTool(id: string, orgId: string) {
  return db.aITool.findFirst({ where: { id, orgId } })
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const tool = await getOwnedTool(id, orgId)
  if (!tool) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const answers = await db.wizardAnswer.findMany({ where: { toolId: id } })
  return NextResponse.json({ ...tool, wizardAnswers: answers })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const tool = await getOwnedTool(id, orgId)
  if (!tool) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  const updated = await db.aITool.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const tool = await getOwnedTool(id, orgId)
  if (!tool) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await db.aITool.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
