import { Stack, ListItem, Button } from '@mui/material'
import React from 'react'

const SwitchPanel: React.FC<any> = ({ handleOpenBook, handleOpenUser }) => {
  return (
    <Stack>
      <ListItem>
        <Button onClick={handleOpenBook}>Books control</Button>
      </ListItem>
      <ListItem>
        <Button onClick={handleOpenUser}>Users control</Button>
      </ListItem>
    </Stack>
  )
}

export default SwitchPanel
