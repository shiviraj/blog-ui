import React from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import { ROUTES } from '../../config/routes'
import { styled } from '@mui/styles'

const Body = styled('div')(() => ({
  flexGrow: 1,
  minHeight: '100vh',
  width: '100vw', margin: 0,
  padding: 0,
  zIndex: -1
}))

const Layout = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  return <>
    {pathname !== ROUTES.LOGIN && <Header />}
    <Body>{children}</Body>
  </>
}

export default Layout
