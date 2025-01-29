import {ChangeEvent, useState} from "react";

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
                    <input value={title} onBlur={turnOffModeHandler} onChange={changeTitle} autoFocus />
                ) : (
                    <span onDoubleClick={turnOnModeHandler}>{value}</span>
                )
            }
        </>
    )
}