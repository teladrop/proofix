"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wand2,
  Lightbulb,
  Target,
  Zap,
  Copy,
  Download,
  Edit,
  Eye,
  Share2,
  Heart,
  MessageCircle,
  RotateCcw,
  Sparkles,
  ImageIcon,
  Video,
} from "lucide-react"

type GenerationStep = "form" | "generating" | "complete"

export function UGCGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<GenerationStep>("form")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedContentType, setSelectedContentType] = useState("social-post")

  const handleGenerateContent = () => {
    setCurrentStep("generating")

    // Simulate generation progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        setCurrentStep("complete")
        clearInterval(interval)
      }
      setGenerationProgress(progress)
    }, 300)
  }

  const contentTypes = [
    { id: "social-post", name: "Social Media Post", icon: Heart, desc: "Instagram, Facebook, Twitter posts" },
    { id: "story", name: "Story Content", icon: ImageIcon, desc: "Instagram & Facebook stories" },
    { id: "video-script", name: "Video Script", icon: Video, desc: "TikTok, YouTube, Instagram Reels" },
    { id: "ad-copy", name: "Ad Copy", icon: Target, desc: "Facebook & Google Ads" },
  ]

  const generatedContent = [
    {
      id: 1,
      type: "Social Post",
      style: "Casual",
      tone: "Excited",
      content:
        "OMG guys! 😍 Just tried the new AirPods Pro and I'm absolutely OBSESSED! The noise cancellation is next level - I literally can't hear my neighbor's dog barking anymore 🙉 Perfect for my morning workouts and those long commute days. Who else is loving these? #AirPods #TechReview #MusicLover",
      engagement: { likes: "2.3k", comments: "184", shares: "67" },
      platforms: ["Instagram", "Facebook"],
    },
    {
      id: 2,
      type: "Story Content",
      style: "Professional",
      tone: "Informative",
      content:
        "🎧 AirPods Pro Review: 3 months later\n✅ Amazing noise cancellation\n✅ Great battery life\n✅ Perfect fit\n❌ Pricey but worth it\n\nSwipe up for full review! 👆",
      engagement: { views: "5.2k", replies: "89", shares: "34" },
      platforms: ["Instagram Stories", "Facebook Stories"],
    },
    {
      id: 3,
      type: "Video Script",
      style: "Energetic",
      tone: "Enthusiastic",
      content:
        "[Hook] Wait until you see what these AirPods can do...\n[Setup] So I've been testing the AirPods Pro for 3 months\n[Problem] My old earbuds kept falling out during workouts\n[Solution] These literally changed my entire routine\n[CTA] Comment 'AIRPODS' if you want the link!",
      engagement: { views: "12.4k", likes: "892", comments: "156" },
      platforms: ["TikTok", "Instagram Reels"],
    },
    {
      id: 4,
      type: "Ad Copy",
      style: "Persuasive",
      tone: "Urgent",
      content:
        "🔥 LIMITED TIME: AirPods Pro 40% OFF\n\n✨ Crystal clear sound quality\n✨ All-day battery life\n✨ Sweat & water resistant\n\nDon't miss out - only 48 hours left!\n👉 Shop now and transform your audio experience",
      engagement: { ctr: "3.2%", conversions: "127", cost: "$0.89" },
      platforms: ["Facebook Ads", "Google Ads"],
    },
  ]

  const renderFormStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form - Left Column (2/3) */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="h-5 w-5 text-primary" />
              <span>AI UGC Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Content Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedContentType === type.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedContentType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <type.icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-gray-600">{type.desc}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Product Information</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="AirPods Pro (2nd Generation)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="Apple" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product's key features, benefits, and unique selling points..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Style & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="content-style">Content Style</Label>
                <Select defaultValue="casual">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="energetic">Energetic & Fun</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="luxury">Luxury & Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select defaultValue="excited">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excited">Excited</SelectItem>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input
                id="target-audience"
                placeholder="Tech enthusiasts, fitness lovers, commuters..."
                className="mt-1"
              />
            </div>

            {/* Key Messages */}
            <div>
              <Label htmlFor="key-messages">Key Messages (Optional)</Label>
              <Textarea
                id="key-messages"
                placeholder="Any specific points you want to highlight..."
                className="mt-1"
                rows={2}
              />
            </div>

            <Button onClick={handleGenerateContent} className="w-full" size="lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Generate UGC Content
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tips Sidebar - Right Column (1/3) */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Pro Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900 text-sm">📝 Product Description</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Include specific features, benefits, and use cases for better AI understanding.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900 text-sm">🎯 Target Audience</h4>
                <p className="text-xs text-green-700 mt-1">
                  Be specific about demographics, interests, and pain points.
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-medium text-purple-900 text-sm">✨ Content Style</h4>
                <p className="text-xs text-purple-700 mt-1">
                  Choose styles that match your brand voice and platform requirements.
                </p>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-medium text-orange-900 text-sm">💡 Key Messages</h4>
                <p className="text-xs text-orange-700 mt-1">Highlight unique selling points and customer benefits.</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">📊 Best Practices</h4>
                <ul className="text-xs text-gray-700 mt-1 space-y-1">
                  <li>• Use emojis for social posts</li>
                  <li>• Include CTAs for ads</li>
                  <li>• Keep stories concise</li>
                  <li>• Add hashtags strategically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderGeneratingStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Wand2 className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Generating Your UGC...</h3>
              <p className="text-gray-600">Our AI is crafting personalized content for your product</p>

              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Generating...</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary font-medium">✨ Analyzing your product</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">🎯 Crafting targeted content</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">📝 Optimizing for engagement</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-700">🚀 Almost ready!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCompleteStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generated UGC Content</h2>
            <p className="text-gray-600">4 pieces of content ready to use</p>
          </div>
          <Button
            onClick={() => {
              setCurrentStep("form")
              setGenerationProgress(0)
            }}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Generate More
          </Button>
        </div>

        <div className="space-y-4">
          {generatedContent.map((content) => (
            <Card key={content.id} className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">{content.type}</Badge>
                    <Badge variant="outline">{content.style}</Badge>
                    <Badge variant="outline">{content.tone}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm whitespace-pre-line">{content.content}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{content.engagement.likes || content.engagement.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span>{content.engagement.comments || content.engagement.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4 text-green-500" />
                      <span>{content.engagement.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {content.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Results Summary Sidebar */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Content Generated!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-600">4</div>
                <div className="text-xs text-green-700">Content Pieces</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-600">6</div>
                <div className="text-xs text-blue-700">Platforms</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Content Types</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Social Posts
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Stories
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Video Scripts
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Ad Copy
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Platforms</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  Instagram
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Facebook
                </Badge>
                <Badge variant="outline" className="text-xs">
                  TikTok
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Google Ads
                </Badge>
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <Button size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Collection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      {currentStep === "form" && renderFormStep()}
      {currentStep === "generating" && renderGeneratingStep()}
      {currentStep === "complete" && renderCompleteStep()}
    </div>
  )
}
