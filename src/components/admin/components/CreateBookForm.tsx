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

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { createBookAsync } from '../../../redux/services/BookServices'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { CreateBookDto } from '../../../types/book/CreateBookRequest'
import toast from 'react-hot-toast'

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import Category from '../../../types/category/CategoryAPI'
import { AutoMode } from '@mui/icons-material'
import { useState } from 'react'
import { AuthorAPI } from '../../../types/author/AuthorAPI'

export function generateISBN(): string {
  const prefix = '978'
  let isbn = prefix
  for (let i = prefix.length; i < 12; i++) {
    isbn += Math.floor(Math.random() * 10).toString()
  }
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const weight = i % 2 === 0 ? 1 : 3
    sum += parseInt(isbn[i]) * weight
  }
  const checkDigit = (10 - (sum % 10)) % 10
  return isbn + checkDigit.toString()
}

const createBook = yup
  .object({
    title: yup.string().required('Title is required'),
    ISBN: yup.string().required('ISBN is required'),
    category: yup.string().required('Please select a category'),
    publisher: yup.string().required('Publisher is required'),
    img: yup.string().url().required('Image is required and has to be an URL'),
    author: yup.string().required('Please select an author'),
  })
  .required()

export const CreateBookForm: React.FC<any> = () => {
  const [newISBN, setNewISBN] = useState<string>()

  const accessToken = useAppSelector((state) => state.authReducer.accessToken)
  const authors = useAppSelector((state) => state.authorsReducer.authors)
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  )

  console.log(authors, categories, 'authors and categories are here 🧠')

  const dispatch = useAppDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBook),
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    const newBook: CreateBookDto = {
      ...data,
      edition: 'DEFAULT',
      description: 'DEFAULT',
      author: [data.author],
      category: data.category,
    }
    if (accessToken) {
      await dispatch(createBookAsync({ newBook, accessToken }))
      reset()
    } else {
      toast.error('No valid token, please signin')
    }
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
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book ISBN"
                id="isbn"
                error={Boolean(errors.ISBN?.message)}
                helperText={errors.ISBN?.message}
                {...register('ISBN')}
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                margin="normal"
              >
                <InputLabel id="isbn">ISBN</InputLabel>
                <OutlinedInput
                  id="ISBN"
                  autoComplete="off"
                  autoFocus
                  {...register('ISBN')}
                  // value={newISBN}
                  // onChange={handleChange}
                  label="ISBN"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="generate ISBN"
                        onClick={() => {
                          const generatedISBN = generateISBN()
                          setNewISBN(generateISBN)
                          reset({ ISBN: generatedISBN })
                        }}
                        edge="end"
                      >
                        <AutoMode />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                label="Book image"
                error={Boolean(errors.img?.message)}
                helperText={errors.img?.message}
                {...register('img')}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <FormControl
                sx={{
                  minWidth: '45%',
                }}
              >
                <InputLabel id="author">Author</InputLabel>
                <Select
                  labelId="author"
                  id="author"
                  {...register('author')}
                  label="Author(s)"
                  error={Boolean(errors.author?.message)}
                  defaultValue=""
                >
                  {authors &&
                    authors.map((author: AuthorAPI) => (
                      <MenuItem key={author._id} value={author._id}>
                        {author.firstName + ' ' + author.lastName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  minWidth: ' 45%',
                }}
              >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  error={Boolean(errors.category?.message)}
                  {...register('category')}
                  label="Category"
                  defaultValue=""
                >
                  {categories &&
                    categories.map(({ _id, name }: Category) => (
                      <MenuItem key={_id} value={_id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
