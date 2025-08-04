// Shopify App Authentication Utilities

export interface ShopifySession {
  shop: string
  accessToken: string
  scope: string
  expires?: Date
}

export interface ShopifyStore {
  id: string
  name: string
  domain: string
  email: string
  plan_name: string
  country: string
  currency: string
}

// In-memory session storage (replace with database in production)
const sessions = new Map<string, ShopifySession>()

export class ShopifyAuth {
  // Store session for a shop
  static setSession(shop: string, session: ShopifySession): void {
    sessions.set(shop, session)
  }

  // Get session for a shop
  static getSession(shop: string): ShopifySession | null {
    return sessions.get(shop) || null
  }

  // Remove session for a shop
  static removeSession(shop: string): void {
    sessions.delete(shop)
  }

  // Check if shop has valid session
  static hasValidSession(shop: string): boolean {
    const session = sessions.get(shop)
    if (!session) return false
    
    // Check if session is expired
    if (session.expires && new Date() > session.expires) {
      sessions.delete(shop)
      return false
    }
    
    return true
  }

  // Get all active sessions
  static getActiveSessions(): ShopifySession[] {
    const activeSessions: ShopifySession[] = []
    
    for (const [shop, session] of sessions.entries()) {
      if (this.hasValidSession(shop)) {
        activeSessions.push(session)
      }
    }
    
    return activeSessions
  }

  // Validate shop domain format
  static isValidShopDomain(domain: string): boolean {
    // Basic validation for myshopify.com domains
    const shopifyDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/
    return shopifyDomainRegex.test(domain)
  }

  // Extract shop from URL
  static extractShopFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url)
      const shop = urlObj.searchParams.get('shop')
      return shop && this.isValidShopDomain(shop) ? shop : null
    } catch {
      return null
    }
  }

  // Generate OAuth URL
  static generateOAuthUrl(shop: string, redirectUri: string): string {
    const apiKey = process.env.SHOPIFY_API_KEY
    const scopes = process.env.SHOPIFY_SCOPES || 'read_products,write_products,read_orders,write_orders'
    
    return `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`
  }

  // Parse OAuth callback
  static parseOAuthCallback(url: string): { shop: string; code: string } | null {
    try {
      const urlObj = new URL(url)
      const shop = urlObj.searchParams.get('shop')
      const code = urlObj.searchParams.get('code')
      
      if (shop && code && this.isValidShopDomain(shop)) {
        return { shop, code }
      }
      
      return null
    } catch {
      return null
    }
  }
}

// Hook for client-side Shopify authentication
export function useShopifyAuth() {
  const getCurrentShop = (): string | null => {
    if (typeof window === 'undefined') return null
    
    // Try to get shop from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const shop = urlParams.get('shop')
    
    if (shop && ShopifyAuth.isValidShopDomain(shop)) {
      return shop
    }
    
    // Try to get shop from localStorage (for embedded apps)
    const storedShop = localStorage.getItem('shopify_shop')
    if (storedShop && ShopifyAuth.isValidShopDomain(storedShop)) {
      return storedShop
    }
    
    return null
  }

  const setCurrentShop = (shop: string): void => {
    if (typeof window === 'undefined') return
    
    if (ShopifyAuth.isValidShopDomain(shop)) {
      localStorage.setItem('shopify_shop', shop)
    }
  }

  const clearCurrentShop = (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('shopify_shop')
  }

  const isAuthenticated = (): boolean => {
    const shop = getCurrentShop()
    return shop ? ShopifyAuth.hasValidSession(shop) : false
  }

  return {
    getCurrentShop,
    setCurrentShop,
    clearCurrentShop,
    isAuthenticated,
  }
} 