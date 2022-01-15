import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/styles'
import Header from './Header'
import { ROUTES } from '../../config/routes'

const useStyles = makeStyles((theme) => ({
  body: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: -1
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const router = useRouter()
  const { pathname } = router
  return <>
    {pathname !== ROUTES.LOGIN && <Header />}
    <div className={classes.body}>{children}</div>
    {/*<Footer />*/}
  </>
}

export default Layout
