'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'

type Slide = { id: string; heading: string; body: string }
type QuizQ = { id: string; question: string; options: string[]; correct: string }
type ModuleContent = { slides: Slide[]; quiz: QuizQ[] }

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const router = useRouter()
  const [module, setModule] = useState<{ title: string; content: ModuleContent } | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)
  const [phase, setPhase] = useState<'slides' | 'quiz' | 'result'>('slides')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ passed: boolean; score: number; total: number } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loaded) {
    fetch(`/api/training/modules/${moduleId}`)
      .then(r => r.json())
      .then(data => { setModule(data); setLoaded(true) })
    return <AppShell><p className="text-sm text-[#52525b]">Loading…</p></AppShell>
  }

  if (!module) return <AppShell><p className="text-sm text-[#dc2626]">Module not found.</p></AppShell>

  const { slides, quiz } = module.content

  if (phase === 'slides') {
    const slide = slides[slideIdx]
    return (
      <AppShell>
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 bg-[#f4f4f5] rounded-full h-1">
              <div className="bg-[#09090b] h-1 rounded-full transition-all" style={{ width: `${((slideIdx + 1) / slides.length) * 100}%` }} />
            </div>
            <span className="text-xs text-[#a1a1aa]">{slideIdx + 1}/{slides.length}</span>
          </div>
          <h2 className="text-xl font-semibold text-[#09090b] mb-3">{slide.heading}</h2>
          <p className="text-sm text-[#52525b] leading-relaxed mb-8">{slide.body}</p>
          <div className="flex gap-3">
            {slideIdx > 0 && (
              <button onClick={() => setSlideIdx(i => i - 1)} className="border border-[#e4e4e7] rounded-lg px-4 py-2 text-sm text-[#52525b] hover:border-[#d4d4d8] cursor-pointer transition-colors">
                Back
              </button>
            )}
            {slideIdx < slides.length - 1 ? (
              <button onClick={() => setSlideIdx(i => i + 1)} className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm cursor-pointer transition-colors">
                Next
              </button>
            ) : (
              <button onClick={() => setPhase('quiz')} className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm cursor-pointer transition-colors">
                Start quiz
              </button>
            )}
          </div>
        </div>
      </AppShell>
    )
  }

  if (phase === 'quiz') {
    async function submitQuiz() {
      setSubmitting(true)
      const res = await fetch('/api/training/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, quizAnswers }),
      })
      const data = await res.json()
      setResult(data)
      setPhase('result')
      setSubmitting(false)
    }

    const allAnswered = quiz.every(q => quizAnswers[q.id])

    return (
      <AppShell>
        <div className="max-w-lg">
          <h2 className="text-xl font-semibold text-[#09090b] mb-6">Quiz</h2>
          <div className="space-y-8">
            {quiz.map((q, i) => (
              <div key={q.id}>
                <p className="text-sm font-medium text-[#09090b] mb-3">{i + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map(opt => (
                    <label key={opt} className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer text-sm transition-colors ${
                      quizAnswers[q.id] === opt ? 'border-[#09090b] bg-[#fafafa]' : 'border-[#e4e4e7] hover:bg-[#fafafa]'
                    }`}>
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={quizAnswers[q.id] === opt}
                        onChange={() => setQuizAnswers(a => ({ ...a, [q.id]: opt }))}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={submitQuiz}
            disabled={!allAnswered || submitting}
            className="mt-8 bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 cursor-pointer transition-colors"
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="max-w-lg">
        {result?.passed ? (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#09090b] mb-2">Module complete</h2>
            <p className="text-sm text-[#52525b] mb-6">Score: {result.score}/{result.total}</p>
            <div className="flex gap-3">
              <a href={`/api/training/${moduleId}/cert`} className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm cursor-pointer transition-colors">
                Download certificate
              </a>
              <button onClick={() => router.push('/training')} className="border border-[#e4e4e7] rounded-lg px-4 py-2 text-sm text-[#52525b] hover:border-[#d4d4d8] cursor-pointer transition-colors">
                Back to training
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-[#09090b] mb-2">Not quite</h2>
            <p className="text-sm text-[#52525b] mb-6">Score: {result?.score}/{result?.total}. You need 2/3 to pass. Try again.</p>
            <button
              onClick={() => { setQuizAnswers({}); setPhase('quiz') }}
              className="bg-[#09090b] hover:bg-[#27272a] text-white rounded-lg px-4 py-2 text-sm cursor-pointer transition-colors"
            >
              Retry quiz
            </button>
          </>
        )}
      </div>
    </AppShell>
  )
}
