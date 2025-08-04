"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-3">Proofix</span>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</div>
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 left-1/4 w-4 h-4 bg-accent rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-1/4 w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
            <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The page you're looking for seems to have wandered off. Don't worry, even the best reviews sometimes get
            lost in the shuffle!
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Go Home</h3>
            <p className="text-sm text-gray-600 mb-4">Return to our homepage and explore Proofix features</p>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Help</h3>
            <p className="text-sm text-gray-600 mb-4">Contact our support team for assistance</p>
            <Button variant="outline" className="w-full border-2 bg-transparent">
              <HelpCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-4">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/auth/signup">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                Sign Up Free
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                Sign In
              </Button>
            </Link>
            <Link href="/#features">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                Features
              </Button>
            </Link>
            <Link href="/#demo">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()} className="border-2 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>

        {/* Fun Message */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
          <p className="text-sm text-gray-600">
            💡 <strong>Pro tip:</strong> While you're here, did you know that stores using Proofix see an average 23%
            increase in conversions?
            <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium ml-1">
              Start your free trial →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
