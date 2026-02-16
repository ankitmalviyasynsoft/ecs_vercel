import { api } from './api.config'

export const aboutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<any, void>({
      query: () => `/about`,
      providesTags: ['about'],
    }),
  }),
})

export const { useGetAboutQuery } = aboutApi
