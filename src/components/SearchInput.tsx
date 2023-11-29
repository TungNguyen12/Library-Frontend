import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const SearchInput: React.FC<{
  handleSearchBook: (e: React.ChangeEvent<any>) => void
}> = ({ handleSearchBook }) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        label="Search..."
        id="fullWidth"
        onChange={(e: React.ChangeEvent<any>) => handleSearchBook(e)}
      />
    </Box>
  )
}

export default SearchInput
