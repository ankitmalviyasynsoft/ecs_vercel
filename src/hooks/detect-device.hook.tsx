// hooks/useDevice.ts
'use client'

import { useEffect, useState } from 'react'

// Tailwind's default breakpoints (adjust if your config differs)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export default function useDevice() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth

      const isMobile = width < breakpoints.md
      const isTablet = width >= breakpoints.md && width < breakpoints.lg
      const isDesktop = width >= breakpoints.lg

      setDevice({ isMobile, isTablet, isDesktop })
    }

    handleResize() // initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return device
}
