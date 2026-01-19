import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    const agencyId = session.metadata?.agencyId

    if (!agencyId) {
      return NextResponse.json(
        { error: 'Agency not found in session' },
        { status: 400 }
      )
    }

    // Get agency details from database
    const { data: agency, error } = await supabase
      .from('agencies')
      .select('id, slug, name, marketing_domain')
      .eq('id', agencyId)
      .single()

    if (error || !agency) {
      return NextResponse.json(
        { error: 'Agency not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      agencyId: agency.id,
      slug: agency.slug,
      name: agency.name,
      marketingDomain: agency.marketing_domain,
    })

  } catch (error) {
    console.error('Get session error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}