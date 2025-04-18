import styles from './PageNotFound.module.css'
import Button from '@mui/material/Button'
import { Link } from 'react-router'
import { Path } from '@/common/routing'

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>
        Oops... Something wrong! Page not found
      </h2>
      <Button
        className={styles.button}
        component={Link}
        to={Path.Main}
        variant={'contained'}
      >
        Вернуться на главную
      </Button>
    </div>
  )
}
