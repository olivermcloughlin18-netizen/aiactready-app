'use client'
import { useState, use } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { WizardQuestion } from '@/components/wizard/WizardQuestion'
import { WizardResult } from '@/components/wizard/WizardResult'

const QUESTIONS = [
  { key: 'q1_decisions', text: 'Does this system make or assist in decisions about individuals?',
    options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
  { key: 'q2_domain', text: 'What domain does it operate in?',
    options: [
      { value: 'employment', label: 'Employment / HR' },
      { value: 'education', label: 'Education' },
      { value: 'credit', label: 'Credit / Finance' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'law enforcement', label: 'Law enforcement' },
      { value: 'critical infrastructure', label: 'Critical infrastructure' },
      { value: 'other', label: 'Other' },
    ]},
  { key: 'q3_rights', text: 'Does it directly affect legal rights or access to services?',
    options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
  { key: 'q4_human_review', text: 'Is there a human reviewing decisions before they take effect?',
    options: [{ value: 'always', label: 'Always' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'never', label: 'Never' }] },
  { key: 'q5_output', text: 'What type of output does this system produce?',
    options: [
      { value: 'ranking', label: 'Ranking people' },
      { value: 'scoring', label: 'Scoring / grading' },
      { value: 'classification', label: 'Classification' },
      { value: 'recommendation', label: 'Recommendation' },
      { value: 'generation', label: 'Content generation' },
      { value: 'other', label: 'Other' },
    ]},
  { key: 'q6_sensitive_data', text: 'Does it process sensitive personal data?',
    options: [{ value: 'biometric', label: 'Biometric data' }, { value: 'health', label: 'Health data' }, { value: 'neither', label: 'Neither' }] },
  { key: 'q7_geography', text: 'Where are the people it affects?',
    options: [{ value: 'EU', label: 'EU' }, { value: 'US', label: 'US' }, { value: 'both', label: 'Both' }, { value: 'neither', label: 'Neither' }] },
  { key: 'q8_product_type', text: 'Is this a product you sell to customers, or an internal tool?',
    options: [{ value: 'product', label: 'Product sold to customers' }, { value: 'internal', label: 'Internal use only' }] },
]

export default function WizardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ riskClass: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAnswer(key: string, value: string) {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1)
      return
    }
    setLoading(true)
    const res = await fetch(`/api/tools/${id}/wizard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  if (loading) return <AppShell><p className="text-sm text-[#52525b]">Classifying…</p></AppShell>
  if (result) return <AppShell><WizardResult riskClass={result.riskClass} toolId={id} /></AppShell>

  return (
    <AppShell>
      <WizardQuestion
        question={QUESTIONS[step]}
        stepNumber={step + 1}
        totalSteps={QUESTIONS.length}
        onAnswer={handleAnswer}
      />
    </AppShell>
  )
}
