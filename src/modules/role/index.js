import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SideMenubar from '../../common/components/SideMenubar'
import { isSuperUserPath } from '../../config/roles'
import { ROUTES } from '../../config/routes'
import TitleBar from './components/TitleBar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100vw'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.grey[500]}`
  },
  container: {
    width: '100%',
    height: '100%',
    margin: theme.spacing(3.4, 0, 0, 23)
  }
}))

const Role = ({ component: Component, title, ...rest }) => {
  const router = useRouter()
  const classes = useStyles()
  
  useEffect(() => {
    if (router.query.role && !isSuperUserPath(router.query.role)) {
      router.push(ROUTES.HOME.USER)
    }
  }, [router.query.role])
  
  return <Box className={classes.root}>
    <SideMenubar className={classes.tabs} />
    <Box className={classes.container}>
      <TitleBar title={title} />
      <Component {...rest} />
    </Box>
  </Box>
}

export default Role

