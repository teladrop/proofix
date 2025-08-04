"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Eye, RotateCcw, Ban, Trash2, Sparkles } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const aiContent = [
  {
    id: 1,
    store: "Fashion Forward",
    type: "image",
    prompt: "Woman wearing summer dress in park, natural lighting, happy expression",
    generatedAt: "2024-01-15 14:30",
    status: "approved",
    usage: "product_page",
    model: "DALL-E 3",
    cost: "$0.04",
  },
  {
    id: 2,
    store: "Beauty Essentials",
    type: "text",
    prompt: "Write a positive review for organic face serum, mention skin improvement",
    generatedAt: "2024-01-15 12:15",
    status: "approved",
    usage: "review_summary",
    model: "GPT-4",
    cost: "$0.02",
  },
  {
    id: 3,
    store: "Tech Gadgets Pro",
    type: "image",
    prompt: "Person using wireless headphones while working out, gym setting",
    generatedAt: "2024-01-14 16:45",
    status: "blocked",
    usage: "ugc_gallery",
    model: "Midjourney",
    cost: "$0.08",
  },
  {
    id: 4,
    store: "Fitness Hub",
    type: "text",
    prompt: "Generate product description for resistance bands set, focus on versatility",
    generatedAt: "2024-01-14 10:20",
    status: "pending",
    usage: "product_description",
    model: "GPT-4",
    cost: "$0.03",
  },
  {
    id: 5,
    store: "Home Decor Plus",
    type: "image",
    prompt: "Modern living room with wall art, minimalist style, natural light",
    generatedAt: "2024-01-13 18:30",
    status: "approved",
    usage: "lifestyle_photo",
    model: "DALL-E 3",
    cost: "$0.04",
  },
]

export function AdminAIContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [storeFilter, setStoreFilter] = useState("all")
  const [contentList, setContentList] = useState(aiContent)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  const updateStatus = (itemId: number, newStatus: string) => {
    setContentList((prev) => prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)))
  }

  const filteredContent = contentList.filter((item) => {
    const matchesSearch =
      item.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesStore = storeFilter === "all" || item.store === storeFilter

    return matchesSearch && matchesType && matchesStatus && matchesStore
  })

  const uniqueStores = [...new Set(aiContent.map((item) => item.store))]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{contentList.length}</p>
                <p className="text-sm text-gray-600">Total Generated</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contentList.filter((item) => item.type === "image").length}
                </p>
                <p className="text-sm text-gray-600">Images</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contentList.filter((item) => item.type === "text").length}
                </p>
                <p className="text-sm text-gray-600">Text Content</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {contentList.reduce((sum, item) => sum + Number.parseFloat(item.cost.replace("$", "")), 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Cost</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter AI Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {uniqueStores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Content Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            AI Generated Content ({filteredContent.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Prompt</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.store}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={item.type === "image" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}
                    >
                      {item.type === "image" ? "🖼️ Image" : "📝 Text"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 truncate">{item.prompt}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
                            onClick={() => setSelectedPrompt(item.prompt)}
                          >
                            View full prompt
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Full Prompt</DialogTitle>
                          </DialogHeader>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-900">{selectedPrompt}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {item.model}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.cost}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{item.generatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStatus(item.id, "blocked")}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Ban className="h-4 w-4" />
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
