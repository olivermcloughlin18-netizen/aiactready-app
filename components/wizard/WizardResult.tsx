import Link from 'next/link'
import { RiskBadge } from '@/components/ui/RiskBadge'

const OBLIGATIONS: Record<string, string[]> = {
  prohibited: ['Immediately cease use — this is a prohibited practice under EU AI Act Article 5.'],
  high: [
    'Register in EU AI Act database before deployment',
    'Conduct a Fundamental Rights Impact Assessment (FRIA)',
    'Implement human oversight measures',
    'Maintain technical documentation (Annex IV)',
    'Implement a risk management system (Article 9)',
  ],
  limited: [
    'Disclose to users that they are interacting with an AI system',
    'Label AI-generated content',
  ],
  minimal: ['No specific obligations — maintain general AI literacy (Article 4)'],
}

export function WizardResult({ riskClass, toolId }: { riskClass: string; toolId: string }) {
  const obligations = OBLIGATIONS[riskClass] ?? []
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-[#09090b]">Risk classification complete</h2>
        <RiskBadge riskClass={riskClass} />
      </div>

      <div className="border border-[#e4e4e7] rounded-xl p-5 mb-6">
        <h3 className="text-xs font-medium text-[#52525b] uppercase tracking-widest mb-4">
          Your obligations (EU AI Act)
        </h3>
        <ul className="space-y-3">
          {obligations.map((o, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#52525b]">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-xs text-[#09090b] font-medium tabular-nums">
                {i + 1}
              </span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        {riskClass === 'high' && (
          <Link
            href={`/documents/new?type=FRIA&toolId=${toolId}`}
            className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
          >
            Generate FRIA
          </Link>
        )}
        <Link
          href={`/inventory/${toolId}`}
          className="border border-[#e4e4e7] rounded-lg px-4 py-2 text-sm text-[#52525b] hover:text-[#09090b] hover:border-[#d4d4d8] transition-all cursor-pointer"
        >
          Back to tool
        </Link>
      </div>
    </div>
  )
}
