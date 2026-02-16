'use server'

import { ORG_CONFIG } from '@/utils/constant.utils'
import { ApiOptions } from './api.type'
import { getLocale } from 'next-intl/server'

export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { org = 'CultureSummit', baseUrl, revalidate = 60, tags = [], headers = {}, query = {} } = options

  const locale = await getLocale()
  const orgData = ORG_CONFIG[org as keyof typeof ORG_CONFIG]

  if (!orgData) throw new Error(`Invalid organization: ${org}`)

  // merge base URL if passed manually
  const effectiveBaseUrl = baseUrl || orgData.baseUrl

  // Add organizationName automatically if not already in query
  const finalQuery = {
    // organizationName: orgData?.orgName || '',
    ...query,
  }

  try {
    // Build query string
    const queryString = Object.entries(finalQuery)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&')

    // Full URL
    const hasFullUrl = /^https?:\/\//i.test(endpoint)
    const fullUrl = hasFullUrl ? endpoint : `${effectiveBaseUrl}${endpoint}`
    const finalUrl = queryString ? `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryString}` : fullUrl

    console.log('finalUrl', {
      headers: {
        'Ocp-Apim-Subscription-Key': orgData.key,
        'accept-language': locale,
        ...headers,
      },
    })
    const res = await fetch(finalUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': orgData.key,
        'accept-language': locale,
        ...headers,
      },
      next: { revalidate, tags },
    })

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error')
      console.log('======================\n\n\n', errorText, '\n\n\n======================')
      throw new Error(`API Error ${res.status}: ${errorText}`)
    }

    return (await res.json()) as T
  } catch (error: any) {
    console.error('apiFetch failed:', {
      org,
      endpoint,
      query,
      message: error.message,
    })
    throw error
  }
}
