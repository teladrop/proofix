"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Eye, Check, X, Flag, Trash2 } from "lucide-react"
import Image from "next/image"

const ugcItems = [
  {
    id: 1,
    store: "Fashion Forward",
    product: "Summer Dress Collection",
    user: "Sarah Johnson",
    type: "image",
    url: "/placeholder.svg?height=200&width=200&text=UGC+Photo+1",
    status: "approved",
    flagged: false,
    source: "real",
    uploadDate: "2024-01-15",
    likes: 24,
    views: 156,
  },
  {
    id: 2,
    store: "Beauty Essentials",
    product: "Organic Face Serum",
    user: "Mike Chen",
    type: "video",
    url: "/placeholder.svg?height=200&width=200&text=UGC+Video+1",
    status: "pending",
    flagged: false,
    source: "real",
    uploadDate: "2024-01-14",
    likes: 18,
    views: 89,
  },
  {
    id: 3,
    store: "Tech Gadgets Pro",
    product: "Wireless Headphones",
    user: "Emma Wilson",
    type: "image",
    url: "/placeholder.svg?height=200&width=200&text=UGC+Photo+2",
    status: "rejected",
    flagged: true,
    source: "real",
    uploadDate: "2024-01-13",
    likes: 5,
    views: 42,
  },
  {
    id: 4,
    store: "Fitness Hub",
    product: "Resistance Bands Set",
    user: "AI Generated",
    type: "image",
    url: "/placeholder.svg?height=200&width=200&text=AI+Generated",
    status: "approved",
    flagged: false,
    source: "ai",
    uploadDate: "2024-01-12",
    likes: 31,
    views: 178,
  },
  {
    id: 5,
    store: "Home Decor Plus",
    product: "Modern Wall Art",
    user: "Lisa Thompson",
    type: "image",
    url: "/placeholder.svg?height=200&width=200&text=UGC+Photo+3",
    status: "pending",
    flagged: false,
    source: "real",
    uploadDate: "2024-01-11",
    likes: 12,
    views: 67,
  },
  {
    id: 6,
    store: "Beauty Essentials",
    product: "Skincare Bundle",
    user: "Anna Smith",
    type: "video",
    url: "/placeholder.svg?height=200&width=200&text=UGC+Video+2",
    status: "approved",
    flagged: false,
    source: "real",
    uploadDate: "2024-01-10",
    likes: 45,
    views: 234,
  },
]

export function AdminUGCPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [flaggedFilter, setFlaggedFilter] = useState("all")
  const [ugcList, setUgcList] = useState(ugcItems)

  const updateStatus = (itemId: number, newStatus: string) => {
    setUgcList((prev) => prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)))
  }

  const toggleFlagged = (itemId: number) => {
    setUgcList((prev) => prev.map((item) => (item.id === itemId ? { ...item, flagged: !item.flagged } : item)))
  }

  const filteredItems = ugcList.filter((item) => {
    const matchesSearch =
      item.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesSource = sourceFilter === "all" || item.source === sourceFilter
    const matchesFlagged =
      flaggedFilter === "all" ||
      (flaggedFilter === "flagged" && item.flagged) ||
      (flaggedFilter === "not-flagged" && !item.flagged)

    return matchesSearch && matchesStatus && matchesSource && matchesFlagged
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{ugcList.length}</p>
                <p className="text-sm text-gray-600">Total UGC</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {ugcList.filter((item) => item.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{ugcList.filter((item) => item.flagged).length}</p>
                <p className="text-sm text-gray-600">Flagged Content</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚩</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {ugcList.filter((item) => item.source === "ai").length}
                </p>
                <p className="text-sm text-gray-600">AI Generated</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter UGC Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search UGC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="real">Real User</SelectItem>
                <SelectItem value="ai">AI Generated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={flaggedFilter} onValueChange={setFlaggedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Flagged" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="flagged">Flagged Only</SelectItem>
                <SelectItem value="not-flagged">Not Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* UGC Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">UGC Content ({filteredItems.length})</CardTitle>
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

                    {/* Status Badge */}
                    <Badge
                      className={`absolute top-2 left-2 ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </Badge>

                    {/* Source Badge */}
                    <Badge
                      className={`absolute top-2 right-2 ${
                        item.source === "ai" ? "bg-accent/20 text-accent-foreground" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.source === "ai" ? "🤖 AI" : "👤 User"}
                    </Badge>

                    {/* Flagged Indicator */}
                    {item.flagged && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-red-500 text-white">🚩 Flagged</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.product}</h4>
                      <p className="text-xs text-gray-500">{item.store}</p>
                      <p className="text-xs text-gray-600">by {item.user}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>👁 {item.views}</span>
                        <span>❤️ {item.likes}</span>
                        <span>{item.uploadDate}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-1 pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(item.id, "approved")}
                          className="flex-1 text-xs h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(item.id, "rejected")}
                          className="flex-1 text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>

                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="flex-1 text-xs h-8 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFlagged(item.id)}
                          className={`flex-1 text-xs h-8 ${
                            item.flagged ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-gray-700"
                          } bg-transparent`}
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Flag
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-xs h-8 text-red-600 hover:text-red-700 bg-transparent"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
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
