'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryParam(key: string, defaultValue: string | null = null) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const raw = searchParams.get(key)
  const value = raw ? decodeURIComponent(raw.replace(/\+/g, ' ')) : defaultValue

  const setValue = useCallback(
    (next: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (!next) params.delete(key)
      else params.set(key, next)

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, key]
  )

  // ✅ stable reference — won't change on every render
  const resetParams = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      keys.forEach((k) => params.delete(k))

      const qs = params.toString()
      router.push(qs ? `?${qs}` : '?', { scroll: false })
    },
    [router, searchParams]
  )

  return { value, setValue, resetParams }
}
