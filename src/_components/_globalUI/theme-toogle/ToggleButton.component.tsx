'use client'

import { Button } from '@heroui/react'
import { useReduxSelector, useReduxDispatch } from '@/hooks'
import { toggleTheme } from '@/redux/slices/layout.slice'

export default function ThemeToggleButton() {
  const dispatch = useReduxDispatch()
  const mode = useReduxSelector((state) => state.layout.mode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <Button variant="flat" color="primary" onPress={handleToggle}>
      {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}
