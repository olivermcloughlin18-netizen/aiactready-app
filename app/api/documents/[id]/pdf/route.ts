import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { renderToBuffer } from '@react-pdf/renderer'
import { DocumentPDF } from '@/lib/pdf/document-pdf'
import React from 'react'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId
  const { id } = await params

  const doc = await db.document.findFirst({ where: { id, orgId } })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const org = await db.organisation.findUnique({ where: { id: orgId } })
  const content = doc.content as { title: string; sections: { id: string; heading: string; content: string }[] }

  const buffer = await renderToBuffer(
    React.createElement(DocumentPDF, {
      title: content.title,
      sections: content.sections,
      orgName: org!.name,
    })
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${doc.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`,
    },
  })
}
