import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AppShell } from '@/components/layout/AppShell'
import Link from 'next/link'

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-[#f4f4f5] text-[#52525b] border-[#e4e4e7]',
  final: 'bg-emerald-50 text-[#059669] border-emerald-200',
  superseded: 'bg-yellow-50 text-[#b45309] border-yellow-200',
}

export default async function DocumentsPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  const orgId = (session.user as any).orgId
  const docs = await db.document.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } })

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090b]">Documents</h1>
          <p className="text-sm text-[#52525b] mt-1">{docs.length} document{docs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/documents/new"
          className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
        >
          New document
        </Link>
      </div>

      {docs.length === 0 ? (
        <div className="border border-[#e4e4e7] rounded-xl flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center mb-4">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#a1a1aa]">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <p className="text-[#09090b] text-sm font-medium mb-1">No documents yet</p>
          <p className="text-[#52525b] text-xs mb-5">Generate your first compliance document from a template.</p>
          <Link href="/documents/new" className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer">
            Generate document
          </Link>
        </div>
      ) : (
        <div className="border border-[#e4e4e7] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#e4e4e7] bg-[#fafafa]">
              <tr>
                {['Title', 'Type', 'Status', 'Created', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#52525b] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f4f5]">
              {docs.map(doc => (
                <tr key={doc.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-4 py-3 font-medium text-[#09090b]">{doc.title}</td>
                  <td className="px-4 py-3 text-[#52525b]">{doc.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-md border capitalize ${STATUS_STYLES[doc.status] ?? ''}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#a1a1aa] text-xs tabular-nums">{doc.createdAt.toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/documents/${doc.id}`} className="text-[#52525b] hover:text-[#09090b] text-xs transition-colors">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  )
}
