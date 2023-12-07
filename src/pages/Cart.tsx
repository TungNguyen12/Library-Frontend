import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/reducers/cardReducer'
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import getTotalCost from '../redux/selectors/cart/getTotalCost'
import toast, { Toaster } from 'react-hot-toast'

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer)
  const dispatch = useAppDispatch()
  const validUser = useAppSelector((state) => state.authReducer.currentUser)

  const totalCost = useAppSelector((state) => getTotalCost(state))

  const handleRemove = (payload: string) => {
    dispatch(removeFromCart(payload))
    toast.success(`Empty cart successfully`)
  }

  //   const handleIncrement = (payload: number) => {
  //     dispatch(incrementQuantity(payload))
  //     toast(`Add 1 item to cart`, {
  //       icon: '✅',
  //     })
  //   }

  //   const handleDecrement = (payload: number) => {
  //     dispatch(decrementQuantity(payload))
  //     toast(`Remove 1 item from cart`, {
  //       icon: '❌',
  //     })
  //   }

  const handleClearCart = () => {
    if (window.confirm('Are you sure want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  return (
    <div>
      <Toaster />
      <div>
        {validUser && cart.length > 0 && (
          <Stack alignItems={'center'} sx={{ marginTop: '35px' }}>
            <Box borderBottom={'solid black 1px'}>
              <Typography variant="h4"> My basket </Typography>
            </Box>

            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Stack spacing={2} sx={{ marginTop: '15px' }}>
                {cart.map((item) => (
                  <Card key={item._id} sx={{ display: 'flex' }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={item.img}
                      alt={item.title}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <CardContent>
                        <Stack>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>

                          <Stack
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginTop: '20px',
                            }}
                          >
                            {/* <Button onClick={() => handleDecrement(item._id)}>
                              -
                            </Button> */}
                            <Typography>{item.quantity}</Typography>
                            {/* <Button onClick={() => handleIncrement(item._id)}>
                              +
                            </Button> */}
                          </Stack>
                          {/* <Typography>Price: {item.price}€</Typography> */}
                          <Button onClick={() => handleRemove(item._id)}>
                            Remove item
                          </Button>
                        </Stack>
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Stack>
              <Stack>
                <CardContent>
                  <Typography>Total: {totalCost}€</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClearCart}
                  >
                    Clear your cart
                  </Button>
                </CardContent>
              </Stack>
            </Stack>
          </Stack>
        )}
        {validUser && cart.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}
          >
            <Stack
              spacing={1}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Badge badgeContent={'0'}>
                <ShoppingCart style={{ width: '2em', height: '2em' }} />
              </Badge>
              <Typography variant="h4">Empty</Typography>
              <Typography>
                There is no book inside your basket, let's go to the shelves
              </Typography>
              <Link to="/">
                <Button
                  variant="contained"
                  sx={{
                    width: '230px',
                    backgroundColor: 'black',
                  }}
                >
                  Back to Library
                </Button>
              </Link>
            </Stack>
          </Box>
        )}
      </div>
    </div>
  )
}

export default Cart
