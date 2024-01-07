// React Hook Form
import { SubmitHandler, useForm } from 'react-hook-form'

// Redux
import { useAppDispatch } from '../hooks/useAppDispatch'

import { registerUserAsync } from '../redux/reducers/userReducer'

// Toast
import { Toaster } from 'react-hot-toast'

// MUI Components
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'

// MUI Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

// Yup and React Hook Form Resolvers
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateUserRequest } from '../types/users'
import { useNavigate } from 'react-router-dom'
import { LANDING } from '../common'

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
    email: yup.string().email().required(),
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

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

    const newUser: CreateUserRequest = {
      ...newData,
    }
    dispatch(registerUserAsync(newUser))
    reset()
  }

  return (
    <>
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
                  autoComplete="email"
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
                  id="phoneNumber"
                  label="Phone"
                  error={Boolean(errors.phoneNumber?.message)}
                  helperText={errors.phoneNumber?.message}
                  {...register('phoneNumber')}
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
                  id="confirmPassword"
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
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate(`${LANDING}signin`)}>
                
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

export default SignUp
