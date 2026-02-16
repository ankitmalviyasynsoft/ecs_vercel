import { apiFetch } from '@/lib/api'
import { apiTags } from '@/utils/api'
import { LocaleSlugParam } from '@/types/culture-summit/api'

export async function getPastSummit({ slug = '' }: LocaleSlugParam) {
  return await apiFetch('/pastsummit', {
    query: { slug },
    tags: [apiTags('culture-summit-past-summit', slug)],
  })
}
