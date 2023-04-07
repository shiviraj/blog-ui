import type { PropsWithChildren } from 'react'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Stack, styled } from '@mui/material'

const Container = styled(Stack)(({ theme }) => ({
  background: theme.palette.grey[100],
  minWidth: '100vw',
  minHeight: '100vh'
}))

const Body = styled('main')(({ theme }) => ({
  margin: theme.spacing(9.5, 'auto', 1.5),
  padding: 0,
  width: '94%',
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(11, 'auto', 3)
  },
  [theme.breakpoints.up('md')]: {
    width: '80%'
  }
}))

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <Container justifyContent={'space-between'}>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Container>
  )
}

export default Layout
