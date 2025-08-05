import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useAppSettings(shop: string) {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shop) return

    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/supabase/settings?shop=${shop}`)
        const data = await response.json()

        if (response.ok) {
          setSettings(data.settings)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to fetch settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [shop])

  const updateSettings = async (newSettings: any) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/supabase/settings?shop=${shop}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: newSettings }),
      })

      const data = await response.json()

      if (response.ok) {
        setSettings(data.settings)
        return { success: true }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMsg = 'Failed to update settings'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return { settings, loading, error, updateSettings }
}

export function useReviews(shop: string, productId?: string) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shop) return

    const fetchReviews = async () => {
      try {
        setLoading(true)
        let url = `/api/supabase/reviews?shop=${shop}`
        if (productId) {
          url += `&product_id=${productId}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (response.ok) {
          setReviews(data.reviews)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [shop, productId])

  const createReview = async (reviewData: any) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/supabase/reviews?shop=${shop}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })

      const data = await response.json()

      if (response.ok) {
        setReviews(prev => [data.review, ...prev])
        return { success: true, review: data.review }
      } else {
        setError(data.error)
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMsg = 'Failed to create review'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return { reviews, loading, error, createReview }
}

export function useUGCContent(shop: string) {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shop) return

    const fetchContent = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('ugc_content')
          .select('*')
          .eq('shop', shop)
          .order('created_at', { ascending: false })

        if (error) {
          setError('Failed to fetch UGC content')
        } else {
          setContent(data || [])
        }
      } catch (err) {
        setError('Failed to fetch UGC content')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [shop])

  const createContent = async (contentData: any) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('ugc_content')
        .insert({
          shop,
          ...contentData,
        })
        .select()
        .single()

      if (error) {
        setError('Failed to create UGC content')
        return { success: false, error: error.message }
      } else {
        setContent(prev => [data, ...prev])
        return { success: true, content: data }
      }
    } catch (err) {
      const errorMsg = 'Failed to create UGC content'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return { content, loading, error, createContent }
} 