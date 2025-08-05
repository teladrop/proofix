import { Session } from '@shopify/shopify-api'
import { supabase } from './supabase'

export class SupabaseSessionStorage {
  async storeSession(session: Session): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('shopify_sessions')
        .upsert({
          id: session.id,
          shop: session.shop,
          state: session.state,
          isOnline: session.isOnline,
          scope: session.scope,
          expires: session.expires?.toISOString(),
          accessToken: session.accessToken,
          onlineAccessInfo: session.onlineAccessInfo,
        })

      if (error) {
        console.error('Error storing session:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error storing session:', error)
      return false
    }
  }

  async loadSession(id: string): Promise<Session | undefined> {
    try {
      const { data, error } = await supabase
        .from('shopify_sessions')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        return undefined
      }

      return new Session({
        id: data.id,
        shop: data.shop,
        state: data.state,
        isOnline: data.isOnline,
        scope: data.scope,
        expires: data.expires ? new Date(data.expires) : undefined,
        accessToken: data.accessToken,
        onlineAccessInfo: data.onlineAccessInfo,
      })
    } catch (error) {
      console.error('Error loading session:', error)
      return undefined
    }
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('shopify_sessions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting session:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting session:', error)
      return false
    }
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('shopify_sessions')
        .delete()
        .in('id', ids)

      if (error) {
        console.error('Error deleting sessions:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting sessions:', error)
      return false
    }
  }

  async findSessionsByShop(shop: string): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from('shopify_sessions')
        .select('*')
        .eq('shop', shop)

      if (error || !data) {
        return []
      }

      return data.map(sessionData => new Session({
        id: sessionData.id,
        shop: sessionData.shop,
        state: sessionData.state,
        isOnline: sessionData.isOnline,
        scope: sessionData.scope,
        expires: sessionData.expires ? new Date(sessionData.expires) : undefined,
        accessToken: sessionData.accessToken,
        onlineAccessInfo: sessionData.onlineAccessInfo,
      }))
    } catch (error) {
      console.error('Error finding sessions by shop:', error)
      return []
    }
  }
} 