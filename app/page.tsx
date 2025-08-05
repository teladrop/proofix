"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shield, Zap, Check, ArrowRight, Store } from "lucide-react"
import Link from "next/link"

export default function InstallPage() {
  const [shopDomain, setShopDomain] = useState("")
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shopDomain) {
      alert('Please enter your Shopify store domain')
      return
    }
    
    setIsInstalling(true)
    
    // Redirect to installation page
    window.location.href = `/install?shop=${shopDomain}`
  }

  const handleQuickInstall = () => {
    const shop = prompt('Enter your Shopify store domain (e.g., mystore.myshopify.com):')
    if (shop) {
      window.location.href = `/install?shop=${shop}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
      {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900 ml-4">Proofix</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Install Proofix on Your Shopify Store
          </h1>
          <p className="text-gray-600">
            Turn customer reviews into your most powerful sales tool
          </p>
        </div>

        {/* Install Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl flex items-center justify-center">
              <Store className="h-5 w-5 mr-2" />
              Shopify App Installation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInstall} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopDomain">Your Shopify Store Domain</Label>
                <Input
                  id="shopDomain"
                  type="text"
                  placeholder="your-store.myshopify.com"
                  value={shopDomain}
                  onChange={(e) => setShopDomain(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter your store's domain (e.g., mystore.myshopify.com)
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isInstalling}
              >
                {isInstalling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Installing...
                  </>
                ) : (
                  <>
                    Install Proofix
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">or</p>
              <Button
                variant="outline"
                onClick={handleQuickInstall}
                className="w-full"
              >
                Quick Install
              </Button>
              </div>
          </CardContent>
            </Card>

        {/* Features */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              What You'll Get
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
            <div>
                <h4 className="font-medium text-gray-900">Automated Review Collection</h4>
                <p className="text-sm text-gray-600">Automatically request reviews from customers</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Photo & Video Reviews</h4>
                <p className="text-sm text-gray-600">Collect authentic visual content</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">AI-Powered Insights</h4>
                <p className="text-sm text-gray-600">Get intelligent summaries and trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

        {/* Shopify OAuth Info */}
        <Card className="mt-6 border-0 shadow-lg bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Store className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">No Account Needed</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Proofix uses Shopify OAuth for secure authentication. 
                  No separate account or password required - just install and start using!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}
