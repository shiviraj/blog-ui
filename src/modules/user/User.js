import React from 'react'
import { Box } from '@mui/material'
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: theme.spacing(36)
//   },
//   avatar: {
//     height: theme.spacing(20),
//     width: theme.spacing(20),
//     border: `6px solid ${theme.palette.primary.main}`
//   },
//   profile: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     alignSelf: 'center'
//   }
// }))

const Users = ({ user }) => {
  
  return <Box>
    {/*<Box alignSelf={'center'}>*/}
    {/*  <Avatar  src={user.profile} alt={user.name}/>*/}
    {/*</Box>*/}
    {/*<Box >*/}
    {/*  <Typography variant={'subtitle1'}><b>Role:</b> {user.role}</Typography>*/}
    {/*  <Typography variant={'subtitle1'}><b>UserId:</b> {user.userId}</Typography>*/}
    {/*  <Typography variant={'subtitle1'}><b>Name:</b> {user.name}</Typography>*/}
    {/*  <Typography variant={'subtitle1'}><b>Email:</b> {user.email}</Typography>*/}
    {/*  <Typography variant={'subtitle1'}>*/}
    {/*    <b>Email Verification:</b> {user.emailVerified ? 'Verified' : 'Not Verified'}*/}
    {/*  </Typography>*/}
    {/*  {user.registeredAt && <Typography variant={'subtitle1'}>*/}
    {/*    <b>Registered At:</b> {moment(user.registeredAt).format('MMM DD, YYYY')}*/}
    {/*  </Typography>}*/}
    {/*</Box>*/}
  </Box>
}

export default Users
