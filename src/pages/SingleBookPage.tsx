// React
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// Axios
import axios, { AxiosError, AxiosResponse } from 'axios'

// MUI Components
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

// Types
import { Book } from '../types/books'

// Redux
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { addToCart } from '../redux/reducers/cartReducer'

// Components
import ModifyBookForm from '../components/admin/components/UpdateBookForm'

// Redux Services
import { deleteBookAsync } from '../redux/services/BookServices'

// Toast
import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL } from '../common'

const SingleBook = () => {
  const [book, setBook] = useState<Book>()
  const { bookId } = useParams()
  const [openForm, setOpenForm] = useState(false)
  const navigate = useNavigate()

  const admin = useAppSelector((state) => state.authReducer.currentUser)
  const isAdmin = admin?.role[0].title === 'Admin' ? true : false
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const dispatch = useAppDispatch()

  const getSingleBook = async () => {
    try {
      const response = await axios.get<any, AxiosResponse<Book>>(
        `${BASE_URL}/books/${bookId}`
      )
      const data = response.data
      setBook(data)
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  useEffect(() => {
    getSingleBook()
  }, [bookId])

  const handleAddToCart = (payload: Book) => {
    dispatch(addToCart(payload))
  }
  const handleDeleteBook = (book: Book) => {
    if (accessToken) {
      dispatch(deleteBookAsync({ bookId: book._id, accessToken }))
      navigate('/')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '50px auto',
        padding: '25px',
        height: 'vh',
      }}
    >
      <Toaster />
      {book && (
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
              image={book?.img}
              alt={book?.title}
            />
          </Card>

          <Card sx={{ maxWidth: '55%' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {book?.title}
              </Typography>
              <Typography variant="h5" component="div">
                {book?.author[0].fullName}
              </Typography>
              <Typography>Description: {book?.description}</Typography>
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
      )}

      {openForm && <ModifyBookForm book={book} />}
    </Box>
  )
}

export default SingleBook
