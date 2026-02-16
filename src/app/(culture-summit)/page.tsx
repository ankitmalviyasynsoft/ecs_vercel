// 'use client'
import { getHome } from '@/service/culture-summit/home/getHome'
import { HomeRegistry } from '../../_components/pageRegistry/HomeRegistry.page'

export default async function Page() {
  const homeData = await getHome({})
  if (!homeData?.data) return null

  return (
    <div>
      <HomeRegistry data={homeData.data} />
    </div>
  )
}
