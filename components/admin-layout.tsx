"use client"

import type { ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Users,
  Store,
  MessageSquare,
  ImageIcon,
  Sparkles,
  FileText,
  CreditCard,
  HeadphonesIcon,
  Settings,
  Bell,
  User,
  LogOut,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface AdminLayoutProps {
  children: ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3, badge: null },
  { id: "users", name: "Users", icon: Users, badge: "1,247" },
  { id: "stores", name: "Stores", icon: Store, badge: "892" },
  { id: "reviews", name: "Reviews", icon: MessageSquare, badge: "12" },
  { id: "ugc", name: "UGC", icon: ImageIcon, badge: "5" },
  { id: "ai-content", name: "AI Content", icon: Sparkles, badge: "New" },
  { id: "reports", name: "Reports", icon: FileText, badge: null },
  { id: "billing", name: "Billing", icon: CreditCard, badge: "3" },
  { id: "support", name: "Support Requests", icon: HeadphonesIcon, badge: "8" },
  { id: "settings", name: "Settings", icon: Settings, badge: null },
]

export function AdminLayout({ children, currentPage, onPageChange }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
          <SidebarHeader className="border-b border-gray-100 p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Proofix</span>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Admin Dashboard
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Main Menu</div>
              <SidebarMenu className="space-y-1">
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onPageChange(item.id)}
                      isActive={currentPage === item.id}
                      className={`w-full justify-start h-11 px-3 rounded-lg transition-all duration-200 ${
                        currentPage === item.id
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${currentPage === item.id ? "text-white" : "text-gray-500"}`} />
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`ml-auto text-xs ${
                            currentPage === item.id
                              ? "bg-white/20 text-white border-white/30"
                              : item.badge === "New"
                                ? "bg-accent text-gray-900"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-4">
              <div className="text-sm font-medium text-green-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Status
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-700">API Health</span>
                  <span className="text-sm font-semibold text-green-900">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-700">Active Stores</span>
                  <span className="text-sm font-semibold text-green-900">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-700">Queue Status</span>
                  <span className="text-sm font-semibold text-green-900">Normal</span>
                </div>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-12 px-3 hover:bg-gray-100">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=AD" alt="Admin" />
                    <AvatarFallback className="bg-primary text-white text-sm">AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500">admin@proofix.com</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" side="top">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {navigation.find((nav) => nav.id === currentPage)?.name || "Dashboard"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentPage === "dashboard" && "System overview and key metrics"}
                    {currentPage === "users" && "Manage admin users and permissions"}
                    {currentPage === "stores" && "Monitor connected Shopify stores"}
                    {currentPage === "reviews" && "Moderate reviews across all stores"}
                    {currentPage === "ugc" && "Manage user-generated content"}
                    {currentPage === "ai-content" && "Monitor AI-generated content"}
                    {currentPage === "reports" && "Analytics and data exports"}
                    {currentPage === "billing" && "Billing and subscription management"}
                    {currentPage === "support" && "Customer support requests"}
                    {currentPage === "settings" && "System configuration"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">3</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=AD" alt="Admin" />
                        <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
