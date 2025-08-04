"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Key, Palette, Download, Trash2 } from "lucide-react"
import Image from "next/image"

const integrations = [
  {
    id: "shopify",
    name: "Shopify",
    description: "Sync products and orders from your Shopify store",
    status: "connected",
    icon: "/placeholder.svg?height=40&width=40&text=S",
  },
  {
    id: "loox",
    name: "Loox",
    description: "Import existing reviews from Loox",
    status: "available",
    icon: "/placeholder.svg?height=40&width=40&text=L",
  },
  {
    id: "judgeme",
    name: "Judge.me",
    description: "Import existing reviews from Judge.me",
    status: "available",
    icon: "/placeholder.svg?height=40&width=40&text=J",
  },
  {
    id: "yotpo",
    name: "Yotpo",
    description: "Import existing reviews from Yotpo",
    status: "available",
    icon: "/placeholder.svg?height=40&width=40&text=Y",
  },
]

export function SettingsPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [integrationList, setIntegrationList] = useState(integrations)

  const connectIntegration = (integrationId: string) => {
    setIntegrationList((prev) =>
      prev.map((integration) =>
        integration.id === integrationId ? { ...integration, status: "connected" } : integration,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="data">Data & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          {/* Logo Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Brand Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  {logoFile ? (
                    <Image
                      src={URL.createObjectURL(logoFile) || "/placeholder.svg"}
                      alt="Logo preview"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">Upload your logo</p>
                  <p className="text-xs text-gray-500 mb-2">PNG, JPG up to 2MB. Recommended size: 200x200px</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload">
                    <Button size="sm" variant="outline" className="cursor-pointer bg-transparent">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Colors */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Theme Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg border"></div>
                  <Input defaultValue="#5B2E91" className="flex-1" />
                  <Button size="sm" variant="outline">
                    <Palette className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Accent Color</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-lg border"></div>
                  <Input defaultValue="#F9C80E" className="flex-1" />
                  <Button size="sm" variant="outline">
                    <Palette className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Font Family</label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="satoshi">Satoshi</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="custom">Custom Font</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Show Proofix Branding</p>
                  <p className="text-xs text-gray-500">Display "Powered by Proofix" on widgets</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Round Corners</p>
                  <p className="text-xs text-gray-500">Use rounded corners on all widgets</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Drop Shadows</p>
                  <p className="text-xs text-gray-500">Add subtle shadows to widgets</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Review Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationList.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={integration.status === "connected" ? "default" : "secondary"}
                        className={
                          integration.status === "connected"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {integration.status === "connected" ? "Connected" : "Available"}
                      </Badge>
                      <Button
                        size="sm"
                        variant={integration.status === "connected" ? "outline" : "default"}
                        onClick={() => integration.status === "available" && connectIntegration(integration.id)}
                      >
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">API Key</label>
                <div className="flex items-center space-x-2">
                  <Input type="password" defaultValue="pk_live_1234567890abcdef" className="flex-1 font-mono text-sm" />
                  <Button size="sm" variant="outline">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Keep this key secure and don't share it publicly</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Webhook URL</label>
                <Input defaultValue="https://yourstore.com/webhooks/proofix" />
                <p className="text-xs text-gray-500 mt-1">Receive real-time notifications for new reviews</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Rate Limiting</label>
                <Select defaultValue="1000">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/hour</SelectItem>
                    <SelectItem value="500">500 requests/hour</SelectItem>
                    <SelectItem value="1000">1,000 requests/hour</SelectItem>
                    <SelectItem value="5000">5,000 requests/hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-4">Download your reviews and UGC content</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reviews (CSV)
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export UGC (ZIP)
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-2">Data Retention</h4>
                <p className="text-sm text-gray-600 mb-4">Configure how long to keep your data</p>
                <Select defaultValue="forever">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-gray-600 mb-4">Permanently delete all your data</p>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
