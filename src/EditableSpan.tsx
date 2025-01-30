import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: Props) => {
    const {value, onChange} = props

    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const turnOnModeHandler = () => {
        setIsEditMode(true)
    }

    const turnOffModeHandler = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {
                isEditMode ? (
                    <TextField variant='outlined'
                               value={title}
                               size='small'
                               onChange={changeTitle}
                               onBlur={turnOffModeHandler}
                               autoFocus/>
                ) : (
                    <span onDoubleClick={turnOnModeHandler}>{value}</span>
                )
            }
        </>
    )
}