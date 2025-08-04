"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-3">Proofix</span>
        </div>

        <Card className="p-8 border-0 shadow-xl bg-white">
          <div className="text-5xl font-bold text-primary/20 mb-4">404</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Auth Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The authentication page you're looking for doesn't exist. Let's get you to the right place!
          </p>

          <div className="space-y-3 mb-6">
            <Link href="/auth/login">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full border-2 bg-transparent">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-3 text-sm">
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

        <p className="text-xs text-gray-500 mt-6">
          Need help?{" "}
          <Link href="mailto:support@proofix.com" className="text-primary hover:text-primary/80">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
