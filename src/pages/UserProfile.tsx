import Signin from './Signin'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const validUser = useAppSelector((state) => state.authReducer.currentUser)

  // useEffect(() => {
  //   axios.put(`http://localhost:3000/api/v1/users/update`)
  // })

  /* States for edit mode */
  const [newAvatar, setNewAvatar] = useState<string | null>(null)
  const [newName, setNewName] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState<string | null>(null)
  const [oldPasswordInput, setOldPasswordInput] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string | null>()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<{ prompt: string }>()
  const [modalError, setModalError] = useState<string | null>(null)

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
      {/* <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMediumScreen ? '90%' : '70vw',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            padding: '50px',
          }}
        >
          {modalContent && (
            <Stack
              alignItems={'center'}
              direction={isSmallScreen ? 'column' : 'row'}
              gap={'20px'}
            >
                <img
                  src={newAvatar ? newAvatar : validUser?.avatar}
                  alt="avatar"
                  style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '50%',
                  }}
                />
              
              <Stack sx={{ width: '100%' }}>
                <Typography variant="h4" color={'text.primary'}>
                  {modalContent.prompt}
                </Typography>
                {modalError && (
                  <Typography color={'text.primary'}>
                    Error: {modalError}
                  </Typography>
                )}

                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  sx={{ padding: '20px 0', width: '100%' }}
                >
                  <Button
                    sx={{ width: '30%' }}
                    variant="contained"
                    color="error"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ width: '30%' }}
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateUser()}
                  >
                    Save
                  </Button>
            </Stack>
          )
        </Box>
      </Modal> */}
    </div>
  )
}

export default UserProfile
