import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import { DocumentEditor } from '@/components/documents/DocumentEditor'
import Link from 'next/link'

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId
  const { id } = await params
  const doc = await db.document.findFirst({ where: { id, orgId } })
  if (!doc) notFound()

  const content = doc.content as { sections: { id: string; heading: string; content: string }[] }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/documents" className="text-xs text-[#52525b] hover:text-[#09090b] transition-colors mb-1 block">
            ← Documents
          </Link>
          <h1 className="text-xl font-semibold text-[#09090b]">{doc.title}</h1>
        </div>
        <a
          href={`/api/documents/${id}/pdf`}
          className="border border-[#e4e4e7] rounded-lg px-4 py-2 text-sm text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] transition-all cursor-pointer"
        >
          Download PDF
        </a>
      </div>
      <DocumentEditor docId={id} initialSections={content.sections} status={doc.status} />
    </AppShell>
  )
}
