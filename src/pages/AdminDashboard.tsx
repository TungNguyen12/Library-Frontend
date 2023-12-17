import UserControl from '../components/admin/UserControl'
import BooksControl from '../components/admin/BooksControl'
import SwitchPanel from '../components/admin/components/SwitchPanel'

import { Toaster } from 'react-hot-toast'

import { Box } from '@mui/material'

import { useEffect, useState } from 'react'

// Redux
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { getAllUsersAsync } from '../redux/reducers/userReducer'

const AdminDashboard = () => {
  const [isOpenBook, setIsOpenBook] = useState(true)
  const [isOpenUser, setIsOpenUser] = useState(false)
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllUsersAsync(accessToken))
    }
  }, [])

  const handleOpenBook = () => {
    setIsOpenBook(!isOpenBook)
    setIsOpenUser(!isOpenUser)
  }
  const handleOpenUser = () => {
    setIsOpenUser(!isOpenUser)
    setIsOpenBook(!isOpenBook)
  }

  return (
    <>
      <Toaster />
      <Box sx={{ width: '90%', display: 'flex', margin: '50px auto' }}>
        <Box>
          <SwitchPanel
            handleOpenBook={handleOpenBook}
            handleOpenUser={handleOpenUser}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {isOpenBook && <BooksControl />}
          {isOpenUser && <UserControl />}
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboard
