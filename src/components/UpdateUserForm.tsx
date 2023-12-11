import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import toast from 'react-hot-toast'

import { updateUserAsync } from '../redux/reducers/authReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

const modify = yup
  .object()
  .shape({
    firstName: yup.string(),
    lastName: yup.string(),
    avatar: yup.string().url('Invalid URL format'),
  })
  .test(
    'at-least-one-required',
    'At least one of firstName or lastName is required',
    function (values) {
      const { firstName, lastName } = values
      if (!firstName && !lastName) {
        return this.createError({
          path: 'modify',
          message: 'At least one of firstName or lastName is required',
        })
      }
      return true
    }
  )

export const UpdateUserForm: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modify),
  })

  const onSubmit: SubmitHandler<any> = ({ firstName, lastName }) => {
    console.log('new lastName here 🤔', lastName)

    const updated = { firstName, lastName }
    console.log(updated, '🤔🤔🤔')
    if (accessToken) {
      dispatch(updateUserAsync({ update: updated, accessToken }))
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
                id="firstName"
                label="First name"
                error={Boolean(errors.firstName?.message)}
                helperText={errors.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last name"
                id="lastName"
                error={Boolean(errors.lastName?.message)}
                helperText={errors.lastName?.message}
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Avatar"
                id="avatar"
                error={Boolean(errors.avatar?.message)}
                helperText={errors.avatar?.message}
                {...register('avatar')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update profile
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default UpdateUserForm
