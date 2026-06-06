import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateFRIA } from '@/lib/document-templates/fria'
import { generateInventoryRegister } from '@/lib/document-templates/inventory-register'
import { generateAUP } from '@/lib/document-templates/aup'
import { generateGovernancePolicy } from '@/lib/document-templates/governance-policy'
import { generateVDQ } from '@/lib/document-templates/vdq'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const orgId = (session.user as any).orgId

  const { type, toolId } = await req.json()
  const org = await db.organisation.findUnique({ where: { id: orgId } })
  if (!org) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let content: { title: string; sections: { id: string; heading: string; content: string }[] }

  if (type === 'FRIA') {
    if (!toolId) return NextResponse.json({ error: 'toolId required for FRIA' }, { status: 400 })
    const tool = await db.aITool.findFirst({ where: { id: toolId, orgId } })
    if (!tool) return NextResponse.json({ error: 'Tool not found' }, { status: 404 })
    const answers = await db.wizardAnswer.findMany({ where: { toolId } })
    const answersMap = Object.fromEntries(answers.map((a: { questionKey: string; answer: string }) => [a.questionKey, a.answer]))
    content = generateFRIA({ orgName: org.name, tool, wizardAnswers: answersMap })
  } else if (type === 'INVENTORY') {
    const tools = await db.aITool.findMany({ where: { orgId } })
    content = generateInventoryRegister({ orgName: org.name, tools })
  } else if (type === 'AUP') {
    const tools = await db.aITool.findMany({ where: { orgId } })
    content = generateAUP({ orgName: org.name, tools })
  } else if (type === 'POLICY') {
    content = generateGovernancePolicy({ orgName: org.name })
  } else if (type === 'VDQ') {
    if (!toolId) return NextResponse.json({ error: 'toolId required for VDQ' }, { status: 400 })
    const tool = await db.aITool.findFirst({ where: { id: toolId, orgId } })
    if (!tool) return NextResponse.json({ error: 'Tool not found' }, { status: 404 })
    content = generateVDQ({ vendorName: tool.vendor ?? tool.name })
  } else {
    return NextResponse.json({ error: 'Unknown document type' }, { status: 400 })
  }

  const doc = await db.document.create({
    data: { orgId, toolId: toolId ?? null, type, title: content.title, content, status: 'draft' },
  })
  return NextResponse.json(doc, { status: 201 })
}
