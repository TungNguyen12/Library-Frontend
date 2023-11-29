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
import CreateBookDto from '../../types/book/CreateBookRequest'
import { createBookAsync } from '../../redux/services/BookServices'

const signUp = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    ISBN: yup.string().required(),
    edition: yup.string().required(),
    category: yup.string().required(),
    publisher: yup.string().required(),
    author: yup.array().of(yup.string().required()).required(),
  })
  .required()

export const CreateBookForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp),
  })

  const onSubmit = async (data: CreateBookDto) => {
    const newBook: CreateBookDto = data
    await dispatch(createBookAsync(newBook))
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
                id="description"
                label="Book description "
                error={Boolean(errors.description?.message)}
                helperText={errors.description?.message}
                {...register('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book ISBN"
                id="isbn"
                error={Boolean(errors.ISBN?.message)}
                helperText={errors.ISBN?.message}
                {...register('ISBN')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                error={Boolean(errors.category?.message)}
                helperText={errors.category?.message}
                {...register('category')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book edition"
                error={Boolean(errors.edition?.message)}
                helperText={errors.edition?.message}
                {...register('edition')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Publisher"
                error={Boolean(errors.publisher?.message)}
                helperText={errors.publisher?.message}
                {...register('publisher')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Author(s)"
                error={Boolean(errors.author?.message)}
                helperText={errors.author?.message}
                {...register('author')}
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
