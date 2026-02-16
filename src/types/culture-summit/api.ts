// src/types/api.ts

export type LocaleParam = {
  locale?: string
}

export type LocaleSlugParam = LocaleParam & {
  slug?: string
}

export type APIParams = LocaleParam &
  LocaleSlugParam & {
    filter?: string | undefined
    keywords?: string | undefined
    location?: string | undefined
    medium?: string | undefined
  }

export interface HomeResponse {
  success: boolean
  apiMessage: string
  statusCode: number
  isActive: boolean
  data: HomeData
}

export interface HomeData {
  seoData: any
  heroBannerSection: any
  textParagraph: any
  statistics: any
  about: any
  testimonial: any
  partners: any
  [key: string]: any // allow dynamic access
}

export interface AboutResponse {
  success: boolean
  apiMessage: string
  statusCode: number
  isActive: boolean
  data: AboutData
}

export interface AboutData {
  seoData: any
  innerBanner: any
  images: any
  innerBannerImage: any
  textParagraph: any
  editorials: any
  partnersAndOrganizers: any
  subscribeBanner: any
  [key: string]: any
}
