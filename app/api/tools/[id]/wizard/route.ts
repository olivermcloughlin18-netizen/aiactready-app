import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classifyRisk, type WizardAnswers } from '@/lib/risk-classifier'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params

  const tool = await db.aITool.findFirst({ where: { id, orgId } })
  if (!tool) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const answers: WizardAnswers = await req.json()
  const riskClass = classifyRisk(answers)

  await db.$transaction([
    db.wizardAnswer.deleteMany({ where: { toolId: id } }),
    ...Object.entries(answers).map(([questionKey, answer]) =>
      db.wizardAnswer.create({ data: { toolId: id, questionKey, answer } })
    ),
    db.aITool.update({
      where: { id },
      data: { riskClass, wizardCompleted: true },
    }),
  ])

  return NextResponse.json({ riskClass })
}
