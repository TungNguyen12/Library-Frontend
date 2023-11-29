import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import Book from '../types/book/Book'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addToCart } from '../redux/reducers/cardReducer'
import toast from 'react-hot-toast'

const BookCard: React.FC<any> = ({ book }) => {
  const { id, title, price, images } = book
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleAddToCart = (payload: Book) => {
    dispatch(addToCart(payload))
    toast(`Add 1 ${payload.title} to cart`, {
      icon: '✅',
    })
  }

  return (
    <Card sx={{ maxWidth: 194 }}>
      <CardActions
        onClick={() => {
          navigate(`/${id}`)
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={
            'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg'
          }
          alt={title}
          style={{
            objectFit: 'cover',
            width: '100%',
            borderRadius: '0.5rem',
          }}
        />
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Price: {price}€
        </Typography>

        <Button onClick={() => handleAddToCart(book)}>Add to cart</Button>
      </CardContent>
    </Card>
  )
}

export default BookCard
