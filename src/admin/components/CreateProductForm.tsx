import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import CreateProductDto from '../../types/book/CreateBookRequest'
import { createProductAsync } from '../../redux/services/BookServices'

const signUp = yup
  .object({
    title: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    categoryId: yup.number().required(),
    images: yup.string().required(),
  })
  .required()

export interface CreateProductInput {
  title: string
  price: number
  description: string
  categoryId: number
  images: string
}

export const CreateProductForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp),
  })

  const onSubmit = async (data: CreateProductInput) => {
    const newProduct: CreateProductDto = {
      ...data,
      images: [data.images],
    }
    await dispatch(createProductAsync(newProduct))
    reset()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Create new product
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                label="Product Title"
                autoComplete="product-title"
                error={Boolean(errors.title?.message)}
                helperText={errors.title?.message}
                {...register('title')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="price"
                label="Product Price "
                error={Boolean(errors.price?.message)}
                helperText={errors.price?.message}
                {...register('price')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product description"
                id="description"
                error={Boolean(errors.description?.message)}
                helperText={errors.description?.message}
                {...register('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category ID"
                error={Boolean(errors.categoryId?.message)}
                helperText={errors.categoryId?.message}
                {...register('categoryId')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product images"
                error={Boolean(errors.images?.message)}
                helperText={errors.images?.message}
                {...register('images')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
