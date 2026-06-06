import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { ToolForm } from '@/components/inventory/ToolForm'

export default async function NewToolPage() {
  const session = await auth()
  if (!session?.user) redirect('/auth/signin')
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#09090b]">Add AI tool</h1>
        <p className="text-sm text-[#52525b] mt-1">Register a new AI system in your inventory</p>
      </div>
      <ToolForm />
    </AppShell>
  )
}
