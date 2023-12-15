import * as React from 'react'

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'

// React-router-dom
import { Link, useNavigate } from 'react-router-dom'

// Redux hooks
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import getTotalQuantity from '../redux/selector/cart/getTotalQuantity'

// Reducers
import { logOut } from '../redux/reducers/authReducer'
import { clearStateLogout } from '../redux/reducers/userReducer'
import { clearHistoryLogout } from '../redux/reducers/loansReducer'
import { clearCart } from '../redux/reducers/cartReducer'

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.authReducer.currentUser)
  let pages = [
    { params: '', page: 'Books' },
    { params: 'myloans', page: 'My loans' },
  ]

  user?.role[0].title === 'Admin'
    ? (pages = pages.concat({ params: 'admin', page: 'Dashboard' }))
    : pages

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(clearHistoryLogout())
    dispatch(clearCart())
    dispatch(clearStateLogout())
  }
  const totalQuantity = useAppSelector((state) => getTotalQuantity(state))

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ display: 'flex' }}>
          <Link to={''} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              Lahti Library
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page.params}
                  key={page.page}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'black',
                      display: 'block',
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    {page.page}
                  </Button>
                </Link>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lahti Library
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Link
                to={page.params}
                key={page.page}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  {page.page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?.role[0].title !== 'Admin' && (
              <IconButton style={{ marginRight: '15px' }}>
                <Badge badgeContent={totalQuantity} color="error">
                  <Link to={'cart'}>
                    <ShoppingCart
                      style={{
                        fill: 'white',
                        fontSize: '1.5em',
                      }}
                    />
                  </Link>
                </Badge>
              </IconButton>
            )}

            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.firstName} src={user?.avatar} />
            </IconButton>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?.role[0].title === 'Borrower' && (
                <MenuItem
                  onClick={() => {
                    navigate('/profile')
                  }}
                >
                  <Typography>Profile</Typography>
                </MenuItem>
              )}

              {!user ? (
                <MenuItem
                  onClick={() => {
                    navigate('signin')
                  }}
                >
                  <Typography>Sign in</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              )}
              {!user && (
                <MenuItem
                  onClick={() => {
                    navigate('signup')
                  }}
                >
                  <Typography>Signup</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
