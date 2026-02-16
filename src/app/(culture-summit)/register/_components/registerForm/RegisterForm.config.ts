import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const getRegisterSchema = (t: (key: string) => string) =>
  z.object({
    Title: z.string().trim().min(1, t('title')).max(50, t('invalidTitle')),
    FirstName: z.string().trim().min(1, t('firstName')).max(50, t('invalidFirstName')),
    LastName: z.string().trim().min(1, t('lastName')).max(50, t('invalidLastName')),
    Email: z.email(t('email')),
    JobTitle: z.string().trim().min(1, t('jobTitle')).max(50, t('invalidJobTitle')),
    Organization: z.string().trim().min(1, t('Organization')).max(50, t('invalidOrganization')),
    PhoneNumber: z
      .string()
      .trim()
      .refine((val) => {
        try {
          return isValidPhoneNumber(val)
        } catch {
          return false
        }
      }, t('number')),
    Country: z.string().trim().min(1, t('country')),
    Culture: z.string().trim().optional(),

    Message: z.string().trim().min(1, t('descriptionRequired')).max(400, t('descriptionMax')),
  })
