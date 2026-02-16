'use client'

import Section from '@/_components/_UI/section/Section.component'
import { Button } from '@heroui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Culture Summit route error:', error)
  }, [error])

  const router = useRouter()

  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 p-10 text-center">
        {/* Icon Wrapper */}
        <div className="bg-danger-100 text-danger-600 mb-2 flex h-24 w-24 items-center justify-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <div className="space-y-4">
          <p className="text-default-500 text-t-15! font-semibold uppercase tracking-widest">Server Error</p>
          <h1 className="text-t-30! font-semibold leading-tight md:text-t-50!">Something went wrong!</h1>
          <p className="text-default-500 mx-auto max-w-md text-t-18!">{error?.message}</p>
        </div>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button onPress={() => router.back()} variant="light" color="primary" size="md" radius="full" className="px-8 py-6 font-medium">
            Back to Home
          </Button>
          <Button onPress={reset} color="primary" variant="solid" size="md" radius="full" className="px-8 py-6 font-medium">
            Retry Loading
          </Button>
        </div>
      </div>
    </Section>
  )
}
