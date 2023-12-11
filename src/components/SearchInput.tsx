import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ onChange }: Props) => {
  return (
    <Box
      sx={{
        width: '200',
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        label="Search..."
        id="fullWidth"
        onChange={onChange}
      />
    </Box>
  )
}

export default SearchInput
