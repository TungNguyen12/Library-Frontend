/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { Box, Button, Stack } from '@mui/material'
import SearchInput from '../components/SearchInput'
import { BookPaginationActionsTable } from './components/BookPagination'
import { CreateBookForm } from './components/CreateBookForm'
import { fetchAllBooksAsync } from '../redux/services/BookServices'

const BookControl = () => {
  const [search, setSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const allBooks = useAppSelector((state) => state.booksReducer.books)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllBooksAsync())
  }, [])

  const handleSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  const handleOpenCreateForm = () => {
    setIsOpen(!isOpen)
  }

  const booksToShow = search
    ? allBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      )
    : allBooks

  return (
    <Box>
      <Stack direction="row" justifyContent={'center'}>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: ' flex',
            marginTop: '10px',
            width: '80%',
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenCreateForm}
            sx={{ width: '200px' }}
          >
            Create book
          </Button>
        </Box>
      </Stack>

      {isOpen && <CreateBookForm />}
      <Box
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          display: ' flex',
          flexDirection: 'column',
          marginTop: '10px',
        }}
      >
        <SearchInput handleSearchBook={handleSearchBook} />
        <BookPaginationActionsTable rows={booksToShow} />
      </Box>
    </Box>
  )
}

export default BookControl
