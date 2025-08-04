import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ShopifyAppProvider } from '@/components/shopify-app-provider'

export const metadata: Metadata = {
  title: 'Proofix - Shopify Review Management',
  description: 'Turn customer reviews into your most powerful sales tool with automated collection and beautiful displays.',
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        {/* Shopify App Meta Tags */}
        <meta name="shopify-app-name" content="Proofix" />
        <meta name="shopify-app-version" content="1.0.0" />
        <meta name="shopify-app-type" content="embedded" />
      </head>
      <body>
        <ShopifyAppProvider>
          {children}
        </ShopifyAppProvider>
      </body>
    </html>
  )
}
