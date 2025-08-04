"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Store, ArrowRight, HelpCircle } from 'lucide-react'

export default function ForgotPassword() {
  const router = useRouter()

  useEffect(() => {
    // Check if we're in a Shopify context
    const urlParams = new URLSearchParams(window.location.search)
    const shop = urlParams.get('shop')
    
    if (shop) {
      // If shop parameter exists, redirect to install
      router.push(`/install?shop=${shop}`)
    }
  }, [router])

  const handleShopifyInstall = () => {
    // Redirect to Shopify app installation
    const shop = prompt('Enter your Shopify store domain (e.g., mystore.myshopify.com):')
    if (shop) {
      router.push(`/install?shop=${shop}`)
    }
  }

  const handleLandingPage = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900 ml-4">Proofix</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Need Help?</CardTitle>
          <p className="text-gray-600 mt-2">
            Proofix is a Shopify app - no passwords needed! Install directly on your store.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleShopifyInstall}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            <Store className="h-5 w-5 mr-2" />
            Install Proofix on Shopify
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button 
              variant="outline" 
              onClick={handleLandingPage}
              className="w-full"
            >
              Learn More About Proofix
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">How Shopify Apps Work:</h3>
                <p className="text-sm text-yellow-800">
                  Shopify apps don't require separate accounts or passwords. 
                  You authenticate through your Shopify store, and the app gets 
                  the permissions it needs to help you manage reviews.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              <strong>Already have Proofix installed?</strong> Access it directly from your 
              Shopify admin dashboard under Apps.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
