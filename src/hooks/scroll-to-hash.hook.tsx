'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const useScrollToSection = (hashId: string) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const currentHash = window.location.hash
    if (currentHash !== hashId) return

    const el = document.querySelector(hashId)
    if (!el) return

    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [pathname, searchParams, hashId])
}
