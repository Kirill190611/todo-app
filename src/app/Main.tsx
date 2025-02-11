import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import Container from "@mui/material/Container";
import {createTodolistAC} from "@/features/todolists/model/todolist-reducer.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";
import {useAppDispatch} from "@/common/hooks";

export type FilterValues = 'all' | 'active' | 'completed'

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth='lg'>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={8}>
                <Todolists />
            </Grid>
        </Container>
    )
}