"use client"

import { SignupPage } from "@/components/signup-page"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()

  const handlePageChange = (page: string) => {
    switch (page) {
      case "login":
        router.push("/auth/login")
        break
      case "forgot-password":
        router.push("/auth/forgot-password")
        break
      case "dashboard":
        router.push("/dashboard")
        break
      default:
        break
    }
  }

  return <SignupPage onPageChange={handlePageChange} />
}
