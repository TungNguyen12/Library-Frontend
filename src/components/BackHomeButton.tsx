import React from 'react'
import { LANDING } from '../common'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'


const BackHomeButton = () => {
    const navigate = useNavigate()
    const handleToHome = () => {
        navigate(`${LANDING}`)
      }
    
  return (
    <Button
              onClick={handleToHome}
                sx={{
                  margin: '25px auto',
                  bgcolor: '#1976d2',
                  color: '#fff',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: '#1976d2',
                    opacity: '0.9',
                  },
                }}
              >
                Explore more books
              </Button>
  )
}

export default BackHomeButton