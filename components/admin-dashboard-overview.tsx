"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Store, MessageSquare, ImageIcon, TrendingUp, AlertTriangle, Activity } from "lucide-react"

const summaryCards = [
  {
    title: "Total Users",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Total Stores",
    value: "892",
    change: "+8%",
    changeType: "positive" as const,
    icon: Store,
  },
  {
    title: "Monthly Active Users",
    value: "734",
    change: "+15%",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Review Volume",
    value: "45.2K",
    change: "+23%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    title: "UGC Generated",
    value: "12.8K",
    change: "+31%",
    changeType: "positive" as const,
    icon: ImageIcon,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "user_signup",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    action: "New user signup",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "flagged_content",
    user: "Mike Chen",
    email: "mike@store.com",
    action: "Review flagged for inappropriate content",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 3,
    type: "store_connected",
    user: "Emma Wilson",
    email: "emma@fashion.com",
    action: "Connected new Shopify store",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "billing_issue",
    user: "David Rodriguez",
    email: "david@tech.com",
    action: "Payment failed - subscription suspended",
    time: "2 hours ago",
    status: "error",
  },
  {
    id: 5,
    type: "ai_content",
    user: "Lisa Thompson",
    email: "lisa@beauty.com",
    action: "Generated 50 AI review summaries",
    time: "3 hours ago",
    status: "success",
  },
]

export function AdminDashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">{card.change}</span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Showing signup & review activity trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex space-x-3 p-3 rounded-lg bg-gray-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32&text=${activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}`}
                    alt={activity.user}
                  />
                  <AvatarFallback className="text-xs">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.user}</p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        activity.status === "success"
                          ? "bg-green-100 text-green-700"
                          : activity.status === "warning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activity.status === "success" ? "✓" : activity.status === "warning" ? "⚠" : "✗"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{activity.email}</p>
                  <p className="text-sm text-gray-700">{activity.action}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="border-0 shadow-sm border-l-4 border-l-yellow-500">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg font-semibold text-gray-900">System Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800">High AI Usage Detected</p>
                <p className="text-xs text-yellow-700">Store "Fashion Forward" has generated 500+ AI images today</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Monitor
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-800">Payment Failures</p>
                <p className="text-xs text-red-700">3 stores have failed payments requiring attention</p>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Action Required
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
