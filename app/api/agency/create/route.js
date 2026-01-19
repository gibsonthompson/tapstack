import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { email, password, agencyName, primaryColor, secondaryColor } = await request.json()
    
    // Validate inputs
    if (!email || !password || !agencyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    const { data: existing } = await supabase
      .from('agencies')
      .select('id')
      .eq('owner_email', email.toLowerCase())
      .single()
    
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }
    
    // Generate slug from agency name
    const baseSlug = agencyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    // Check if slug exists and make unique if needed
    let slug = baseSlug
    let counter = 1
    while (true) {
      const { data: slugExists } = await supabase
        .from('agencies')
        .select('id')
        .eq('slug', slug)
        .single()
      
      if (!slugExists) break
      slug = `${baseSlug}-${counter}`
      counter++
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)
    
    // Create agency record
    const { data: agency, error: createError } = await supabase
      .from('agencies')
      .insert({
        name: agencyName,
        slug,
        owner_email: email.toLowerCase(),
        dashboard_password_hash: passwordHash,
        primary_color: primaryColor || '#3B82F6',
        secondary_color: secondaryColor || '#1E40AF',
        status: 'active',
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
        created_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    if (createError) {
      console.error('Create agency error:', createError)
      return NextResponse.json(
        { error: 'Failed to create agency' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      agencyId: agency.id,
      slug: agency.slug,
    })
    
  } catch (error) {
    console.error('Agency creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
