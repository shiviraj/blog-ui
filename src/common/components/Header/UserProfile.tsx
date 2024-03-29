// import React, { useState } from 'react'
// import {Avatar, Box, IconButton, Menu, MenuItem, styled, Typography} from '@mui/material'
// import { useToast } from '../ToastWrapper'
// import { logout } from '../../../utils/auth'
// import Link from 'next/link'
// import { useDispatch, useSelector } from 'react-redux'
// import { unsetUser } from '../../../modules/user/action'
//
// const Login = styled(Typography)(({ theme }) => ({
//   color: theme.palette.common.white,
//   textDecoration: 'none',
//   cursor: 'pointer'
// }))
//
// const AvatarIcon = styled(Avatar)(({ theme }) => ({
//   borderRadius: '50%',
//   border: `1px solid ${theme.palette.grey[500]}`,
//   height: theme.spacing(4),
//   width: theme.spacing(4),
//   backgroundColor: theme.palette.grey[100]
// }))
//
// const UserIcon = ({ handleOpenUserMenu }) => {
//   const user = useSelector(({ user }) => user)
//   if (!user.name) {
//     return <Link href={'/login'}><Login>Login</Login></Link>
//   }
//
//   return <IconButton onClick={handleOpenUserMenu}>
//     <AvatarIcon src={user.profile} alt={user.name} />
//   </IconButton>
// }
//
// const UserProfile = () => {
//   const [anchorElUser, setAnchorElUser] = useState(null)
//   const user = useSelector((state) => state.user)
//   const dispatch = useDispatch()
//   const toast = useToast()
//
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget)
//   }
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null)
//   }
//   const handleLogout = () => {
//     handleCloseUserMenu()
//     API.users.logout()
//       .then(() => {
//         dispatch(unsetUser())
//         logout()
//       })
//       .catch(() => {
//         toast.error('Failed to logout')
//       })
//   }
//
//   return <Box sx={{ flexGrow: 0 }}>
//     <UserIcon handleOpenUserMenu={handleOpenUserMenu} />
//     <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
//       {user.role !== 'USER' &&
//       <Link href={`/${user.role && user.role.toLowerCase()}`}><MenuItem>Dashboard</MenuItem></Link>}
//       <Link href={`/users/${user.userId}`}><MenuItem>Profile</MenuItem></Link>
//       <MenuItem onClick={handleLogout}><Typography textAlign='center'>Logout</Typography></MenuItem>
//     </Menu>
//   </Box>
// }
// export default UserProfile
