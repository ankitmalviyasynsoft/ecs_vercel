'use client'

import Link from 'next/link'
import { Button } from '@heroui/react'

import Section from '@/_components/_UI/section/Section.component'
import { useTranslations } from 'next-intl'

export default function ThankYouPage() {
  const t = useTranslations('CultureSummit.thankYouPage')

  return (
    <Section>
      <div className="min-h-screen py-11 text-white flex items-center justify-center">
        <div className="max-w-4xl px-8 flex flex-col items-center gap-8 text-center">
          <div className="rounded-full bg-[#E6F4E6] p-6 mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#008000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="#008000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-t-40 md:text-t-45 font-semibold">{t('title')}</h1>

          <p className="text-t-20 md:text-t-25 text-gray-300 max-w-2xl">{t('description')}</p>

          <div className="mt-8">
            <Button as={Link} href="/" className="h-14 px-8 rounded-3xl bg-white text-t-20! font-semibold text-black transition-transform hover:bg-gray-100 hover:scale-105">
              {t('backToHome')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
