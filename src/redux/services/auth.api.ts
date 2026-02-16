import { baseConfig } from '@/config'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get registration form data
    getRegisterPageContent: builder.query<any, void>({
      query: () => ({
        url: `/registeryourinterest`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'registerpage' }],
    }),

    // registration form
    delegateRegistration: builder.mutation({
      query: ({ otp, formData }) => {
        return {
          url: `https://${baseConfig.DOMAIN}/CultureSummit/forms/web/delegate-registration`,
          method: 'POST',
          body: formData,
          headers: {
            Otp: otp,
          },
        }
      },
      invalidatesTags: () => [{ type: 'registerpage' }],
    }),

    // send otp
    sendOtp: builder.mutation({
      query: ({ email, culture = 'en-US' }) => ({
        url: `/send-otp?username=${email}&culture=${culture}`,
        method: 'GET',
      }),
      invalidatesTags: () => [{ type: 'registerpage' }],
    }),
  }),
})

export const { useDelegateRegistrationMutation, useSendOtpMutation, useGetRegisterPageContentQuery } = extendedApi
