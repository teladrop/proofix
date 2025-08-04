"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ReviewsPage } from "@/components/reviews-page"
import { UGCGalleryPage } from "@/components/ugc-gallery-page"
import { UGCGeneratorPage } from "@/components/ugc-generator-page"
import { AutomationPage } from "@/components/automation-page"
import { WidgetsPage } from "@/components/widgets-page"
import { SettingsPage } from "@/components/settings-page"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "reviews":
        return <ReviewsPage />
      case "ugc-gallery":
        return <UGCGalleryPage />
      case "ugc-generator":
        return <UGCGeneratorPage />
      case "automation":
        return <AutomationPage />
      case "widgets":
        return <WidgetsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  )
}
