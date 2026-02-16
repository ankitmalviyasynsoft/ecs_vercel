import { apiFetch } from '@/lib/api'
import { apiTags } from '@/utils/api'
import { AboutResponse, LocaleSlugParam } from '@/types/culture-summit/api'

export async function getAbout({ slug = '' }: LocaleSlugParam) {
  return await apiFetch<AboutResponse>('/about', {
    query: { slug },
    tags: [apiTags('culture-summit', slug)],
  })
}
