import UserControl from '../components/admin/UserControl'
import BooksControl from '../components/admin/BooksControl'
import SwitchPanel from '../components/admin/components/SwitchPanel'

import { Toaster } from 'react-hot-toast'

import { Box } from '@mui/material'

import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getAllAuthorsAsync } from '../redux/reducers/authorReducer'
import { getAllCategories } from '../redux/reducers/categoriesReducer'

const AdminDashboard = () => {
  const [isOpenProduct, setIsOpenProduct] = useState(true)
  const [isOpenUser, setIsOpenUser] = useState(false)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllAuthorsAsync())
    dispatch(getAllCategories())
  }, [])

  const handleOpenProduct = () => {
    setIsOpenProduct(!isOpenProduct)
    setIsOpenUser(!isOpenUser)
  }
  const handleOpenUser = () => {
    setIsOpenUser(!isOpenUser)
    setIsOpenProduct(!isOpenProduct)
  }

  return (
    <>
      <Toaster />
      <Box sx={{ width: '90%', display: 'flex', margin: '50px auto' }}>
        <Box>
          <SwitchPanel
            handleOpenProduct={handleOpenProduct}
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
          {isOpenProduct && <BooksControl />}
          {isOpenUser && <UserControl />}
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboard
