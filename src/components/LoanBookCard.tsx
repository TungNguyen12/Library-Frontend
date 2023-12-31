import React from 'react'
import { getLoanHistoryAsync } from '../redux/reducers/loansReducer'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { BASE_URL, LANDING } from '../common'
import { useAppDispatch } from '../hooks/useAppDispatch'
import toast from 'react-hot-toast'
import { LoanInfo } from '../types/loans'

const LoanBookCard: React.FC<any> = ({ loanInfo, accessToken }) => {
  const loan = loanInfo as LoanInfo
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleReturnBook = async (id: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/return`,
        { id: [id] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const isReturned = response.data
      toast.success('Returned! ✅')
      dispatch(getLoanHistoryAsync(accessToken))
      return isReturned
    } catch (e) {
      const error = e as Error
      toast.error(error.message)
      return error
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 194,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <CardActions
        onClick={() => {
          if (loan.book._id) {
            navigate(`${LANDING}${loan.book._id}`)
          }
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={loan.book.img}
          alt={loan.book.title}
          style={{
            objectFit: 'cover',
            width: '100%',
            borderRadius: '0.5rem',
          }}
        />
      </CardActions>
      <CardContent
        sx={{
          padding: '0 auto 15px',
          '&:last-child': { paddingBottom: '0' },
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <Stack>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {loan?.book?.title}
          </Typography>
        </Stack>

        <Stack>
          <Button
            size="medium"
            onClick={() => handleReturnBook(loan.book._id)}
            variant="contained"
            disabled={loan.returned}
          >
            {loan.returned ? 'Returned' : 'Return'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LoanBookCard
