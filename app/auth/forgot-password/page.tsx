"use client"

import { ForgotPasswordPage } from "@/components/forgot-password-page"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const router = useRouter()

  const handlePageChange = (page: string) => {
    switch (page) {
      case "login":
        router.push("/auth/login")
        break
      case "signup":
        router.push("/auth/signup")
        break
      default:
        break
    }
  }

  return <ForgotPasswordPage onPageChange={handlePageChange} />
}
