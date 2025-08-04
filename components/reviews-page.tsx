"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Star,
  MoreHorizontal,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  Download,
} from "lucide-react"
import { ImportReviewsPage } from "./import-reviews-page"

const reviews = [
  {
    id: 1,
    reviewer: "Sarah Johnson",
    email: "sarah.j@email.com",
    product: "Premium Skincare Set",
    rating: 5,
    text: "Absolutely love this product! The quality is amazing and I've seen great results after just 2 weeks of use. The packaging is also very elegant and professional. Will definitely order again!",
    date: "2024-01-15",
    status: "published",
    hasPhoto: true,
    verified: true,
    helpful: 12,
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: 2,
    reviewer: "Mike Chen",
    email: "mike.chen@email.com",
    product: "Wireless Headphones Pro",
    rating: 4,
    text: "Good sound quality and comfortable to wear for long periods. Battery life is excellent. Only minor complaint is that the case could be a bit smaller.",
    date: "2024-01-14",
    status: "published",
    hasPhoto: false,
    verified: true,
    helpful: 8,
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: 3,
    reviewer: "Emma Wilson",
    email: "emma.w@email.com",
    product: "Smart Fitness Tracker",
    rating: 5,
    text: "This fitness tracker has completely changed my workout routine! The heart rate monitoring is very accurate and the sleep tracking features are incredibly detailed.",
    date: "2024-01-13",
    status: "pending",
    hasPhoto: true,
    verified: false,
    helpful: 5,
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
  },
  {
    id: 4,
    reviewer: "David Rodriguez",
    email: "david.r@email.com",
    product: "Organic Coffee Blend",
    rating: 3,
    text: "The coffee is okay, but not as strong as I expected. The flavor is smooth but lacks the bold taste I was looking for. Packaging is nice though.",
    date: "2024-01-12",
    status: "hidden",
    hasPhoto: false,
    verified: true,
    helpful: 2,
    avatar: "/placeholder.svg?height=40&width=40&text=DR",
  },
]

export function ReviewsPage() {
  const [currentView, setCurrentView] = useState<"list" | "import">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Published</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
      case "hidden":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Hidden</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (currentView === "import") {
    return (
      <div>
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentView("list")} className="mb-4">
            ← Back to Reviews
          </Button>
        </div>
        <ImportReviewsPage />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
              </div>
              <Star className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-semibold text-gray-900">Customer Reviews</CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setCurrentView("import")} className="bg-primary hover:bg-primary/90">
                Import Reviews
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <TabsList className="grid w-full sm:w-auto grid-cols-4">
                <TabsTrigger value="all">All ({reviews.length})</TabsTrigger>
                <TabsTrigger value="published">
                  Published ({reviews.filter((r) => r.status === "published").length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({reviews.filter((r) => r.status === "pending").length})
                </TabsTrigger>
                <TabsTrigger value="hidden">Hidden ({reviews.filter((r) => r.status === "hidden").length})</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                          <AvatarFallback>
                            {review.reviewer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                Verified
                              </Badge>
                            )}
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-accent fill-accent" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                          <p className="text-gray-900 mb-3">{review.text}</p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(review.date).toLocaleDateString()}</span>
                            </span>
                            {review.hasPhoto && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                📸 Photo
                              </Badge>
                            )}
                            <span>{review.helpful} helpful</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStatusBadge(review.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Publish</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EyeOff className="mr-2 h-4 w-4" />
                              <span>Hide</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="published" className="space-y-4">
              {filteredReviews
                .filter((r) => r.status === "published")
                .map((review) => (
                  <Card key={review.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                            <AvatarFallback>
                              {review.reviewer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-accent fill-accent" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                            <p className="text-gray-900 mb-3">{review.text}</p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                              </span>
                              {review.hasPhoto && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                  📸 Photo
                                </Badge>
                              )}
                              <span>{review.helpful} helpful</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(review.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <EyeOff className="mr-2 h-4 w-4" />
                                <span>Hide</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {filteredReviews
                .filter((r) => r.status === "pending")
                .map((review) => (
                  <Card key={review.id} className="border border-yellow-200 bg-yellow-50/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                            <AvatarFallback>
                              {review.reviewer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-accent fill-accent" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                            <p className="text-gray-900 mb-3">{review.text}</p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                              </span>
                              {review.hasPhoto && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                  📸 Photo
                                </Badge>
                              )}
                              <span>{review.helpful} helpful</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(review.status)}
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <Eye className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Reject</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="hidden" className="space-y-4">
              {filteredReviews
                .filter((r) => r.status === "hidden")
                .map((review) => (
                  <Card key={review.id} className="border border-gray-200 bg-gray-50/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                            <AvatarFallback>
                              {review.reviewer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-accent fill-accent" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                            <p className="text-gray-900 mb-3">{review.text}</p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                              </span>
                              {review.hasPhoto && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                  📸 Photo
                                </Badge>
                              )}
                              <span>{review.helpful} helpful</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(review.status)}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Publish
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
