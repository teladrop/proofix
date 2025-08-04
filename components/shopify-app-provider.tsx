"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ShopifyAppContextType {
  shop: string | null
  isEmbedded: boolean
  loading: boolean
  redirectToShopify: (path: string) => void
}

const ShopifyAppContext = createContext<ShopifyAppContextType | undefined>(undefined)

interface ShopifyAppProviderProps {
  children: ReactNode
}

export function ShopifyAppProvider({ children }: ShopifyAppProviderProps) {
  const [shop, setShop] = useState<string | null>(null)
  const [isEmbedded, setIsEmbedded] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we're in a Shopify embedded app
    const checkShopifyApp = () => {
      try {
        // Check for Shopify app headers
        const shopHeader = document.querySelector('meta[name="shopify-shop-domain"]')?.getAttribute('content')
        const isEmbeddedApp = window.location.search.includes('embedded=true') || 
                             document.referrer.includes('myshopify.com')

        if (shopHeader) {
          setShop(shopHeader)
          setIsEmbedded(true)
        } else if (isEmbeddedApp) {
          // Extract shop from URL or referrer
          const urlParams = new URLSearchParams(window.location.search)
          const shopParam = urlParams.get('shop')
          if (shopParam) {
            setShop(shopParam)
            setIsEmbedded(true)
          }
        }
      } catch (error) {
        console.error('Error checking Shopify app status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkShopifyApp()
  }, [])

  const redirectToShopify = (path: string) => {
    if (shop && isEmbedded) {
      // Redirect within Shopify admin
      const shopifyUrl = `https://${shop}/admin/apps/${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}${path}`
      window.location.href = shopifyUrl
    } else {
      // Regular navigation
      router.push(path)
    }
  }

  const value: ShopifyAppContextType = {
    shop,
    isEmbedded,
    loading,
    redirectToShopify,
  }

  return (
    <ShopifyAppContext.Provider value={value}>
      {children}
    </ShopifyAppContext.Provider>
  )
}

export function useShopifyApp() {
  const context = useContext(ShopifyAppContext)
  if (context === undefined) {
    throw new Error('useShopifyApp must be used within a ShopifyAppProvider')
  }
  return context
} 