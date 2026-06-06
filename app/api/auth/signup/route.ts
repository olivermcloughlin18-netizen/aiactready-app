import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const { email, password, name, orgName, orgId, role } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const exists = await db.user.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  if (role === 'staff' && orgId) {
    const org = await db.organisation.findUnique({ where: { id: orgId } })
    if (!org) {
      return NextResponse.json({ error: 'Organisation not found. Check your invite link.' }, { status: 404 })
    }
    const user = await db.user.create({
      data: { email, name, hashedPassword, orgId: org.id, role: 'staff' },
    })
    return NextResponse.json({ userId: user.id }, { status: 201 })
  }

  if (!orgName) {
    return NextResponse.json({ error: 'Company name is required' }, { status: 400 })
  }
  const org = await db.organisation.create({ data: { name: orgName } })
  const user = await db.user.create({
    data: { email, name, hashedPassword, orgId: org.id, role: 'admin' },
  })
  return NextResponse.json({ userId: user.id }, { status: 201 })
}
