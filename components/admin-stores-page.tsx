"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Eye, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stores = [
  {
    id: 1,
    name: "Fashion Forward",
    domain: "fashionforward.myshopify.com",
    status: "active",
    plan: "Growth",
    installDate: "2024-01-15",
    monthlyRevenue: "$2,450",
    reviewCount: 1247,
  },
  {
    id: 2,
    name: "Beauty Essentials",
    domain: "beautyessentials.com",
    status: "active",
    plan: "Scale",
    installDate: "2024-01-10",
    monthlyRevenue: "$4,890",
    reviewCount: 2156,
  },
  {
    id: 3,
    name: "Tech Gadgets Pro",
    domain: "techgadgets.myshopify.com",
    status: "inactive",
    plan: "Starter",
    installDate: "2024-01-08",
    monthlyRevenue: "$890",
    reviewCount: 456,
  },
  {
    id: 4,
    name: "Fitness Hub",
    domain: "fitnesshub.com",
    status: "active",
    plan: "Growth",
    installDate: "2024-01-05",
    monthlyRevenue: "$3,200",
    reviewCount: 1834,
  },
  {
    id: 5,
    name: "Home Decor Plus",
    domain: "homedecorplus.myshopify.com",
    status: "trial",
    plan: "Trial",
    installDate: "2024-01-20",
    monthlyRevenue: "$0",
    reviewCount: 89,
  },
]

export function AdminStoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || store.status === statusFilter
    const matchesPlan = planFilter === "all" || store.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter Stores</CardTitle>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Stores ({filteredStores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Install Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{store.name}</div>
                      <div className="text-sm text-gray-500">{store.domain}</div>
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        store.plan === "Scale"
                          ? "bg-primary/10 text-primary"
                          : store.plan === "Growth"
                            ? "bg-accent/20 text-accent-foreground"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {store.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{store.monthlyRevenue}</TableCell>
                  <TableCell>{store.reviewCount.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-500">{store.installDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
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
