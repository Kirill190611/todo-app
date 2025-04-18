import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import styles from './TasksPagination.module.css'
import { PAGE_SIZE } from '@/common/constants/constants.ts'

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TaskPagination = ({ setPage, page, totalCount }: Props) => {
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <div>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePage}
        shape='rounded'
        color='primary'
        className={styles.pagination}
      />
      <div className={styles.totalCount}>
        <Typography variant={'caption'}>
          Total tasks quantity: {totalCount}
        </Typography>
      </div>
    </div>
  )
}
