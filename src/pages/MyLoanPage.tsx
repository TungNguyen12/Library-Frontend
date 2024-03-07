// React
import { useEffect } from 'react'

// Redux
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getLoanHistoryAsync } from '../redux/reducers/loansReducer'

// MUI Components
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
} from '@mui/material'

// Custom Components
import LoanBookCard from '../components/LoanBookCard'

// Toast
import { Toaster } from 'react-hot-toast'
import BackHomeButton from '../components/BackHomeButton'

const MyLoanPage = () => {
  const { accessToken } = useAppSelector((state) => state.authReducer)
  const { history, isLoading } = useAppSelector((state) => state.loansReducer)
  const borrowedBooks = history.filter((loan) => !loan.returned)
  const returnedBooks = history.filter((loan) => loan.returned)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken) {
      dispatch(getLoanHistoryAsync(accessToken))
    }
  }, [])
  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Toaster />
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
              <Card sx={{ marginBottom: '30px' }}>
                <CardContent>Active books</CardContent>
              </Card>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {borrowedBooks.length > 0 ? (
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
                  ))
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Stack>
                      <Alert severity="error" sx={{ marginTop: '2rem' }}>
                        You have not borrowed any books yet, let find one 🧠!
                      </Alert>
                    </Stack>
                    <BackHomeButton />
                  </Box>
                )}
              </Grid>
            </Box>

            <Box sx={{ marginTop: '50px' }}>
              <Card sx={{ marginBottom: '30px' }}>
                <CardContent>Returned books</CardContent>
              </Card>
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
