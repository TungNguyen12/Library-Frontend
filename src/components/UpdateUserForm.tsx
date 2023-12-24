// UI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
} from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'

// YUP
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//TYPES
import User from '../types/users'

// REACT/REDUX
import { useForm, SubmitHandler } from 'react-hook-form'
import { updateUserAsync } from '../redux/reducers/authReducer'
import { useState } from 'react'

// HOOKS
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'

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
  const currentUser = useAppSelector(
    (state) => state.authReducer.currentUser
  ) as User
  const [user, setUser] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    avatar: currentUser.avatar,
  })
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.authReducer.accessToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modify),
    defaultValues: user,
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const onSubmit: SubmitHandler<any> = ({ firstName, lastName, avatar }) => {
    const updated = { firstName, lastName, avatar }
    if (accessToken) {
      dispatch(updateUserAsync({ update: updated, accessToken }))
    } else {
      toast.error('Invalid token, please signin')
    }
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              height: '75px',
              width: '75px',
            }}
            alt={user?.firstName}
            src={user?.avatar}
          ></Avatar>
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
                  value={user.firstName}
                  error={Boolean(errors.firstName?.message)}
                  helperText={errors.firstName?.message}
                  {...register('firstName')}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  id="lastName"
                  value={user.lastName}
                  error={Boolean(errors.lastName?.message)}
                  helperText={errors.lastName?.message}
                  {...register('lastName')}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Avatar"
                  id="avatar"
                  value={user.avatar}
                  error={Boolean(errors.avatar?.message)}
                  helperText={errors.avatar?.message}
                  {...register('avatar')}
                  onChange={handleChange}
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
    </>
  )
}

export default UpdateUserForm
