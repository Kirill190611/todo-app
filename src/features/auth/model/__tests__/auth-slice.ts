import { LoginArgs } from '@/features/auth/api/authApi.types.ts'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { setAppStatusAC } from '@/app/app-slice.ts'
import { authApi } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums'
import { clearTasks } from '@/features/todolists/model/tasks-slice.ts'
import { clearTodolists } from '@/features/todolists/model/todolists-slice.ts'

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    loginTC: create.asyncThunk(async (data: LoginArgs, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const res = await authApi.login(data)
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem('sn-token', res.data.data.token)
        } else {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
      }
    }),
    logoutTC: create.asyncThunk(async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          dispatch(clearTasks())
          dispatch(clearTodolists())
          localStorage.removeItem('sn-token')
        } else {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
      }
    }),
    initializeAppTC: create.asyncThunk(async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const res = await authApi.me()
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
        } else {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
      } finally {
        dispatch(setIsInitialized({ isInitialized: true }))
      }
    }),
  }),
})

export const { setIsLoggedIn, setIsInitialized, loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
