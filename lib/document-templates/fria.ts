type FRIAInput = {
  orgName: string
  tool: {
    name: string; vendor: string | null; purpose: string | null
    department: string | null; usersAffected: string | null; dataProcessed: string | null
  }
  wizardAnswers: Record<string, string>
}

export type DocumentSection = { id: string; heading: string; content: string }
export type GeneratedDocument = { title: string; sections: DocumentSection[] }

export function generateFRIA(input: FRIAInput): GeneratedDocument {
  const { orgName, tool, wizardAnswers } = input
  const humanReview = wizardAnswers.q4_human_review

  return {
    title: `Fundamental Rights Impact Assessment — ${tool.name}`,
    sections: [
      {
        id: 'overview',
        heading: '1. System Overview',
        content: `This Fundamental Rights Impact Assessment (FRIA) has been prepared by ${orgName} in accordance with Article 27 of Regulation (EU) 2024/1689 (the EU AI Act).\n\nSystem name: ${tool.name}\nVendor: ${tool.vendor ?? 'Internal'}\nPurpose: ${tool.purpose ?? 'Not specified'}\nDepartment: ${tool.department ?? 'Not specified'}\nDate prepared: ${new Date().toLocaleDateString('en-GB')}`,
      },
      {
        id: 'affected_persons',
        heading: '2. Affected Persons and Groups',
        content: `This system affects: ${tool.usersAffected === 'both' ? 'employees and customers' : tool.usersAffected ?? 'individuals'}.\n\nData processed: ${tool.dataProcessed ?? 'Not specified.'}`,
      },
      {
        id: 'rights_analysis',
        heading: '3. Fundamental Rights Analysis',
        content: `Domain: ${wizardAnswers.q2_domain ?? 'Not specified'}.\n\nThis system has been assessed as operating in a domain where fundamental rights may be affected, including the right to non-discrimination, human dignity, and data protection under GDPR.`,
      },
      {
        id: 'human_oversight',
        heading: '4. Human Oversight',
        content: humanReview === 'never'
          ? 'No human review takes place before decisions take effect. This represents a significant risk. Immediate action required: implement human review before each automated decision is applied.'
          : humanReview === 'sometimes'
          ? 'Human review occurs in some cases. A documented process for when human review is triggered should be established and maintained.'
          : 'Human review occurs before all decisions take effect. This satisfies Article 14 human oversight requirements.',
      },
      {
        id: 'mitigation',
        heading: '5. Risk Mitigation Measures',
        content: '[ Organisation to complete: describe specific technical and organisational measures implemented to mitigate identified risks. ]\n\nNote: This document requires review and sign-off by a qualified legal or compliance professional before use in regulatory submissions.',
      },
      {
        id: 'sign_off',
        heading: '6. Sign-off',
        content: `Prepared by: ${orgName}\nDate: ${new Date().toLocaleDateString('en-GB')}\nReviewed by: ___________________\nTitle: ___________________\nSignature: ___________________`,
      },
    ],
  }
}
