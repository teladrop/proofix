import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!shop || !code || !state) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // For now, redirect to app with success
    // In production, implement full OAuth callback handling
    const redirectUrl = `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Shopify callback error:', error)
    return NextResponse.json({ error: 'Callback failed' }, { status: 500 })
  }
} 