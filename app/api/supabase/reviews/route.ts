import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')
    const productId = searchParams.get('product_id')

    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter required' }, { status: 400 })
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      return NextResponse.json({ reviews: [] })
    }

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('shop', shop)

    if (productId) {
      query = query.eq('product_id', productId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    return NextResponse.json({ reviews: data || [] })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')
    const body = await request.json()

    if (!shop) {
      return NextResponse.json({ error: 'Shop parameter required' }, { status: 400 })
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      return NextResponse.json({ success: true, review: { id: 'mock-id', ...body } })
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        shop,
        product_id: body.product_id,
        customer_id: body.customer_id,
        rating: body.rating,
        title: body.title,
        content: body.content,
        photos: body.photos || [],
        verified: body.verified || false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }

    return NextResponse.json({ success: true, review: data })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 