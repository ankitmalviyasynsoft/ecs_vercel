'use client'

import clsx from 'clsx'
import { useTransition } from 'react'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/i18n/locale'
import { useLocale } from 'next-intl'
import { useDispatch } from 'react-redux'
import { api } from '@/redux/services/api.config'
import { SERVICE_TAGS } from '@/constant'

export default function LanguageSwitch() {
  const locale = useLocale()
  const dispatch = useDispatch()
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    if (value === locale) return
    const nextLocale = value as Locale
    startTransition(async () => {
      await setUserLocale(nextLocale)
      dispatch(api.util.invalidateTags(SERVICE_TAGS))
    })
  }

  return (
    <div className="flex h-[32px] w-[88px] items-center justify-center gap-2 rounded-full bg-foreground px-4 text-t-15 font-semibold text-background shadow-sm">
      <p onClick={() => onChange('en')} className={clsx('transition-opacity hover:opacity-70 cursor-pointer pt-1', locale === 'en' ? 'underline decoration-1' : '')}>
        EN
      </p>
      <p onClick={() => onChange('ar')} className={clsx('transition-opacity hover:opacity-70 cursor-pointer pt-1', locale === 'ar' ? 'underline decoration-1' : '')}>
        AR
      </p>
    </div>
  )
}
