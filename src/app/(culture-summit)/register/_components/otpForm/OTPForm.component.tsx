'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { toast } from 'sonner'
import Section from '@/_components/_UI/section/Section.component'
import { useDelegateRegistrationMutation, useSendOtpMutation } from '@/redux/services/auth.api'
import { OTPFormProps } from './OTPForm.type'
import { useRecaptcha } from '@/providers/recapcha/RecaptchaProvider.context'
import { useTranslations } from 'next-intl'

export default function OTPForm({ formData, content, successMessage }: OTPFormProps) {
  const router = useRouter()
  const { executeRecaptcha } = useRecaptcha()
  const errorMessagesT = useTranslations('CultureSummit.ErrorPage')
  const validationT = useTranslations('CultureSummit.registerFormValidations')

  // API Mutations
  const [sendOtp] = useSendOtpMutation()
  const [registerDelegate, { isLoading: isRegistering }] = useDelegateRegistrationMutation()

  // OTP State
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(178) // 2:58
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otpValues]
    newOtp[index] = value
    setOtpValues(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendOtp = async () => {
    if (!formData) return
    try {
      await sendOtp({ email: formData.Email }).unwrap()
      setTimer(178)
      setOtpValues(['', '', '', '', '', ''])
      toast.success('A new OTP has been sent successfully.')
    } catch (error) {
      console.error('Failed to resend OTP', error)
      toast.error('Failed to resend OTP')
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
    if (pastedData.length === 0) return

    const newOtp = [...otpValues]
    pastedData.forEach((value, index) => {
      if (index < 6 && !isNaN(Number(value))) {
        newOtp[index] = value
      }
    })
    setOtpValues(newOtp)

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleFinalSubmit = async () => {
    if (!formData) return
    const otp = otpValues.join('')

    // Client-side validation for 6-digit OTP
    if (otp.length < 6) {
      // TODO: remove hard code
      toast.error(validationT('invalidOTP') || 'Please enter a valid 6-digit OTP')
      return
    }

    const payload = new FormData()

    const recaptchaToken = await executeRecaptcha?.()

    if (!recaptchaToken) {
      console.log('reCAPTCHA verification failed. Please try again.')
      return
    }

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string)
    })

    payload.append('RecaptchaToken', recaptchaToken)

    try {
      await registerDelegate({
        otp,
        formData: payload,
      }).unwrap()
      // TODO: Remove this toast message future
      toast.success('Registration successful')
      router.push('/register/thank-you')
    } catch (error: any) {
      toast.error(error?.data?.apiMessage || errorMessagesT('title'))
    }
  }

  return (
    <Section>
      <div className="min-h-screen pt-32 text-white">
        <div className="mx-auto flex max-w-[672px] flex-col justify-center gap-8 px-0 md:px-8">
          {successMessage && (
            <div className="w-full rounded-full bg-success px-8 py-3 text-center">
              <p className="text-t-20 font-semibold text-black">{successMessage}</p>
            </div>
          )}
          <div className="mt-8">
            <h1 className="mb-4 text-t-20 font-semibold">{content?.title || 'We sent you a code'}</h1>
            <p className="mb-8 text-t-15 text-gray-300">{content?.subDescription || 'Log in with DCT to network with peers and enjoy additional event resources.'}</p>

            {/* OTP Inputs */}
            <div className="group mb-12 flex w-full items-center justify-between gap-2 md:gap-4">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-14 w-10 rounded-xl  bg-zinc text-center text-t-20 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white focus:bg-white focus:text-black focus:border-white focus:outline-none md:h-25 md:w-20 md:rounded-[25px] md:text-t-25!"
                  placeholder=""
                />
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <Button
                isLoading={isRegistering}
                onPress={handleFinalSubmit}
                className="h-12 w-full rounded-full bg-white hover:bg-success text-t-20! font-semibold text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {content?.otpCTAText || 'Submit'}
              </Button>

              <div className="text-gray-500 ">
                <p className="inline-block text-t-18!">{content?.otpReceiveMsg || "Didn't receive OTP?"}</p>{' '}
                <button aria-disabled onClick={handleResendOtp} disabled={timer > 0} className={`text-t-18! transition-colors ${timer > 0 ? 'cursor-not-allowed opacity-50' : 'text-gray-400 hover:text-white'}`}>
                  {timer > 0 ? (
                    <>
                      {content?.newOneOtpMsg || 'Get a new one in'} {formatTime(timer)}
                    </>
                  ) : (
                    content?.requestNewOtpMsg || 'Request new OTP'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
