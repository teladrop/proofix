"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Shuffle, Edit, Eye, Share, Star, Heart, MessageCircle, Download } from "lucide-react"
import Image from "next/image"

const products = [
  { id: "1", name: "Summer Dress Collection", category: "Clothing" },
  { id: "2", name: "Organic Face Serum", category: "Beauty" },
  { id: "3", name: "Fitness Resistance Bands", category: "Fitness" },
  { id: "4", name: "Digital Marketing Course", category: "Digital" },
  { id: "5", name: "Skincare Bundle", category: "Beauty" },
  { id: "6", name: "Yoga Mat Premium", category: "Fitness" },
]

const styleTags = ["Lifestyle", "Studio", "Casual", "Aesthetic", "Professional", "Candid"]

const toneOptions = [
  { value: "friendly", label: "Friendly" },
  { value: "informative", label: "Informative" },
  { value: "funny", label: "Funny" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "professional", label: "Professional" },
]

const examplePrompts = [
  "Woman in activewear stretching in a park, sunny day, confident expression",
  "Person applying skincare product in modern bathroom, natural lighting, satisfied smile",
  "Fitness enthusiast using resistance bands at home gym, focused and determined",
  "Student taking online course on laptop in cozy coffee shop, engaged and learning",
  "Model wearing summer dress walking through city street, vibrant and stylish",
  "Person doing yoga on premium mat in serene studio, peaceful and centered",
]

