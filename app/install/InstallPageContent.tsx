"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Shield, Zap, Check } from 'lucide-react'
import Image from 'next/image'

export default function InstallPageContent() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    if (!shop) {
      alert('No shop provided')
      return
    }

    setIsInstalling(true)
    
    try {
      // Redirect to Shopify OAuth
      const authUrl = `/api/auth/shopify?shop=${shop}`
      window.location.href = authUrl
    } catch (error) {
      console.error('Installation error:', error)
      setIsInstalling(false)
    }
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">Invalid Request</CardTitle>
            <p className="text-gray-600">No shop domain provided</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 text-center">
              This app must be installed from the Shopify App Store.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900 ml-4">Proofix</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Install Proofix for {shop}
            </h1>
            <p className="text-lg text-gray-600">
              Turn customer reviews into your most powerful sales tool
            </p>
          </div>

          {/* Features */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                What you'll get with Proofix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automated Review Collection</h3>
                  <p className="text-sm text-gray-600">Automatically request reviews from customers after purchase</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Photo & Video Reviews</h3>
                  <p className="text-sm text-gray-600">Collect authentic visual content from your customers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Filtering</h3>
                  <p className="text-sm text-gray-600">Help customers find reviews from people like them</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600">Get intelligent summaries and trends from your reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Required Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Read products and orders</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Write products and orders</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Read and write customers</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Read and write reviews</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                These permissions are required for Proofix to collect and manage reviews for your store.
              </p>
            </CardContent>
          </Card>

          {/* Install Button */}
          <div className="text-center">
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 h-auto text-lg font-semibold"
            >
              {isInstalling ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Installing...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Install Proofix
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              By installing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 