import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAppErrorAC } from '@/app/app-slice.ts'

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist', 'Task'],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      if (result.error.status === 'FETCH_ERROR') {
        api.dispatch(setAppErrorAC({ error: result.error.error }))
      }
    }
    return result
  },
  endpoints: () => ({}),
})
