/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import ProductCard from '../components/BookCard'
import Product from '../types/book/Book'
import axios, { AxiosError } from 'axios'
import { fetchAllCategories } from '../redux/reducers/categoriesReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { Toaster } from 'react-hot-toast'
// import Carousel from "react-material-ui-carousel";

const Categories = () => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  )
  const [categoryId, setCategoryId] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])

  const dispatch = useAppDispatch()
  const getProductByCategory = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
      )
      const productsByCategory = response.data
      setProducts(productsByCategory)
    } catch (e) {
      const error = e as AxiosError
      return error.message
    }
  }

  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [])

  useEffect(() => {
    getProductByCategory()
  }, [categoryId])

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Toaster />
      <Box sx={{ flexGrow: 1, marginTop: '50px' }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {categories.map((category) => (
            <Grid item xs={3} key={category.id}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    setCategoryId(category.id)
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150px"
                    width="150px"
                    image={category.image}
                    alt={category.name}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Typography>{category.name}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          height: '412px',
          margin: '50px auto',
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
          {products.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Categories
