import './App.module.css'
import { selectThemeMode, setIsLoggedIn } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './App.module.css'
import { Outlet } from 'react-router'
import { useMeQuery } from '@/features/auth/api/_authApi.ts'
import { ResultCode } from '@/common/enums'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const { data } = useMeQuery()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  useEffect(() => {
    if (data) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setIsInitialized(true)
    }
  }, [data])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        {isInitialized && (
          <>
            <Header />
            <Outlet />
          </>
        )}
        {!isInitialized && (
          <div className={styles.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
          </div>
        )}
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
