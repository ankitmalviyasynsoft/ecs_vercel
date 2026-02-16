import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import ThemeWrapper from '@/_components/_globalUI/theme-wrapper/ThemeWrapper.component'
import Analytics from '@/_components/analytics/Analytics.component'
import HeroUIProvider from '@/providers/heroUIProvider/HeroUI.provider'
import { getDirection } from '@/utils'
import { kaffFont } from '@/config'
import { ReduxProvider } from '@/providers/reduxProvider/Redux.provider'
import { DirectionProvider } from '@/providers/directionProvider/Direction.provider'
import '@/styles/globals.css'
import ScrollToTop from '@/_components/scroll-top/ScrollToTop'

export const metadata: Metadata = {
  title: 'Culture Summit Abu Dhabi',
  description:
    'Culture Summit Abu Dhabi is a global forum that brings together an exceptional collective of creative thinkers, decision-makers, artists, designers, changemakers, and leaders from the culture and creative sectors and industries. Its ambition is to identify ways in which culture can transform societies and communities worldwide and turn these ideas into actions and solutions.',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className={`${kaffFont.variable} antialiased`} lang={locale} dir={getDirection(locale)} suppressHydrationWarning>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale}>
            <DirectionProvider>
              <ThemeWrapper />
              <ScrollToTop />
              <HeroUIProvider>{children}</HeroUIProvider>
            </DirectionProvider>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
