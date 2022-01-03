import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Avatar, Box, Typography} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(36)
  },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
    border: `6px solid ${theme.palette.primary.main}`
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  }
}))

const Users = ({user}) => {
  const classes = useStyles()

  return <Box className={classes.root}>
    <Box alignSelf={'center'}>
      <Avatar className={classes.avatar} src={user.profile} alt={user.name}/>
    </Box>
    <Box className={` ${classes.profile}`}>
      <Typography variant={'subtitle1'}><b>Role:</b> {user.role}</Typography>
      <Typography variant={'subtitle1'}><b>UserId:</b> {user.userId}</Typography>
      <Typography variant={'subtitle1'}><b>Name:</b> {user.name}</Typography>
      <Typography variant={'subtitle1'}><b>Email:</b> {user.email}</Typography>
      <Typography variant={'subtitle1'}>
        <b>Email Verification:</b> {user.emailVerified ? 'Verified' : 'Not Verified'}
      </Typography>
      {user.registeredAt && <Typography variant={'subtitle1'}>
        <b>Registered At:</b> {moment(user.registeredAt).format('MMM DD, YYYY')}
      </Typography>}
    </Box>
  </Box>
}

export default Users
