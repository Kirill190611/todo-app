import { useAppSelector } from '@/common/hooks'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { Navigate } from 'react-router'
import { Path } from '@/common/routing'
import { useCreateTodolistMutation } from '@/features/todolists/api/_todolistsApi.ts'
import { selectIsLoggedIn } from '@/app/app-slice.ts'

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [createTodolist] = useCreateTodolistMutation()

  const addTodolist = (title: string) => {
    createTodolist(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm onCreateItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
