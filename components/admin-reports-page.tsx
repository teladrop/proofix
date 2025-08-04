"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, DollarSign, Users, Store } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const reportData = {
  overview: {
    totalRevenue: "$45,230",
    totalStores: 892,
    activeUsers: 734,
    aiUsage: "$2,340",
  },
  storeBreakdown: [
    {
      store: "Fashion Forward",
      plan: "Growth",
      revenue: "$79",
      aiUsage: "$12.50",
      reviews: 1247,
      ugc: 89,
      status: "active",
    },
    {
      store: "Beauty Essentials",
      plan: "Scale",
      revenue: "$199",
      aiUsage: "$45.20",
      reviews: 2156,
      ugc: 156,
      status: "active",
    },
    {
      store: "Tech Gadgets Pro",
      plan: "Starter",
      revenue: "$29",
      aiUsage: "$3.80",
      reviews: 456,
      ugc: 23,
      status: "inactive",
    },
    {
      store: "Fitness Hub",
      plan: "Growth",
      revenue: "$79",
      aiUsage: "$18.90",
      reviews: 1834,
      ugc: 134,
      status: "active",
    },
    {
      store: "Home Decor Plus",
      plan: "Trial",
      revenue: "$0",
      aiUsage: "$0",
      reviews: 89,
      ugc: 12,
      status: "trial",
    },
  ],
  billingBreakdown: [
    {
      plan: "Starter",
      stores: 234,
      revenue: "$6,786",
      percentage: 15,
    },
    {
      plan: "Growth",
      stores: 456,
      revenue: "$36,024",
      percentage: 80,
    },
    {
      plan: "Scale",
      stores: 89,
      revenue: "$17,711",
      percentage: 39,
    },
    {
      plan: "Trial",
      stores: 113,
      revenue: "$0",
      percentage: 0,
    },
  ],
}

export function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [storeFilter, setStoreFilter] = useState("all")

  const exportReport = (type: string) => {
    // Simulate export functionality
    console.log(`Exporting ${type} report...`)
  }

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Report Filters</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => exportReport("overview")}>
                <Download className="h-4 w-4 mr-2" />
                Export Overview
              </Button>
              <Button variant="outline" onClick={() => exportReport("detailed")}>
                <Download className="h-4 w-4 mr-2" />
                Export Detailed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Store Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="trial">Trial Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalRevenue}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalStores}</p>
                <p className="text-sm text-gray-600">Total Stores</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.activeUsers}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+15%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.aiUsage}</p>
                <p className="text-sm text-gray-600">AI Usage Cost</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+31%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="stores" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stores">Store Breakdown</TabsTrigger>
          <TabsTrigger value="billing">Billing Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="stores">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Store Performance</CardTitle>
                <Button variant="outline" onClick={() => exportReport("stores")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>AI Usage</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>UGC</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.storeBreakdown.map((store, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{store.store}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            store.plan === "Scale"
                              ? "bg-primary/10 text-primary"
                              : store.plan === "Growth"
                                ? "bg-accent/20 text-accent-foreground"
                                : store.plan === "Trial"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                          }
                        >
                          {store.plan}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{store.revenue}</TableCell>
                      <TableCell>{store.aiUsage}</TableCell>
                      <TableCell>{store.reviews.toLocaleString()}</TableCell>
                      <TableCell>{store.ugc}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            store.status === "active"
                              ? "bg-green-100 text-green-700"
                              : store.status === "trial"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {store.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Billing Breakdown</CardTitle>
                <Button variant="outline" onClick={() => exportReport("billing")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  {reportData.billingBreakdown.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{plan.plan} Plan</h4>
                        <p className="text-sm text-gray-600">{plan.stores} stores</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{plan.revenue}</p>
                        <p className="text-sm text-gray-600">{plan.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Revenue Chart</p>
                    <p className="text-sm text-gray-400">Plan distribution visualization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
