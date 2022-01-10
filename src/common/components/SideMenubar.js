import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import API from '../../API'
import { logout } from '../../utils/auth'
import { useToast } from './ToastWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
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
      width: theme.spacing(20),
      color: theme.palette.common.white,
      borderRadius: 0
    },
    '& > *:hover': {
      backgroundColor: theme.palette.grey[600]
    }
  },
  normal: {
    color: theme.palette.common.white,
    cursor: 'pointer',
    height: theme.spacing(3),
    padding: theme.spacing(1.5)
  },
  active: {
    fontWeight: '900',
    backgroundColor: theme.palette.grey[700]
  }
}))

const NavLink = ({ path, text }) => {
  const classes = useStyles()
  const router = useRouter()
  
  const className = path === router.asPath ? `${classes.active} ${classes.normal}` : classes.normal
  
  return <Link href={path}>
    <Typography className={className}>{text}</Typography>
  </Link>
}

const SideMenubar = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.user)
  const path = user.role && user.role.toLowerCase()
  const toast = useToast()
  
  const handleLogout = () => {
    API.users.logout()
      .then(logout)
      .catch(() => toast.error('Failed to logout'))
  }
  
  return <div className={classes.root}>
    <NavLink path={`/${path}`} text='Dashboard' />
    <NavLink path={`/${path}/pages`} text='Pages' />
    <NavLink path={`/${path}/posts`} text='Posts' />
    <NavLink path={`/${path}/comments`} text='Comments' />
    <Typography onClick={handleLogout} className={classes.normal}>Logout</Typography>
  </div>
}

export default SideMenubar
