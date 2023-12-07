import React from 'react'

import Signin from './Signin'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
      {validUser ? (
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
      )}
    </div>
  )
}

export default UserProfile
