import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { moduleId } = await params
  const module = await db.trainingModule.findUnique({ where: { id: moduleId } })
  if (!module) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(module)
}
