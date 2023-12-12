/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getAllBooksAsync } from '../redux/services/BookServices'
import { sortBookByTitle } from '../redux/reducers/booksReducer'

import BookCard from '../components/BookCard'
import SearchInput from '../components/SearchInput'
import { Box, Button, Grid, Typography } from '@mui/material'

import { Toaster } from 'react-hot-toast'
import { addToCart } from '../redux/reducers/cardReducer'
import Book from '../types/book/Book'

const AllBooks = () => {
  const validUser = useAppSelector((state) => state.authReducer.currentUser)
  const [search, setSearch] = useState<string>('')
  const { books, isLoading } = useAppSelector((state) => state.booksReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllBooksAsync())
  }, [])

  const handleSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  const booksToShow = useMemo(() => {
    return search
      ? books.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        )
      : books
  }, [search, books])

  const handleAddToCart = (payload: Book) => {
    dispatch(addToCart(payload))
  }

  const handleSortByAZ = () => {
    dispatch(sortBookByTitle('asc'))
  }
  const handleSortByZA = () => {
    dispatch(sortBookByTitle('desc'))
  }

  return (
    <>
      <Box sx={{ width: '70%', margin: 'auto' }}>
        <Toaster toastOptions={{ style: { fontFamily: 'Roboto' } }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: ' 50px',
          }}
        >
          <Button variant="contained" color="success" onClick={handleSortByAZ}>
            Sort by A-Z{' '}
          </Button>
          <Button variant="contained" color="success" onClick={handleSortByZA}>
            Sort by Z-A{' '}
          </Button>

          {/* <SearchInput handleSearchBook={handleSearchBook} /> */}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            marginTop: '50px',
            height: 'vh',
            margin: 'auto',
          }}
        >
          {isLoading && <Typography>LOADING</Typography>}

          {books && !isLoading && (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
              {books &&
                booksToShow.map((book) => (
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
          )}
        </Box>
      </Box>
    </>
  )
}

export default AllBooks
