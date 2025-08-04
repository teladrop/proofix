"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useShopifyApp } from '@/components/shopify-app-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardOverview } from '@/components/dashboard-overview'
import { ReviewsPage } from '@/components/reviews-page'
import { UGCGalleryPage } from '@/components/ugc-gallery-page'
import { UGCGeneratorPage } from '@/components/ugc-generator-page'
import { AutomationPage } from '@/components/automation-page'
import { WidgetsPage } from '@/components/widgets-page'
import { SettingsPage } from '@/components/settings-page'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'

function ShopifyAppContent() {
  const { shop, isEmbedded, loading } = useShopifyApp()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if we have a valid session
    const checkAuth = async () => {
      try {
        // In a real app, you'd verify the session with your backend
        const session = searchParams.get('session')
        if (session || shop) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }

    if (!loading) {
      checkAuth()
    }
  }, [loading, shop, searchParams])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "reviews":
        return <ReviewsPage />
      case "ugc-gallery":
        return <UGCGalleryPage />
      case "ugc-generator":
        return <UGCGeneratorPage />
      case "automation":
        return <AutomationPage />
      case "widgets":
        return <WidgetsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Proofix</h2>
            <p className="text-gray-600">Connecting to your Shopify store...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please install Proofix from the Shopify App Store to continue.
            </p>
            <Button
              onClick={() => window.location.href = '/install'}
              className="w-full"
            >
              Install Proofix
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  )
}

export default function ShopifyAppPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
            <p className="text-gray-600">Initializing app...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <ShopifyAppContent />
    </Suspense>
  )
} 