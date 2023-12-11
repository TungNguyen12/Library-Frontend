import Signin from './Signin'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import UpdateUserForm from '../components/UpdateUserForm'
import { useAppSelector } from '../hooks/useAppSelector'

const UserProfile = () => {
  const validUser = useAppSelector((state) => state.authReducer.currentUser)

  return (
    <div>
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

      <UpdateUserForm />
    </div>
  )
}

export default UserProfile
