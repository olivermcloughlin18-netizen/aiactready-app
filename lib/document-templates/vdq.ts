import type { GeneratedDocument } from './fria'

export function generateVDQ(input: { vendorName: string }): GeneratedDocument {
  const { vendorName } = input
  return {
    title: `Vendor Due-Diligence Questionnaire — ${vendorName}`,
    sections: [
      {
        id: 'intro',
        heading: '1. Introduction',
        content: `This questionnaire is to be completed by ${vendorName} as part of our AI vendor due diligence process in accordance with the EU AI Act and ISO/IEC 42001.`,
      },
      {
        id: 'classification',
        heading: '2. AI System Classification',
        content: '2.1 How does your organisation classify this AI system under the EU AI Act (prohibited / high / limited / minimal risk)?\n\n2.2 Is this system registered in the EU AI Act database (required for high-risk systems)?\n\n2.3 Have you conducted a conformity assessment for this system?',
      },
      {
        id: 'data',
        heading: '3. Data Governance',
        content: '3.1 What personal data does this system process?\n\n3.2 Where is data stored and processed geographically?\n\n3.3 What data retention policies apply?\n\n3.4 How are data breaches detected and reported?',
      },
      {
        id: 'transparency',
        heading: '4. Transparency and Explainability',
        content: '4.1 Can the system explain its outputs to affected individuals?\n\n4.2 Is there an appeals or correction mechanism for AI-driven decisions?\n\n4.3 What information do you provide to deployers about system limitations?',
      },
      {
        id: 'security',
        heading: '5. Security and Robustness',
        content: '5.1 What security certifications does this system hold (SOC 2, ISO 27001, etc.)?\n\n5.2 How frequently is the model retrained or updated?\n\n5.3 How are model updates communicated to customers?',
      },
      {
        id: 'sign_off',
        heading: '6. Vendor Sign-off',
        content: `Completed by: ___________________\nTitle: ___________________\nDate: ___________________\nVendor: ${vendorName}`,
      },
    ],
  }
}
