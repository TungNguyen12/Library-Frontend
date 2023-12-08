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

function Cart() {
  const navigate = useNavigate()
  const items = useAppSelector((state) => state.cartReducer)

  return (
    <Container sx={{ margin: '50px auto', padding: '25px' }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant={'h4'} gutterBottom>
            Book basket
          </Typography>
          <Button
            size="medium"
            onClick={() => navigate('/checkout')}
            variant="contained"
            disabled={!Boolean(items.length)}
          >
            Checkout
          </Button>
        </Box>
        {items.length ? (
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
                  {items.map((item: Book) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid
              container
              spacing={2}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              marginTop={'1rem'}
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                container
                alignItems={'flex-end'}
              >
                <Link to="/">
                  <Button variant="outlined">Back to library</Button>
                </Link>
              </Grid>
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
                No item added in your shopping cart!
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
  )
}

export default Cart
