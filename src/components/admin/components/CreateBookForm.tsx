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
import { AuthorAPI } from '../../../redux/reducers/authorReducer'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Category from '../../../types/book/Category'

const signUp = yup
  .object({
    title: yup.string().required('Title is required'),
    ISBN: yup.string().required('ISBN is required'),
    category: yup.string().required('Please select a category'),
    publisher: yup.string().required('Publisher is required'),
    img: yup.string().url().required('Image is required and has to be an URL'),
    author: yup.string().required('Please select an author'),
  })
  .required()

export const CreateBookForm = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)
  const dispatch = useAppDispatch()

  const authors = useAppSelector((state) => state.authorReducer.authors)
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  )
  console.log(authors, categories, 'authors and categories are here 🧠')

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp),
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
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <FormControl
                sx={{
                  minWidth: 150,
                  marginRight: '10px',
                }}
              >
                <InputLabel id="selectAuthor">Author</InputLabel>
                <Select
                  labelId="selectAuthor"
                  id="selectAuthor"
                  {...register('author')}
                  label="Author(s)"
                  error={Boolean(errors.author)}
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
                  minWidth: 150,
                  marginRight: '10px',
                }}
              >
                <InputLabel id="selectCategories">Category</InputLabel>
                <Select
                  labelId="selectCategories"
                  id="selectCategories"
                  error={Boolean(errors.category?.message)}
                  {...register('category')}
                  label="Category"
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
            {/* {(errors.author || errors.category) && (
              <Typography color="error">
                Have you selected the author and category?
              </Typography>
            )} */}
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
