import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { NavButton } from '@/common/components/NavButton/NavButton.ts'
import Switch from '@mui/material/Switch'
import AppBar from '@mui/material/AppBar'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { getTheme } from '@/common/theme'
import { changeThemeModeAC, selectStatus, selectThemeMode } from '@/app/app-slice.ts'
import LinearProgress from '@mui/material/LinearProgress'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  return (
    <AppBar position='static' sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth='lg' sx={containerSx}>
          <IconButton color='inherit'>
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign In</NavButton>
            <NavButton>Sign Out</NavButton>
            <NavButton background={theme.palette.primary.dark}>FAQ</NavButton>
            <Switch color='default' onChange={changeThemeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
