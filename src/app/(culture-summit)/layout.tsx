import React from 'react'
import CultureSummit from '@/_layouts/CultureSummit.layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Culture Summit Abu Dhabi',
  description:
    'Culture Summit Abu Dhabi is a global forum that brings together an exceptional collective of creative thinkers, decision-makers, artists, designers, changemakers, and leaders from the culture and creative sectors and industries. Its ambition is to identify ways in which culture can transform societies and communities worldwide and turn these ideas into actions and solutions.',
  metadataBase: new URL('https://www.culturesummitabudhabi.com'),
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CultureSummit>{children}</CultureSummit>
}
