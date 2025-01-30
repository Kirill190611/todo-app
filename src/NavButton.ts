import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({background}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    border: '1px solid black',
    borderRadius: '5px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || '#1565c0',
}))