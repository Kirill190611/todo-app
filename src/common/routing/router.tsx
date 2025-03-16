import { createBrowserRouter } from 'react-router'
import { Main } from '@/app/Main.tsx'
import { PageNotFound } from '@/common/components/PageNotFound'
import { Login } from '@/features/auth/ui/Login/Login.tsx'
import { App } from '@/app/App.tsx'

export const Path = {
  Main: '/',
  Login: 'login',
  NotFound: '*',
} as const

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: Path.Main,
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: Path.NotFound,
        element: <PageNotFound />,
      },
    ],
  },
])
