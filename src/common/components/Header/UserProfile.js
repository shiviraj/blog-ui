import React, { useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import API from '../../../API'
import { useToast } from '../ToastWrapper'
import { logout } from '../../../utils/auth'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const classes = {}

// const useStyles = makeStyles((theme) => ({
//   menu: {
//     marginTop: theme.spacing(3.5)
//   },
//   icon: {
//     borderRadius: '50%',
//     border: `1px solid ${theme.palette.grey[500]}`,
//     height: theme.spacing(4),
//     width: theme.spacing(4),
//     backgroundColor: theme.palette.grey[100]
//   },
//   login: {
//     color: theme.palette.common.white,
//     textDecoration: 'none',
//     cursor: 'pointer'
//   }
// }))

const UserIcon = ({ handleOpenUserMenu }) => {
  // const classes = useStyles()
  const user = useSelector((state) => state.user)
  if (!user.name)
    return <Link href={'/login'}><Typography className={classes.login}>Login</Typography></Link>
  
  return <IconButton onClick={handleOpenUserMenu}>
    <Avatar src={user.profile} className={classes.icon} alt={user.name} />
  </IconButton>
}

const UserProfile = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const user = useSelector((state) => state.user)
  // const classes = useStyles()
  const toast = useToast()
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => setAnchorElUser(null)
  const handleLogout = () => {
    handleCloseUserMenu()
    API.users.logout()
      .then(logout)
      .catch(() => toast.error('Failed to logout'))
  }
  
  return <Box sx={{ flexGrow: 0 }}>
    <UserIcon handleOpenUserMenu={handleOpenUserMenu} />
    <Menu className={classes.menu} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
      {user && <Link href={`/${user.role && user.role.toLowerCase()}`}><MenuItem>Dashboard</MenuItem></Link>}
      <Link href={'/profile'}><MenuItem>Profile</MenuItem></Link>
      <MenuItem onClick={handleLogout}><Typography textAlign='center'>Logout</Typography></MenuItem>
    </Menu>
  </Box>
}
export default UserProfile
