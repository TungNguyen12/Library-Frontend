import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useAppSelector } from '../hooks/useAppSelector'
import CategoryAPI from '../types/category/CategoryAPI'

type Props = {
  onChange: (e: SelectChangeEvent<string>) => void
}

const CategoryFormControl = ({ onChange }: Props) => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  )
  return (
    <FormControl
      sx={{
        minWidth: 150,
        marginRight: '10px',
      }}
    >
      <InputLabel id="selectCategories">Category</InputLabel>
      <Select
        labelId="selectCategories"
        id="selectCategories"
        onChange={onChange}
        label="Category"
        defaultValue=""
      >
        <MenuItem key={0} value={''}>
          None
        </MenuItem>
        {categories &&
          categories.map((category: CategoryAPI) => (
            <MenuItem key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default CategoryFormControl
