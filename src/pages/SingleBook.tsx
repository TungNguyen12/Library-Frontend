/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import axios, { AxiosError, AxiosResponse } from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

import Book from '../types/book/Book'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { addToCart } from '../redux/reducers/cardReducer'
import ModifyBookForm from '../admin/components/ModifyBookForm'
import { deleteBookAsync } from '../redux/services/BookServices'
import toast, { Toaster } from 'react-hot-toast'

const SingleBook = () => {
  const [book, setBook] = useState<any>()
  const { bookId } = useParams()
  const [openForm, setOpenForm] = useState(false)
  const navigate = useNavigate()

  const admin = useAppSelector((state) => state.authReducer.currentUser)
  const isAdmin = admin?.role === 'admin' ? true : false

  const dispatch = useAppDispatch()

  const fetchSingleBook = async () => {
    try {
      const response = await axios.get<any, AxiosResponse<Book>>(
        `http://localhost:3000/api/v1/books/${bookId}`
      )
      const data: Book = response.data
      setBook(data)
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  useEffect(() => {
    fetchSingleBook()
  }, [bookId])

  const handleAddToCart = (payload: Book) => {
    dispatch(addToCart(payload))
    toast.success(`Add ${payload.title} to cart`)
  }
  const handleDeleteBook = (payload: Book) => {
    dispatch(deleteBookAsync(payload._id))
    navigate('/')
    toast.error(`${payload.title} deleted!`)
  }

  return (
    <Box
      sx={{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Toaster />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={
              'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg'
            }
            alt={book?.title}
          />
        </Card>

        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {book?.title}
            </Typography>
            <Typography variant="h6" component="div">
              {book?.price}€
            </Typography>
          </CardContent>

          <CardActions sx={{ display: 'flex' }}>
            {isAdmin ? (
              <ButtonGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '15px',
                  width: 'fit',
                }}
              >
                <Button
                  onClick={() => setOpenForm(!openForm)}
                  size="small"
                  sx={{
                    backgroundColor: 'lightyellow',
                    borderRightColor: '#8cbad9',
                  }}
                >
                  Modify book
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm('Delete this item?'))
                      handleDeleteBook(book)
                  }}
                  size="small"
                  sx={{
                    backgroundColor: 'pink',
                  }}
                >
                  Delete book
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={() => {
                  handleAddToCart(book)
                }}
                size="small"
                sx={{ backgroundColor: 'black' }}
              >
                Add to cart
              </Button>
            )}
          </CardActions>
          <CardActions>
            <Button size="small" sx={{ backgroundColor: 'lightgreen' }}>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                Back to Home
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Box>
      {openForm && <ModifyBookForm book={book} />}
    </Box>
  )
}

export default SingleBook