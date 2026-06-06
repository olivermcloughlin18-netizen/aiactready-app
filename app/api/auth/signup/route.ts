import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const { email, password, orgName } = await req.json()
  if (!email || !password || !orgName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const exists = await db.user.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
  }
  const org = await db.organisation.create({ data: { name: orgName } })
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await db.user.create({
    data: { email, hashedPassword, orgId: org.id, role: 'admin' },
  })
  return NextResponse.json({ userId: user.id }, { status: 201 })
}
