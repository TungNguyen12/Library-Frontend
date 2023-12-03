import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { LoginInterface } from '../types/user/Login'
import { signinAsync } from '../redux/reducers/authReducer'
import { useAppSelector } from '../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from '@mui/material'
import { Toaster } from 'react-hot-toast'

const signUp = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(1).max(20).required(),
  })
  .required()

export const Signin = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp),
  })

  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => state.authReducer.currentUser)
  const [success, setSuccess] = useState(false)
  const onSubmit: SubmitHandler<LoginInterface> = (data) => {
    dispatch(signinAsync(data))

    // console.log(currentUser)
    // if (currentUser !== null) {
    //   navigate('/')
    // }
    reset()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  useEffect(() => {
    if (currentUser !== null) {
      console.log('currentUser changed 🤔:', currentUser)
      const timeoutId = setTimeout(() => {
        console.log("Redirecting to '/'")
        navigate('/')
      }, 3000)

      // Cleanup the timeout in case the component unmounts
      return () => clearTimeout(timeoutId)
    }
  }, [currentUser, navigate])

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
            Sign in
          </Typography>
          {success && currentUser && (
            <Typography>
              Log in successfully, redirecting to Product page
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  label="Password"
                  type="password"
                  id="password"
                  autoCorrect="password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  autoComplete="new-password"
                  {...register('password')}
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
                Sign in
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signup" variant="body2">
                  You don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Signin
