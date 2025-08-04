"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Shield,
  Zap,
  Camera,
  MessageSquare,
  Play,
  Check,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProofixLanding() {
  const [isYearly, setIsYearly] = useState(false)

  // Pricing data
  const pricingPlans = {
    starter: {
      monthly: 29,
      yearly: 23, // 20% discount
      yearlyTotal: 276,
      monthlyTotal: 348,
    },
    growth: {
      monthly: 79,
      yearly: 63, // 20% discount
      yearlyTotal: 756,
      monthlyTotal: 948,
    },
    scale: {
      monthly: 199,
      yearly: 159, // 20% discount
      yearlyTotal: 1908,
      monthlyTotal: 2388,
    },
  }

  const getCurrentPrice = (plan: keyof typeof pricingPlans) => {
    return isYearly ? pricingPlans[plan].yearly : pricingPlans[plan].monthly
  }

  const getSavings = (plan: keyof typeof pricingPlans) => {
    return pricingPlans[plan].monthlyTotal - pricingPlans[plan].yearlyTotal
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Proofix</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-primary transition-colors">
              Demo
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-primary transition-colors">
              <Button variant="outline" size="sm">
                Install App
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
            🚀 Trusted by 10,000+ Shopify stores
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Customer Reviews Into
            <span className="text-primary block">Sales Machines</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Proofix helps Shopify brands collect, display, and leverage authentic customer reviews to boost conversions
            and build trust with smart automation and beautiful galleries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 h-auto bg-primary hover:bg-primary/90">
                Install on Shopify
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-2 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Free 14-day trial
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Setup in 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wide">Trusted by leading brands</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src={`/placeholder.svg?height=60&width=120&text=Brand+${i}`}
                  alt={`Brand ${i}`}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Stop Losing Sales to
              <span className="text-primary block">Trust Issues</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Without authentic reviews and social proof, potential customers hesitate to buy. Proofix solves this.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-red-100">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Low Trust</h3>
              <p className="text-gray-600">Customers don't trust products without authentic reviews and social proof</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manual Reviews</h3>
              <p className="text-gray-600">Collecting and managing customer reviews manually is time-consuming</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Poor Display</h3>
              <p className="text-gray-600">Reviews are buried or poorly displayed, missing conversion opportunities</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proofix Solution</h3>
              <p className="text-gray-600">Automated review collection with beautiful, conversion-optimized displays</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="text-primary block">Boost Conversions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to turn your customer reviews into a sales-driving machine.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                📸 Photo Reviews
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Visual Social Proof That Sells</h3>
              <p className="text-lg text-gray-600 mb-8">
                Automatically collect photo and video reviews from customers. Display them in beautiful galleries that
                showcase your products in real-world use.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Automated photo review requests</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Customizable gallery layouts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Mobile-optimized displays</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Photo+Reviews+Gallery"
                alt="Photo Reviews Feature"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Smart+Filters+Interface"
                alt="Smart Filters Feature"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">
                🎯 Smart Filters
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Help Customers Find Perfect Matches</h3>
              <p className="text-lg text-gray-600 mb-8">
                Advanced filtering system lets customers find reviews from people with similar preferences - size, skin
                type, fitness goals, and more.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Size and fit filtering</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Skin type and tone matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Custom attribute filtering</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                🤖 AI Summaries
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Review Intelligence</h3>
              <p className="text-lg text-gray-600 mb-8">
                Our AI analyzes hundreds of reviews to create helpful summaries, highlight key themes, and surface the
                most relevant insights for each product.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Automatic sentiment analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Key theme extraction</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Personalized review highlights</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=AI+Review+Summaries"
                alt="AI Summaries Feature"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Perfect for Every
              <span className="text-primary block">Industry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored solutions for different types of Shopify stores and their unique review needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-4xl mb-4">👗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Clothing</h3>
              <p className="text-gray-600">Size guides, fit reviews, and style inspiration from real customers</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-pink-50 to-pink-100">
              <div className="text-4xl mb-4">💄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Beauty</h3>
              <p className="text-gray-600">Skin tone matching, before/after photos, and ingredient experiences</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fitness</h3>
              <p className="text-gray-600">Workout results, progress photos, and performance testimonials</p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Products</h3>
              <p className="text-gray-600">Success stories, learning outcomes, and transformation journeys</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              See Proofix in
              <span className="text-primary block">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how easy it is to set up and start collecting reviews that convert visitors into customers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-50 shadow-lg">
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo (2:30)
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Install & Setup</h3>
                <p className="text-gray-600 text-sm">One-click installation from Shopify App Store</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customize Design</h3>
                <p className="text-gray-600 text-sm">Match your brand with our design editor</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Start Converting</h3>
                <p className="text-gray-600 text-sm">Watch your conversion rates improve immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="text-primary block">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your store. All plans include unlimited reviews and our core features.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`text-gray-600 mr-3 transition-colors ${!isYearly ? "font-semibold text-gray-900" : ""}`}>
              Monthly
            </span>
            <div className="relative">
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`flex items-center cursor-pointer rounded-full p-1 w-14 h-8 transition-colors duration-200 ${
                  isYearly ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isYearly ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <span className={`text-gray-600 ml-3 transition-colors ${isYearly ? "font-semibold text-gray-900" : ""}`}>
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                Save 20%
              </Badge>
            </span>
          </div>

          {/* Savings Banner */}
          {isYearly && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-800 text-sm font-medium">
                  🎉 Save up to ${getSavings("scale")} per year with annual billing!
                </span>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white relative">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 mb-6">Perfect for new stores getting started</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">${getCurrentPrice("starter")}</span>
                    <span className="text-gray-500">/{isYearly ? "month" : "month"}</span>
                  </div>
                  {isYearly && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 line-through">${pricingPlans.starter.monthly}/month</span>
                      <span className="text-sm text-green-600 font-medium ml-2">
                        Save ${getSavings("starter")}/year
                      </span>
                    </div>
                  )}
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full border-2 bg-transparent">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Up to 1,000 orders/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited review collection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Basic review widgets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Email support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Photo reviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Basic automation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Plan - Most Popular */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white text-center py-3 text-sm font-semibold">
                Most Popular
              </div>
              <CardContent className="p-8 pt-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth</h3>
                  <p className="text-gray-600 mb-6">Best for growing stores that need more power</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">${getCurrentPrice("growth")}</span>
                    <span className="text-gray-500">/{isYearly ? "month" : "month"}</span>
                  </div>
                  {isYearly && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 line-through">${pricingPlans.growth.monthly}/month</span>
                      <span className="text-sm text-green-600 font-medium ml-2">Save ${getSavings("growth")}/year</span>
                    </div>
                  )}
                  <Link href="/auth/signup">
                    <Button className="w-full bg-primary hover:bg-primary/90">Start Free Trial</Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Up to 5,000 orders/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Everything in Starter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Advanced widgets & customization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Smart filters (size, skin type)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">AI review summaries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Advanced automation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">UGC gallery</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scale Plan */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white relative">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Scale</h3>
                  <p className="text-gray-600 mb-6">For high-volume stores and enterprises</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">${getCurrentPrice("scale")}</span>
                    <span className="text-gray-500">/{isYearly ? "month" : "month"}</span>
                  </div>
                  {isYearly && (
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 line-through">${pricingPlans.scale.monthly}/month</span>
                      <span className="text-sm text-green-600 font-medium ml-2">Save ${getSavings("scale")}/year</span>
                    </div>
                  )}
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full border-2 bg-transparent">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Everything in Growth</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">White-label options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">24/7 phone support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">API access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Money-back Guarantee */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-green-800 font-medium">30-day money-back guarantee</span>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Something Custom?</h3>
                <p className="text-gray-600 mb-6">
                  Enterprise solutions with custom features, dedicated support, and volume pricing available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 bg-transparent">
                    Contact Sales
                  </Button>
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing FAQ */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing Questions</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What counts as an order?</h4>
                <p className="text-gray-600 text-sm">
                  An order is counted when a customer completes a purchase. We only count orders that are eligible for
                  review requests.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
                <p className="text-gray-600 text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated
                  billing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h4>
                <p className="text-gray-600 text-sm">
                  No setup fees, ever. We believe in transparent pricing with no hidden costs or surprise charges.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What happens after the free trial?</h4>
                <p className="text-gray-600 text-sm">
                  Your 14-day free trial includes all features. After the trial, choose a plan or your account will be
                  paused (not deleted).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Turn Reviews Into Revenue?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of Shopify stores already using Proofix to boost their conversions with authentic customer
            reviews.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-gray-900 text-lg px-12 py-4 h-auto font-bold shadow-xl"
            >
              Install for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-white/80 mt-6 text-sm">14-day free trial • No credit card required • 2-minute setup</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked
              <span className="text-primary block">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Proofix and how it can help your Shopify store.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How quickly can I start collecting reviews with Proofix?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You can start collecting reviews immediately after installation. Our automated system begins sending
                  review requests to customers within 24 hours of their purchase, and you'll see your first reviews
                  within 2-3 days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Does Proofix work with my existing Shopify theme?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! Proofix is designed to work seamlessly with any Shopify theme. Our widgets automatically adapt to
                  your store's design, and you can customize colors, fonts, and layouts to match your brand perfectly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Can I import my existing reviews from other platforms?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We support importing reviews from most major review platforms including Judge.me, Yotpo, Loox, and
                  others. Our migration tool makes the process simple and preserves all your valuable social proof.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How does the AI review summary feature work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our AI analyzes all reviews for each product to identify common themes, sentiments, and key points. It
                  then generates helpful summaries that highlight the most important information customers care about,
                  like fit, quality, and performance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What kind of support do you provide?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We offer 24/7 chat support, comprehensive documentation, video tutorials, and personalized onboarding
                  for all customers. Our team of Shopify experts is always ready to help you maximize your results with
                  Proofix.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Is there a limit on the number of reviews I can collect?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  No limits! All our plans include unlimited review collection and storage. Whether you have 10 products
                  or 10,000, Proofix scales with your business without any additional fees for review volume.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold">Proofix</span>
              </div>
              <p className="text-gray-400 mb-6">
                Turn customer reviews into your most powerful sales tool with automated collection and beautiful
                displays.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Setup Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Proofix. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made for Shopify stores</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                ))}
                <span className="text-gray-400 text-sm ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
