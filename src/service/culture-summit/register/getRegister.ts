import { apiFetch } from '@/lib/api'
import { apiTags } from '@/utils/api'
import { LocaleSlugParam } from '@/types/culture-summit/api'

export async function getRegisterYourInterest({ slug = '' }: LocaleSlugParam) {
  return await apiFetch('/registeryourinterest', {
    query: { slug },
    tags: [apiTags('culture-summit-register-your-interest', slug)],
  })
}
