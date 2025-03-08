import { Dispatch } from '@reduxjs/toolkit'
import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice.ts'

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
