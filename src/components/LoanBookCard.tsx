import React from 'react'
import { BookInfo } from '../redux/reducers/loanReducer'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../common/common'

const LoanBookCard: React.FC<any> = ({ book, accessToken }) => {
  const { _id, title, img } = book as BookInfo
  const navigate = useNavigate()

  const handleReturnBook = async (bookId: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/return`,
        { id: [bookId] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const isReturned = response.data
      console.log(isReturned, 'return books successfully')
      return isReturned
    } catch (e) {
      const error = e as Error
      console.log('something went wrong, check the error')
      return error
    }
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
        sx={{ padding: '0 auto', '&:last-child': { paddingBottom: '0' } }}
      >
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Button
          size="medium"
          onClick={() => handleReturnBook(_id)}
          variant="contained"
        >
          Return
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoanBookCard
