"use client"

import type React from "react"

import { useState } from "react"
import { AuthLayout } from "./auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"

interface ForgotPasswordPageProps {
  onPageChange: (page: string) => void
}

export function ForgotPasswordPage({ onPageChange }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your
            password.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              <strong>Didn't receive the email?</strong> Check your spam folder or{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                try again
              </button>
            </p>
          </div>

          <Button
            onClick={() => onPageChange("login")}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </div>
      </AuthLayout>
    )
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
        <p className="text-gray-600">Enter your email and we'll send you a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={() => onPageChange("login")}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </button>
      </div>

      {/* Help Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Need help?</h3>
          <p className="text-xs text-gray-600 mb-3">
            If you're having trouble accessing your account, our support team is here to help.
          </p>
          <a href="mailto:support@proofix.com" className="text-xs text-primary hover:text-primary/80 font-medium">
            Contact Support →
          </a>
        </div>
      </div>
    </AuthLayout>
  )
}
