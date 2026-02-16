'use client'

import { useGetAboutQuery } from '@/redux/services/about.api'

export default async function Page() {
  const { data, isLoading, isFetching, isError } = useGetAboutQuery()

  return (
    <section>
      <h1>About Culture Summit</h1>
    </section>
  )
}
