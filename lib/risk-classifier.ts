export type WizardAnswers = {
  q1_decisions: string
  q2_domain: string
  q3_rights: string
  q4_human_review: string
  q5_output: string
  q6_sensitive_data: string
  q7_geography: string
  q8_product_type: string
}

const ANNEX_III_DOMAINS = ['employment', 'education', 'credit', 'healthcare', 'law enforcement', 'critical infrastructure']

export function classifyRisk(a: WizardAnswers): 'prohibited' | 'high' | 'limited' | 'minimal' {
  if (a.q6_sensitive_data === 'biometric' && a.q2_domain === 'law enforcement') {
    return 'prohibited'
  }
  if (
    a.q1_decisions === 'yes' &&
    ANNEX_III_DOMAINS.includes(a.q2_domain) &&
    a.q3_rights === 'yes' &&
    (a.q7_geography === 'EU' || a.q7_geography === 'both')
  ) {
    return 'high'
  }
  if (
    a.q8_product_type === 'product' &&
    (a.q5_output === 'generation' || a.q1_decisions === 'no')
  ) {
    return 'limited'
  }
  return 'minimal'
}

export function getObligations(riskClass: string, frameworks: string[]): Record<string, string[]> {
  const all: Record<string, Record<string, string[]>> = {
    'EU AI Act': {
      prohibited: ['Immediately cease use — prohibited practice under Article 5'],
      high: [
        'Register in EU AI Act database before deployment',
        'Conduct Fundamental Rights Impact Assessment (FRIA)',
        'Implement human oversight measures',
        'Maintain technical documentation (Annex IV)',
        'Implement risk management system (Article 9)',
        'Ensure data governance (Article 10)',
        'Maintain logs of operation (Article 12)',
        'Ensure transparency to users (Article 13)',
      ],
      limited: [
        'Disclose to users that they are interacting with an AI system',
        'Label AI-generated content',
      ],
      minimal: ['No specific obligations — maintain general AI literacy (Article 4)'],
    },
    'Texas TRAIGA': {
      high: [
        'Conduct impact assessment before deployment',
        'Notify affected individuals of AI-driven decisions',
        'Provide opt-out mechanism for consequential decisions',
      ],
      limited: [],
      minimal: [],
      prohibited: [],
    },
    'NYC LL 144': {
      high: [
        'Annual bias audit by independent auditor',
        'Publish summary of bias audit results',
        'Notify candidates of automated employment decision tool use',
      ],
      limited: [],
      minimal: [],
      prohibited: [],
    },
    'Colorado SB 26-189': {
      high: [
        'Conduct impact assessment',
        'Disclose AI use in consequential decisions',
        'Allow consumers to appeal AI-driven decisions',
      ],
      limited: [],
      minimal: [],
      prohibited: [],
    },
    'ISO 42001': {
      high: [
        'Establish AI management system policy',
        'Define AI roles and responsibilities',
        'Conduct AI risk assessment',
        'Implement AI impact assessment process',
      ],
      limited: ['Document AI system purpose and limitations'],
      minimal: ['Document AI system in organisational AI inventory'],
      prohibited: [],
    },
  }

  const result: Record<string, string[]> = {}
  for (const fw of frameworks) {
    result[fw] = all[fw]?.[riskClass] ?? []
  }
  return result
}
