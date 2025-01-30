import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = (props: Props) => {
    const {onCreateItem} = props

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')

    const createItemHandler  = () => {
        if (title.trim() !== '') {
            onCreateItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button variant='contained' onClick={createItemHandler}>+</Button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}