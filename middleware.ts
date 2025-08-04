import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Handle Shopify app embedding
  const shop = request.headers.get('x-shopify-shop-domain')
  const isEmbedded = request.headers.get('x-shopify-embedded-app') === 'true'

  // If this is a Shopify app request, ensure proper embedding
  if (shop && isEmbedded) {
    // Add necessary headers for Shopify app embedding
    const response = NextResponse.next()
    response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com")
    return response
  }

  // For non-Shopify requests, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 