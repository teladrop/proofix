import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json({ error: 'No shop provided' }, { status: 400 })
    }

    // For now, redirect to our app dashboard
    // In production, implement full OAuth flow
    const redirectUrl = `https://getproofix.vercel.app/shopify?shop=${shop}&installed=true`
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Shopify auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
} 