import { describe, it, expect } from 'vitest'
import { classifyRisk, type WizardAnswers } from '@/lib/risk-classifier'

const base: WizardAnswers = {
  q1_decisions: 'yes',
  q2_domain: 'employment',
  q3_rights: 'yes',
  q4_human_review: 'never',
  q5_output: 'ranking',
  q6_sensitive_data: 'neither',
  q7_geography: 'EU',
  q8_product_type: 'internal',
}

describe('classifyRisk', () => {
  it('returns high for EU employment decisions without human review', () => {
    expect(classifyRisk(base)).toBe('high')
  })

  it('returns prohibited for biometric surveillance in law enforcement', () => {
    expect(classifyRisk({ ...base, q6_sensitive_data: 'biometric', q2_domain: 'law enforcement' })).toBe('prohibited')
  })

  it('returns minimal for internal non-decision tool with no EU reach', () => {
    expect(classifyRisk({
      ...base,
      q1_decisions: 'no',
      q3_rights: 'no',
      q7_geography: 'neither',
    })).toBe('minimal')
  })

  it('returns limited for customer-facing content generation tool', () => {
    expect(classifyRisk({
      ...base,
      q1_decisions: 'no',
      q3_rights: 'no',
      q5_output: 'generation',
      q8_product_type: 'product',
    })).toBe('limited')
  })
})
