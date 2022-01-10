import React from 'react'
import Appbar from './Header/Appbar'
import Menubar from './Header/Menubar'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { isSuperUserPath } from '../../config/roles'
import { Box, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  topBar: {
    backgroundColor: theme.palette.common.black,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100vw',
    zIndex: 10,
    top: 0
  },
  child: {
    position: 'relative',
    color: theme.palette.common.white,
    '&>*': {
      fontWeight: 900,
      margin: theme.spacing(0.2, 1),
      color: theme.palette.common.white,
      textDecoration: 'none'
    }
  },
  root: { position: 'fixed' }
}))

const Header = () => {
  const classes = useStyles()
  const router = useRouter()
  const user = useSelector((state) => state.user)
  
  if (isSuperUserPath(router.query.role)) {
    return <Box className={classes.topBar}>
      <Typography className={classes.child}>
        <Link component={Typography} href={`/${user.role && user.role.toLowerCase()}`}>Dashboard</Link>
        <Link component={Typography} href={'/'}>Visit Site</Link>
      </Typography>
      <Typography className={classes.child}>{user.name} ({user.role})</Typography>
    </Box>
  }
  
  return <React.Fragment>
    <Appbar className={classes.root} />
    <Menubar />
  </React.Fragment>
}

export default Header
