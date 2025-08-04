"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const supportTickets = [
  {
    id: 1,
    subject: "Unable to import reviews from Shopify",
    user: "Sarah Johnson",
    email: "sarah@fashionforward.com",
    store: "Fashion Forward",
    status: "open",
    priority: "high",
    category: "technical",
    created: "2024-01-15 14:30",
    lastReply: "2024-01-15 16:45",
    messages: 3,
  },
  {
    id: 2,
    subject: "Billing question about plan upgrade",
    user: "Mike Chen",
    email: "mike@beautyessentials.com",
    store: "Beauty Essentials",
    status: "pending",
    priority: "medium",
    category: "billing",
    created: "2024-01-14 10:20",
    lastReply: "2024-01-14 11:30",
    messages: 2,
  },
  {
    id: 3,
    subject: "Widget not displaying on product page",
    user: "Emma Wilson",
    email: "emma@techgadgets.com",
    store: "Tech Gadgets Pro",
    status: "resolved",
    priority: "medium",
    category: "technical",
    created: "2024-01-13 09:15",
    lastReply: "2024-01-13 15:20",
    messages: 5,
  },
  {
    id: 4,
    subject: "Request for custom integration",
    user: "David Rodriguez",
    email: "david@fitnesshub.com",
    store: "Fitness Hub",
    status: "open",
    priority: "low",
    category: "feature_request",
    created: "2024-01-12 16:45",
    lastReply: "2024-01-12 17:30",
    messages: 1,
  },
  {
    id: 5,
    subject: "Account suspension appeal",
    user: "Lisa Thompson",
    email: "lisa@homedecor.com",
    store: "Home Decor Plus",
    status: "escalated",
    priority: "high",
    category: "account",
    created: "2024-01-11 13:20",
    lastReply: "2024-01-11 14:45",
    messages: 4,
  },
]

export function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.store.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const openCount = supportTickets.filter((ticket) => ticket.status === "open").length
  const pendingCount = supportTickets.filter((ticket) => ticket.status === "pending").length
  const escalatedCount = supportTickets.filter((ticket) => ticket.status === "escalated").length

  const updateTicketStatus = (ticketId: number, newStatus: string) => {
    // Update ticket status logic
    console.log(`Updating ticket ${ticketId} to ${newStatus}`)
  }

  const sendReply = () => {
    if (replyText.trim()) {
      console.log(`Sending reply: ${replyText}`)
      setReplyText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{openCount}</p>
                <p className="text-sm text-gray-600">Open Tickets</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending Response</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{escalatedCount}</p>
                <p className="text-sm text-gray-600">Escalated</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {supportTickets.filter((t) => t.status === "resolved").length}
                </p>
                <p className="text-sm text-gray-600">Resolved Today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="account">Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Support Tickets */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Support Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${ticket.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}`}
                        alt={ticket.user}
                      />
                      <AvatarFallback>
                        {ticket.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{ticket.subject}</h4>
                        <Badge
                          variant="secondary"
                          className={
                            ticket.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : ticket.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {ticket.user} • {ticket.store}
                      </p>
                      <p className="text-xs text-gray-500">{ticket.email}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Created: {ticket.created}</span>
                        <span>Last reply: {ticket.lastReply}</span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{ticket.messages} messages</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="secondary"
                      className={
                        ticket.status === "open"
                          ? "bg-red-100 text-red-700"
                          : ticket.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : ticket.status === "escalated"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                      }
                    >
                      {ticket.status}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {ticket.category.replace("_", " ")}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket.id)}>
                          View & Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{ticket.subject}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`/placeholder.svg?height=32&width=32&text=${ticket.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}`}
                                  alt={ticket.user}
                                />
                                <AvatarFallback>
                                  {ticket.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{ticket.user}</p>
                                <p className="text-sm text-gray-600">{ticket.store}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Select
                                defaultValue={ticket.status}
                                onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="escalated">Escalated</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-4 max-h-60 overflow-y-auto">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-900">{ticket.user}</span>
                                <span className="text-xs text-blue-700">{ticket.created}</span>
                              </div>
                              <p className="text-sm text-blue-800">
                                Hi, I'm having trouble importing reviews from my Shopify store. The import seems to get
                                stuck at 50% and never completes. I've tried multiple times but the same issue persists.
                                Can you please help me resolve this?
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">Support Team</span>
                                <span className="text-xs text-gray-700">{ticket.lastReply}</span>
                              </div>
                              <p className="text-sm text-gray-800">
                                Thank you for reaching out. I can see the issue with your import process. This typically
                                happens when there are special characters in the review data. I'm escalating this to our
                                technical team for a quick resolution.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Reply to customer:</label>
                            <Textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type your reply here..."
                              rows={4}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setReplyText("")}>
                                Cancel
                              </Button>
                              <Button onClick={sendReply}>
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