export function UGCGeneratorPage() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [prompt, setPrompt] = useState("")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedTone, setSelectedTone] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [generatedUGC, setGeneratedUGC] = useState<any[]>([])

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const handleSurpriseMe = () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
    setPrompt(randomPrompt)

    // Randomly select styles and tone
    const randomStyles = styleTags.slice(0, Math.floor(Math.random() * 3) + 1)
    setSelectedStyles(randomStyles)

    const randomTone = toneOptions[Math.floor(Math.random() * toneOptions.length)]
    setSelectedTone(randomTone.value)

    // Random reviewer name
    const names = ["Sarah", "Emma", "Mia", "Alex", "Jordan", "Casey", "Taylor", "Morgan"]
    setReviewerName(names[Math.floor(Math.random() * names.length)])
  }

  const generateReviewText = (productName: string, tone: string, reviewerName: string) => {
    const reviews = {
      friendly: [
        `Just got my ${productName} and I'm absolutely loving it! 😍 The quality is amazing and it's exactly what I needed. Highly recommend to anyone looking for something like this! #ProductReview #Happy`,
        `OMG you guys! This ${productName} is incredible! 💕 I've been using it for a week now and I can already see such a difference. Best purchase I've made in a while! #Obsessed`,
        `Can't stop raving about my new ${productName}! ✨ It's everything I hoped for and more. The quality is top-notch and it fits perfectly into my routine. So happy with this purchase!`,
      ],
      informative: [
        `After 3 weeks of testing the ${productName}, here's my honest review: The build quality is excellent, functionality meets expectations, and it delivers on all promised features. Worth the investment for anyone serious about quality.`,
        `Detailed review of ${productName}: Pros - High quality materials, great performance, excellent value. Cons - None so far! This has exceeded my expectations in every way. Recommended for anyone looking for reliability.`,
        `${productName} review update: Been using this for a month now. The durability is impressive, performance is consistent, and it's become an essential part of my daily routine. Solid 5-star product.`,
      ],
      funny: [
        `POV: You finally found the perfect ${productName} that doesn't disappoint! 😂 My expectations were low but this thing really said "hold my beer" and delivered beyond belief. 10/10 would buy again!`,
        `Me: I don't need another ${productName}\nAlso me: *buys it anyway*\nMe now: Why didn't I get this sooner?! 🤦‍♀️ This is actually life-changing and I'm not even being dramatic (okay maybe a little)`,
        `Breaking news: Local person discovers ${productName} that actually works as advertised! 📰 In other shocking news, I'm now obsessed and telling everyone about it. You're welcome for the recommendation!`,
      ],
      enthusiastic: [
        `GUYS!!! This ${productName} is EVERYTHING! 🔥 I literally cannot contain my excitement right now! The quality, the performance, the value - it's all perfect! I'm telling everyone about this! #GameChanger #Obsessed`,
        `I'M SCREAMING! This ${productName} just arrived and it's even better than I imagined! 🙌 The attention to detail is incredible and it works flawlessly! Already planning to get another one! #BestPurchaseEver`,
        `STOP EVERYTHING and get yourself this ${productName}! 💥 I've never been more excited about a purchase! It's absolutely perfect and has exceeded every single expectation! You NEED this in your life!`,
      ],
      professional: [
        `Professional review of ${productName}: Exceptional build quality, reliable performance, and excellent value proposition. After extensive testing, I can confidently recommend this to colleagues and clients. A worthwhile investment.`,
        `${productName} assessment: Superior craftsmanship, consistent results, and professional-grade quality. This product delivers on its promises and maintains high standards throughout extended use. Highly recommended for professional applications.`,
        `Comprehensive evaluation of ${productName}: Outstanding performance metrics, durable construction, and competitive pricing. This represents excellent value in the market and meets all professional requirements. Recommended without reservation.`,
      ],
    }

    const toneReviews = reviews[tone as keyof typeof reviews] || reviews.friendly
    return toneReviews[Math.floor(Math.random() * toneReviews.length)]
  }

  const generateUserData = (name: string) => {
    const usernames = {
      Sarah: "Sarah_FitLife",
      Emma: "EmmaGlowUp",
      Mia: "MiaStyleDiary",
      Alex: "AlexReviews",
      Jordan: "JordanLifestyle",
      Casey: "CaseyFinds",
      Taylor: "TaylorTrends",
      Morgan: "MorganMoments",
    }

    return {
      userName: usernames[name as keyof typeof usernames] || `${name}_Reviews`,
      userAvatar: `/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`,
      verified: Math.random() > 0.6,
      likes: Math.floor(Math.random() * 5000) + 500,
      comments: Math.floor(Math.random() * 300) + 50,
      timeAgo: ["2 hours ago", "1 day ago", "2 days ago", "3 days ago", "1 week ago"][Math.floor(Math.random() * 5)],
    }
  }

  const handleGenerate = async () => {
    if (!selectedProduct || !prompt) return

    setIsGenerating(true)

    // Simulate generation time
    setTimeout(() => {
      const selectedProductName = products.find((p) => p.id === selectedProduct)?.name || "Product"
      const finalReviewerName = reviewerName || "Sarah"
      const finalTone = selectedTone || "friendly"
      const finalStyle = selectedStyles[0] || "Lifestyle"

      const userData = generateUserData(finalReviewerName)
      const reviewText = generateReviewText(selectedProductName, finalTone, finalReviewerName)

      // Generate 4 variations
      const newUGC = Array.from({ length: 4 }, (_, index) => {
        const variations = [
          "natural lighting professional photography",
          "candid lifestyle shot authentic moment",
          "studio lighting clean background",
          "golden hour outdoor natural setting",
        ]

        const imagePrompt = `${prompt}, ${variations[index]}, high quality, realistic, authentic user generated content style`

        return {
          id: index + 1,
          image: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(imagePrompt)}`,
          userAvatar: userData.userAvatar,
          userName: userData.userName,
          verified: userData.verified,
          rating: 5,
          reviewText: reviewText,
          likes: userData.likes + index * 100,
          comments: userData.comments + index * 10,
          timeAgo: userData.timeAgo,
          style: finalStyle,
          tone: finalTone,
          productInImage: selectedProductName,
        }
      })

      setGeneratedUGC(newUGC)
      setIsGenerating(false)
      setShowResults(true)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">UGC Generator</h2>
            <p className="text-gray-600">Create authentic user-generated content with AI-powered images and reviews</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            ✨ Generate realistic user-generated content with authentic-looking photos and genuine review text that
            resonates with your audience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Form */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">Generate New UGC</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product from your store" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{product.name}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {product.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Description */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Describe the image you want</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Woman in activewear stretching in a park, sunny day, confident expression"
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Reviewer Name */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Reviewer Name (Optional)</Label>
              <Input
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g., Sarah, Alex, Jordan..."
                className="w-full"
              />
            </div>

            {/* Style Tags */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Style Tags (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {styleTags.map((style) => (
                  <Button
                    key={style}
                    variant={selectedStyles.includes(style) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStyleToggle(style)}
                    className={selectedStyles.includes(style) ? "bg-primary text-white" : ""}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            {/* Review Tone */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Review Tone (Optional)</Label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select review tone" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleGenerate}
                disabled={!selectedProduct || !prompt || isGenerating}
                className="flex-1 bg-accent hover:bg-accent/90 text-gray-900 font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate UGC
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleSurpriseMe}>
                <Shuffle className="h-4 w-4 mr-2" />
                Surprise Me
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Generation Status, Tips, or Results */}
        {isGenerating ? (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating UGC...</h3>
              <p className="text-gray-600 mb-4">Our AI is creating authentic images and reviews for your product</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
            </CardContent>
          </Card>
        ) : showResults ? (
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Generated UGC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                {generatedUGC.map((ugc) => (
                  <Card key={ugc.id} className="border border-gray-200 overflow-hidden">
                    {/* User Header */}
                    <div className="p-2 flex items-center space-x-2 border-b border-gray-100">
                      <Image
                        src={ugc.userAvatar || "/placeholder.svg"}
                        alt={ugc.userName}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-xs truncate">{ugc.userName}</span>
                          {ugc.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(ugc.rating)].map((_, i) => (
                            <Star key={i} className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{ugc.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Generated Image */}
                    <div className="relative aspect-square">
                      <Image src={ugc.image || "/placeholder.svg"} alt="Generated UGC" fill className="object-cover" />
                    </div>

                    {/* Review Content */}
                    <div className="p-2">
                      <p className="text-xs text-gray-800 mb-2 leading-relaxed line-clamp-3">{ugc.reviewText}</p>

                      {/* Style & Tone Badges */}
                      <div className="flex space-x-1 mb-2">
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {ugc.style}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {ugc.tone}
                        </Badge>
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-gray-600">{ugc.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-gray-600">{ugc.comments}</span>
                          </div>
                        </div>

                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="h-6 px-2 bg-primary text-white text-xs">
                            <Share className="h-3 w-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setShowResults(false)}
                  className="bg-accent hover:bg-accent/90 text-gray-900 font-semibold"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate More
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">💡 Tips for Better UGC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Be specific:</strong> Include details about setting, lighting, and emotions for realistic
                    images
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Use action words:</strong> "stretching", "applying", "wearing", "using" create dynamic
                    scenes
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Reviewer names:</strong> Add realistic names to make reviews more authentic and relatable
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Match your audience:</strong> Choose styles and tones that align with your brand voice
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
