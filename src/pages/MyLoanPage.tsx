import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getLoanHistoryAsync } from '../redux/reducers/loanReducer'
import { Button } from '@mui/material'

const MyLoanPage = () => {
  const { currentUser, accessToken } = useAppSelector(
    (state) => state.authReducer
  )
  const history = useAppSelector((state) => state.loansReducer.history)

  const nonReturnedBookIds: string[] = history
    .filter((loanInfo) => !loanInfo.return)
    .map((loanInfo) => loanInfo.book._id)

  const dispatch = useAppDispatch()
  const handleGetHistory = () => {
    if (accessToken) {
      dispatch(getLoanHistoryAsync(accessToken))
    }
  }
  return (
    <div>
      <Button size="medium" onClick={handleGetHistory} variant="contained">
        Get history
      </Button>
    </div>
  )
}

export default MyLoanPage
