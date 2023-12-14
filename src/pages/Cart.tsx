import { Link, useNavigate } from 'react-router-dom'

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import CartItem from '../components/CartItem'
import { useAppSelector } from '../hooks/useAppSelector'
import Book from '../types/book/Book'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearCart } from '../redux/reducers/cartReducer'
import { BASE_URL } from '../common/common'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function Cart() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.cartReducer)
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const bookIds: string[] = books.map((book) => book._id)

  const handleBorrowBook = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/borrow`,
        { id: bookIds },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const result = response.data
      toast.success('Borrowed')
      dispatch(clearCart())
      return result
    } catch (e) {
      toast.error('Books are not available to borrow')
      return e as Error
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Clear my cart?')) {
      dispatch(clearCart())
    }
  }

  return (
    <>
      <Toaster />
      <Container sx={{ margin: '50px auto', padding: '25px' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'h4'} gutterBottom>
              Book basket
            </Typography>
            <Button
              size="medium"
              onClick={handleBorrowBook}
              variant="contained"
              disabled={!Boolean(books.length)}
            >
              Borrow books
            </Button>
          </Box>
          {books.length ? (
            <>
              <TableContainer>
                <Table
                  sx={{
                    minWidth: 650,
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="center" valign="middle">
                        Category
                      </TableCell>
                      <TableCell align="center" valign="middle">
                        Author
                      </TableCell>
                      <TableCell align="center" valign="middle">
                        Remove
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book: Book) => (
                      <CartItem key={book._id} item={book} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid
                item
                container
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                spacing={2}
                marginTop={'1rem'}
              >
                <Link to="/">
                  <Button variant="outlined">Back to library</Button>
                </Link>

                <Button
                  variant="outlined"
                  style={{ color: 'white', backgroundColor: 'red' }}
                  onClick={handleClearCart}
                >
                  Empty cart
                </Button>
              </Grid>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Stack>
                <Alert severity="error" sx={{ marginTop: '2rem' }}>
                  Empty basket, let's explore the library 🧠!
                </Alert>
              </Stack>
              <Button
                href="/"
                sx={{
                  margin: '25px auto',
                  bgcolor: '#1976d2',
                  color: '#fff',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: '#1976d2',
                    opacity: '0.9',
                  },
                }}
              >
                Explore more books
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Cart
