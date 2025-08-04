"use client"

import type React from "react"

import { useState } from "react"
import { AuthLayout } from "./auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

interface SignupPageProps {
  onPageChange: (page: string) => void
}

export function SignupPage({ onPageChange }: SignupPageProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) return

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      onPageChange("dashboard")
    }, 1500)
  }

  return (
    <AuthLayout>
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="text-2xl font-bold text-gray-900 ml-3">Proofix</span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
        <p className="text-gray-600">Start your 14-day free trial today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !agreeToTerms}
          className="w-full bg-accent hover:bg-accent/90 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => onPageChange("login")}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span>🔒</span>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>✅</span>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💳</span>
            <span>No credit card</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
