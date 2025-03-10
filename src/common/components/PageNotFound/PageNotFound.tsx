import styles from './PageNotFound.module.css'

export const PageNotFound = () => {
  return (
    <>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Oops... Something wrong! Page not found</h2>
    </>
  )
}
