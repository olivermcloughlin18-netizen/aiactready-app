type Done = { tool: boolean; wizard: boolean; doc: boolean; training: boolean }

export function OnboardingChecklist({ done }: { done: Done }) {
  const allDone = Object.values(done).every(Boolean)
  if (allDone) return null

  const steps = [
    { key: 'tool', label: 'Add your first AI tool', href: '/inventory/new' },
    { key: 'wizard', label: 'Run the risk wizard on a tool', href: '/inventory' },
    { key: 'doc', label: 'Generate your first document', href: '/documents/new' },
    { key: 'training', label: 'Invite your team to training', href: '/settings/team' },
  ]

  const completed = Object.values(done).filter(Boolean).length
  const total = steps.length

  return (
    <div className="border border-[#e4e4e7] rounded-xl p-6 max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-[#09090b]">Get started</h2>
        <span className="text-xs text-[#52525b]">{completed}/{total} complete</span>
      </div>
      <div className="w-full bg-[#f4f4f5] rounded-full h-1 mb-5">
        <div
          className="bg-[#09090b] h-1 rounded-full transition-all duration-500"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
      <ul className="space-y-2.5">
        {steps.map(({ key, label, href }) => {
          const isDone = done[key as keyof Done]
          return (
            <li key={key} className="flex items-center gap-3 text-sm">
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isDone
                  ? 'bg-[#059669] border-[#059669]'
                  : 'border-[#d4d4d8]'
              }`}>
                {isDone && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              {isDone
                ? <span className="text-[#a1a1aa] line-through">{label}</span>
                : <a href={href} className="text-[#09090b] hover:underline underline-offset-2 font-medium">{label}</a>
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}
