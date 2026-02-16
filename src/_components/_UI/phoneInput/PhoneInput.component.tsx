'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { Select, SelectItem, Input, Avatar, Selection } from '@heroui/react'
import { getCountries, getCountryCallingCode, parsePhoneNumber, CountryCode, AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { useLocale } from 'next-intl'
import * as Flags from 'country-flag-icons/react/3x2'
import { ChevronDown } from 'lucide-react'

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  errorMessage?: string
  isInvalid?: boolean
  classNames?: {
    input?: string
    select?: string
    label?: string
  }
}

export default function PhoneInput({ value, onChange, label = 'Phone Number', placeholder = 'Enter phone number', errorMessage, isInvalid, classNames }: PhoneInputProps) {
  const locale = useLocale()
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('AE')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Generate country options
  const countryOptions = useMemo(() => {
    const countries = getCountries()
    return countries
      .map((country) => {
        try {
          const callingCode = getCountryCallingCode(country)
          const name = new Intl.DisplayNames([locale], { type: 'region' }).of(country)
          const FlagComponent = Flags[country as keyof typeof Flags]
          return {
            country,
            callingCode,
            name,
            flag: FlagComponent ? <FlagComponent className="w-6 h-4 rounded-sm" /> : null,
          }
        } catch (e) {
          return null
        }
      })
      .filter(Boolean) as { country: CountryCode; callingCode: string; name: string; flag: React.ReactNode }[]
  }, [locale])

  // Sync state with incoming value
  useEffect(() => {
    if (value) {
      try {
        const parsed = parsePhoneNumber(value)
        if (parsed && parsed.country) {
          setSelectedCountry(parsed.country)
          setPhoneNumber(parsed.nationalNumber)
        } else {
          // If parsing fails for strict reasons but looks like a partial starting with current country code
          const currentCode = getCountryCallingCode(selectedCountry)
          if (value.startsWith(`+${currentCode}`)) {
            setPhoneNumber(value.slice(currentCode.length + 1).trim())
          } else {
            // Just strip the + if nothing else matches
            setPhoneNumber(value.replace(/^\+/, ''))
          }
        }
      } catch (e) {
        // Same fallback logic
        const currentCode = getCountryCallingCode(selectedCountry)
        if (value.startsWith(`+${currentCode}`)) {
          setPhoneNumber(value.slice(currentCode.length + 1).trim())
        } else {
          setPhoneNumber(value.replace(/^\+/, ''))
        }
      }
    } else {
      setPhoneNumber('')
    }
  }, [value])

  const handleCountryChange = (keys: Selection) => {
    const selected = Array.from(keys)[0] as CountryCode
    // If selection is cleared, default to United Arab Emirates (AE)
    const finalSelected = selected || 'AE'
    setSelectedCountry(finalSelected)
    triggerChange(finalSelected, phoneNumber)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    // Allow only numbers and spaces/hyphens
    const cleaned = input.replace(/[^\d\s-]/g, '')
    setPhoneNumber(cleaned)
    triggerChange(selectedCountry, cleaned)
  }

  const triggerChange = (country: CountryCode, number: string) => {
    if (!onChange) return
    try {
      if (!number) {
        onChange('')
        return
      }
      const parsed = parsePhoneNumber(number, country)
      if (parsed) {
        onChange(parsed.number as string)
      } else {
        // Fallback to manual construction
        onChange(`+${getCountryCallingCode(country)}${number.replace(/^\+/, '')}`)
      }
    } catch (error) {
      // logic for incomplete numbers
      onChange(`+${getCountryCallingCode(country)}${number.replace(/^\+/, '')}`)
    }
  }

  return (
    <div className="group flex flex-col gap-2 w-full">
      {label && <label className={classNames?.label}>{label}</label>}
      <div className={`relative flex w-full items-center rounded-large transition-colors duration-300 bg-zinc hover:!bg-white focus-within:!bg-white group/phone ${isInvalid ? 'bg-danger/20' : ''}`}>
        {/* Country Selector */}
        <Select
          items={countryOptions}
          aria-label="Select Country"
          selectedKeys={[selectedCountry]}
          onSelectionChange={handleCountryChange}
          classNames={{
            base: 'w-[115px] flex-none',
            trigger: 'bg-transparent h-14 shadow-none data-[hover=true]:!bg-transparent',
            value: 'text-white text-t-20 group-hover/phone:!text-black group-focus-within/phone:!text-black',
            popoverContent: 'w-[300px] bg-white text-black',
            innerWrapper: 'p-0',
            selectorIcon: 'text-white group-hover/phone:!text-black group-focus-within/phone:!text-black',
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-1">
                <span className="text-t-15 shrink-0">{item.data?.flag}</span>
                <span className="text-t-15 mt-1">+{item.data?.callingCode}</span>
              </div>
            ))
          }}
        >
          {(country) => (
            <SelectItem key={country.country} textValue={`${country.name} (+${country.callingCode})`}>
              <div className="flex items-center gap-2">
                <span className="shrink-0">{country.flag}</span>
                <span className="text-small">{country.name}</span>
                <span className="text-small text-default-400">+{country.callingCode}</span>
              </div>
            </SelectItem>
          )}
        </Select>

        {/* Divider */}
        <div className={`h-6 w-[1px] transition-colors ${isInvalid ? 'bg-danger/50' : 'bg-gray-500/50'} group-hover/phone:bg-gray-200 group-focus-within/phone:bg-gray-200`} />

        {/* Phone Number Input */}
        <Input
          type="tel"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handlePhoneChange}
          isInvalid={isInvalid}
          classNames={{
            base: 'flex-1',
            inputWrapper: '!bg-transparent h-14 shadow-none data-[hover=true]:!bg-transparent group-data-[focus=true]:!bg-transparent group-data-[invalid=true]:!bg-transparent',
            input: 'text-white text-t-20 px-4 group-hover/phone:!text-black group-focus-within/phone:!text-black placeholder:text-gray-500',
          }}
        />
      </div>
      {isInvalid && errorMessage && <div className="px-6 text-t-15 text-danger">{errorMessage}</div>}
    </div>
  )
}
