import { apiFetch } from '@/lib/api'
import { apiTags } from '@/utils/api'
import { LocaleSlugParam } from '@/types/culture-summit/api'

export async function getPrivacyPolicy({ slug = '' }: LocaleSlugParam) {
  return await apiFetch('/privacypolicy', {
    query: { slug },
    tags: [apiTags('culture-summit-privacy-policy', slug)],
  })
}
