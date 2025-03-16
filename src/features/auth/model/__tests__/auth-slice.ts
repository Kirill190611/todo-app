import { LoginArgs } from '@/features/auth/api/authApi.types.ts'
import { createAppSlice, handleServerNetworkError } from '@/common/utils'
import { setAppStatusAC } from '@/app/app-slice.ts'
import { authApi } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums'

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
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
      }
    }),
  }),
})

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const authReducer = authSlice.reducer
