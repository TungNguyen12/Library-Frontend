import React from 'react'

import Signin from './Signin'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

//LOGIN RETURN AN MESSAGE AND THE ACCESS TOKEN, NOT THE ACTUAL USER INFO

const UserProfile = () => {
  const validUser = useAppSelector((state) => state.authReducer.currentUser)
  console.log('user profile 😶‍🌫️✅', validUser)
  const navigate = useNavigate()
  return (
    <div>
      {/* {validUser ? (
        <Stack alignItems={'center'} sx={{ marginTop: '35px' }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Stack spacing={2} sx={{ marginTop: '15px' }}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={validUser.avatar}
                  alt={validUser.firstName}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardContent>
                    <Stack>
                      <Typography gutterBottom variant="h5" component="div">
                        {validUser.firstName}
                      </Typography>

                      <Typography>{validUser.email}</Typography>
                      <Typography>
                        You are a great{' '}
                        {validUser.role[0].title.toLocaleLowerCase()}
                      </Typography>
                      <Button
                        onClick={() => navigate('/')}
                        sx={{
                          backgroundColor: 'lightpink',
                        }}
                      >
                        Back to library
                      </Button>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Signin />
      )} */}
      <Card
        sx={{
          minWidth: 256,
          textAlign: 'center',
        }}
      >
        {validUser ? (
          <>
            <CardContent>
              <Avatar
                sx={{ width: 60, height: 60, margin: 'auto' }}
                src={validUser?.avatar}
              />
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  marginTop: 8,
                  marginBottom: 0,
                }}
              >
                {validUser?.firstName} {validUser?.lastName}
              </h3>
            </CardContent>
            <Typography
              variant="h6"
              sx={{ textAlign: 'left', padding: '0rem 3rem' }}
            >
              Personal Details
            </Typography>
            <Divider light sx={{ margin: '0.5rem 0rem' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0.3rem',
                margin: '2rem',
                marginTop: '0.5rem',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '1rem',
                gap: '1rem',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
                  Full Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.secondary',
                    fontWeight: '500',
                  }}
                >
                  {validUser?.firstName} {validUser?.lastName}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
                  Email
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.secondary',
                    fontWeight: '500',
                  }}
                >
                  {validUser?.email}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.secondary',
                    fontWeight: '500',
                  }}
                >
                  {validUser?.phoneNumber}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'text.secondary',
                    fontWeight: '500',
                  }}
                >
                  {validUser?.address}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Signin />
        )}
      </Card>
      {/* );
} */}
    </div>
  )
}

export default UserProfile
