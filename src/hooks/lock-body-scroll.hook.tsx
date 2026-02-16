import { useEffect } from 'react'

export function useLockBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.height = '100vh'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.body.style.height = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.body.style.height = ''
    }
  }, [isOpen])
}
