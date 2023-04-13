import type { PropsWithChildren } from 'react'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Stack, styled } from '@mui/material'
import { useRouter } from 'next/router'

const Container = styled(Stack)(({ theme }) => ({
  background: theme.palette.grey[100],
  minWidth: '100vw',
  minHeight: '100vh'
}))

const Body = styled('main')<{ full: 'true' | 'false' }>(({ theme, full }) => ({
  margin: theme.spacing(9.5, 'auto', 1.5),
  padding: 0,
  width: '94%',
  [theme.breakpoints.up('sm')]: {
    margin: full === 'true' ? theme.spacing(0) : theme.spacing(11, 'auto', 3)
  },
  [theme.breakpoints.up('md')]: {
    width: full === 'true' ? '100%' : '80%'
  }
}))

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  const router = useRouter()
  const isAuthor = router.pathname.startsWith('/author')
  const full = isAuthor.toString() as 'true' | 'false'

  return (
    <Container justifyContent={'space-between'}>
      {!isAuthor && <Header />}
      <Body full={full}>{children}</Body>
      {!isAuthor && <Footer />}
    </Container>
  )
}

export default Layout
