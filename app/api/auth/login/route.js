import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Find agency by email
    const { data: agency, error: findError } = await supabase
      .from('agencies')
      .select('id, owner_email, dashboard_password_hash, name, slug, status')
      .eq('owner_email', email.toLowerCase())
      .single()
    
    if (findError || !agency) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, agency.dashboard_password_hash)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Check if account is active
    if (agency.status === 'canceled') {
      return NextResponse.json(
        { error: 'Your subscription has been canceled. Please reactivate to continue.' },
        { status: 403 }
      )
    }
    
    // Create session token (simple base64 encoded JSON - consider using JWT in production)
    const sessionData = {
      agencyId: agency.id,
      email: agency.owner_email,
      name: agency.name,
      slug: agency.slug,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    }
    
    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64')
    
    // Set cookie
    cookies().set('tapstack_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
    
    // Update last login
    await supabase
      .from('agencies')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', agency.id)
    
    return NextResponse.json({ 
      success: true,
      agency: {
        id: agency.id,
        name: agency.name,
        slug: agency.slug,
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
