import React from 'react'
import { Stack } from '@mui/material'
import useMedia from '../../hooks/useMedia'

const Author = (): JSX.Element => {
  const media = useMedia()

  return (
    <Stack
      direction={media.sm ? 'column' : 'row'}
      justifyContent={'center'}
      spacing={media.sm ? 0 : 2}
      alignItems={'center'}
    >
      {/*<Stack>*/}
      {/*  <ProfilePic src={user.profile} alt={user.name} />*/}
      {/*</Stack>*/}
      {/*<Stack justifyContent={'center'}>*/}
      {/*  {isSame && (*/}
      {/*    <Typography variant={'subtitle1'}>*/}
      {/*      <b>Role:</b> {me.role}*/}
      {/*    </Typography>*/}
      {/*  )}*/}
      {/*  <Typography variant={'subtitle1'}>*/}
      {/*    <b>UserId:</b> {user.userId}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant={'subtitle1'}>*/}
      {/*    <b>Username:</b> {user.username}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant={'subtitle1'}>*/}
      {/*    <b>Name:</b> {user.name}*/}
      {/*  </Typography>*/}
      {/*  {isSame && (*/}
      {/*    <Typography variant={'subtitle1'}>*/}
      {/*      <b>Email:</b> {me.email}*/}
      {/*    </Typography>*/}
      {/*  )}*/}
      {/*  {isSame && (*/}
      {/*    <Typography variant={'subtitle1'}>*/}
      {/*      <b>RegisteredAt:</b> {formatDate(me.registeredAt)}*/}
      {/*    </Typography>*/}
      {/*  )}*/}
      {/*</Stack>*/}
    </Stack>
  )
}

export default Author
