'use client'

import React from 'react'
import { Skeleton } from '@heroui/react'

export default function Loading() {
  return (
    <div className="container min-h-screen bg-black px-6 py-12 text-white">
      <div className="max-w-4xl">
        {/* Title Skeleton */}
        <Skeleton className="mb-12 h-50 w-50 rounded-full bg-zinc-800 dark:bg-zinc-800" />
        <Skeleton className="mb-12 h-12 w-3/4 rounded-lg bg-zinc-800 dark:bg-zinc-800" />

        <div className="flex flex-col gap-8">
          {/* Title Field Input Skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded bg-zinc-800" />
            <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
          </div>

          {/* First Name & Last Name Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded bg-zinc-800" />
              <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded bg-zinc-800" />
              <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
            </div>
          </div>

          {/* Org & Number Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded bg-zinc-800" />
              <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded bg-zinc-800" />
              <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
            </div>
          </div>

          {/* Country Field Skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded bg-zinc-800" />
            <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-900" />
          </div>

          {/* Textarea Skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full max-w-lg rounded bg-zinc-800" />
            <Skeleton className="h-4 w-3/4 rounded bg-zinc-800" />
            <Skeleton className="mt-2 h-40 w-full rounded-[1.5rem] bg-zinc-900" />
          </div>

          {/* Submit Button Skeleton */}
          <div className="mt-4">
            <Skeleton className="h-14 w-full rounded-[1.5rem] bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
