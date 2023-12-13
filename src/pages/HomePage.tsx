import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Grid,
  Pagination,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

import { BASE_URL } from '../common/common'
import { FilterBooksOptions, PaginatedData } from '../types/book/AllBooksApi'
import BookCard from '../components/BookCard'
import Book from '../types/book/Book'
import AuthorsFormControl from '../components/AuthorFormControl'
import CategoryFormControl from '../components/CategoryFormControl'
import SearchInput from '../components/SearchInput'
import { getAllBooksAsync } from '../redux/services/BookServices'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { Toaster } from 'react-hot-toast'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [filterOptions, setFilterOptions] = useState<FilterBooksOptions>({
    page: 1,
    perPage: 8,
    search: '',
    sortOrder: '',
    authorName: '',
    categoryName: '',
  })

  const [data, setData] = useState<PaginatedData<Book> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const getAllBooksPaginatedAsync = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/books/?filter=1&page=${filterOptions.page}` +
          `&perPage=${filterOptions.perPage}` +
          `&search=${filterOptions.search}` +
          `&sortOrder=asc` +
          `&authorName=${filterOptions.authorName}` +
          `&categoryName=${filterOptions.categoryName}`
      )
      const responseData: PaginatedData<Book> = response.data
      setData(responseData)
      setIsLoading(false)
    } catch (e) {
      const error = e as Error
      setError(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllBooksPaginatedAsync()
  }, [filterOptions])

  useEffect(() => {
    dispatch(getAllBooksAsync())
  }, [])

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Toaster />
      <Box>
        <Stack
          marginTop="50px"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ pb: 4 }}>
            <Stack>
              <SearchInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterOptions({
                    ...filterOptions,
                    search: e.target.value,
                  })
                }}
              />
            </Stack>

            <Stack>
              <AuthorsFormControl
                onChange={(e: SelectChangeEvent) =>
                  setFilterOptions({
                    ...filterOptions,
                    authorName: e.target.value,
                  })
                }
              />
            </Stack>
            <Stack>
              <CategoryFormControl
                onChange={(e: SelectChangeEvent) =>
                  setFilterOptions({
                    ...filterOptions,
                    categoryName: e.target.value,
                  })
                }
              />
            </Stack>
          </Stack>
        </Stack>
        {isLoading && (
          <Skeleton variant="rectangular" width="100%" height={400} />
        )}
        {error && <Typography variant="h4">Items not found.</Typography>}
        {data && data.data.length < 1 && (
          <Box sx={{ margin: 'auto' }}>
            <Typography>Book not found</Typography>
          </Box>
        )}
        {data && (
          <Box
            sx={{
              flexGrow: 1,
              marginTop: '50px',
              height: 'vh',
              margin: 'auto',
            }}
          >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
              {data.data &&
                data.data.map((book: Book) => (
                  <Grid
                    key={book._id}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BookCard book={book} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
        {data && (
          <Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={data?.totalPageCount}
              size="large"
              showFirstButton
              showLastButton
              page={data?.page}
              onChange={(e: React.ChangeEvent<unknown>, value: number) =>
                setFilterOptions({
                  ...filterOptions,
                  page: value,
                })
              }
            />
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
