const STYLES: Record<string, string> = {
  prohibited: 'bg-red-50 text-[#dc2626] border-red-200',
  high: 'bg-orange-50 text-[#d97706] border-orange-200',
  limited: 'bg-yellow-50 text-[#b45309] border-yellow-200',
  minimal: 'bg-emerald-50 text-[#059669] border-emerald-200',
}

export function RiskBadge({ riskClass }: { riskClass: string | null }) {
  if (!riskClass) {
    return (
      <span className="text-xs text-[#a1a1aa] border border-[#e4e4e7] rounded-md px-2 py-0.5">
        Not assessed
      </span>
    )
  }
  return (
    <span className={`text-xs border rounded-md px-2 py-0.5 font-medium capitalize ${STYLES[riskClass] ?? ''}`}>
      {riskClass}
    </span>
  )
}
