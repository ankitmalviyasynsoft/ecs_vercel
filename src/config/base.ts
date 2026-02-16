export const baseConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',
  GA_KEY: process.env.NEXT_PUBLIC_GA_KEY,
  GTM_KEY: process.env.NEXT_PUBLIC_GTM_KEY,
  RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTHA_KEY,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  API_SUBSCRIPTION_KEY: process.env.NEXT_PUBLIC_API_SUBSCRIPTION_KEY ?? '',
  MEDIA_BASE_URL: process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '',
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN ?? '',
}
