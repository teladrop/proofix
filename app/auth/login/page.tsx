"use client"

import { LoginPage } from "@/components/login-page"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handlePageChange = (page: string) => {
    switch (page) {
      case "signup":
        router.push("/auth/signup")
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

  return <LoginPage onPageChange={handlePageChange} />
}
