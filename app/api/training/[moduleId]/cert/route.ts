import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { renderToBuffer } from '@react-pdf/renderer'
import { AttestationPDF } from '@/lib/pdf/attestation'
import React from 'react'

export async function GET(_: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  const { moduleId } = await params

  const assignment = await db.trainingAssignment.findUnique({
    where: { userId_moduleId: { userId, moduleId } },
    include: { user: { include: { org: true } }, module: true },
  })

  if (!assignment?.completedAt) {
    return NextResponse.json({ error: 'Module not completed' }, { status: 400 })
  }

  const buffer = await renderToBuffer(
    React.createElement(AttestationPDF, {
      userName: assignment.user.name ?? assignment.user.email,
      orgName: assignment.user.org.name,
      moduleTitle: assignment.module.title,
      completedAt: assignment.completedAt,
      quizScore: assignment.quizScore ?? 0,
      totalQuestions: (assignment.module.content as any).quiz.length,
    }) as any
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="attestation-${moduleId}.pdf"`,
    },
  })
}
