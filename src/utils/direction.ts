export const getDirection = (locale: string): 'rtl' | 'ltr' => {
  const rtlLocales = ['ar']
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}
