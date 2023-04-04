import type { PropsWithChildren } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import { ROUTES } from '../../config/routes'
import Footer from './Footer'
import useMedia from '../../hooks/useMedia'
import { styled } from '@mui/material'

const Body = styled('div')<{ mt: number }>(({ theme, mt }) => ({
  marginTop: theme.spacing(mt),
  flexGrow: 1,
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  zIndex: -1,
  background: theme.palette.grey[100]
}))

const Layout = ({ children }: PropsWithChildren) => {
  const media = useMedia()
  const router = useRouter()
  const { pathname } = router
  return (
    <>
      {pathname !== ROUTES.LOGIN && <Header />}
      <Body mt={media.sm ? 5.5 : 0}>{children}</Body>
      <Footer />
    </>
  )
}

export default Layout
