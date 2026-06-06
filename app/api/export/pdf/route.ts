import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { renderToBuffer } from '@react-pdf/renderer'
import { AuditPackPDF } from '@/lib/pdf/audit-pack'
import { getFrameworks } from '@/lib/plan-limits'
import React from 'react'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId

  const { selectedFrameworks } = await req.json()

  const [org, tools, documents, assignments] = await Promise.all([
    db.organisation.findUnique({ where: { id: orgId } }),
    db.aITool.findMany({ where: { orgId } }),
    db.document.findMany({ where: { orgId, status: 'final' } }),
    db.trainingAssignment.findMany({
      where: { user: { orgId } },
      include: { user: true, module: true },
    }),
  ])

  if (!org) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const allowedFrameworks = getFrameworks(org.plan)
  const frameworks = (selectedFrameworks as string[]).filter((f: string) => allowedFrameworks.includes(f))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = React.createElement(AuditPackPDF as any, {
    orgName: org.name,
    frameworks,
    generatedAt: new Date(),
    tools,
    documents: documents.map(d => ({
      title: d.title,
      type: d.type,
      content: d.content as { sections: { id: string; heading: string; content: string }[] },
    })),
    assignments: assignments.map(a => ({
      userName: a.user.name ?? a.user.email,
      moduleTitle: a.module.title,
      completedAt: a.completedAt,
      quizScore: a.quizScore,
    })),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(element as any)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${org.name.replace(/[^a-z0-9]/gi, '_')}-AI-Audit-Pack.pdf"`,
    },
  })
}
