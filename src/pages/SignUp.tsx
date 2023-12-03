import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../hooks/useAppDispatch'
import CreateUserDto from '../types/user/RegisterUserRequest'
import {
  checkEmailIsAvailable,
  registerUserAsync,
} from '../redux/reducers/userReducer'
import { Toaster } from 'react-hot-toast'
interface FormInput {
  firstName: string
  lastName: string
  email: string
  address: string
  avatar: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const signUp = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    avatar: yup.string().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().min(8).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required(),
  })
  .required()

export const SignUp = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp),
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const { ...newData } = Object.assign({}, data)

    const newUser: CreateUserDto = {
      ...newData,
    }
    console.log(newUser)
    dispatch(registerUserAsync(newUser))
    reset()
  }

  dispatch(checkEmailIsAvailable('thisisanavailable@mail.com'))

  return (
    <>
      {' '}
      <Toaster />
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="First name"
                  autoComplete="first-name"
                  error={Boolean(errors.firstName?.message)}
                  helperText={errors.firstName?.message}
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last name"
                  autoComplete="last-name"
                  error={Boolean(errors.lastName?.message)}
                  helperText={errors.lastName?.message}
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="username"
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address?.message)}
                  helperText={errors.address?.message}
                  {...register('address')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="avatar"
                  label="Avatar"
                  error={Boolean(errors.avatar?.message)}
                  helperText={errors.avatar?.message}
                  {...register('avatar')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  autoComplete="new-password"
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  error={Boolean(errors.confirmPassword?.message)}
                  helperText={errors.confirmPassword?.message}
                  autoComplete="confirm-password"
                  {...register('confirmPassword')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
