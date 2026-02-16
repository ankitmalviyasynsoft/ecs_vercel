'use client'

import React, { useState } from 'react'
import { HeroUIProvider as HeroUI } from '@heroui/react'
import { Toaster } from 'sonner'
import { useReduxSelector } from '@/hooks'

export default function HeroUIProvider({ children }: { children: React.ReactNode }) {
  const mode = useReduxSelector((state) => state.layout.mode)

  const finalTheme = `${'default'}-${mode}`

  return (
    <HeroUI data-theme={`default-${mode}`} className={`min-h-screen ${`theme-${mode}`} ${finalTheme} `}>
      <Toaster richColors position="top-right" />
      {children}
    </HeroUI>
  )
}
