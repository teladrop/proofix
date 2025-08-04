import { useState, useEffect } from 'react'
import { useShopifyApp } from '@/components/shopify-app-provider'

interface ShopifyDataOptions {
  endpoint: string
  params?: Record<string, string>
}

export function useShopifyData<T>({ endpoint, params = {} }: ShopifyDataOptions) {
  const { shop, isEmbedded } = useShopifyApp()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!shop) {
      setError('No shop available')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In a real app, you'd get the session from your auth system
      const sessionId = localStorage.getItem('shopify_session_id')
      
      const url = new URL(`/api/shopify/${endpoint}`, window.location.origin)
      url.searchParams.set('shop', shop)
      if (sessionId) {
        url.searchParams.set('session', sessionId)
      }
      
      // Add additional params
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })

      const response = await fetch(url.toString())
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching Shopify data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shop && isEmbedded) {
      fetchData()
    }
  }, [shop, isEmbedded, endpoint])

  const refetch = () => {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

// Specific hooks for common data types
export function useShopifyProducts() {
  return useShopifyData<{ products: any[]; total: number }>({
    endpoint: 'products',
  })
}

export function useShopifyOrders(options?: { limit?: string; status?: string }) {
  return useShopifyData<{ orders: any[]; total: number }>({
    endpoint: 'orders',
    params: options || {},
  })
} 