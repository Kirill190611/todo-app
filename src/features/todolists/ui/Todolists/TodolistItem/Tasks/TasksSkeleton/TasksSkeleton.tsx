import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import styles from './TasksSkeleton.module.css'

export const TasksSkeleton = () => (
  <Box className={styles.container}>
    {Array(4)
      .fill(null)
      .map((_, id) => (
        <Box key={id} className={styles.common}>
          <Box className={styles.tasks}>
            <Skeleton width={20} height={40} />
            <Skeleton width={150} height={40} />
          </Box>
          <Skeleton width={20} height={40} />
        </Box>
      ))}
  </Box>
)
