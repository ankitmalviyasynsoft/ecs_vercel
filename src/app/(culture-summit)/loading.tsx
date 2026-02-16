'use client'

import React from 'react'
import { Skeleton } from '@heroui/react'
import Section from '@/_components/_UI/section/Section.component'

export default function Loading() {
  return (
    <Section className="flex w-full flex-col gap-10 bg-black pb-10 gap-10">
      {/* Hero Section */}
      <Skeleton className="h-[80vh] w-full bg-zinc-900 rounded-large" />

      {/* TextParagraph Section */}
      <div className="flex flex-col gap-4 px-4 items-center">
        <div className="w-full flex flex-col gap-3">
          <Skeleton className="h-8 w-3/4 rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-full rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-full rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-5/6 rounded-lg bg-zinc-800" />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-large bg-zinc-800" />
        ))}
      </div>

      {/* About Section */}
      <div className="mx-auto grid grid-cols-1 gap-8 px-4 items-center md:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-lg bg-zinc-900" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-1/2 rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-full rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-full rounded-lg bg-zinc-800" />
          <Skeleton className="h-4 w-3/4 rounded-lg bg-zinc-800" />
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mx-auto px-4">
        <Skeleton className="h-48 w-full rounded-large bg-zinc-800" />
      </div>

      {/* CorePartner Section */}
      <div className="mx-auto grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl bg-zinc-800" />
        ))}
      </div>
    </Section>
  )
}
