export interface RecaptchaContextProps {
  executeRecaptcha: () => Promise<string | null>
}