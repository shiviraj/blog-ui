import React from 'react'
import { styled } from '@mui/styles'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import SiteIdentifier from './SiteIdentifier'
import UserProfile from './UserProfile'
import { Menu } from '@mui/icons-material'
import useMedia from '../../../hooks/useMedia'

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(-1),
  maxHeight: theme.spacing(7),
  [theme.breakpoints.down('sm')]: {
    maxHeight: theme.spacing(6.1)
  }
}))

const AppbarContainer = styled(AppBar)(() => ({}))

const Grow = styled(Box)(() => ({
  flexGrow: 1
}))

const Appbar = ({ setOpen }) => {
  const media = useMedia()
  return <AppbarContainer position='fixed'>
    <Container id='back-to-top-anchor'>
      <Toolbar>
        {media.sm && <IconButton onClick={setOpen} color={'inherit'}><Menu /></IconButton>}
        <SiteIdentifier />
        <Grow />
        <UserProfile />
      </Toolbar>
    </Container>
  </AppbarContainer>
}

export default Appbar
