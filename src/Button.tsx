type Props = {
    title: string
}

export const Button = (props: Props) => {
    const {title} = props

    return (
       <button>{title}</button>
    )
}