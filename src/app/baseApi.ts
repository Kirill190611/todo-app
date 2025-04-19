import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError } from '@/common/utils/handleError.ts'

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist', 'Task'],
  keepUnusedDataFor: 120,
  // refetchOnReconnect: true, // needed for auto-update after reconnect to internet (when have some issue with internet connection / internet losing)
  // refetchOnFocus: true, // needed for auto-update after change focus btwn pages
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
        headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('sn-token')}`
        )
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
})
