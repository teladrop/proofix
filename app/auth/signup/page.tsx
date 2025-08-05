"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main installation page
    router.push('/')
  }, [router])

  return null
}
