import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

// Common
import { BASE_URL } from '../common'

// Types

// Components
import BookCard from '../components/BookCard'
import AuthorsFormControl from '../components/AuthorFormControl'
import CategoryFormControl from '../components/CategoryFormControl'
import SearchInput from '../components/SearchInput'

// Redux Services
import { getAllBooksAsync } from '../redux/services/BookServices'
import { useAppDispatch } from '../hooks/useAppDispatch'

// React Hot Toast
import { Toaster } from 'react-hot-toast'

// Redux Reducers
import { getAllAuthorsAsync } from '../redux/reducers/authorsReducer'
import { getAllCategoriesAsync } from '../redux/reducers/categoriesReducer'
import { Book, FilterBooksOptions, PaginatedData } from '../types/books'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [filterOptions, setFilterOptions] = useState<FilterBooksOptions>({
    page: 1,
    perPage: 8,
    search: '',
    sortOrder: 'desc',
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
          `&sortOrder=${filterOptions.sortOrder}` +
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
    dispatch(getAllAuthorsAsync())
    dispatch(getAllCategoriesAsync())
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
              <FormControl
                sx={{
                  minWidth: 150,
                  marginRight: '10px',
                }}
              >
                <InputLabel id="selectSortOrder">Sort order</InputLabel>
                <Select
                  labelId="selectSortOrder"
                  id="selectSortOrder"
                  onChange={(e: SelectChangeEvent) =>
                    setFilterOptions({
                      ...filterOptions,
                      sortOrder: e.target.value,
                    })
                  }
                  value={filterOptions.sortOrder}
                  label="Sort order"
                  defaultValue="asc"
                >
                  <MenuItem value={'asc'}>Oldest </MenuItem>
                  <MenuItem value={'desc'}>Newest </MenuItem>
                </Select>
              </FormControl>
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
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '50px',
            height: 'vh',
            margin: 'auto',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          {isLoading && (
            <>
              <CircularProgress sx={{ margin: '100px auto' }} />
              <Typography>
                It takes a while to render data due to FREE deployment for our
                BACKEND
              </Typography>
            </>
          )}
          {error && <Typography variant="h4">Items not found.</Typography>}
          {data && data.data.length < 1 && (
            <Box sx={{ margin: 'auto' }}>
              <Typography>Book not found</Typography>
            </Box>
          )}
        </Box>
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
