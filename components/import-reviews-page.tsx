"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Upload,
  FileText,
  ShoppingBag,
  Globe,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Zap,
} from "lucide-react"

type ImportStep = "select" | "configure" | "import" | "complete"
type ImportSource = "aliexpress" | "shopify" | "csv" | null

export function ImportReviewsPage() {
  const [currentStep, setCurrentStep] = useState<ImportStep>("select")
  const [selectedSource, setSelectedSource] = useState<ImportSource>(null)
  const [importProgress, setImportProgress] = useState(0)
  const [isImporting, setIsImporting] = useState(false)

  const handleSourceSelect = (source: ImportSource) => {
    setSelectedSource(source)
    setCurrentStep("configure")
  }

  const handleStartImport = () => {
    setCurrentStep("import")
    setIsImporting(true)

    // Simulate import progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        setIsImporting(false)
        setCurrentStep("complete")
        clearInterval(interval)
      }
      setImportProgress(progress)
    }, 500)
  }

  const renderSelectSource = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Reviews</h2>
        <p className="text-gray-600">Choose your review source to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50"
          onClick={() => handleSourceSelect("aliexpress")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AliExpress</h3>
            <p className="text-sm text-gray-600 mb-4">Import reviews from AliExpress product pages</p>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Most Popular
            </Badge>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50"
          onClick={() => handleSourceSelect("shopify")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopify Store</h3>
            <p className="text-sm text-gray-600 mb-4">Scrape reviews from any Shopify store</p>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Advanced
            </Badge>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50"
          onClick={() => handleSourceSelect("csv")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CSV Upload</h3>
            <p className="text-sm text-gray-600 mb-4">Upload reviews from a CSV file</p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Flexible
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAliExpressConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("select")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AliExpress Import</h2>
          <p className="text-gray-600">Configure your AliExpress product import</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-orange-600" />
            <span>Product Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="aliexpress-url">AliExpress Product URL</Label>
            <Input
              id="aliexpress-url"
              placeholder="🛒 https://www.aliexpress.com/item/32XXX-Premium-Wireless-Headphones/XXXXXXX.html"
              className="mt-1 font-medium placeholder:font-bold placeholder:text-orange-600/70 placeholder:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Paste the full URL of the AliExpress product page</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-reviews">Maximum Reviews</Label>
              <Select defaultValue="50">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 reviews</SelectItem>
                  <SelectItem value="50">50 reviews</SelectItem>
                  <SelectItem value="100">100 reviews</SelectItem>
                  <SelectItem value="200">200 reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="min-rating">Minimum Rating</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Important Notes</h4>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Reviews will be imported with original dates</li>
                  <li>• Processing time: 2-5 minutes depending on review count</li>
                  <li>• Only reviews with text content will be imported</li>
                </ul>
              </div>
            </div>
          </div>

          <Button onClick={handleStartImport} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Start Import
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderShopifyConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("select")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shopify Store Import</h2>
          <p className="text-gray-600">Scrape reviews from any Shopify store</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-600" />
            <span>Store Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="store-url">Store URL</Label>
            <Input
              id="store-url"
              placeholder="🏪 https://premium-electronics.myshopify.com/products/wireless-earbuds"
              className="mt-1 font-medium placeholder:font-bold placeholder:text-green-600/70 placeholder:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Enter the main store URL or specific product page</p>
          </div>

          <div>
            <Label htmlFor="review-app">Review App (Auto-detected)</Label>
            <Select defaultValue="auto">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="judgeme">Judge.me</SelectItem>
                <SelectItem value="yotpo">Yotpo</SelectItem>
                <SelectItem value="stamped">Stamped.io</SelectItem>
                <SelectItem value="loox">Loox</SelectItem>
                <SelectItem value="rivyo">Rivyo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-products">Max Products</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 products</SelectItem>
                  <SelectItem value="10">10 products</SelectItem>
                  <SelectItem value="25">25 products</SelectItem>
                  <SelectItem value="50">50 products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reviews-per-product">Reviews per Product</Label>
              <Select defaultValue="20">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 reviews</SelectItem>
                  <SelectItem value="20">20 reviews</SelectItem>
                  <SelectItem value="50">50 reviews</SelectItem>
                  <SelectItem value="100">100 reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Supported Review Apps</h4>
            <div className="flex flex-wrap gap-2">
              {["Judge.me", "Yotpo", "Stamped.io", "Loox", "Rivyo", "Okendo", "Trustpilot"].map((app) => (
                <Badge key={app} variant="secondary" className="bg-green-100 text-green-700">
                  {app}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleStartImport} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Start Scraping
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderCSVConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep("select")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CSV Upload</h2>
          <p className="text-gray-600">Upload reviews from a CSV file</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>File Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drop your CSV file here</h3>
            <p className="text-gray-600 mb-4">or click to browse files</p>
            <Button variant="outline">Choose File</Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Required CSV Format</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Required columns:</strong> reviewer_name, rating, review_text, product_name
              </p>
              <p>
                <strong>Optional columns:</strong> review_date, reviewer_email, product_image, review_images
              </p>
              <p>
                <strong>Rating format:</strong> 1-5 (numeric)
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <Button onClick={handleStartImport} className="w-full" disabled>
            <Upload className="h-4 w-4 mr-2" />
            Upload & Import
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderImportProgress = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Importing Reviews</h2>
        <p className="text-gray-600">Please wait while we process your reviews...</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(importProgress)}%</span>
              </div>
              <Progress value={importProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">47</div>
                <div className="text-xs text-gray-500">Imported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-xs text-gray-500">Skipped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-xs text-gray-500">Errors</div>
              </div>
            </div>

            {isImporting && <p className="text-sm text-gray-600">Processing reviews... This may take a few minutes.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderComplete = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Complete!</h2>
        <p className="text-gray-600">Your reviews have been successfully imported</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">47</div>
              <div className="text-sm text-gray-600">Reviews Imported</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">4.6</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">With Photos</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Skipped</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button
          onClick={() => {
            setCurrentStep("select")
            setSelectedSource(null)
            setImportProgress(0)
          }}
          variant="outline"
          className="flex-1"
        >
          Import More Reviews
        </Button>
        <Button className="flex-1">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Reviews
        </Button>
      </div>
    </div>
  )

  const renderConfigStep = () => {
    switch (selectedSource) {
      case "aliexpress":
        return renderAliExpressConfig()
      case "shopify":
        return renderShopifyConfig()
      case "csv":
        return renderCSVConfig()
      default:
        return renderSelectSource()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep === "select" && renderSelectSource()}
      {currentStep === "configure" && renderConfigStep()}
      {currentStep === "import" && renderImportProgress()}
      {currentStep === "complete" && renderComplete()}
    </div>
  )
}
