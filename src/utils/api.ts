import { ORG_CONFIG, OrgKey } from './constant.utils'

// src/utils/apiTags.ts
export function apiTags(locale: string, key: string, slug?: string) {
  return slug ? `${locale}-${key}-${slug}` : `${locale}-${key}`
}

const detectOrg = (): OrgKey | null => {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname.toLowerCase()
  // if (path.includes('manar')) return 'Manar'
  // if (path.includes('biennial')) return 'Biennial'
  // if (path.includes('abu-dhabi')) return 'Abu-Dhabi'
  return null
}

const getConfig = () => {
  const org = detectOrg()
  return org ? ORG_CONFIG[org] : null
}

export const getBaseUrl = () => getConfig()?.baseUrl || ''
export const getKey = () => getConfig()?.key || ''
