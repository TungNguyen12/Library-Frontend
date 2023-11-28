/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { Box, Button, Stack } from '@mui/material'
import SearchInput from '../components/SearchInput'
import { ProductPaginationActionsTable } from './components/ProductPagination'
import { CreateProductForm } from './components/CreateProductForm'
import { fetchAllProductsAsync } from '../redux/services/BookServices'

const ProductControl = () => {
  const [search, setSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const allProducts = useAppSelector((state) => state.productsReducer.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProductsAsync())
  }, [])

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  const handleOpenCreateForm = () => {
    setIsOpen(!isOpen)
  }

  const productsToShow = search
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts

  return (
    <Box>
      <Stack direction="row" justifyContent={'center'}>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: ' flex',
            marginTop: '10px',
            width: '80%',
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenCreateForm}
            sx={{ width: '200px' }}
          >
            Create product
          </Button>
        </Box>
      </Stack>

      {isOpen && <CreateProductForm />}
      <Box
        sx={{
          alignContent: 'center',
          alignItems: 'center',
          display: ' flex',
          flexDirection: 'column',
          marginTop: '10px',
        }}
      >
        <SearchInput handleSearchProduct={handleSearchProduct} />
        <ProductPaginationActionsTable rows={productsToShow} />
      </Box>
    </Box>
  )
}

export default ProductControl
