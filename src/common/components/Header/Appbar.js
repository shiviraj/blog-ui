import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SiteIdentifier from './SiteIdentifier'
import UserProfile from './UserProfile'

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(-1, 0), height: theme.spacing(7) },
  grow: { flexGrow: 1 }
}))

const Appbar = () => {
  const classes = useStyles()
  
  return <AppBar className={classes.root}>
    <Toolbar>
      <SiteIdentifier />
      <div className={classes.grow} />
      <UserProfile />
    </Toolbar>
  </AppBar>
  
}


export default Appbar
