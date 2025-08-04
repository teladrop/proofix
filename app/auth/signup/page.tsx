"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Store, ArrowRight, Check } from 'lucide-react'

export default function Signup() {
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
          <CardTitle className="text-2xl font-bold text-gray-900">Get Started with Proofix</CardTitle>
          <p className="text-gray-600 mt-2">
            Join thousands of Shopify stores using Proofix to boost conversions with authentic reviews
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

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">What you'll get:</h3>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Automated review collection
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Photo & video reviews
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Smart filtering system
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                AI-powered insights
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Beautiful review galleries
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              <strong>No account needed!</strong> Shopify handles authentication. 
              Just install and start using Proofix immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
