'use client'

import { createContext, ReactNode } from 'react'
import * as React from 'react'
import * as RadixDirection from '@radix-ui/react-direction'
import { useLocale } from 'next-intl'
import { getDirection } from '@/utils'

type Direction = 'ltr' | 'rtl'

interface DirectionContextProps {
  direction: Direction
}

const DirectionContext = createContext<DirectionContextProps | undefined>(undefined)

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale()

  return (
    <DirectionContext.Provider value={{ direction: getDirection(locale) }}>
      <RadixDirection.Provider dir={getDirection(locale)}>{children}</RadixDirection.Provider>
    </DirectionContext.Provider>
  )
}
