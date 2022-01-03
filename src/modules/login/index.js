import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': { display: 'none' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: { margin: theme.spacing(2), width: theme.spacing(40) }
}))

const Login = ({ clientId }) => {
  const classes = useStyles()
  const site = useSelector((state) => state.site)
  
  return <div className={classes.root}>
    <Typography variant={'h4'}>{site.title} Login</Typography>
    <Typography variant={'body1'}>{site.tagLine}</Typography>
    <Button className={classes.button} variant={'contained'} color={'primary'} component={'a'}
            href={`https://github.com/login/oauth/authorize?client_id=${clientId.value}&scope=user`}>
      <Typography variant={'h6'}> Login with Github</Typography>
    </Button>
  </div>
}

export default Login
