"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Code, Grid3X3, Sidebar, BadgeIcon } from "lucide-react"
import Image from "next/image"

const widgets = [
  {
    id: "carousel",
    name: "Review Carousel",
    description: "Horizontal scrolling reviews with photos",
    type: "carousel",
    enabled: true,
    placement: "product-page",
    preview: "/placeholder.svg?height=200&width=400&text=Review+Carousel+Widget",
  },
  {
    id: "grid",
    name: "Review Grid",
    description: "Grid layout of reviews and photos",
    type: "grid",
    enabled: true,
    placement: "homepage",
    preview: "/placeholder.svg?height=200&width=400&text=Review+Grid+Widget",
  },
  {
    id: "sidebar",
    name: "Review Sidebar",
    description: "Compact sidebar with latest reviews",
    type: "sidebar",
    enabled: false,
    placement: "all-pages",
    preview: "/placeholder.svg?height=200&width=400&text=Review+Sidebar+Widget",
  },
  {
    id: "floating",
    name: "Floating Badge",
    description: "Floating review count and rating badge",
    type: "badge",
    enabled: true,
    placement: "all-pages",
    preview: "/placeholder.svg?height=200&width=400&text=Floating+Badge+Widget",
  },
]

export function WidgetsPage() {
  const [selectedWidget, setSelectedWidget] = useState("carousel")
  const [widgetList, setWidgetList] = useState(widgets)

  const toggleWidget = (widgetId: string) => {
    setWidgetList((prev) =>
      prev.map((widget) => (widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget)),
    )
  }

  const selectedWidgetData = widgetList.find((w) => w.id === selectedWidget)

  return (
    <div className="space-y-6">
      {/* Widget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {widgetList.map((widget) => (
          <Card
            key={widget.id}
            className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              selectedWidget === widget.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedWidget(widget.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {widget.type === "carousel" && <Grid3X3 className="h-4 w-4 text-primary" />}
                  {widget.type === "grid" && <Grid3X3 className="h-4 w-4 text-primary" />}
                  {widget.type === "sidebar" && <Sidebar className="h-4 w-4 text-primary" />}
                  {widget.type === "badge" && <BadgeIcon className="h-4 w-4 text-primary" />}
                </div>
                <Switch
                  checked={widget.enabled}
                  onCheckedChange={() => toggleWidget(widget.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{widget.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{widget.description}</p>
              <Badge variant="secondary" className="text-xs">
                {widget.placement.replace("-", " ")}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Widget Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Preview: {selectedWidgetData?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <Image
                src={selectedWidgetData?.preview || "/placeholder.svg?height=200&width=400&text=Widget+Preview"}
                alt="Widget Preview"
                width={400}
                height={200}
                className="rounded-lg shadow-sm"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Live
              </Button>
              <Button size="sm" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Get Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Widget Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded border"></div>
                    <Input defaultValue="#5B2E91" className="flex-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded border"></div>
                    <Input defaultValue="#F9C80E" className="flex-1" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Border Radius</label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="4">Small</SelectItem>
                      <SelectItem value="8">Medium</SelectItem>
                      <SelectItem value="12">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Shadow</label>
                  <Select defaultValue="sm">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Maximum Reviews to Show</label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 reviews</SelectItem>
                      <SelectItem value="5">5 reviews</SelectItem>
                      <SelectItem value="10">10 reviews</SelectItem>
                      <SelectItem value="20">20 reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Show Photos</label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Show Reviewer Names</label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Show Dates</label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Rating to Display</label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 star and above</SelectItem>
                      <SelectItem value="2">2 stars and above</SelectItem>
                      <SelectItem value="3">3 stars and above</SelectItem>
                      <SelectItem value="4">4 stars and above</SelectItem>
                      <SelectItem value="5">5 stars only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="filters" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Enable Size Filtering</label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Enable Skin Type Filtering</label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Enable Product Category Filtering
                  </label>
                  <Switch />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Filter Tags</label>
                  <Input placeholder="Enter custom tags (comma separated)" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort Reviews By</label>
                  <Select defaultValue="newest">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Rating</SelectItem>
                      <SelectItem value="lowest">Lowest Rating</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2 mt-6">
              <Button className="flex-1">Save Changes</Button>
              <Button variant="outline">Reset to Default</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installation Code */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Installation Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            <div className="mb-2 text-gray-400">{"<!-- Add this code to your theme -->"}</div>
            <div>{'<div id="proofix-widget-' + selectedWidget + '"></div>'}</div>
            <div>{'<script src="https://cdn.proofix.com/widget.js"></script>'}</div>
            <div>{"<script>"}</div>
            <div className="ml-4">{"ProofixWidget.init({"}</div>
            <div className="ml-8">{'widgetId: "' + selectedWidget + '",'}</div>
            <div className="ml-8">{'apiKey: "your-api-key",'}</div>
            <div className="ml-8">{'theme: "custom"'}</div>
            <div className="ml-4">{"});"}</div>
            <div>{"</script>"}</div>
          </div>
          <Button size="sm" className="mt-3">
            <Code className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
