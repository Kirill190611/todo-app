import type { RequestStatus } from '@/common/types'
import { LoginArgs } from '@/features/auth/api/authApi.types.ts'
import { _authApi } from '@/features/auth/api/_authApi.ts'
import { ResultCode } from '@/common/enums'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { clearTasks } from '@/features/todolists/model/tasks-slice.ts'
import { clearTodolists } from '@/features/todolists/model/todolists-slice.ts'

export const appSlice = createAppSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    loginTC: create.asyncThunk(async (data: LoginArgs, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const res = await _authApi.login(data)
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
        const res = await _authApi.logout()
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
        const res = await _authApi.me()
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
        //dispatch(setIsInitialized({ isInitialized: true }))
      }
    }),
  }),
})

export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } =
  appSlice.selectors
export const {
  changeThemeModeAC,
  setAppStatusAC,
  setAppErrorAC,
  setIsLoggedIn,
  logoutTC,
  loginTC,
} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
