'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollToTop() {
  const pathname = usePathname()

  // useEffect(() => {
  //   const disabledRoutes = ['']

  //   if (!disabledRoutes.includes(pathname)) {
  //     window.scrollTo({ top: 0, behavior: 'smooth' })
  //   }
  // }, [pathname])

  useEffect(() => {
    const disabledRoutes = ['']

    if (!disabledRoutes.includes(pathname)) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }, [pathname])

  return null
}
