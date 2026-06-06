import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')

export async function sendInviteEmail({ to, orgName, inviteUrl }: { to: string; orgName: string; inviteUrl: string }) {
  await resend.emails.send({
    from: 'AIActReady <onboarding@resend.dev>',
    to,
    subject: `You've been invited to complete AI literacy training at ${orgName}`,
    html: `
      <p>Hi,</p>
      <p>${orgName} has invited you to complete AI literacy training on AIActReady.</p>
      <p>This training satisfies Article 4 of the EU AI Act — your completion will be recorded and included in your organisation's compliance audit pack.</p>
      <p><a href="${inviteUrl}" style="display:inline-block;background:#0f0f0f;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;">Accept invite & start training</a></p>
      <p style="color:#999;font-size:12px;margin-top:24px;">AIActReady — AI compliance made simple. This is not legal advice.</p>
    `,
  })
}
