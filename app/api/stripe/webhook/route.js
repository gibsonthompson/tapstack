import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  let event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const agencyId = session.metadata?.agencyId
        
        if (agencyId) {
          await supabase
            .from('agencies')
            .update({
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              status: 'trial',
            })
            .eq('id', agencyId)
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const agencyId = subscription.metadata?.agencyId
        
        if (agencyId) {
          let status = 'active'
          if (subscription.status === 'trialing') status = 'trial'
          if (subscription.status === 'past_due') status = 'past_due'
          if (subscription.status === 'canceled') status = 'canceled'
          
          await supabase
            .from('agencies')
            .update({
              status,
              subscription_status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('id', agencyId)
        }
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const agencyId = subscription.metadata?.agencyId
        
        if (agencyId) {
          await supabase
            .from('agencies')
            .update({
              status: 'canceled',
              subscription_status: 'canceled',
            })
            .eq('id', agencyId)
        }
        break
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription
        
        // Find agency by subscription ID and mark as active
        const { data: agency } = await supabase
          .from('agencies')
          .select('id')
          .eq('stripe_subscription_id', subscriptionId)
          .single()
        
        if (agency) {
          await supabase
            .from('agencies')
            .update({ status: 'active' })
            .eq('id', agency.id)
        }
        break
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription
        
        const { data: agency } = await supabase
          .from('agencies')
          .select('id')
          .eq('stripe_subscription_id', subscriptionId)
          .single()
        
        if (agency) {
          await supabase
            .from('agencies')
            .update({ status: 'past_due' })
            .eq('id', agency.id)
        }
        break
      }
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
