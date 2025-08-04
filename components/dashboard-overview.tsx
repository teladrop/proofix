"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Star, TrendingUp, MessageSquare, Eye, ShoppingBag, ArrowUpRight, ArrowDownRight, Target } from "lucide-react"

const chartData = [
  { month: "Jul", reviews: 45 },
  { month: "Aug", reviews: 52 },
  { month: "Sep", reviews: 61 },
  { month: "Oct", reviews: 73 },
  { month: "Nov", reviews: 89 },
  { month: "Dec", reviews: 94 },
]

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--primary))",
  },
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">+0.2</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <div className="flex items-center mt-1">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">-3.2%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Views</p>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">+18.7%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review Trends Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Review Trends</CardTitle>
            <p className="text-sm text-gray-600">Monthly review collection over time</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-reviews)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-reviews)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      height={30}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="reviews"
                      stroke="var(--color-reviews)"
                      fillOpacity={1}
                      fill="url(#colorReviews)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Rating Distribution</CardTitle>
            <p className="text-sm text-gray-600">Breakdown of customer ratings</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[
                { stars: 5, count: 1847, percentage: 65 },
                { stars: 4, count: 623, percentage: 22 },
                { stars: 3, count: 256, percentage: 9 },
                { stars: 2, count: 85, percentage: 3 },
                { stars: 1, count: 36, percentage: 1 },
              ].map((rating) => (
                <div key={rating.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium text-gray-700">{rating.stars}</span>
                    <Star className="h-4 w-4 text-accent fill-accent" />
                  </div>
                  <div className="flex-1">
                    <Progress value={rating.percentage} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600 w-16 text-right">{rating.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Reviews</CardTitle>
              <p className="text-sm text-gray-600">Latest customer feedback</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[
                {
                  customer: "Sarah Johnson",
                  rating: 5,
                  product: "Premium Skincare Set",
                  time: "2 hours ago",
                  preview: "Amazing product quality! I've been using this for 3 months...",
                },
                {
                  customer: "Mike Chen",
                  rating: 4,
                  product: "Wireless Headphones",
                  time: "5 hours ago",
                  preview: "Good value for money. Solid product with good build quality...",
                },
                {
                  customer: "Emma Wilson",
                  rating: 5,
                  product: "Smart Fitness Tracker",
                  time: "1 day ago",
                  preview: "Exceeded expectations. This product has completely transformed...",
                },
              ].map((review, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "text-accent fill-accent" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{review.customer}</p>
                      <span className="text-xs text-gray-500">{review.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{review.product}</p>
                    <p className="text-sm text-gray-700 truncate">{review.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Import Reviews</div>
                  <div className="text-xs text-gray-500">Add reviews from external sources</div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <Eye className="h-5 w-5 mr-3 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Review Pending ({23})</div>
                  <div className="text-xs text-gray-500">Moderate awaiting reviews</div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <ShoppingBag className="h-5 w-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Widget Setup</div>
                  <div className="text-xs text-gray-500">Configure review displays</div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <TrendingUp className="h-5 w-5 mr-3 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Analytics Report</div>
                  <div className="text-xs text-gray-500">View detailed performance metrics</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals & Targets */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Monthly Goals</CardTitle>
          <p className="text-sm text-gray-600">Track your progress towards monthly targets</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">New Reviews</span>
                <span className="text-sm text-gray-600">94 / 100</span>
              </div>
              <Progress value={94} className="h-2" />
              <p className="text-xs text-gray-500">6 more to reach monthly goal</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Response Rate</span>
                <span className="text-sm text-gray-600">87% / 90%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-gray-500">3% more to reach target</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Rating</span>
                <span className="text-sm text-gray-600">4.6 / 4.5</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-green-600">Goal achieved! 🎉</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
