import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { updateBookAsync } from '../../../redux/services/BookServices'
import Book from '../../../types/book/Book'
import { useAppSelector } from '../../../hooks/useAppSelector'
import toast from 'react-hot-toast'

const modify = yup
  .object()
  .shape({
    title: yup.string(),
    publisher: yup.string(),
  })
  .test(
    'at-least-one-required',
    'At least one of title or publisher is required',
    function (values) {
      const { title, publisher } = values
      if (!title && !publisher) {
        return this.createError({
          path: 'modify',
          message: 'At least one of title or publisher is required',
        })
      }
      return true
    }
  )

export const ModifyBookForm: React.FC<any> = ({ book }) => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modify),
  })

  const onSubmit: SubmitHandler<any> = ({ title, publisher }) => {
    console.log('new publisher here 🤔', publisher)

    const updated = { title, publisher }
    console.log(updated, '🤔🤔🤔')
    if (accessToken) {
      dispatch(updateBookAsync({ id: book._id, update: updated, accessToken }))
    } else {
      toast.error('Invalid token, please signin')
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Publisher"
                id="publisher"
                error={Boolean(errors.publisher?.message)}
                helperText={errors.publisher?.message}
                {...register('publisher')}
              />
            </Grid>
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
