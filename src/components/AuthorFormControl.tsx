import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useAppSelector } from '../hooks/useAppSelector'
import { AuthorAPI } from '../types/author/AuthorAPI'

type Props = {
  onChange: (e: SelectChangeEvent<string>) => void
}

const AuthorFormControl = ({ onChange }: Props) => {
  const authors = useAppSelector((state) => state.authorsReducer.authors)
  return (
    <FormControl
      sx={{
        minWidth: 150,
        marginRight: '10px',
      }}
    >
      <InputLabel id="selectAuthors">Author</InputLabel>
      <Select
        labelId="selectAuthors"
        id="selectAuthors"
        onChange={onChange}
        label="Author"
        defaultValue=""
      >
        <MenuItem key={0} value={''}>
          None
        </MenuItem>
        {authors &&
          authors.map((author: AuthorAPI) => (
            <MenuItem
              key={author._id}
              value={author.firstName + ' ' + author.lastName}
            >
              {author.firstName + ' ' + author.lastName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default AuthorFormControl
