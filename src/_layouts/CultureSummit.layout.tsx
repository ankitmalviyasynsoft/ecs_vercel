'use client'

import React from 'react'

import Header from './header/Header.component'
import Footer from './footer/Footer.component'
import { useGetHeaderQuery } from '@/redux/services/layout.api'

export default function CultureSummit({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError, isSuccess } = useGetHeaderQuery()

  return (
    <main className="font-kaff">
      <Header data={data?.header} isLoading={isLoading} isError={isError} isSuccess={isSuccess} />
      {children}
      <Footer data={data?.footer} isLoading={isLoading} isError={isError} isSuccess={isSuccess} />
      {/* <Footer data={data?.footer} isLoading={isLoading} isError={isError} isSuccess={isSuccess} /> */}
    </main>
  )
}
