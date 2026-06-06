type Option = { value: string; label: string }
type Question = { key: string; text: string; options: Option[] }

export function WizardQuestion({
  question, stepNumber, totalSteps, onAnswer,
}: {
  question: Question
  stepNumber: number
  totalSteps: number
  onAnswer: (key: string, value: string) => void
}) {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 bg-[#f4f4f5] rounded-full h-1">
          <div
            className="bg-[#09090b] h-1 rounded-full transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#a1a1aa] whitespace-nowrap tabular-nums">{stepNumber}/{totalSteps}</span>
      </div>

      <h2 className="text-xl font-semibold text-[#09090b] mb-6 leading-snug">{question.text}</h2>

      <div className="space-y-2">
        {question.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onAnswer(question.key, opt.value)}
            className="w-full text-left border border-[#e4e4e7] rounded-xl px-4 py-3.5 text-sm text-[#52525b] hover:border-[#09090b] hover:text-[#09090b] hover:bg-[#fafafa] transition-all duration-150 cursor-pointer"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
