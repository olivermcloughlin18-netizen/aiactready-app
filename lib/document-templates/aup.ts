import type { GeneratedDocument } from './fria'

export function generateAUP(input: { orgName: string; tools: { name: string }[] }): GeneratedDocument {
  const { orgName, tools } = input
  return {
    title: `Acceptable Use Policy — AI Systems — ${orgName}`,
    sections: [
      {
        id: 'purpose',
        heading: '1. Purpose',
        content: `This Acceptable Use Policy (AUP) governs the use of artificial intelligence systems at ${orgName}. It applies to all employees, contractors, and third parties who use AI systems on behalf of ${orgName}.`,
      },
      {
        id: 'scope',
        heading: '2. Scope',
        content: `This policy applies to all AI systems used by ${orgName}, including but not limited to:\n${tools.map(t => `• ${t.name}`).join('\n') || '• [AI systems to be listed]'}`,
      },
      {
        id: 'permitted',
        heading: '3. Permitted Uses',
        content: 'AI systems may only be used for purposes that have been approved by the compliance team and documented in the AI Inventory Register. Users must only input data they are authorised to process.',
      },
      {
        id: 'prohibited',
        heading: '4. Prohibited Uses',
        content: 'The following are prohibited:\n• Using AI systems to process personal data without a lawful basis\n• Using AI systems for purposes not approved in the AI Inventory Register\n• Sharing AI-generated outputs without appropriate human review\n• Using AI systems to make final decisions about individuals without human oversight',
      },
      {
        id: 'reporting',
        heading: '5. Reporting',
        content: 'Any concern about AI system behaviour, unexpected outputs, or potential policy violations must be reported to the compliance team immediately.',
      },
      {
        id: 'sign_off',
        heading: '6. Sign-off',
        content: `Approved by: ${orgName}\nDate: ${new Date().toLocaleDateString('en-GB')}\nNext review: ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-GB')}`,
      },
    ],
  }
}
