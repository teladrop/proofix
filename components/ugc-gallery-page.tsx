"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Star, Heart, Eye } from "lucide-react"
import Image from "next/image"

const ugcItems = [
  {
    id: 1,
    type: "image",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Photo+1",
    product: "Summer Dress Collection",
    user: "Sarah Johnson",
    rating: 5,
    likes: 24,
    views: 156,
    status: "approved",
    featured: true,
    tags: ["dress", "summer", "style"],
  },
  {
    id: 2,
    type: "image",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Photo+2",
    product: "Organic Face Serum",
    user: "Mike Chen",
    rating: 4,
    likes: 18,
    views: 89,
    status: "pending",
    featured: false,
    tags: ["skincare", "serum", "organic"],
  },
  {
    id: 3,
    type: "video",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Video+1",
    product: "Fitness Resistance Bands",
    user: "Emma Wilson",
    rating: 5,
    likes: 42,
    views: 234,
    status: "approved",
    featured: true,
    tags: ["fitness", "workout", "bands"],
  },
  {
    id: 4,
    type: "image",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Photo+3",
    product: "Skincare Bundle",
    user: "Lisa Thompson",
    rating: 4,
    likes: 31,
    views: 178,
    status: "approved",
    featured: false,
    tags: ["skincare", "bundle", "routine"],
  },
  {
    id: 5,
    type: "image",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Photo+4",
    product: "Digital Marketing Course",
    user: "David Rodriguez",
    rating: 5,
    likes: 67,
    views: 345,
    status: "approved",
    featured: true,
    tags: ["course", "marketing", "success"],
  },
  {
    id: 6,
    type: "video",
    url: "/placeholder.svg?height=300&width=300&text=UGC+Video+2",
    product: "Summer Dress Collection",
    user: "Anna Smith",
    rating: 5,
    likes: 28,
    views: 167,
    status: "pending",
    featured: false,
    tags: ["dress", "style", "ootd"],
  },
]

export function UGCGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [productFilter, setProductFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ugcList, setUgcList] = useState(ugcItems)

  const toggleApproval = (itemId: number) => {
    setUgcList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: item.status === "approved" ? "pending" : "approved" } : item,
      ),
    )
  }

  const toggleFeatured = (itemId: number) => {
    setUgcList((prev) => prev.map((item) => (item.id === itemId ? { ...item, featured: !item.featured } : item)))
  }

  const filteredItems = ugcList.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesProduct = productFilter === "all" || item.product === productFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesProduct && matchesStatus
  })

  const uniqueProducts = [...new Set(ugcItems.map((item) => item.product))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter UGC Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by product, user, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {uniqueProducts.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* UGC Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">UGC Gallery ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative">
                <Card className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={item.url || "/placeholder.svg"}
                      alt={`UGC by ${item.user}`}
                      fill
                      className="object-cover"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-4 border-l-gray-800 border-y-2 border-y-transparent ml-1" />
                        </div>
                      </div>
                    )}
                    {item.featured && (
                      <Badge className="absolute top-2 left-2 bg-accent text-gray-900">⭐ Featured</Badge>
                    )}
                    <Badge
                      className={`absolute top-2 right-2 ${
                        item.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "approved" ? "Approved" : "Pending"}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.product}</h4>
                      <p className="text-xs text-gray-500">by {item.user}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < item.rating ? "text-accent fill-accent" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          variant={item.status === "approved" ? "default" : "outline"}
                          onClick={() => toggleApproval(item.id)}
                          className="flex-1 text-xs"
                        >
                          {item.status === "approved" ? "Approved" : "Approve"}
                        </Button>
                        <Button
                          size="sm"
                          variant={item.featured ? "default" : "outline"}
                          onClick={() => toggleFeatured(item.id)}
                          className="flex-1 text-xs"
                        >
                          {item.featured ? "Featured" : "Feature"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
