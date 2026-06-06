import { NextResponse } from 'next/server'
import { stripe, planFromPriceId } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
    const sub = event.data.object as Stripe.Subscription
    const priceId = sub.items.data[0].price.id
    const plan = planFromPriceId(priceId)
    await db.organisation.updateMany({
      where: { stripeCustomerId: sub.customer as string },
      data: { plan, stripeSubscriptionId: sub.id },
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await db.organisation.updateMany({
      where: { stripeCustomerId: sub.customer as string },
      data: { plan: 'starter' },
    })
  }

  return NextResponse.json({ received: true })
}
