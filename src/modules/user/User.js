import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import useMedia from '../../hooks/useMedia'
import { useSelector } from 'react-redux'
import { formatDate } from '../../utils/utils'

const ProfilePic = styled(Avatar)(({ theme }) => ({
  height: theme.spacing(20),
  width: theme.spacing(20),
  margin: theme.spacing(1),
  border: `4px solid ${theme.palette.primary.main}`
}))

const Users = ({ user }) => {
  const media = useMedia()
  const me = useSelector((state) => state.user)
  const isSame = me.userId === user.userId
  
  return <Stack direction={media.sm ? 'column' : 'row'} justifyContent={'center'} spacing={media.sm ? 0 : 2}
                alignItems={'center'}>
    <Stack>
      <ProfilePic src={user.profile} alt={user.name} />
    </Stack>
    <Stack justifyContent={'center'}>
      {isSame && <Typography variant={'subtitle1'}><b>Role:</b> {me.role}</Typography>}
      <Typography variant={'subtitle1'}><b>UserId:</b> {user.userId}</Typography>
      <Typography variant={'subtitle1'}><b>Username:</b> {user.username}</Typography>
      <Typography variant={'subtitle1'}><b>Name:</b> {user.name}</Typography>
      {isSame && <Typography variant={'subtitle1'}><b>Email:</b> {me.email}</Typography>}
      {isSame && <Typography variant={'subtitle1'}><b>RegisteredAt:</b> {formatDate(me.registeredAt)}</Typography>}
    </Stack>
  </Stack>
}

export default Users
