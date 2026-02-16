'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import React, { createContext, useContext, useRef } from 'react'

import { RecaptchaContextProps } from './RecaptchaProvider.type'
import { baseConfig } from '@/config'

const RecaptchaContext = createContext<RecaptchaContextProps | null>(null)

export const RecaptchaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const executeRecaptcha = async (): Promise<string | null> => {
    recaptchaRef.current?.reset()
    if (recaptchaRef.current) {
      try {
        return await recaptchaRef.current.executeAsync()
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error)
        return null
      }
    }
    console.log('reCAPTCHA not initialized')
    return null
  }

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha }}>
      <ReCAPTCHA sitekey={baseConfig.RECAPTCHA_KEY || ''} size="invisible" ref={recaptchaRef} />
      {children}
    </RecaptchaContext.Provider>
  )
}

export const useRecaptcha = (): RecaptchaContextProps => {
  const context = useContext(RecaptchaContext)

  if (!context) {
    throw new Error('useRecaptcha must be used within a RecaptchaProvider')
  }
  return context
}
