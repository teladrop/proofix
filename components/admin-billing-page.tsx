"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Eye, AlertTriangle, CreditCard, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const billingData = [
  {
    id: 1,
    store: "Fashion Forward",
    plan: "Growth",
    amount: "$79",
    status: "active",
    lastCharge: "2024-01-15",
    nextBilling: "2024-02-15",
    paymentMethod: "•••• 4242",
  },
  {
    id: 2,
    store: "Beauty Essentials",
    plan: "Scale",
    amount: "$199",
    status: "active",
    lastCharge: "2024-01-10",
    nextBilling: "2024-02-10",
    paymentMethod: "•••• 5555",
  },
  {
    id: 3,
    store: "Tech Gadgets Pro",
    plan: "Starter",
    amount: "$29",
    status: "overdue",
    lastCharge: "2024-01-08",
    nextBilling: "2024-02-08",
    paymentMethod: "•••• 1234",
  },
  {
    id: 4,
    store: "Fitness Hub",
    plan: "Growth",
    amount: "$79",
    status: "active",
    lastCharge: "2024-01-05",
    nextBilling: "2024-02-05",
    paymentMethod: "•••• 9876",
  },
  {
    id: 5,
    store: "Home Decor Plus",
    plan: "Trial",
    amount: "$0",
    status: "trial",
    lastCharge: "N/A",
    nextBilling: "2024-01-27",
    paymentMethod: "No card",
  },
  {
    id: 6,
    store: "Outdoor Gear Co",
    plan: "Growth",
    amount: "$79",
    status: "cancelled",
    lastCharge: "2024-01-01",
    nextBilling: "N/A",
    paymentMethod: "•••• 7890",
  },
]

export function AdminBillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBilling = billingData.filter((item) => {
    const matchesSearch = item.store.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = planFilter === "all" || item.plan === planFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesPlan && matchesStatus
  })

  const totalRevenue = billingData
    .filter((item) => item.status === "active")
    .reduce((sum, item) => sum + Number.parseFloat(item.amount.replace("$", "")), 0)

  const overdueCount = billingData.filter((item) => item.status === "overdue").length
  const trialCount = billingData.filter((item) => item.status === "trial").length
  const activeCount = billingData.filter((item) => item.status === "active").length

  return (
    <div className="space-y-6">
      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
                <p className="text-sm text-gray-600">Overdue Payments</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{trialCount}</p>
                <p className="text-sm text-gray-600">Trial Accounts</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🆓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Growth">Growth</SelectItem>
                <SelectItem value="Scale">Scale</SelectItem>
                <SelectItem value="Trial">Trial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Billing Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Billing Overview ({filteredBilling.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Charge</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBilling.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.store}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        item.plan === "Scale"
                          ? "bg-primary/10 text-primary"
                          : item.plan === "Growth"
                            ? "bg-accent/20 text-accent-foreground"
                            : item.plan === "Trial"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }
                    >
                      {item.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "trial"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "overdue"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{item.lastCharge}</TableCell>
                  <TableCell className="text-gray-600">{item.nextBilling}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{item.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === "overdue" && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overdue Alerts */}
      {overdueCount > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg font-semibold text-gray-900">Payment Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingData
                .filter((item) => item.status === "overdue")
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-red-800">{item.store}</p>
                      <p className="text-xs text-red-700">
                        Payment of {item.amount} overdue since {item.lastCharge}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                        Suspend Account
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
