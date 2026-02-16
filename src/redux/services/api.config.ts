import { baseConfig } from '@/config'
import { SERVICE_TAGS } from '@/constant'
import { getUserLocale } from '@/i18n/locale'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: SERVICE_TAGS,
  baseQuery: fetchBaseQuery({
    baseUrl: baseConfig.API_BASE_URL,
    prepareHeaders: async (headers, {}) => {
      const locale = await getUserLocale()
      headers.set('Accept-Language', locale)
      headers.set('Ocp-Apim-Subscription-Key', `${baseConfig.API_SUBSCRIPTION_KEY}`)
      return headers
    },
  }),

  endpoints: () => ({}),
})
