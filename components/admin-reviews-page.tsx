"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, Search, Flag, Eye, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reviews = [
  {
    id: 1,
    store: "Fashion Forward",
    product: "Summer Dress Collection",
    reviewer: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love this dress! The fit is perfect and the quality is amazing.",
    status: "published",
    flagged: false,
    date: "2024-01-15",
    hasPhoto: true,
  },
  {
    id: 2,
    store: "Beauty Essentials",
    product: "Organic Face Serum",
    reviewer: "Mike Chen",
    rating: 4,
    text: "Great product, noticed improvements in my skin texture after just one week.",
    status: "published",
    flagged: false,
    date: "2024-01-14",
    hasPhoto: false,
  },
  {
    id: 3,
    store: "Tech Gadgets Pro",
    product: "Wireless Headphones",
    reviewer: "Emma Wilson",
    rating: 1,
    text: "Terrible quality, broke after one day. Complete waste of money!",
    status: "hidden",
    flagged: true,
    date: "2024-01-13",
    hasPhoto: false,
  },
  {
    id: 4,
    store: "Fitness Hub",
    product: "Resistance Bands Set",
    reviewer: "David Rodriguez",
    rating: 5,
    text: "Perfect for home workouts! The quality is excellent.",
    status: "published",
    flagged: false,
    date: "2024-01-12",
    hasPhoto: true,
  },
  {
    id: 5,
    store: "Home Decor Plus",
    product: "Modern Wall Art",
    reviewer: "Lisa Thompson",
    rating: 2,
    text: "Not as described in the listing. Very disappointed with this purchase.",
    status: "hidden",
    flagged: true,
    date: "2024-01-11",
    hasPhoto: false,
  },
]

export function AdminReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [flaggedFilter, setFlaggedFilter] = useState("all")
  const [reviewList, setReviewList] = useState(reviews)

  const toggleReviewStatus = (reviewId: number) => {
    setReviewList((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, status: review.status === "published" ? "hidden" : "published" } : review,
      ),
    )
  }

  const toggleFlagged = (reviewId: number) => {
    setReviewList((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, flagged: !review.flagged } : review)),
    )
  }

  const filteredReviews = reviewList.filter((review) => {
    const matchesSearch =
      review.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesFlagged =
      flaggedFilter === "all" ||
      (flaggedFilter === "flagged" && review.flagged) ||
      (flaggedFilter === "not-flagged" && !review.flagged)

    return matchesSearch && matchesRating && matchesStatus && matchesFlagged
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Select value={flaggedFilter} onValueChange={setFlaggedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Flagged" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="flagged">Flagged Only</SelectItem>
                <SelectItem value="not-flagged">Not Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Reviews ({filteredReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flagged</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}`}
                          alt={review.reviewer}
                        />
                        <AvatarFallback>
                          {review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900">{review.reviewer}</div>
                        <div className="text-sm text-gray-600">{review.product}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{review.text}</div>
                        {review.hasPhoto && (
                          <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary text-xs">
                            📸 Photo
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{review.store}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-accent fill-accent" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={
                          review.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }
                      >
                        {review.status}
                      </Badge>
                      <Switch
                        checked={review.status === "published"}
                        onCheckedChange={() => toggleReviewStatus(review.id)}
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={review.flagged ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}
                      >
                        {review.flagged ? "Flagged" : "Clean"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFlagged(review.id)}
                        className={review.flagged ? "text-red-600" : "text-gray-400"}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{review.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
