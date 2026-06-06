import { describe, it, expect } from 'vitest'
import { generateFRIA } from '@/lib/document-templates/fria'

describe('generateFRIA', () => {
  it('includes tool name and org name in output', () => {
    const result = generateFRIA({
      orgName: 'Acme Corp',
      tool: { name: 'HireVue', vendor: 'HireVue Inc', purpose: 'Video interview screening', department: 'HR', usersAffected: 'customers', dataProcessed: 'Video, audio' },
      wizardAnswers: { q2_domain: 'employment', q4_human_review: 'sometimes' },
    })
    expect(result.title).toContain('HireVue')
    expect(result.sections[0].content).toContain('Acme Corp')
  })

  it('flags no human review as a risk', () => {
    const result = generateFRIA({
      orgName: 'Acme Corp',
      tool: { name: 'HireVue', vendor: 'HireVue Inc', purpose: 'Screening', department: 'HR', usersAffected: 'customers', dataProcessed: 'Video' },
      wizardAnswers: { q2_domain: 'employment', q4_human_review: 'never' },
    })
    const findings = result.sections.find(s => s.id === 'human_oversight')
    expect(findings?.content).toContain('No human review')
  })
})
