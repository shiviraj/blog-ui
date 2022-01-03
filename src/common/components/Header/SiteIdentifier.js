import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    lineHeight: theme.spacing(0.1)
  }
}))

const SiteIdentifier = () => {
  const classes = useStyles()
  const site = useSelector((state) => state.site)
  return <Box className={classes.root}>
    <Box>
      <Typography variant={'h5'}>{site.title}</Typography>
    </Box>
    <Box><span>{site.tagLine}</span></Box>
  </Box>
}

export default SiteIdentifier
