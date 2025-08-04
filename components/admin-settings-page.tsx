"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Key, Database, Shield, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@proofix.com",
    role: "super_admin",
    lastActive: "2 minutes ago",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@proofix.com",
    role: "admin",
    lastActive: "1 hour ago",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@proofix.com",
    role: "support",
    lastActive: "3 hours ago",
    status: "active",
  },
]

const apiKeys = [
  {
    id: 1,
    name: "Production API",
    key: "pk_live_1234567890abcdef",
    created: "2024-01-01",
    lastUsed: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Development API",
    key: "pk_test_abcdef1234567890",
    created: "2024-01-10",
    lastUsed: "2024-01-14",
    status: "active",
  },
]

export function AdminSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    newSignups: true,
    paymentFailures: true,
    systemAlerts: true,
    supportTickets: false,
    weeklyReports: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    newSignupsEnabled: true,
    aiContentEnabled: true,
    debugMode: false,
  })

  return (
    <div className="space-y-6">
      <Tabs defaultValue="admins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Admin User Management</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}`}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            user.role === "super_admin"
                              ? "bg-primary/10 text-primary"
                              : user.role === "admin"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {user.role.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Select defaultValue={user.role}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
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
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">New User Signups</p>
                  <p className="text-xs text-gray-500">Get notified when new users register</p>
                </div>
                <Switch
                  checked={emailNotifications.newSignups}
                  onCheckedChange={(checked) => setEmailNotifications((prev) => ({ ...prev, newSignups: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Failures</p>
                  <p className="text-xs text-gray-500">Alert when customer payments fail</p>
                </div>
                <Switch
                  checked={emailNotifications.paymentFailures}
                  onCheckedChange={(checked) =>
                    setEmailNotifications((prev) => ({ ...prev, paymentFailures: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">System Alerts</p>
                  <p className="text-xs text-gray-500">Critical system issues and downtime</p>
                </div>
                <Switch
                  checked={emailNotifications.systemAlerts}
                  onCheckedChange={(checked) => setEmailNotifications((prev) => ({ ...prev, systemAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Support Tickets</p>
                  <p className="text-xs text-gray-500">New support requests and escalations</p>
                </div>
                <Switch
                  checked={emailNotifications.supportTickets}
                  onCheckedChange={(checked) => setEmailNotifications((prev) => ({ ...prev, supportTickets: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-xs text-gray-500">Weekly summary of platform metrics</p>
                </div>
                <Switch
                  checked={emailNotifications.weeklyReports}
                  onCheckedChange={(checked) => setEmailNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Notification Email</label>
                    <Input defaultValue="admin@proofix.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Backup Email</label>
                    <Input defaultValue="alerts@proofix.com" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">API Key Management</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key.key}</code>
                          <Button variant="ghost" size="sm">
                            <Key className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">{key.created}</TableCell>
                      <TableCell className="text-gray-500">{key.lastUsed}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            Regenerate
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
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Temporarily disable the platform for maintenance</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Signups Enabled</p>
                    <p className="text-xs text-gray-500">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={systemSettings.newSignupsEnabled}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({ ...prev, newSignupsEnabled: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">AI Content Generation</p>
                    <p className="text-xs text-gray-500">Enable AI-powered content generation features</p>
                  </div>
                  <Switch
                    checked={systemSettings.aiContentEnabled}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, aiContentEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Debug Mode</p>
                    <p className="text-xs text-gray-500">Enable detailed logging for troubleshooting</p>
                  </div>
                  <Switch
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, debugMode: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Database className="h-6 w-6" />
                    <span>Backup Database</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Shield className="h-6 w-6" />
                    <span>Export User Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-lg font-semibold text-gray-900">Danger Zone</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Delete Store Data</h4>
                  <p className="text-sm text-red-800 mb-4">
                    Permanently delete all data for a specific store. This action cannot be undone.
                  </p>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter store domain to confirm" className="flex-1" />
                    <Button variant="destructive">Delete Store</Button>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Delete User Account</h4>
                  <p className="text-sm text-red-800 mb-4">
                    Permanently delete a user account and all associated data. This action cannot be undone.
                  </p>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter user email to confirm" className="flex-1" />
                    <Button variant="destructive">Delete User</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
