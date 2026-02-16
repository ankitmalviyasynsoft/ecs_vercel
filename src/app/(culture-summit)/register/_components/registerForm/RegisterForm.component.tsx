'use client'

import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useLocale, useTranslations } from 'next-intl'
import { SelectItem, Button } from '@heroui/react'

import OTPForm from '../otpForm/OTPForm.component'
import Section from '@/_components/_UI/section/Section.component'
import countryData from '../../../../../../data/country.json'
import PhoneInput from '@/_components/_UI/phoneInput/PhoneInput.component'
import TextInput, { inputStyles } from '../../../../../_components/_UI/textinput/TextInput.component'
import SelectInput, { selectStyles } from '../../../../../_components/_UI/selectInput/SelectInput.component'
import TextAreaInput from '../../../../../_components/_UI/textAreaInput/TextAreaInput.component'
import { useSendOtpMutation } from '@/redux/services/auth.api'
import { getRegisterSchema } from './RegisterForm.config'
import { RegisterSchema } from './RegisterForm.type'

export default function RegisterForm({ data }: { data: any }) {
  const locale = useLocale()
  const t = useTranslations('CultureSummit.registerFormValidations')
  const errorMessagesT = useTranslations('CultureSummit.ErrorPage')
  const registerSchema = getRegisterSchema(t)

  // const {  isSuccess, isLoading, isError } = useGetRegisterPageContentQuery()
  const formFields = data?.registerYourInterestFormFieldsData?.formFields
  const otpMessages = data?.registerYourInterestFormFieldsData?.otpMessages

  const defaultValues = React.useMemo(
    () => ({
      Title: '',
      FirstName: '',
      LastName: '',
      Email: '',
      JobTitle: '',
      Organization: '',
      PhoneNumber: '',
      Country: '',
      Message: '',
      Culture: 'en-US',
    }),
    [],
  )

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues,
  })

  React.useEffect(() => {
    reset(defaultValues)
  }, [locale, reset, defaultValues])

  // Watch the description field for character count
  const descriptionValue = watch('Message')
  const descriptionLength = descriptionValue ? descriptionValue.length : 0

  // API Mutations
  const [sendOtp, { isLoading: sendOtpLoading }] = useSendOtpMutation()

  // OTP State
  const [showOtp, setShowOtp] = useState(false)
  const [formData, setFormData] = useState<RegisterSchema | null>(null)

  const onSubmit = async (data: RegisterSchema) => {
    setFormData(data)
    try {
      await sendOtp({ email: data.Email }).unwrap()
      setShowOtp(true)

      // Todo: Remove hardcode
      toast.success('OTP sent successfully.')
    } catch (error: any) {
      //  As per as gudiance by backend team this logic is implemented
      const errorMessage = error?.data?.apiMessage
      const isMatch = errorMessage.toLowerCase().includes('OTP already sent'.toLowerCase())

      // TODO: Remove this after backend team fixes the issue
      if (isMatch) {
        setShowOtp(true)
      } else {
        toast.error(errorMessage)
      }
    }
  }

  if (showOtp && formData) {
    const successMsg = otpMessages?.find((msg: any) => msg.statusCode === 200)?.message
    return <OTPForm formData={formData} onSuccess={() => {}} content={data?.secureAccessValidation} successMessage={successMsg} />
  }

  return (
    <Section className="py-0!">
      <div className="min-h-screen py-11 text-white">
        <div className="max-w-4xl px-0 ">
          <div className="relative h-59 w-59 mb-17 mx-auto md:mx-0">
            {/* <ImageGuard src={baseConfig?.MEDIA_BASE_URL + registerPageContent?.innerBanner?.title} alt={registerPageContent?.innerBanner?.title || 'Register Logo'} fill className="object-contain" /> */}
            <img src={'/assets/images/register-page.svg'} alt={data?.innerBanner?.title || 'Register Logo'} className="h-59 w-59 object-contain " />
          </div>
          <h1 className="mb-12 text-t-40 font-semibold md:text-t-45 text-center md:text-left">{data?.innerBanner?.title || 'Register Your Interest'}</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12.5">
            {/* Title */}
            <div className="flex flex-col items-start">
              <Controller
                name="Title"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label={formFields?.title?.fieldLabel || 'Title*'}
                    placeholder={formFields?.title?.placeholderText || 'Select your title'}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string
                      field.onChange(value)
                    }}
                    isInvalid={!!errors.Title}
                    errorMessage={errors.Title?.message}
                  >
                    {(formFields?.title?.items || []).map((item: any) => (
                      <SelectItem
                        key={item.value}
                        classNames={{
                          base: '!text-t-20',
                          title: '!text-t-20',
                        }}
                      >
                        {item.text}
                      </SelectItem>
                    ))}
                  </SelectInput>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
              {/* First Name */}
              <Controller
                name="FirstName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    label={formFields?.firstName?.fieldLabel || 'First Name*'}
                    placeholder={formFields?.firstName?.placeholderText || ' '}
                    isInvalid={!!errors.FirstName}
                    errorMessage={errors.FirstName?.message}
                  />
                )}
              />

              {/* Last Name */}
              <Controller
                name="LastName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    label={formFields?.lastName?.fieldLabel || 'Last Name*'}
                    placeholder={formFields?.lastName?.placeholderText || ' '}
                    isInvalid={!!errors.LastName}
                    errorMessage={errors.LastName?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
              {/*Email */}
              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <TextInput {...field} type="text" label={formFields?.email?.fieldLabel || 'Email*'} placeholder={formFields?.email?.placeholderText || ' '} isInvalid={!!errors.Email} errorMessage={errors.Email?.message} />
                )}
              />

              {/* JobTitle */}
              <Controller
                name="JobTitle"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    label={formFields?.jobTitle?.fieldLabel || 'Job Title*'}
                    placeholder={formFields?.jobTitle?.placeholderText || ' '}
                    isInvalid={!!errors.JobTitle}
                    errorMessage={errors.JobTitle?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
              {/* Organization */}
              <Controller
                name="Organization"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    label={formFields?.organisation?.fieldLabel || 'Organization*'}
                    placeholder={formFields?.organisation?.placeholderText || ' '}
                    isInvalid={!!errors.Organization}
                    errorMessage={errors.Organization?.message}
                  />
                )}
              />

              {/* Number */}
              <Controller
                name="PhoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    label={formFields?.number?.fieldLabel || 'Number*'}
                    placeholder={formFields?.number?.placeholderText || ' '}
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.PhoneNumber}
                    errorMessage={errors.PhoneNumber?.message}
                    classNames={{
                      label: 'md:mt-[-10px] !text-white font-semibold text-t-20  px-6 items-start',
                      input: Array.isArray(inputStyles.inputWrapper) ? inputStyles.inputWrapper.join(' ') : (inputStyles.inputWrapper as string),
                      select: Array.isArray(selectStyles.trigger) ? selectStyles.trigger.join(' ') : (selectStyles.trigger as string),
                    }}
                  />
                )}
              />
            </div>

            {/* Country of Residence */}
            <div className="flex flex-col items-start">
              <Controller
                name="Country"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label={formFields?.countryOfResidence?.fieldLabel || 'Country of Residence*'}
                    placeholder={formFields?.countryOfResidence?.placeholderText || 'Select your country'}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string
                      field.onChange(value)
                    }}
                    isInvalid={!!errors.Country}
                    errorMessage={errors.Country?.message}
                  >
                    {countryData.items.map((option) => (
                      <SelectItem
                        key={option.value}
                        className="text-t-20"
                        classNames={{
                          base: '!text-t-20',
                          title: '!text-t-20',
                        }}
                      >
                        {option.text}
                      </SelectItem>
                    ))}
                  </SelectInput>
                )}
              />
            </div>

            {/* How did you hear about us (Description) */}
            <div className="flex flex-col items-start">
              <Controller
                name="Message"
                control={control}
                render={({ field }) => (
                  <TextAreaInput
                    {...field}
                    id="Message"
                    label={formFields?.comment?.fieldLabel || 'Please tell us how you heard about the Summit. Are you: a previous speaker, DCT employee or did you hear about it from one of our partners? *'}
                    placeholder={formFields?.comment?.placeholderText || 'What is your reason to want to attend Culture Summit?'}
                    isInvalid={!!errors.Message}
                    errorMessage={undefined}
                  />
                )}
              />
              <div className="mt-1 w-full px-6 flex items-start justify-between">
                <div className="min-h-[24px] px-6 text-t-16 text-danger">{errors.Message?.message || ''}</div>
                <div className="items-end text-t-16 text-gray-500">
                  {descriptionLength} / 400 {formFields?.comment?.helperText || t('characters')}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button type="submit" isLoading={sendOtpLoading} className="h-14 w-full rounded-3xl bg-white text-t-20! font-semibold text-black transition-transform hover:bg-success">
                {formFields?.submitBtnTitle || 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  )
}
