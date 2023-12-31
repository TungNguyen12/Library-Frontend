// React Router
import { Link, useNavigate } from 'react-router-dom'

// MUI Components
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

// Custom Components
import CartItem from '../components/CartItem'

// Redux
import { useAppSelector } from '../hooks/useAppSelector'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearCart } from '../redux/reducers/cartReducer'

// API and Toast
import { BASE_URL, LANDING } from '../common'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Book } from '../types/books'
import BackHomeButton from '../components/BackHomeButton'

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

  const handleToHome = () => {
    navigate(`${LANDING}`)
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
                
                  <Button variant="outlined" onClick={handleToHome}>Back to library</Button>
              

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
                   
              <BackHomeButton />
              
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Cart
