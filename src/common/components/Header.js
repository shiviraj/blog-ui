import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { isSuperUserPath } from '../../config/roles'
import Appbar from './Header/Appbar'
import Menubar from './Header/Menubar'

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  width: '100vw',
  zIndex: 10,
  top: 0
}))

const Item = styled(Typography)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.common.white,
  '&>*': {
    fontWeight: 900,
    margin: theme.spacing(0.2, 1),
    color: theme.palette.common.white,
    textDecoration: 'none'
  }
}))

const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user)
  
  if (isSuperUserPath(router.query.role)) {
    return <Container>
      <Item>
        <Link component={Typography} href={`/${user.role && user.role.toLowerCase()}`}>Dashboard</Link>
        <Link component={Typography} href={'/'}>Visit Site</Link>
      </Item>
      <Item>{user.name} ({user.role})</Item>
    </Container>
  }
  
  return <React.Fragment>
    <Appbar style={{ position: 'fixed' }} setOpen={() => setOpen(!open)} />
    <Menubar open={open} setOpen={setOpen} />
  </React.Fragment>
}

export default Header
