import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Book from '../types/book/Book'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addToCart } from '../redux/reducers/cartReducer'
import { useAppSelector } from '../hooks/useAppSelector'

const BookCard: React.FC<any> = ({ book }) => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser)
  const { _id, title, img } = book as Book

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleAddToCart = (payload: Book) => {
    dispatch(addToCart(payload))
  }

  return (
    <Card
      sx={{
        maxWidth: 194,
        transition: 'ease-in-out 0.25s',
        '&:hover': {
          cursor: 'pointer',
          marginTop: '-7px',
          marginBottom: '7px',
          marginLeft: '-7px',
        },
      }}
    >
      <CardActions
        onClick={() => {
          navigate(`/${_id}`)
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={img}
          alt={title}
          style={{
            objectFit: 'cover',
            width: '100%',
            borderRadius: '0.5rem',
          }}
        />
      </CardActions>
      <CardContent
        sx={{
          padding: '0 auto',
          '&:last-child': { paddingBottom: '0' },
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <Stack>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {title}
          </Typography>
        </Stack>
        <Stack>
          {currentUser?.role[0].title === 'Admin' ? (
            <Button>Edit book</Button>
          ) : (
            <Button onClick={() => handleAddToCart(book)}>Add to cart</Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default BookCard
