import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeader: builder.query<any, void>({
      query: () => `/startup`,
      providesTags: ['startup'],
    }),
  }),
})

export const { useGetHeaderQuery } = extendedApi
