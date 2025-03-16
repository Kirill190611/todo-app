import './App.module.css'
import { selectThemeMode } from '@/app/app-slice'
import { ErrorSnackbar, Header } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Routing } from '@/common/routing'
import { initializeAppTC, selectIsInitialized } from '@/features/auth/model/__tests__/auth-slice.ts'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './App.module.css'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        {isInitialized && (
          <>
            <Header />
            <Routing />
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
