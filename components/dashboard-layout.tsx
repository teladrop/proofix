"use client"

import type { ReactNode } from "react"
import { useState } from "react"
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
  MessageSquare,
  ImageIcon,
  Zap,
  Code,
  Settings,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DashboardLayoutProps {
  children: ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3, badge: null },
  { id: "reviews", name: "Reviews", icon: MessageSquare, badge: "2,847" },
  { id: "ugc-gallery", name: "UGC Gallery", icon: ImageIcon, badge: "456" },
  { id: "ugc-generator", name: "UGC Generator", icon: Sparkles, badge: "New" },
  { id: "automation", name: "Automation", icon: Zap, badge: null },
  { id: "widgets", name: "Widgets", icon: Code, badge: null },
  { id: "settings", name: "Settings", icon: Settings, badge: null },
]

export function DashboardLayout({ children, currentPage, onPageChange }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <Sidebar
            className={`border-r border-gray-200 bg-white shadow-sm transition-all duration-300 flex-shrink-0 ${isCollapsed ? 'w-16' : 'w-64'
              }`}
          >
            <SidebarHeader className={`border-b border-gray-100 p-4 bg-gradient-to-r from-primary/5 to-accent/5 ${isCollapsed ? 'px-2' : 'px-6'
              }`}>
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                {!isCollapsed && (
                  <div>
                    <span className="text-xl font-bold text-gray-900">Proofix</span>
                    <div className="text-xs text-gray-500">Review Management</div>
                  </div>
                )}
              </div>
            </SidebarHeader>

            <SidebarContent className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
              <div className="mb-6">
                {!isCollapsed && (
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                    Main Menu
                  </div>
                )}
                <SidebarMenu className="space-y-1">
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            onClick={() => onPageChange(item.id)}
                            isActive={currentPage === item.id}
                            className={`w-full justify-start h-11 rounded-lg transition-all duration-200 group ${isCollapsed ? 'px-2 justify-center' : 'px-3'
                              } ${currentPage === item.id
                                ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${currentPage === item.id ? "text-white" : "text-gray-500 group-hover:text-gray-900"
                                }`}
                            />
                            {!isCollapsed && (
                              <>
                                <span className="font-medium">{item.name}</span>
                                {item.badge && (
                                  <Badge
                                    variant="secondary"
                                    className={`ml-auto text-xs ${currentPage === item.id
                                        ? "bg-white/20 text-white border-white/30"
                                        : item.badge === "New"
                                          ? "bg-accent text-gray-900"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right" className="font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{item.name}</span>
                              {item.badge && (
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${item.badge === "New"
                                      ? "bg-accent text-gray-900"
                                      : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>

              {/* Quick Stats - Only show when expanded */}
              {!isCollapsed && (
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">This Month</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">New Reviews</span>
                      <span className="text-sm font-semibold text-gray-900">+247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Avg Rating</span>
                      <span className="text-sm font-semibold text-gray-900">4.6 ⭐</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Response Rate</span>
                      <span className="text-sm font-semibold text-green-600">87%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Section - Only show when expanded */}
              {!isCollapsed && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Need Help?</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Check our documentation or contact support for assistance.</p>
                  <Button size="sm" variant="outline" className="w-full text-xs h-8 bg-transparent">
                    View Docs
                  </Button>
                </div>
              )}
            </SidebarContent>

            <SidebarFooter className={`border-t border-gray-100 p-4 ${isCollapsed ? 'px-2' : ''}`}>
              {/* Collapse Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`w-full mb-2 ${isCollapsed ? 'px-2 justify-center' : 'px-3 justify-start'}`}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    <span className="text-xs">Collapse</span>
                  </>
                )}
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`w-full justify-start h-12 hover:bg-gray-100 ${isCollapsed ? 'px-2 justify-center' : 'px-3'
                    }`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
                      <AvatarFallback className="bg-primary text-white text-sm">JD</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="flex-1 text-left ml-3">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                        <div className="text-xs text-gray-500">john@example.com</div>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" side="top">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
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

          <SidebarInset className="flex-1 min-w-0">
            <header className="border-b border-gray-200 bg-white shadow-sm">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">
                      {navigation.find((nav) => nav.id === currentPage)?.name || "Dashboard"}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {currentPage === "dashboard" && "Overview of your review performance"}
                      {currentPage === "reviews" && "Manage and moderate customer reviews"}
                      {currentPage === "ugc-gallery" && "Curate user-generated content"}
                      {currentPage === "ugc-generator" && "Generate AI-powered user content"}
                      {currentPage === "automation" && "Set up automated review workflows"}
                      {currentPage === "widgets" && "Customize review display widgets"}
                      {currentPage === "settings" && "Configure your account settings"}
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
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
                          <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
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

            <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-x-auto min-w-0">
              <div className="w-full">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
