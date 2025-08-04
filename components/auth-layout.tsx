"use client"

import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-primary font-bold text-2xl">P</span>
            </div>
            <span className="text-3xl font-bold text-white ml-4">Proofix</span>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl font-semibold text-white mb-4">Turn customer love into growth</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Transform authentic reviews into your most powerful sales tool with automated collection and beautiful
            displays.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">10K+</div>
              <div className="text-white/70 text-sm">Stores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">2M+</div>
              <div className="text-white/70 text-sm">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4.9</div>
              <div className="text-white/70 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
