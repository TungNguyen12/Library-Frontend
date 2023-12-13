import { useEffect } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getLoanHistoryAsync } from '../redux/reducers/loanReducer'
import { Button, Grid } from '@mui/material'
import LoanBookCard from '../components/LoanBookCard'
import { Toaster } from 'react-hot-toast'

const MyLoanPage = () => {
  const { accessToken } = useAppSelector((state) => state.authReducer)
  const history = useAppSelector((state) => state.loansReducer.history)
  const borrowedBooks = history.filter((loan) => !loan.returned)
  const returnedBooks = history.filter((loan) => loan.returned)

  const dispatch = useAppDispatch()

  const handleGetHistory = () => {
    if (accessToken) {
      dispatch(getLoanHistoryAsync(accessToken))
    }
  }
  useEffect(() => {
    if (accessToken) {
      dispatch(getLoanHistoryAsync(accessToken))
    }
  }, [])
  return (
    <div>
      <Toaster />
      <Button size="medium" onClick={handleGetHistory} variant="contained">
        Get history
      </Button>
      <Grid>
        {borrowedBooks.length > 0 &&
          borrowedBooks.map((loan) => (
            <Grid key={loan.borrowed_Date} item>
              <LoanBookCard loanInfo={loan} accessToken={accessToken} />
            </Grid>
          ))}
      </Grid>
      <Grid>
        {returnedBooks.length > 0 &&
          returnedBooks.map((loan) => (
            <Grid key={loan.borrowed_Date} item>
              <LoanBookCard loanInfo={loan} accessToken={accessToken} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default MyLoanPage
