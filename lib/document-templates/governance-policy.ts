import type { GeneratedDocument } from './fria'

export function generateGovernancePolicy(input: { orgName: string }): GeneratedDocument {
  const { orgName } = input
  return {
    title: `AI Governance Policy — ${orgName}`,
    sections: [
      {
        id: 'purpose',
        heading: '1. Purpose and Scope',
        content: `This AI Governance Policy establishes the framework by which ${orgName} manages, oversees, and accounts for its use of artificial intelligence systems. It applies to all AI systems used, developed, or deployed by ${orgName}.`,
      },
      {
        id: 'principles',
        heading: '2. Governing Principles',
        content: '${orgName} commits to the following principles in its use of AI:\n• Lawfulness: AI systems are used in compliance with applicable law\n• Transparency: AI use is disclosed to affected individuals where required\n• Human oversight: consequential AI decisions are subject to human review\n• Accountability: a designated person is responsible for AI compliance\n• Proportionality: AI is not used where simpler, less risky methods suffice',
      },
      {
        id: 'roles',
        heading: '3. Roles and Responsibilities',
        content: 'AI Compliance Lead: responsible for maintaining the AI inventory, conducting risk assessments, and ensuring staff complete AI literacy training.\n\nAll staff: responsible for using AI systems only for approved purposes and reporting concerns.',
      },
      {
        id: 'risk',
        heading: '4. Risk Management',
        content: 'All AI systems must be assessed using the risk classification wizard before deployment. High-risk systems require a Fundamental Rights Impact Assessment and human oversight controls.',
      },
      {
        id: 'training',
        heading: '5. AI Literacy',
        content: 'All staff who use AI systems must complete AI literacy training as required by Article 4 of the EU AI Act. Completion records are maintained and available for regulatory inspection.',
      },
      {
        id: 'sign_off',
        heading: '6. Sign-off',
        content: `Approved by: ${orgName}\nDate: ${new Date().toLocaleDateString('en-GB')}\nNext review: ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-GB')}`,
      },
    ],
  }
}
