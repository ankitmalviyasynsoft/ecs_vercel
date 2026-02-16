import { baseConfig } from '@/config'

export const themeBProgressBarMap = {
  CultureSummit: '#a49ef7',
}

// export const placeholderCSImage = '/images/manar/placeholder.svg'
// export const placeholderCSImageLoading = '/images/manar/image-loading.svg'

export const ORG_CONFIG = {
  CultureSummit: {
    baseUrl: baseConfig.API_BASE_URL ?? '',
    key: baseConfig.API_SUBSCRIPTION_KEY ?? '',
  },
} as const

export type OrgKey = keyof typeof ORG_CONFIG
