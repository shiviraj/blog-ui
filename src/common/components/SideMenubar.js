import React from 'react'
import { styled } from '@mui/material'

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  boxShadow: theme.shadows[4],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100vh',
  position: 'fixed',
  margin: theme.spacing(3, 0),
  '& > *': {
    textDecoration: 'none',
    width: theme.spacing(20),
    color: theme.palette.common.white,
    borderRadius: 0
  },
  '& > *:hover': {
    backgroundColor: theme.palette.grey[600]
  }
}))

// const LinkItem = styled(Typography)(({ theme }) => ({
//   color: theme.palette.common.white,
//   cursor: 'pointer',
//   height: theme.spacing(3),
//   padding: theme.spacing(1.5),
//   '&.active': {
//     fontWeight: '900',
//     backgroundColor: theme.palette.grey[700]
//   }
// }))

// const NavLink = ({ path, text }) => {
//   const router = useRouter()
//
//   return (
//     <Link href={path} style={{ width: '100%' }}>
//       <LinkItem className={path === router.asPath ? `active` : ''}>{text}</LinkItem>
//     </Link>
//   )
// }

const SideMenubar = () => {
  // const user = useSelector((state) => state.user)
  // const path = user.role && user.role.toLowerCase()
  // const toast = useToast()

  // const handleLogout = () => {
  //   API.users
  //     .logout()
  //     .then(logout)
  //     .catch(() => toast.error('Failed to logout'))
  // }

  return (
    <Container>
      {/* <NavLink path={`/${path}`} text='Dashboard' /> */}
      {/* <NavLink path={`/${path}/pages`} text='Pages' /> */}
      {/* <NavLink path={`/${path}/posts`} text='Posts' /> */}
      {/* <NavLink path={`/${path}/comments`} text='Comments' /> */}
      {/* <LinkItem onClick={handleLogout}>Logout</LinkItem> */}
    </Container>
  )
}

export default SideMenubar
