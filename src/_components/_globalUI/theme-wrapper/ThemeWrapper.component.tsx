'use client'

import { useEffect } from 'react'
import { useReduxSelector } from '@/hooks'

export default function ThemeWrapper() {
  const mode = useReduxSelector((state) => state.layout.mode)

  useEffect(() => {
    const html = document.documentElement

    if (mode === 'dark') {
      html.classList.add('dark')
      html.setAttribute('data-theme', 'dark')
    } else {
      html.classList.remove('dark')
      html.setAttribute('data-theme', 'light')
    }
  }, [mode])

  return null
}
