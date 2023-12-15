import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Box, Button, Dialog, Stack } from '@mui/material'
import { BookPaginationActionsTable } from './components/BookPagination'
import { CreateBookForm } from './components/CreateBookForm'
import { getAllBooksAsync } from '../../redux/services/BookServices'

const BookControl = () => {
  const [search, setSearch] = useState<string>('')
  const [openModal, setOpenModal] = useState(false)
  const allBooks = useAppSelector((state) => state.booksReducer.books)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllBooksAsync())
  }, [])

  const handleSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
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
            justifyContent: 'center',
            display: ' flex',
            marginTop: '10px',
            width: '80%',
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{ width: '200px' }}
          >
            Create book
          </Button>
        </Box>
      </Stack>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <CreateBookForm onClose={handleCloseModal} />
      </Dialog>
      <Box
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          display: ' flex',
          flexDirection: 'column',
          marginTop: '10px',
        }}
      >
        <BookPaginationActionsTable rows={booksToShow} />
      </Box>
    </Box>
  )
}

export default BookControl
