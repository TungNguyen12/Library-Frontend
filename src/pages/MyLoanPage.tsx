import { useEffect } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getLoanHistoryAsync } from '../redux/reducers/loansReducer'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import LoanBookCard from '../components/LoanBookCard'
import { Toaster } from 'react-hot-toast'

const MyLoanPage = () => {
  const { accessToken } = useAppSelector((state) => state.authReducer)
  const { history, isLoading } = useAppSelector((state) => state.loansReducer)
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
    <Box>
      <Toaster />
      <Button size="medium" onClick={handleGetHistory} variant="contained">
        Get history
      </Button>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '50px',
          height: 'vh',
          margin: 'auto',
        }}
      >
        {isLoading && <CircularProgress sx={{ margin: '100px auto' }} />}

        {history && !isLoading && (
          <>
            <Box>
              <Typography>Active books</Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {borrowedBooks.length > 0 &&
                  borrowedBooks.map((loan) => (
                    <Grid
                      key={loan.borrowed_Date}
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LoanBookCard loanInfo={loan} accessToken={accessToken} />
                    </Grid>
                  ))}
              </Grid>
            </Box>

            <Box sx={{ marginTop: '50px' }}>
              <Typography>Returned books</Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {returnedBooks &&
                  returnedBooks.map((loan) => (
                    <>
                      <Grid
                        key={loan.borrowed_Date}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <LoanBookCard
                          loanInfo={loan}
                          accessToken={accessToken}
                        />
                      </Grid>
                    </>
                  ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default MyLoanPage
