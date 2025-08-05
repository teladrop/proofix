import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ShopifySession {
  id: string
  shop: string
  access_token: string
  scope: string
  expires: string
  created_at: string
  updated_at: string
}

export interface AppSettings {
  id: string
  shop: string
  settings: any
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  shop: string
  product_id: string
  customer_id: string
  rating: number
  title: string
  content: string
  photos: string[]
  verified: boolean
  created_at: string
}

export interface UGCContent {
  id: string
  shop: string
  product_id: string
  customer_id: string
  content_type: 'photo' | 'video'
  url: string
  approved: boolean
  created_at: string
} 