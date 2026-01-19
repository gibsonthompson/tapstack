import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const logo = formData.get('logo')
    const agencyId = formData.get('agencyId')
    
    if (!logo || !agencyId) {
      return NextResponse.json(
        { error: 'Missing logo or agencyId' },
        { status: 400 }
      )
    }
    
    // Convert to buffer
    const bytes = await logo.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate filename
    const ext = logo.name.split('.').pop()
    const filename = `${agencyId}/logo.${ext}`
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('agency-logos')
      .upload(filename, buffer, {
        contentType: logo.type,
        upsert: true,
      })
    
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload logo' },
        { status: 500 }
      )
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('agency-logos')
      .getPublicUrl(filename)
    
    // Update agency record with logo URL
    const { error: updateError } = await supabase
      .from('agencies')
      .update({ logo_url: urlData.publicUrl })
      .eq('id', agencyId)
    
    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update agency logo' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      logoUrl: urlData.publicUrl 
    })
    
  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
