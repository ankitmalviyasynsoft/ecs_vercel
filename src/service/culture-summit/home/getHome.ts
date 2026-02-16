import { apiFetch } from '@/lib/api'
import { apiTags } from '@/utils/api'
import { HomeResponse, LocaleSlugParam } from '@/types/culture-summit/api'

export async function getHome({ slug = '' }: LocaleSlugParam) {
  return await apiFetch<HomeResponse>('/home', {
    query: { slug },
    tags: [apiTags('culture-summit', slug)],
  })
}
