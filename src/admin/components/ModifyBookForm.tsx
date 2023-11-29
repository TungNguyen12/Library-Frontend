import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateBookAsync } from '../../redux/services/BookServices'
import Book from '../../types/book/Book'

const modify = yup
  .object({
    title: yup.string().required(),
  })
  .required()

export const ModifyBookForm: React.FC<any> = ({ book }) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modify),
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    const updated: Book = { ...book, ...data }
    dispatch(updateBookAsync({ id: updated._id, update: updated }))
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                label="Book title"
                error={Boolean(errors.title?.message)}
                helperText={errors.title?.message}
                {...register('title')}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                id="price"
                error={Boolean(errors.price?.message)}
                helperText={errors.price?.message}
                {...register('price')}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Book
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ModifyBookForm
