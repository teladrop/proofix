"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { AdminDashboardOverview } from "@/components/admin-dashboard-overview"
import { AdminUsersPage } from "@/components/admin-users-page"
import { AdminStoresPage } from "@/components/admin-stores-page"
import { AdminReviewsPage } from "@/components/admin-reviews-page"
import { AdminUGCPage } from "@/components/admin-ugc-page"
import { AdminAIContentPage } from "@/components/admin-ai-content-page"
import { AdminReportsPage } from "@/components/admin-reports-page"
import { AdminBillingPage } from "@/components/admin-billing-page"
import { AdminSupportPage } from "@/components/admin-support-page"
import { AdminSettingsPage } from "@/components/admin-settings-page"

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboardOverview />
      case "users":
        return <AdminUsersPage />
      case "stores":
        return <AdminStoresPage />
      case "reviews":
        return <AdminReviewsPage />
      case "ugc":
        return <AdminUGCPage />
      case "ai-content":
        return <AdminAIContentPage />
      case "reports":
        return <AdminReportsPage />
      case "billing":
        return <AdminBillingPage />
      case "support":
        return <AdminSupportPage />
      case "settings":
        return <AdminSettingsPage />
      default:
        return <AdminDashboardOverview />
    }
  }

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  )
}
