import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  error: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    color: theme.palette.error.main,
    fontSize: theme.spacing(4)
  }
}))

const PageError = ({ message }) => {
  const classes = useStyles()
  return <Box className={classes.error}>{message}</Box>
}

export default PageError
