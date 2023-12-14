import {
  Box,
  Fab,
  TableCell,
  TableRow,
  Typography,
  Avatar,
  Grow,
} from '@mui/material'

import Close from '@mui/icons-material/Close'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { removeFromCart } from '../redux/reducers/cartReducer'
import { useState } from 'react'
import Book from '../types/book/Book'

type CartItemProps = { item: Book }

function CartItem({ item }: CartItemProps) {
  const [isItemRemoving, setIsItemRemoving] = useState(false)
  const [isItemRendered, setIsItemRendered] = useState(true)

  const dispatch = useAppDispatch()

  const handleRemoveCart = async () => {
    setIsItemRemoving(true)
    setTimeout(async () => {
      await dispatch(removeFromCart(item))
      setIsItemRendered(false)
    }, 300)
  }

  return (
    <Grow
      in={!isItemRemoving}
      style={{
        transitionDelay: !isItemRemoving ? '400ms' : '0ms',
      }}
      onExited={() => setIsItemRendered(false)}
    >
      <TableRow key={item._id}>
        <TableCell align="center" valign="middle" component="th" scope="row">
          <Box display={isItemRemoving ? 'none' : 'flex'} alignItems="center">
            <Avatar
              alt={item.title}
              src={item.img}
              variant="square"
              sx={{ width: 100, height: 125, objectFit: 'cover' }}
            />

            <Box ml={2}>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  margin: '0 0 8px 0',
                }}
              >
                {item.title}
              </p>
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '20rem',
                }}
              >
                <Typography variant="caption" noWrap>
                  {item.description}
                </Typography>
              </div>
            </Box>
          </Box>
        </TableCell>
        <TableCell align="center" valign="middle">
          {item.category[0].name}
        </TableCell>
        <TableCell align="center" valign="middle">
          {item.author[0].fullName}
        </TableCell>
        <TableCell align="center" valign="middle">
          <Fab
            onClick={() => handleRemoveCart()}
            size="small"
            color="error"
            disableRipple
            disabled={isItemRemoving}
          >
            <Close />
          </Fab>
        </TableCell>
      </TableRow>
    </Grow>
  )
}

export default CartItem
