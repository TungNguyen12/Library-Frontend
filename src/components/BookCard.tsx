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

const BookCard: React.FC<any> = ({ book }) => {
  const { _id, title, author, img, category } = book as Book

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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {author[0].fullName}
        </Typography>

        <Button onClick={() => handleAddToCart(book)}>Add to cart</Button>
      </CardContent>
    </Card>
  )
}

export default BookCard
