"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Star, AlertTriangle, Settings, Zap } from "lucide-react"

const automationRules = [
  {
    id: 1,
    name: "Review Request Flow",
    description: "Automatically send review requests after delivery",
    type: "email",
    trigger: "order_delivered",
    delay: "3 days",
    enabled: true,
    stats: { sent: 1234, responses: 456 },
  },
  {
    id: 2,
    name: "Auto-Publish High Ratings",
    description: "Automatically publish reviews with 4+ stars",
    type: "publish",
    trigger: "review_received",
    condition: "rating >= 4",
    enabled: true,
    stats: { processed: 892, published: 743 },
  },
  {
    id: 3,
    name: "Low Rating Alert",
    description: "Send low-rated reviews to customer support",
    type: "alert",
    trigger: "review_received",
    condition: "rating <= 2",
    enabled: true,
    stats: { alerts: 23, resolved: 18 },
  },
  {
    id: 4,
    name: "Photo Review Incentive",
    description: "Send discount code for photo reviews",
    type: "incentive",
    trigger: "photo_review_received",
    reward: "10% discount",
    enabled: false,
    stats: { sent: 0, redeemed: 0 },
  },
]

export function AutomationPage() {
  const [rules, setRules] = useState(automationRules)
  const [selectedRule, setSelectedRule] = useState<number | null>(null)

  const toggleRule = (ruleId: number) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-gray-600">Review Requests Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">743</p>
                <p className="text-sm text-gray-600">Auto-Published Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">Support Alerts Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Automation Rules</CardTitle>
            <Button size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <Badge
                        variant={rule.enabled ? "default" : "secondary"}
                        className={rule.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                      >
                        {rule.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rule.description}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>
                        Trigger: <strong>{rule.trigger.replace("_", " ")}</strong>
                      </span>
                      {rule.delay && (
                        <span>
                          Delay: <strong>{rule.delay}</strong>
                        </span>
                      )}
                      {rule.condition && (
                        <span>
                          Condition: <strong>{rule.condition}</strong>
                        </span>
                      )}
                      {rule.reward && (
                        <span>
                          Reward: <strong>{rule.reward}</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-6 mt-3 text-sm">
                      {rule.stats.sent !== undefined && (
                        <span className="text-gray-600">
                          Sent: <strong>{rule.stats.sent}</strong>
                        </span>
                      )}
                      {rule.stats.responses !== undefined && (
                        <span className="text-gray-600">
                          Responses: <strong>{rule.stats.responses}</strong>
                        </span>
                      )}
                      {rule.stats.processed !== undefined && (
                        <span className="text-gray-600">
                          Processed: <strong>{rule.stats.processed}</strong>
                        </span>
                      )}
                      {rule.stats.published !== undefined && (
                        <span className="text-gray-600">
                          Published: <strong>{rule.stats.published}</strong>
                        </span>
                      )}
                      {rule.stats.alerts !== undefined && (
                        <span className="text-gray-600">
                          Alerts: <strong>{rule.stats.alerts}</strong>
                        </span>
                      )}
                      {rule.stats.resolved !== undefined && (
                        <span className="text-gray-600">
                          Resolved: <strong>{rule.stats.resolved}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Review Request Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Send review request after</label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email subject line</label>
              <Input defaultValue="How was your recent purchase?" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email message</label>
              <Textarea
                defaultValue="Hi there! We'd love to hear about your experience with your recent purchase. Your feedback helps us improve and helps other customers make informed decisions."
                rows={4}
              />
            </div>

            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Auto-Publish Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Auto-publish reviews with rating</label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 stars and above</SelectItem>
                  <SelectItem value="4">4 stars and above</SelectItem>
                  <SelectItem value="5">5 stars only</SelectItem>
                  <SelectItem value="manual">Manual approval only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Route low ratings to</label>
              <Select defaultValue="support">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="manager">Store Manager</SelectItem>
                  <SelectItem value="hide">Hide automatically</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Support email</label>
              <Input defaultValue="support@yourstore.com" />
            </div>

            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
