export type Organization = 'Manar' | 'Abu-Dhabi' | 'Biennial'

export type ApiOptions = {
  org?: Organization
  baseUrl?: string
  revalidate?: number
  tags?: string[]
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | undefined>
}
