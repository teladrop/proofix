"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Dashboard Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div className="ml-3">
            <span className="text-xl font-bold text-gray-900">Proofix</span>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>

        {/* 404 Content */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary/20 mb-4">404</div>
          <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        <Card className="p-8 border-0 shadow-lg bg-white mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Page Not Found</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The dashboard page you're looking for doesn't exist. Let's get you back to managing your reviews!
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/dashboard">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  // This would set the page to reviews in the actual dashboard
                  window.location.href = "/dashboard?page=reviews"
                }}
              >
                Reviews
              </Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Dashboard Links */}
        <div className="text-sm text-gray-500">
          <p className="mb-3">Quick access to dashboard sections:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/dashboard" className="text-primary hover:text-primary/80">
              Overview
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/dashboard" className="text-primary hover:text-primary/80">
              Reviews
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/dashboard" className="text-primary hover:text-primary/80">
              UGC Gallery
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/dashboard" className="text-primary hover:text-primary/80">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
