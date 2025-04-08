import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAppErrorAC } from '@/app/app-slice.ts'
import { isErrorWithMessage } from '@/common/utils'

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

    let error = 'Oops. Some error happened.'

    if (result.error) {
      switch (result.error.status) {
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
          error = result.error.error
          break
        case 403:
          error = '403 Forbidden Error.'
          break
        case 400:
        case 500:
          if (isErrorWithMessage(result.error.data)) {
            error = result.error.data.message
          } else {
            error = JSON.stringify(result.error.data)
          }
          break
        default:
          error = JSON.stringify(result.error)
          break
      }
      api.dispatch(setAppErrorAC({ error }))
    }

    return result
  },
  endpoints: () => ({}),
})
