import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const doc = await db.document.findFirst({ where: { id, orgId } })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(doc)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const doc = await db.document.findFirst({ where: { id, orgId } })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  const updated = await db.document.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params
  const doc = await db.document.findFirst({ where: { id, orgId } })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await db.document.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
